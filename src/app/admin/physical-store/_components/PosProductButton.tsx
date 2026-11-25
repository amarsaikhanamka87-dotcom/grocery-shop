import Image from "next/image";
import type { PosProduct } from "@/lib/catalog/getPosProducts";
import { POS_LOW_STOCK } from "@/lib/constants";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { formatPrice } from "@/lib/format/formatPrice";
import { cn } from "@/lib/utils";

type Props = { product: PosProduct; inBill: number; onPick: (product: PosProduct) => void };

/**
 * One tappable product tile: short photo (with a green count badge once it's in the bill), name,
 * "price / unit" and stock left (clay when low). Out of stock = disabled.
 */
export function PosProductButton({ product: p, inBill, onPick }: Props) {
  const soldOut = p.stock < 1;
  const isLow = !soldOut && p.stock <= POS_LOW_STOCK;
  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => onPick(p)}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-white text-left transition",
        soldOut ? "cursor-not-allowed opacity-50" : "hover:border-brand hover:shadow-sm active:scale-[0.98]",
      )}
    >
      <span className="relative aspect-[16/9] w-full bg-cream">
        <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 180px, 33vw" className="object-cover" />
        {inBill > 0 && (
          <span
            aria-label={`Тооцоонд ${inBill}`}
            className="absolute top-1.5 right-1.5 grid size-8 place-items-center rounded-full bg-brand text-[15px] font-extrabold text-white shadow-float tabular-nums"
          >
            {inBill}
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-2">
        <span className="line-clamp-2 text-[14px] font-bold leading-snug text-ink sm:text-[15px]">{p.name}</span>
        <span className="mt-auto pt-1 whitespace-nowrap tabular-nums">
          <span className="text-[15px] font-extrabold text-brand">{formatPrice(p.price)}</span>
          <span className="text-[13px] text-muted-foreground"> / {cartUnitLabel(p.unit)}</span>
        </span>
        <span
          className={cn("text-[13px]", soldOut || isLow ? "font-semibold text-clay" : "text-muted-foreground")}
        >
          {soldOut ? "Дууссан" : `Үлдэгдэл ${p.stock}${isLow ? " · бага" : ""}`}
        </span>
      </span>
    </button>
  );
}
