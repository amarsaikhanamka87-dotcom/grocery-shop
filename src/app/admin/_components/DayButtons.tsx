import Link from "next/link";
import { cn } from "@/lib/utils";
import type { UbDay } from "@/lib/date/ubRecentDays";
import { DayPendingHint } from "./DayPendingHint";

type Props = { days: UbDay[]; selected: string };

/** Day buttons "11/23", "11/22", … (today first); the chosen day is kept in the URL (?day=). */
export function DayButtons({ days, selected }: Props) {
  return (
    <nav aria-label="Өдөр сонгох" className="relative mt-6">
      {/* Fade on the right edge: shows there are more (older) days to scroll to. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream" />
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pr-12 pb-1">
        {days.map((day, i) => {
          const isSelected = day.key === selected;
          return (
            <li key={day.key} className="shrink-0">
              <Link
                href={i === 0 ? "/admin" : `/admin?day=${day.key}`}
                aria-current={isSelected ? "date" : undefined}
                className={cn(
                  "relative flex w-[72px] flex-col items-center rounded-2xl px-2 py-2 transition-colors",
                  isSelected ? "bg-ink text-white" : "bg-cream-2 text-ink hover:bg-line",
                )}
              >
                <span className="text-[15px] font-extrabold tabular-nums">{day.label}</span>
                <span className={cn("text-[11.5px]", isSelected ? "text-white/75" : "text-muted-foreground")}>
                  {i === 0 ? "Өнөөдөр" : day.weekday}
                </span>
                <DayPendingHint />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
