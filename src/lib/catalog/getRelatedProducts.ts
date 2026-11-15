import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

export async function getRelatedProducts(product: Product, take = 4): Promise<Product[]> {
  return prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    orderBy: { isFeatured: "desc" },
    take,
  });
}
