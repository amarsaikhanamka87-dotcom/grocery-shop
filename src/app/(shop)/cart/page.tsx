"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBasket, Trash2, Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { deliveryFeeFor, FREE_DELIVERY_FROM } from "@/lib/constants";

/** Typeable quantity: keeps a draft while typing and clamps to min/stock on blur or Enter. */
function QtyInput({ value, min, max, onCommit }: { value: number; min: number; max: number; onCommit: (q: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = Math.round(Number(draft));
    onCommit(Number.isFinite(n) && n > 0 ? Math.min(max, Math.max(min, n)) : value);
    setDraft(null);
  };
  return (
    <input
      type="number"
      inputMode="numeric"
      value={draft ?? value}
      min={min}
      max={max}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
      className="w-12 bg-transparent text-center text-[16px] font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      aria-label="Тоо хэмжээ"
    />
  );
}

export default function CartPage() {
  const { items, subtotal, setQuantity, remove, ready } = useCart();
  const fee = deliveryFeeFor(subtotal);
  const left = Math.max(0, FREE_DELIVERY_FROM - subtotal);

  if (!ready) return <div className="container-x min-h-[50vh] pt-10" />;

  if (items.length === 0) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-brand-50 text-brand">
          <ShoppingBasket className="size-9" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Таны сагс хоосон байна</h1>
        <p className="mt-2 text-muted">Шинэхэн ногоо, жимсээ сонгоод сагсандаа нэмээрэй.</p>
        <Link href="/shop" className="btn btn-primary mt-8 h-12 px-7">
          Дэлгүүр хэсэх <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Миний сагс</h1>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="card divide-y divide-line">
          {left > 0 ? (
            <div className="flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[14.5px]">
              <Truck className="size-5 shrink-0 text-brand" />
              <p>
                Үнэгүй хүргэлт авахад <b>{formatPrice(left)}</b> дутуу байна.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-t-[20px] bg-brand-50 px-5 py-4 text-[14.5px] font-semibold text-brand">
              <Truck className="size-5 shrink-0" /> Танд хүргэлт үнэгүй!
            </div>
          )}
          {items.map((i) => (
            <div key={i.productId} className="flex gap-4 p-4 sm:p-5">
              <Link href={`/product/${i.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-cream-2 sm:size-24">
                <Image src={i.image} alt={i.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/product/${i.slug}`} className="line-clamp-2 font-bold hover:text-brand">
                      {i.name}
                    </Link>
                    <p className="text-[13px] text-muted">
                      {formatPrice(i.price)} / {i.unit} · хамгийн багадаа {i.minQty}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(i.productId)}
                    className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-cream-2 hover:text-clay"
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
          ))}
        </div>

        <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[200px]">
          <h2 className="text-lg font-extrabold">Захиалгын дүн</h2>
          <dl className="mt-5 grid gap-3 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">Бүтээгдэхүүн</dt>
              <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Хүргэлт</dt>
              <dd className="font-semibold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-line pt-4 text-lg">
              <dt className="font-bold">Нийт</dt>
              <dd className="font-extrabold tabular-nums">{formatPrice(subtotal + fee)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="btn btn-primary mt-6 h-[52px] w-full text-[15px]">
            Захиалга хийх <ArrowRight className="size-4" />
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-semibold text-brand hover:underline">
            Дэлгүүр үргэлжлүүлэх
          </Link>
        </aside>
      </div>
    </div>
  );
}
