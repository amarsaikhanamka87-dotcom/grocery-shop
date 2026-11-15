"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/components/cart/useCart";
import { type CartItem } from "@/components/cart/CartContext";

type Item = Omit<CartItem, "quantity">;

/** Compact round "+" button used on product cards. */
export function QuickAdd({ item }: { item: Item }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const out = item.stock < item.minQty;
  return (
    <button
      type="button"
      disabled={out}
      onClick={() => {
        add(item);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
      className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:bg-line disabled:text-muted-foreground"
      aria-label={out ? "Дууссан" : `${item.name} сагсанд нэмэх`}
    >
      {done ? <Check className="size-[18px]" /> : <Plus className="size-[18px]" strokeWidth={2.6} />}
    </button>
  );
}
