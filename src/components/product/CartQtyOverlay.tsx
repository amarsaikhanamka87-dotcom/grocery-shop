"use client";

import type { CartItem } from "@/components/cart/CartContext";
import { useCartLine } from "@/components/cart/useCartLine";

/** Dims the card photo and shows the cart quantity in big numbers once the product is in the cart. */
export function CartQtyOverlay({ item }: { item: Omit<CartItem, "quantity"> }) {
  const { quantity, inCart } = useCartLine(item);
  if (!inCart) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/45" aria-hidden>
      <span className="text-6xl font-extrabold text-white tabular-nums drop-shadow">{quantity}</span>
    </div>
  );
}
