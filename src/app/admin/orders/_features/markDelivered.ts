"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";

/**
 * "Хүргэж өгсөн": the admin marks an order as delivered. Only paid orders that are not cancelled
 * or already delivered change; anything else is left as it is.
 */
export async function markDelivered(orderId: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const { count } = await prisma.order.updateMany({
    where: { id: orderId, paymentStatus: "PAID", status: { notIn: ["DELIVERED", "CANCELLED"] } },
    data: { status: "DELIVERED" },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/orders/${orderId}`);
  return { ok: count === 1 };
}
