import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

class OutOfStock extends Error {}

/**
 * Bank-transfer checkout: saves the order and takes its quantities out of stock in one
 * transaction, so the goods stay held while the owner waits for the transfer. If a product sold
 * out in the meantime nothing is saved and this returns null.
 */
export async function createOrderHoldingStock(data: Prisma.OrderCreateInput) {
  try {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({ data, include: { items: true } });
      for (const item of order.items) {
        if (!item.productId) continue;
        const taken = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (taken.count === 0) throw new OutOfStock(item.name);
      }
      return order;
    });
  } catch (error) {
    if (error instanceof OutOfStock) return null;
    throw error;
  }
}
