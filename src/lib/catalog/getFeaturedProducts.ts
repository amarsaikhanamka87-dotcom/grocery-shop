import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

/**
 * Home "Онцлох ногоо": the featured products first, topped up with other products in stock (most
 * stock first) so the section is never a half-empty row when only a few are marked featured.
 */
export async function getFeaturedProducts(take = 8): Promise<Product[]> {
  const featured = await prisma.product.findMany({ where: { isFeatured: true }, orderBy: { createdAt: "asc" }, take });
  if (featured.length >= take) return featured;
  const more = await prisma.product.findMany({
    where: { isFeatured: false, stock: { gt: 0 } },
    orderBy: { stock: "desc" },
    take: take - featured.length,
  });
  return [...featured, ...more];
}
