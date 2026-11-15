import "server-only";
import { prisma } from "@/lib/prisma";
import type { ProductWithCategory } from "@/types/catalog";

export async function getProduct(slug: string): Promise<ProductWithCategory | null> {
  return prisma.product.findUnique({ where: { slug }, include: { category: true } });
}
