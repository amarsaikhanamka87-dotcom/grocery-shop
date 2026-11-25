"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/useCart";
import { type CartItem } from "@/components/cart/CartContext";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { formatPrice } from "@/lib/format/formatPrice";
import { QtyInput } from "./QtyInput";
import { StockWarning } from "./StockWarning";

export function CartRow({ item: i }: { item: CartItem }) {
  const { setQuantity, remove } = useCart();
  return (
    <div className="flex gap-4 p-4 sm:p-5">
      <Link href={`/product/${i.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-ink/5 sm:size-24">
        <Image src={i.image} alt={i.name} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/product/${i.slug}`} className="line-clamp-2 font-bold hover:text-brand">
              {i.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">
              {formatPrice(i.price)} / {i.unit}
              {i.minQty > 1 && ` · багадаа ${i.minQty} ${cartUnitLabel(i.unit)}`}
            </p>
            <StockWarning item={i} />
          </div>
          <button
            onClick={() => remove(i.productId)}
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-ink/5 hover:text-clay"
            aria-label={`${i.name} хасах`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3">
          <div className="flex h-10 items-center rounded-full border border-line bg-white">
            <button
              onClick={() => setQuantity(i.productId, i.quantity - 1)}
              disabled={i.quantity <= i.minQty}
              className="grid size-10 place-items-center disabled:opacity-30"
              aria-label="Хасах"
            >
              <Minus className="size-3.5" />
            </button>
            <QtyInput
              value={i.quantity}
              min={i.minQty}
              max={i.stock}
              onCommit={(q) => setQuantity(i.productId, q)}
            />
            <button
              onClick={() => setQuantity(i.productId, i.quantity + 1)}
              disabled={i.quantity >= i.stock}
              className="grid size-10 place-items-center disabled:opacity-30"
              aria-label="Нэмэх"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <p className="ml-auto whitespace-nowrap text-[17px] font-extrabold tabular-nums">
            {formatPrice(i.price * i.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
