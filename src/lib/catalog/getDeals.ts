import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

export async function getDeals(take = 4): Promise<Product[]> {
  return prisma.product.findMany({ where: { oldPrice: { not: null } }, orderBy: { updatedAt: "desc" }, take });
}
