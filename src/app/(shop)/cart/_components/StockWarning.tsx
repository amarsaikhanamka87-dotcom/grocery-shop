"use client";

import { TriangleAlert } from "lucide-react";
import { useCart } from "@/components/cart/useCart";
import type { CartItem } from "@/components/cart/CartContext";
import { stockProblem } from "@/components/cart/stockProblem";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";

/** Under a cart line whose quantity the shop can't fill: says what's left and offers the fix. */
export function StockWarning({ item: i }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();
  const problem = stockProblem(i);
  if (!problem) return null;
  return (
    <div className="mt-2 grid gap-1 rounded-xl border border-ink px-3 py-2 text-[16px]">
      <span className="flex items-center gap-2 font-bold">
        <TriangleAlert className="size-4 shrink-0" />
        {problem === "out" ? "Түр дууссан байна." : `Үлдэгдэл ${i.stock} ${cartUnitLabel(i.unit)} байна.`}
      </span>
      <button
        type="button"
        onClick={() => (problem === "out" ? remove(i.productId) : setQuantity(i.productId, i.stock))}
        className="flex min-h-11 items-center self-start font-bold text-brand underline-offset-2 hover:underline"
      >
        {problem === "out" ? "Сагснаас хасах" : `${i.stock} болгох`}
      </button>
    </div>
  );
}
