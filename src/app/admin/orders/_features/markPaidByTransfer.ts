"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { payOrder } from "@/lib/orders/payOrder";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

/**
 * "Дансаар төлсөн": the admin saw the bank transfer (reference "BZ" + order number) and marks the
 * order paid. Only unpaid, not cancelled orders the buyer placed as a bank transfer change;
 * payOrder then issues the receipt and takes stock exactly like a Wire payment. Safe to tap twice.
 */
export async function markPaidByTransfer(orderId: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const id = idSchema.safeParse(orderId);
  if (!id.success) return { ok: false };

  try {
    // Only orders where the buyer chose "Дансаар шилжүүлэх" (Wire orders are paid by Wire).
    const order = await prisma.order.findFirst({
      where: { id: id.data, paymentMethod: "TRANSFER", paymentStatus: "UNPAID", status: { not: "CANCELLED" } },
      select: { id: true },
    });
    if (!order) return { ok: false };
    const isPaid = await payOrder(order.id);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    revalidatePath(`/orders/${id.data}`);
    return { ok: isPaid };
  } catch (error) {
    console.error(`[transfer] could not mark order ${id.data} paid`, error);
    return { ok: false };
  }
}
