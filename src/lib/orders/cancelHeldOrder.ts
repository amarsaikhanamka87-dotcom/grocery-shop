import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Cancels an unpaid online bank-transfer order and puts the stock it was holding back, in one
 * transaction (see holdsStock). Returns false when the order was not in that state (paid,
 * already cancelled, a Касс sale), so a second call changes nothing.
 */
export async function cancelHeldOrder(orderId: string): Promise<boolean> {
  return prisma.$transaction(async (tx) => {
    const { count } = await tx.order.updateMany({
      where: {
        id: orderId,
        paymentMethod: "TRANSFER",
        paymentStatus: "UNPAID",
        status: { not: "CANCELLED" },
        OR: [{ deliveryType: null }, { deliveryType: { not: "store" } }],
      },
      data: { status: "CANCELLED" },
    });
    if (count === 0) return false;
    const items = await tx.orderItem.findMany({ where: { orderId }, select: { productId: true, quantity: true } });
    for (const item of items) {
      if (!item.productId) continue;
      await tx.product.updateMany({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } });
    }
    return true;
  });
}
