import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Product, ProductFilter, ProductSort } from "@/types/catalog";
import { SORTS } from "./sorts";

const isSort = (value: string | undefined): value is ProductSort => value !== undefined && value in SORTS;

/** Shop listing: category, deals, organic and text filters, then sort. */
export async function findProducts(filter: ProductFilter): Promise<Product[]> {
  const q = filter.q?.trim();
  const where: Prisma.ProductWhereInput = {
    ...(filter.category ? { category: { slug: filter.category } } : {}),
    ...(filter.deals ? { oldPrice: { not: null } } : {}),
    ...(filter.organic ? { isOrganic: true } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { origin: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const sort = isSort(filter.sort) ? SORTS[filter.sort] : SORTS.popular;
  return prisma.product.findMany({ where, orderBy: [sort, { name: "asc" }] });
}
