import Link from "next/link";
import { cn } from "@/lib/utils";
import type { UbDay } from "@/lib/date/ubRecentDays";

type Props = { days: UbDay[]; selected: string };

/** Day buttons "11:23", "11:22", … (today first); the chosen day is kept in the URL (?day=). */
export function DayButtons({ days, selected }: Props) {
  return (
    <nav aria-label="Өдөр сонгох" className="mt-6 -mx-1 overflow-x-auto px-1 pb-1">
      <ul className="flex gap-2">
        {days.map((day, i) => {
          const isSelected = day.key === selected;
          return (
            <li key={day.key} className="shrink-0">
              <Link
                href={i === 0 ? "/admin" : `/admin?day=${day.key}`}
                aria-current={isSelected ? "date" : undefined}
                className={cn(
                  "flex w-[72px] flex-col items-center rounded-2xl px-2 py-2 transition-colors",
                  isSelected ? "bg-ink text-white" : "bg-cream-2 text-ink hover:bg-line",
                )}
              >
                <span className="text-[15px] font-extrabold tabular-nums">{day.label}</span>
                <span className={cn("text-[11.5px]", isSelected ? "text-white/75" : "text-muted-foreground")}>
                  {i === 0 ? "Өнөөдөр" : day.weekday}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
