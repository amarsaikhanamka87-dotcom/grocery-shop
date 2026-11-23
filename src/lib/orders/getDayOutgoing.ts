import "server-only";
import { prisma } from "@/lib/prisma";

type DayRange = { start: Date; end: Date };

/**
 * Admin dashboard: the products in orders paid on one Ulaanbaatar day, each with the total
 * quantity going out and the stock left, most outgoing first.
 */
export async function getDayOutgoing({ start, end }: DayRange) {
  const totals = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: {
      productId: { not: null },
      order: { paymentStatus: "PAID", paidAt: { gte: start, lt: end } },
    },
    _sum: { quantity: true },
  });
  const outgoingById = new Map(totals.map((t) => [t.productId, t._sum.quantity ?? 0]));
  if (outgoingById.size === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: [...outgoingById.keys()].filter((id): id is string => id !== null) } },
    select: {
      id: true,
      name: true,
      image: true,
      unit: true,
      stock: true,
      minQty: true,
      category: { select: { name: true } },
    },
  });
  return products
    .map((product) => ({ ...product, outgoing: outgoingById.get(product.id) ?? 0 }))
    .sort((a, b) => b.outgoing - a.outgoing || a.name.localeCompare(b.name));
}

export type OutgoingRow = Awaited<ReturnType<typeof getDayOutgoing>>[number];
