import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Turns an UNPAID order into PAID and takes its quantities out of product stock, in one
 * transaction. Runs once: a second call (webhook retry, double click) changes nothing.
 * Returns true when the order is paid (now or already).
 */
export async function payOrder(orderId: string): Promise<boolean> {
  return prisma.$transaction(async (tx) => {
    const { count } = await tx.order.updateMany({
      where: { id: orderId, paymentStatus: "UNPAID" },
      data: { paymentStatus: "PAID", paidAt: new Date() },
    });
    if (count === 0) {
      const order = await tx.order.findUnique({ where: { id: orderId }, select: { paymentStatus: true } });
      return order?.paymentStatus === "PAID";
    }

    const items = await tx.orderItem.findMany({ where: { orderId }, select: { productId: true, quantity: true } });
    for (const item of items) {
      if (!item.productId) continue;
      const taken = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      // Sold more than was left (paid in parallel): never go below zero, flag it for the admin.
      if (taken.count === 0) {
        await tx.product.update({ where: { id: item.productId }, data: { stock: 0 } });
        console.error(`[stock] order ${orderId}: not enough stock for product ${item.productId}`);
      }
    }
    return true;
  });
}
