import "server-only";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReceipt } from "@/lib/receipts/sendReceipt";
import { holdsStock } from "./holdsStock";

/**
 * Turns an UNPAID order into PAID, issues its Receipt (БМ-3) and takes its quantities out of
 * product stock (unless the order already holds it, see holdsStock), in one transaction. Runs once: a second call (webhook retry, double click)
 * changes nothing. Returns true when the order is paid (now or already). Only the call that
 * actually paid it emails the receipt (via n8n), after the response is sent.
 */
export async function payOrder(orderId: string): Promise<boolean> {
  const result = await prisma.$transaction(async (tx) => {
    const { count } = await tx.order.updateMany({
      where: { id: orderId, paymentStatus: "UNPAID" },
      data: { paymentStatus: "PAID", paidAt: new Date() },
    });
    if (count === 0) {
      const order = await tx.order.findUnique({ where: { id: orderId }, select: { paymentStatus: true } });
      return order?.paymentStatus === "PAID" ? "already-paid" : "not-paid";
    }

    await tx.receipt.create({ data: { orderId } });

    // Bank-transfer orders already took their stock when placed (holdsStock).
    const order = await tx.order.findUnique({ where: { id: orderId }, select: { paymentMethod: true, deliveryType: true } });
    if (order && holdsStock(order)) return "paid-now";

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
    return "paid-now";
  });

  if (result === "paid-now") after(() => sendReceipt({ orderId }));
  return result !== "not-paid";
}
