"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/useCart";
import type { CartItem } from "@/components/cart/CartContext";
import { notifyAdded } from "@/components/cart/notifyAdded";

/**
 * Product-page stepper state. Counts what is already in the cart, so the buyer can only add
 * what is still left (stock − cart), and says so instead of clamping silently.
 */
export function useAddToCart(item: Omit<CartItem, "quantity">) {
  const { items, ready, add } = useCart();
  const [qty, setQty] = useState(item.minQty);
  const inCart = ready ? (items.find((i) => i.productId === item.productId)?.quantity ?? 0) : 0;
  const left = Math.max(0, item.stock - inCart);
  const min = inCart > 0 ? 1 : item.minQty; // the minimum order is already met once it's in the cart
  const clamp = (q: number) => Math.min(left, Math.max(min, Math.round(q) || min));

  return {
    qty,
    inCart,
    left,
    soldOut: item.stock < item.minQty,
    full: left < min, // nothing more can be added
    tooMany: qty > left,
    setQty,
    clampQty: () => setQty((q) => clamp(q)),
    dec: () => setQty((q) => Math.max(min, q - 1)),
    inc: () => setQty((q) => Math.min(left, q + 1)),
    addToCart: () => {
      if (qty < min || qty > left) return false;
      add(item, qty);
      notifyAdded(item);
      setQty(1); // next add tops up the line, the minimum is already met
      return true;
    },
  };
}
