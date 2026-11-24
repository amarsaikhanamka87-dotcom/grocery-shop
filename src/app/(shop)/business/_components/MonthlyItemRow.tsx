import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { MonthlyItem } from "@/types/business";
import { formatPrice } from "@/lib/format/formatPrice";

type Props = { item: MonthlyItem; onQuantity: (q: number) => void; onRemove: () => void };

export function MonthlyItemRow({ item: { product: p, quantity }, onQuantity, onRemove }: Props) {
  return (
    <li className="flex items-center gap-3 py-3">
      <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-ink/5">
        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{p.name}</p>
        <p className="text-[12.5px] text-muted-foreground">{formatPrice(p.price)} / {p.unit} · багадаа {p.minQty}</p>
      </div>
      <input
        type="number"
        min={p.minQty}
        value={quantity}
        onChange={(e) => onQuantity(Number(e.target.value))}
        className="input w-24 text-center tabular-nums"
        aria-label={`${p.name} тоо хэмжээ`}
      />
      <span className="hidden w-12 text-[13px] text-muted-foreground sm:block">{p.unit}</span>
      <button type="button" onClick={onRemove} className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-ink/5 hover:text-clay" aria-label={`${p.name} хасах`}>
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}
