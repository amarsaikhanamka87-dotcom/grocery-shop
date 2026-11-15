import { Info } from "lucide-react";
import type { CartItem } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format/formatPrice";
import { deliveryFeeFor } from "@/lib/delivery/deliveryFeeFor";
import { SummaryLine } from "./SummaryLine";

type Props = { items: CartItem[]; subtotal: number; notice: string | null };

export function OrderSummary({ items, subtotal, notice }: Props) {
  const fee = deliveryFeeFor(subtotal);
  return (
    <aside className="card min-w-0 p-5 sm:p-6 lg:sticky lg:top-[200px]">
      <h2 className="text-lg font-extrabold">Таны захиалга</h2>
      <ul className="mt-5 grid max-h-72 grid-cols-1 gap-3 overflow-y-auto pr-1">
        {items.map((i) => (
          <SummaryLine key={i.productId} item={i} />
        ))}
      </ul>
      <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Бүтээгдэхүүн</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Хүргэлт</dt>
          <dd className="font-semibold tabular-nums">{fee === 0 ? "Үнэгүй" : formatPrice(fee)}</dd>
        </div>
        <div className="mt-1 flex justify-between border-t border-line pt-4 text-lg">
          <dt className="font-bold">Нийт</dt>
          <dd className="font-extrabold tabular-nums">{formatPrice(subtotal + fee)}</dd>
        </div>
      </dl>
      {notice && (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-clay-50 px-4 py-3 text-[14px] font-medium text-clay">
          <Info className="mt-0.5 size-4 shrink-0" /> {notice}
        </p>
      )}
      <button type="submit" className="btn btn-primary mt-6 h-[52px] w-full text-[15px]">
        Захиалах · {formatPrice(subtotal + fee)}
      </button>
      <p className="mt-3 text-center text-[12.5px] text-muted-foreground">Үнэ, нөөцийг захиалах үед дахин шалгана.</p>
    </aside>
  );
}
