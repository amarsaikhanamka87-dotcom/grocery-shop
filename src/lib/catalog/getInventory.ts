import "server-only";
import { prisma } from "@/lib/prisma";

/** Admin dashboard: every product's stock, lowest first (what needs restocking is on top). */
export function getInventory() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      unit: true,
      stock: true,
      minQty: true,
      category: { select: { name: true } },
    },
    orderBy: [{ stock: "asc" }, { name: "asc" }],
  });
}

export type InventoryRow = Awaited<ReturnType<typeof getInventory>>[number];
