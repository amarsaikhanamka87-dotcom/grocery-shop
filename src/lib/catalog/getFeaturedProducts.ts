import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

export async function getFeaturedProducts(take = 8): Promise<Product[]> {
  return prisma.product.findMany({ where: { isFeatured: true }, orderBy: { createdAt: "asc" }, take });
}
