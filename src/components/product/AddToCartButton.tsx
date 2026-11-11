"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBasket } from "lucide-react";
import { useCart, type CartItem } from "@/components/cart/CartProvider";

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
      className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:bg-line disabled:text-muted"
      aria-label={out ? "Дууссан" : `${item.name} сагсанд нэмэх`}
    >
      {done ? <Check className="size-[18px]" /> : <Plus className="size-[18px]" strokeWidth={2.6} />}
    </button>
  );
}

/** Quantity stepper + add button used on the product page. */
export function AddToCart({ item }: { item: Item }) {
  const { add } = useCart();
  const [qty, setQty] = useState(item.minQty);
  const [done, setDone] = useState(false);
  const out = item.stock < item.minQty;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-14 items-center rounded-full border border-line bg-white">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(item.minQty, q - 1))}
          className="grid size-14 place-items-center rounded-full hover:text-brand"
          aria-label="Тоо хасах"
        >
          <Minus className="size-4" />
        </button>
        <input
          type="number"
          value={qty}
          min={item.minQty}
          max={item.stock}
          onChange={(e) => setQty(Number(e.target.value) || item.minQty)}
          onBlur={() => setQty((q) => Math.min(item.stock, Math.max(item.minQty, Math.round(q))))}
          className="w-14 bg-transparent text-center text-lg font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          aria-label="Тоо хэмжээ"
        />
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(item.stock, q + 1))}
          className="grid size-14 place-items-center rounded-full hover:text-brand"
          aria-label="Тоо нэмэх"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <button
        type="button"
        disabled={out}
        onClick={() => {
          add(item, Math.min(item.stock, Math.max(item.minQty, Math.round(qty))));
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        }}
        className="btn btn-primary h-14 flex-1 px-8 text-base sm:flex-none"
      >
        {done ? <Check className="size-5" /> : <ShoppingBasket className="size-5" />}
        {out ? "Дууссан" : done ? "Сагсанд нэмэгдлээ" : "Сагсанд нэмэх"}
      </button>
    </div>
  );
}
