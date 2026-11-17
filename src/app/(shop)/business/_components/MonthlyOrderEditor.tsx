"use client";

import { Check, Loader2, Save, ShoppingBasket } from "lucide-react";
import type { Product } from "@prisma/client";
import type { MonthlyOrder } from "@/types/business";
import { formatPrice } from "@/lib/format/formatPrice";
import { useMonthlyOrderDraft } from "../_features/useMonthlyOrderDraft";
import { useAddListToCart } from "../_features/useAddListToCart";
import { ScheduleFields } from "./ScheduleFields";
import { MonthlyItemRow } from "./MonthlyItemRow";
import { AddProductSelect } from "./AddProductSelect";

type Props = { initial: MonthlyOrder; products: Product[] };

export function MonthlyOrderEditor({ initial, products }: Props) {
  const d = useMonthlyOrderDraft(initial);
  const cart = useAddListToCart(d.items);
  const available = products.filter((p) => !d.items.some((i) => i.product.id === p.id));
  const total = d.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <section className="card p-6">
      <h2 className="text-lg font-extrabold">Сар бүрийн захиалга</h2>
      <p className="mt-1 text-[14px] text-muted-foreground">
        Байнга авдаг бараагаа нэг удаа жагсаагаад, сар бүр нэг товчоор сагсанд хийнэ. Автомат захиалга удахгүй.
      </p>
      <div className="mt-5">
        <ScheduleFields dayOfMonth={d.dayOfMonth} active={d.active} onDayChange={d.setDayOfMonth} onActiveChange={d.setActive} />
      </div>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {d.items.map((i) => (
          <MonthlyItemRow key={i.product.id} item={i} onQuantity={(q) => d.setQuantity(i.product.id, q)} onRemove={() => d.remove(i.product.id)} />
        ))}
        {d.items.length === 0 && <li className="py-6 text-center text-muted-foreground">Жагсаалт хоосон байна.</li>}
      </ul>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <AddProductSelect products={available} onAdd={d.add} />
        <p className="text-right font-extrabold tabular-nums">Нийт: {formatPrice(total)}</p>
      </div>
      {d.message && (
        <p className={`mt-4 rounded-xl px-4 py-3 text-[14px] font-medium ${d.message.ok ? "bg-brand-50 text-brand" : "bg-clay-50 text-clay"}`}>
          {d.message.text}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={d.save} disabled={d.saving} className="btn btn-primary h-12 px-6">
          {d.saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Хадгалах
        </button>
        <button type="button" onClick={cart.addAll} disabled={d.items.length === 0} className="btn btn-outline h-12 px-6">
          {cart.done ? <Check className="size-4" /> : <ShoppingBasket className="size-4" />}
          {cart.done ? "Сагсанд нэмэгдлээ" : "Бүгдийг сагсанд нэмэх"}
        </button>
      </div>
    </section>
  );
}
