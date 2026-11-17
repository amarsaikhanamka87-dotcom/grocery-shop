"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type StockLevels = Record<string, { stock: number; minQty: number }>;

const ids = z.array(z.string().min(1).max(64)).max(100);

/**
 * Live stock for the products in a browser cart (the cart's copy can be hours old). Stock is
 * public on the product pages anyway, so no sign-in is needed. Deleted products are left out.
 */
export async function getStockLevels(productIds: string[]): Promise<StockLevels> {
  const parsed = ids.safeParse(productIds);
  if (!parsed.success || parsed.data.length === 0) return {};
  const rows = await prisma.product.findMany({
    where: { id: { in: parsed.data } },
    select: { id: true, stock: true, minQty: true },
  });
  return Object.fromEntries(rows.map((r) => [r.id, { stock: r.stock, minQty: r.minQty }]));
}
