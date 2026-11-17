"use client";

import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/components/cart/CartContext";
import { useCartLine } from "@/components/cart/useCartLine";

/** Card footer: "Сагслах" until the product is in the cart, then − / + to change the quantity. */
export function CartButton({ item }: { item: Omit<CartItem, "quantity"> }) {
  const line = useCartLine(item);

  if (line.soldOut) {
    return (
      <button type="button" disabled className="h-12 w-full rounded-2xl bg-white/60 font-bold text-muted-foreground">
        Дууссан
      </button>
    );
  }
  if (!line.inCart) {
    return (
      <button
        type="button"
        onClick={line.add}
        aria-label={`${item.name} сагсанд нэмэх`}
        className="h-12 w-full rounded-2xl bg-white font-bold text-ink shadow-sm transition-colors hover:bg-brand hover:text-white"
      >
        Сагслах
      </button>
    );
  }
  return (
    <div className="flex h-12 items-center justify-between">
      <button
        type="button"
        onClick={line.decrement}
        aria-label={line.quantity <= item.minQty ? "Сагснаас хасах" : "Нэгээр хасах"}
        className="grid size-12 place-items-center rounded-2xl bg-white text-ink shadow-sm transition-colors hover:bg-cream"
      >
        <Minus className="size-5" strokeWidth={2.6} />
      </button>
      <span className="sr-only" aria-live="polite">
        Сагсанд {line.quantity}
      </span>
      <button
        type="button"
        onClick={line.increment}
        disabled={line.atMax}
        aria-label="Нэгээр нэмэх"
        className="grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-sm transition-colors hover:bg-brand-dark disabled:bg-line disabled:text-muted-foreground"
      >
        <Plus className="size-5" strokeWidth={2.6} />
      </button>
    </div>
  );
}
