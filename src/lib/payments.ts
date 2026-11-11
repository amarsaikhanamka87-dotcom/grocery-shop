import "server-only";
import { prisma } from "./prisma";
import { paidAmount } from "./qpay";

/**
 * Asks QPay whether the order's invoice is paid and, if so, marks the order PAID.
 * Never trusts the callback body — always re-checks with QPay.
 */
export async function syncOrderPayment(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return null;
  if (order.paymentStatus === "PAID" || !order.qpayInvoiceId || order.status === "CANCELLED") return order;

  const paid = await paidAmount(order.qpayInvoiceId);
  if (paid >= order.total) {
    // Conditional update so concurrent callbacks/polls only flip it once.
    await prisma.order.updateMany({
      where: { id: order.id, paymentStatus: "UNPAID" },
      data: { paymentStatus: "PAID", paidAt: new Date(), status: "CONFIRMED" },
    });
    return prisma.order.findUnique({ where: { id: orderId } });
  }
  return order;
}
