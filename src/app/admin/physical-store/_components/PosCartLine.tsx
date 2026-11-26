import { Minus, Plus } from "lucide-react";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { formatPrice } from "@/lib/format/formatPrice";
import type { PosLine } from "../_features/usePosCart";

type Props = { line: PosLine; onQuantity: (productId: string, quantity: number) => void };

// 44px: big enough for a thumb at the counter.
const stepButton =
  "grid size-11 shrink-0 place-items-center rounded-xl border border-line text-ink hover:border-brand disabled:opacity-40";

/**
 * One bill line: name, price, line total (under the name on phones) and a 44px "Устгах",
 * then − quantity +. Remove sits under the name, far from "+", so it isn't tapped by accident.
 */
export function PosCartLine({ line, onQuantity }: Props) {
  const { product: p, quantity } = line;
  const lineTotal = formatPrice(p.price * quantity);
  return (
    <li className="flex items-center gap-2 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[16px] font-bold leading-snug text-ink">{p.name}</p>
        <p className="text-[16px] text-muted-foreground tabular-nums">
          {formatPrice(p.price)}/{cartUnitLabel(p.unit)}
        </p>
        <p className="text-[17px] font-extrabold tabular-nums text-ink sm:hidden">{lineTotal}</p>
        <button
          type="button"
          onClick={() => onQuantity(p.id, 0)}
          className="-ml-2 flex min-h-11 items-center rounded-xl px-2 text-[16px] font-bold text-muted-foreground hover:bg-ink/5 hover:text-clay"
        >
          Устгах
        </button>
      </div>
      <button type="button" aria-label="Хасах" className={stepButton} onClick={() => onQuantity(p.id, quantity - 1)}>
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={p.stock}
        value={quantity}
        onChange={(e) => onQuantity(p.id, Number(e.target.value) || 1)}
        aria-label="Тоо"
        className="input h-11 w-12 px-0.5 text-center text-[17px]! font-extrabold tabular-nums"
      />
      <button
        type="button"
        aria-label="Нэмэх"
        className={stepButton}
        disabled={quantity >= p.stock}
        onClick={() => onQuantity(p.id, quantity + 1)}
      >
        <Plus className="size-4" />
      </button>
      <span className="hidden w-[6.5rem] shrink-0 text-right text-[17px] font-extrabold tabular-nums text-ink sm:block">
        {lineTotal}
      </span>
    </li>
  );
}
