"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";
import { sendReceipt } from "@/lib/receipts/sendReceipt";

const MESSAGES = {
  SENT: "И-мэйл рүү илгээлээ.",
  SKIPPED: "Худалдан авагчийн и-мэйл хаяг алга.",
  FAILED: "Илгээж чадсангүй. Дахин оролдоно уу.",
  NOT_FOUND: "Баримт олдсонгүй.",
} as const;

/** "Дахин илгээх": the admin emails this receipt again through n8n (any amount). */
export async function resendReceipt(receiptId: string): Promise<{ ok: boolean; message: string }> {
  await requireAdmin();
  const id = idSchema.safeParse(receiptId);
  if (!id.success) return { ok: false, message: MESSAGES.NOT_FOUND };

  const result = await sendReceipt({ id: id.data }, true);
  revalidatePath("/admin/receipts");
  revalidatePath(`/admin/receipts/${id.data}`);
  return { ok: result === "SENT", message: MESSAGES[result] };
}
