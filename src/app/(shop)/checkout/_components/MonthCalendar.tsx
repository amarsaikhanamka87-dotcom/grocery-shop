import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { monthGrid } from "../_features/monthGrid";

const WEEK_HEAD = ["Да", "Мя", "Лха", "Пү", "Ба", "Бя", "Ня"];
const NAV = "grid size-10 place-items-center rounded-xl bg-ink/5 text-ink hover:bg-line disabled:opacity-40";

type Props = {
  year: number;
  month: number;
  value: string;
  min: string;
  canGoBack: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPick: (iso: string) => void;
};

/** One month of days (Monday first); days before `min` can't be picked. */
export function MonthCalendar({ year, month, value, min, canGoBack, onPrev, onNext, onPick }: Props) {
  return (
    <div className="mt-3 rounded-2xl border border-line p-3">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onPrev} disabled={!canGoBack} aria-label="Өмнөх сар" className={NAV}>
          <ChevronLeft className="size-5" />
        </button>
        <p className="font-extrabold">
          {month + 1}-р сар {year}
        </p>
        <button type="button" onClick={onNext} aria-label="Дараагийн сар" className={NAV}>
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEK_HEAD.map((w) => (
          <span key={w} className="py-1 text-[13px] text-muted-foreground">
            {w}
          </span>
        ))}
        {monthGrid(year, month).map((c) => (
          <button
            key={c.iso}
            type="button"
            disabled={c.iso < min}
            onClick={() => onPick(c.iso)}
            className={cn(
              "h-10 rounded-xl text-[15px] font-semibold tabular-nums hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
              !c.inMonth && "text-muted-foreground",
              c.iso === value && "bg-brand text-white hover:bg-brand",
            )}
          >
            {c.day}
          </button>
        ))}
      </div>
    </div>
  );
}
