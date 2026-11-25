import "server-only";
import { prisma } from "@/lib/prisma";
import { payOrder } from "./payOrder";

/**
 * Wire.mn said this PaymentIntent succeeded: pays the matching order (and takes stock) only if
 * the paid amount equals the order total. Safe to call twice.
 * Returns true when the order is (now or already) paid.
 */
export async function markOrderPaid(
  intentId: string,
  paidAmount: number,
): Promise<boolean> {
  const order = await prisma.order.findUnique({
    where: { wireIntentId: intentId },
    select: { id: true, total: true, paymentStatus: true },
  });
  if (!order) return false;
  if (order.paymentStatus === "PAID") return true;
  if (order.total !== paidAmount) {
    console.error(
      `[wire] amount mismatch for order ${order.id}: paid ${paidAmount}, total ${order.total}`,
    );
    return false;
  }
  return payOrder(order.id);
}
