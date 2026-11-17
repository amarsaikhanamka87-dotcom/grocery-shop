"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/useCart";
import type { MonthlyItem } from "@/types/business";

/** Puts every product of the monthly list into the cart at its listed quantity. */
export function useAddListToCart(items: MonthlyItem[]) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const addAll = () => {
    for (const { product: p, quantity } of items) {
      add(
        { productId: p.id, slug: p.slug, name: p.name, image: p.image, unit: p.unit, price: p.price, stock: p.stock, minQty: p.minQty },
        quantity,
      );
    }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return { addAll, done };
}
