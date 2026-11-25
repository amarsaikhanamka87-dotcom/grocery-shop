"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";

/**
 * "Хүргэж өгсөн": the admin marks an order as delivered. Only paid orders that are not cancelled
 * or already delivered change; anything else is left as it is.
 */
export async function markDelivered(orderId: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const id = idSchema.safeParse(orderId);
  if (!id.success) return { ok: false };
  const { count } = await prisma.order.updateMany({
    where: { id: id.data, paymentStatus: "PAID", status: { notIn: ["DELIVERED", "CANCELLED"] } },
    data: { status: "DELIVERED" },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/orders/${id.data}`);
  return { ok: count === 1 };
}
