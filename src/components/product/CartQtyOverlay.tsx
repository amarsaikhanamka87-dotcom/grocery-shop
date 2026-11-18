"use client";

import type { CartItem } from "@/components/cart/CartContext";
import { useCartLine } from "@/components/cart/useCartLine";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";

/** Dims the card photo and shows the cart amount big, e.g. "5 кг", once the product is in the cart. */
export function CartQtyOverlay({ item }: { item: Omit<CartItem, "quantity"> }) {
  const { quantity, inCart } = useCartLine(item);
  if (!inCart) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/45" aria-hidden>
      <span className="flex items-baseline gap-1.5 text-white drop-shadow">
        <span className="text-6xl font-extrabold tabular-nums">{quantity}</span>
        <span className="text-2xl font-bold">{cartUnitLabel(item.unit)}</span>
      </span>
    </div>
  );
}
