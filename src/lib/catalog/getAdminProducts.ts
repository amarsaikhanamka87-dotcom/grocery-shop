import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProductWithCategory } from "@/types/catalog";

/** Admin list: products with their category, newest first, filtered by text and category id. */
export async function getAdminProducts(filter: { q?: string; category?: string } = {}): Promise<ProductWithCategory[]> {
  const q = filter.q?.trim();
  const where: Prisma.ProductWhereInput = {
    ...(filter.category ? { categoryId: filter.category } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { origin: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  return prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: "desc" } });
}
