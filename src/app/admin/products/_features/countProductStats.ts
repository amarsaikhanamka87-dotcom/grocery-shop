import type { Product } from "@/types/catalog";

/** Counts for the stat tiles: out of stock, below the min order qty, featured. */
export function countProductStats(products: Product[]) {
  return {
    shown: products.length,
    out: products.filter((p) => p.stock <= 0).length,
    low: products.filter((p) => p.stock > 0 && p.stock < p.minQty).length,
    featured: products.filter((p) => p.isFeatured).length,
  };
}
