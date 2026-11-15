import type { Prisma } from "@prisma/client";
import type { ProductSort } from "@/types/catalog";

/** Database ordering for the shop's "sort" param. */
export const SORTS: Record<ProductSort, Prisma.ProductOrderByWithRelationInput> = {
  popular: { isFeatured: "desc" },
  new: { createdAt: "desc" },
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
};
