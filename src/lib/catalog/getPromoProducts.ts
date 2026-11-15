import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/catalog";

/**
 * Home-page banners: the two priciest featured products (the mixed boxes in the current data).
 * Later this can become an admin "promote" switch instead.
 */
export async function getPromoProducts(take = 2): Promise<Product[]> {
  return prisma.product.findMany({ where: { isFeatured: true }, orderBy: { price: "desc" }, take });
}
