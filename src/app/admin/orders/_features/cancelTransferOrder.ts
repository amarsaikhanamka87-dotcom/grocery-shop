"use server";

import { revalidatePath } from "next/cache";
import { cancelHeldOrder } from "@/lib/orders/cancelHeldOrder";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

/**
 * "Цуцлах" for an unpaid bank-transfer order (the money never came): cancels it and puts the
 * stock it was holding back on the shelf. A second tap changes nothing.
 */
export async function cancelTransferOrder(orderId: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const id = idSchema.safeParse(orderId);
  if (!id.success) return { ok: false };

  try {
    const isCancelled = await cancelHeldOrder(id.data);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    revalidatePath(`/orders/${id.data}`);
    return { ok: isCancelled };
  } catch (error) {
    console.error(`[transfer] could not cancel order ${id.data}`, error);
    return { ok: false };
  }
}
