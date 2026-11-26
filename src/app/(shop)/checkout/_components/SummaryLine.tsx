import Image from "next/image";
import type { CartItem } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format/formatPrice";

/** One cart line in "Таны захиалга": photo, name, "2 шуудай × 1,600₮", line total. */
export function SummaryLine({ item: i }: { item: CartItem }) {
  return (
    <li className="flex items-center gap-3">
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-ink/5">
        <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-bold">{i.name}</p>
        <p className="text-[16px] text-muted-foreground">
          {i.quantity} {i.unit} × {formatPrice(i.price)}
        </p>
      </div>
      <p className="text-[16px] font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
    </li>
  );
}
