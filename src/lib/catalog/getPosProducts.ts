import "server-only";
import { prisma } from "@/lib/prisma";

/** Admin POS: every product with what the cashier needs to sell it, by name. */
export function getPosProducts() {
  return prisma.product.findMany({
    select: { id: true, name: true, image: true, unit: true, price: true, stock: true },
    orderBy: { name: "asc" },
  });
}

export type PosProduct = Awaited<ReturnType<typeof getPosProducts>>[number];
