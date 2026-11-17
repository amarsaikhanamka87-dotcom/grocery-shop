import "server-only";
import { getPaymentIntent } from "@/lib/wire/getPaymentIntent";
import { markOrderPaid } from "./markOrderPaid";

/**
 * Fallback for a late webhook: asks Wire.mn itself (server to server, with our secret key) for
 * the PaymentIntent and marks the order paid if it succeeded. Never trusts the browser.
 */
export async function syncWirePayment(intentId: string): Promise<boolean> {
  try {
    const intent = await getPaymentIntent(intentId);
    return intent.status === "succeeded" ? markOrderPaid(intent.id, intent.amount) : false;
  } catch (err) {
    console.error("[wire] status check failed", err);
    return false;
  }
}
