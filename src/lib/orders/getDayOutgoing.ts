import "server-only";
import { prisma } from "@/lib/prisma";

type DayRange = { start: Date; end: Date };
type Sold = { outgoing: number; income: number; minPrice: number; maxPrice: number };

/**
 * Admin dashboard: the products in orders paid on one Ulaanbaatar day, each with the total
 * quantity going out, the money it brought in (price × quantity of each line), its price range
 * that day and the stock left. Most income first.
 */
export async function getDayOutgoing({ start, end }: DayRange) {
  const lines = await prisma.orderItem.findMany({
    where: {
      productId: { not: null },
      order: { paymentStatus: "PAID", paidAt: { gte: start, lt: end } },
    },
    select: { productId: true, price: true, quantity: true },
  });
  const soldById = new Map<string, Sold>();
  for (const line of lines) {
    if (!line.productId) continue;
    const sold = soldById.get(line.productId) ?? { outgoing: 0, income: 0, minPrice: line.price, maxPrice: line.price };
    sold.outgoing += line.quantity;
    sold.income += line.price * line.quantity;
    sold.minPrice = Math.min(sold.minPrice, line.price);
    sold.maxPrice = Math.max(sold.maxPrice, line.price);
    soldById.set(line.productId, sold);
  }
  if (soldById.size === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: [...soldById.keys()] } },
    select: {
      id: true,
      name: true,
      unit: true,
      stock: true,
      minQty: true,
    },
  });
  const empty: Sold = { outgoing: 0, income: 0, minPrice: 0, maxPrice: 0 };
  return products
    .map((product) => ({ ...product, ...(soldById.get(product.id) ?? empty) }))
    .sort((a, b) => b.income - a.income || a.name.localeCompare(b.name));
}

export type OutgoingRow = Awaited<ReturnType<typeof getDayOutgoing>>[number];
