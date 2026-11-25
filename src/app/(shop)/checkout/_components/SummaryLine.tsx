import Image from "next/image";
import type { CartItem } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format/formatPrice";

export function SummaryLine({ item: i }: { item: CartItem }) {
  return (
    <li className="flex items-center gap-3">
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-ink/5">
        <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />
        <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-white">
          {i.quantity}
        </span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-semibold">{i.name}</p>
        <p className="text-[12.5px] text-muted-foreground">
          {i.quantity} {i.unit} × {formatPrice(i.price)}
        </p>
      </div>
      <p className="text-[14.5px] font-bold tabular-nums">{formatPrice(i.price * i.quantity)}</p>
    </li>
  );
}
