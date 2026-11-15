"use client";

import type { Product } from "@/types/catalog";
import { useSavedProducts } from "../_features/useSavedProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyWishlist } from "./EmptyWishlist";

export function WishlistGrid({ products }: { products: Product[] }) {
  const { ready, saved } = useSavedProducts(products);
  if (!ready) return <div className="min-h-[30vh]" />;
  if (saved.length === 0) return <EmptyWishlist />;
  return (
    <div className="mt-8">
      <ProductGrid products={saved} />
    </div>
  );
}
