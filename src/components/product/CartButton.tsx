"use client";

import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/components/cart/CartContext";
import { useCartLine } from "@/components/cart/useCartLine";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";

/** Card footer: "Сагслах" until the product is in the cart, then − / + to change the quantity. */
export function CartButton({ item }: { item: Omit<CartItem, "quantity"> }) {
  const line = useCartLine(item);

  if (line.soldOut) {
    return (
      <button type="button" disabled className="h-12 w-full rounded-2xl bg-brand-50 text-[16px] font-bold text-muted-foreground">
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
        className="h-12 w-full rounded-2xl bg-brand text-[16px] font-bold text-white transition-colors hover:bg-brand-dark"
      >
        Сагслах
      </button>
    );
  }
  return (
    <div className="@container flex h-12 items-center justify-between gap-1">
      <button
        type="button"
        onClick={line.decrement}
        aria-label={line.quantity <= item.minQty ? "Сагснаас хасах" : "Нэгээр хасах"}
        className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-white text-ink transition-colors hover:border-ink"
      >
        <Minus className="size-5" strokeWidth={2.6} />
      </button>
      {/* The amount sits between − and +. A narrow phone card shows only the number (the price line
          already says "/ шуудай"); the unit comes back once the row has room. */}
      <span className="min-w-0 text-[16px] font-bold whitespace-nowrap tabular-nums" aria-live="polite">
        <span className="sr-only">Сагсанд </span>
        {line.quantity}
        <span className="@max-[200px]:sr-only"> {cartUnitLabel(item.unit)}</span>
      </span>
      <button
        type="button"
        onClick={line.increment}
        disabled={line.atMax}
        aria-label="Нэгээр нэмэх"
        className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-sm transition-colors hover:bg-brand-dark disabled:bg-line disabled:text-muted-foreground"
      >
        <Plus className="size-5" strokeWidth={2.6} />
      </button>
    </div>
  );
}
