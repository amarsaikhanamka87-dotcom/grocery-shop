"use client";

import { TriangleAlert } from "lucide-react";
import { useCart } from "@/components/cart/useCart";
import type { CartItem } from "@/components/cart/CartContext";
import { stockProblem } from "@/components/cart/stockProblem";

/** Under a cart line whose quantity the shop can't fill: says what's left and offers the fix. */
export function StockWarning({ item: i }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();
  const problem = stockProblem(i);
  if (!problem) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
      <TriangleAlert className="size-4 shrink-0 text-amber-600" />
      <span className="font-semibold">
        {problem === "out" ? "Түр дууссан байна." : `Үлдэгдэл ${i.stock} ${i.unit} байна.`}
      </span>
      <button
        type="button"
        onClick={() => (problem === "out" ? remove(i.productId) : setQuantity(i.productId, i.stock))}
        className="font-bold text-brand underline-offset-2 hover:underline"
      >
        {problem === "out" ? "Сагснаас хасах" : `${i.stock} болгох`}
      </button>
    </div>
  );
}
