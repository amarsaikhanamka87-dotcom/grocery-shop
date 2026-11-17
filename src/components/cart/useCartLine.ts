"use client";

import type { CartItem } from "./CartContext";
import { useCart } from "./useCart";
import { notifyAdded } from "./notifyAdded";

/**
 * One product's place in the cart, for product cards: how many are in it and the
 * add / + / − actions. "−" at the minimum quantity takes the product out of the cart.
 */
export function useCartLine(item: Omit<CartItem, "quantity">) {
  const { items, ready, add, setQuantity, remove } = useCart();
  const quantity = ready ? (items.find((i) => i.productId === item.productId)?.quantity ?? 0) : 0;
  return {
    quantity,
    inCart: quantity > 0,
    soldOut: item.stock < item.minQty,
    atMax: quantity >= item.stock,
    add: () => {
      add(item);
      notifyAdded(item, Math.min(item.minQty, item.stock));
    },
    increment: () => setQuantity(item.productId, quantity + 1),
    decrement: () => (quantity <= item.minQty ? remove(item.productId) : setQuantity(item.productId, quantity - 1)),
  };
}
