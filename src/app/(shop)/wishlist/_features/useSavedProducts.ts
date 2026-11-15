"use client";

import { useCart } from "@/components/cart/useCart";
import type { Product } from "@/types/catalog";

/** The products the buyer saved (the wishlist lives in the browser). */
export function useSavedProducts(products: Product[]) {
  const { wishlist, ready } = useCart();
  return { ready, saved: products.filter((p) => wishlist.includes(p.id)) };
}
