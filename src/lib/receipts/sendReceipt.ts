import "server-only";
import { prisma } from "@/lib/prisma";
import { RECEIPT_EMAIL_MIN_TOTAL } from "@/lib/constants";
import { postN8nEvent } from "@/lib/n8n/postN8nEvent";
import { getReceiptData } from "./getReceiptData";
import { receiptEvent } from "./receiptEvent";

type Result = "SENT" | "SKIPPED" | "FAILED" | "NOT_FOUND";

/**
 * Emails a paid receipt through n8n and records the outcome on the Receipt row. Automatic sends
 * (after payment) go out only when the buyer has an email and the total is over
 * RECEIPT_EMAIL_MIN_TOTAL; `force` (admin "Дахин илгээх") skips the amount check. n8n is only called
 * when an email should really go out, so its Webhook → Gmail flow never sends by mistake.
 * Never throws: a payment must not fail because of email.
 */
export async function sendReceipt(where: { id: string } | { orderId: string }, force = false): Promise<Result> {
  try {
    const receipt = await getReceiptData(where);
    if (!receipt) return "NOT_FOUND";
    const record = (emailStatus: Exclude<Result, "NOT_FOUND">) =>
      prisma.receipt.update({
        where: { id: receipt.receiptId },
        data: {
          email: receipt.buyer.email,
          emailStatus,
          ...(emailStatus === "SENT" && { emailedAt: new Date() }),
        },
      });

    const wanted = !!receipt.buyer.email && (force || receipt.total > RECEIPT_EMAIL_MIN_TOTAL);
    if (!wanted) {
      await record("SKIPPED");
      return "SKIPPED";
    }
    const status = (await postN8nEvent(receiptEvent(receipt))) ? "SENT" : "FAILED";
    await record(status);
    return status;
  } catch (err) {
    console.error("[receipt] send failed", err);
    return "FAILED";
  }
}
