import { formatPrice } from "@/lib/format/formatPrice";
import { cn } from "@/lib/utils";
import { QUICK_CASH_NOTES } from "../_features/quickCashNotes";

const QUICK_BUTTON =
  "h-11 rounded-xl border border-line text-[14px] font-bold tabular-nums hover:border-brand hover:bg-brand-50 disabled:opacity-35";

type Props = { total: number; received: string; onReceived: (value: string) => void };

/**
 * Cash payments: the amount handed over (typed as "10,000₮" or a quick button) next to the change.
 * Empty = nothing typed yet: a neutral hint, not a "short" warning.
 */
export function CashChange({ total, received, onReceived }: Props) {
  const amount = Number(received) || 0;
  const change = amount - total;
  const isEmpty = received === "";
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-[14px] font-semibold text-ink-2">Авсан мөнгө</span>
          <input
            type="text"
            inputMode="numeric"
            value={isEmpty ? "" : formatPrice(amount)}
            onChange={(e) => onReceived(e.target.value.replace(/\D/g, "").replace(/^0+/, ""))}
            placeholder="0₮"
            className="input mt-1 h-12 w-full text-right text-[22px]! font-extrabold tabular-nums"
          />
        </label>
        <div
          className={cn(
            "flex flex-col justify-center rounded-xl px-3 text-right",
            isEmpty ? "bg-cream text-muted-foreground" : change < 0 ? "bg-clay-50 text-clay" : "bg-brand-50 text-brand",
          )}
        >
          <span className="text-[14px] font-bold">{isEmpty ? "Хариулт" : change < 0 ? "Дутуу" : "Хариулт"}</span>
          <span className={cn("font-extrabold tabular-nums", isEmpty ? "text-[14px]" : "text-[26px] leading-tight")}>
            {isEmpty ? "Мөнгөө оруулна уу" : formatPrice(Math.abs(change))}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button type="button" onClick={() => onReceived(String(total))} className={QUICK_BUTTON}>
          Яг
        </button>
        {QUICK_CASH_NOTES.map((note) => (
          <button
            key={note}
            type="button"
            disabled={note < total}
            onClick={() => onReceived(String(note))}
            className={QUICK_BUTTON}
          >
            {formatPrice(note)}
          </button>
        ))}
      </div>
    </div>
  );
}
