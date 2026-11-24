"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBasket, TriangleAlert } from "lucide-react";
import type { CartItem } from "@/components/cart/CartContext";
import { useAddToCart } from "./useAddToCart";

/** Quantity stepper + add button used on the product page; one row, also on phones (sticky bar). */
export function AddToCart({ item }: { item: Omit<CartItem, "quantity"> }) {
  const a = useAddToCart(item);
  const [done, setDone] = useState(false);
  const blocked = a.soldOut || a.full || a.tooMany;
  const label = a.soldOut ? "Дууссан" : a.full ? "Үлдэгдэл бүгд сагсанд" : done ? "Сагсанд нэмэгдлээ" : "Сагсанд нэмэх";

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-14 shrink-0 items-center rounded-full border border-line bg-white">
          <button type="button" onClick={a.dec} disabled={a.soldOut || a.full} className="grid size-12 place-items-center rounded-full hover:text-brand disabled:opacity-30 sm:size-14" aria-label="Тоо хасах">
            <Minus className="size-4" />
          </button>
          <input
            type="number"
            value={a.qty}
            min={1}
            max={a.left}
            disabled={a.soldOut || a.full}
            onChange={(e) => a.setQty(Number(e.target.value) || 0)}
            onBlur={a.clampQty}
            className="w-11 bg-transparent sm:w-14 text-center text-lg font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            aria-label="Тоо хэмжээ"
          />
          <button type="button" onClick={a.inc} disabled={a.qty >= a.left} className="grid size-12 place-items-center rounded-full hover:text-brand disabled:opacity-30 sm:size-14" aria-label="Тоо нэмэх">
            <Plus className="size-4" />
          </button>
        </div>
        <button
          type="button"
          disabled={blocked}
          onClick={() => {
            if (!a.addToCart()) return;
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          }}
          className="btn btn-primary h-14 min-w-0 flex-1 px-4 text-base disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
        >
          {done ? <Check className="size-5" /> : <ShoppingBasket className="size-5" />}
          {label}
        </button>
      </div>
      {!a.soldOut && (a.tooMany || a.full) && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-[13.5px] font-semibold text-amber-800">
          <TriangleAlert className="size-4 shrink-0 text-amber-600" />
          {a.full
            ? `Үлдэгдэл ${item.stock} ${item.unit} — бүгд таны сагсанд байна.`
            : `Үлдэгдэл хүрэлцэхгүй: дахиад ${a.left} ${item.unit} л нэмэх боломжтой.`}
        </p>
      )}
      {a.inCart > 0 && !a.full && (
        <p className="mt-2 text-[13px] text-muted-foreground">
          Сагсанд {a.inCart} {item.unit} байна · нэмж болох {a.left} {item.unit}
        </p>
      )}
    </div>
  );
}
