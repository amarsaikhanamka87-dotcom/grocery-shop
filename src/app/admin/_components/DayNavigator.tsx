import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DashboardDay } from "../_features/resolveDashboardDay";
import { dayHref } from "../_features/dayHref";
import { DayPendingHint } from "./DayPendingHint";
import { DayPickerButton } from "./DayPickerButton";

type Props = { dashboardDay: DashboardDay; todayKey: string; label: string };

const arrow =
  "relative grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink hover:border-ink";

/**
 * Standard day navigator: ‹ previous day · [chosen day, tap = date picker] · next day ›, and
 * "Өнөөдөр" to jump back when another day is open. On today there is no › (no later day), only a
 * same-size gap so the row doesn't jump.
 */
export function DayNavigator({ dashboardDay, todayKey, label }: Props) {
  const { day, isToday, isFallback, previousKey, nextKey } = dashboardDay;
  return (
    <nav aria-label="Өдөр сонгох" className="mt-6 grid gap-2 sm:flex sm:items-center sm:gap-3">
      <div className="flex items-center gap-2 sm:w-[26rem]">
        <Link href={dayHref(previousKey, todayKey)} aria-label="Өмнөх өдөр" className={arrow}>
          <ChevronLeft className="size-5" />
          <DayPendingHint />
        </Link>
        <DayPickerButton selectedKey={day.key} todayKey={todayKey} label={label} />
        {nextKey ? (
          <Link href={dayHref(nextKey, todayKey)} aria-label="Дараагийн өдөр" className={arrow}>
            <ChevronRight className="size-5" />
            <DayPendingHint />
          </Link>
        ) : (
          <span aria-hidden className="size-11 shrink-0" />
        )}
      </div>
      {!isToday && (
        <Link
          href="/admin"
          className="relative inline-flex h-11 w-fit items-center rounded-xl border border-line bg-white px-4 text-[14px] font-bold text-ink hover:border-ink"
        >
          Өнөөдөр рүү буцах
          <DayPendingHint />
        </Link>
      )}
      {isFallback && (
        <p className="text-[14px] font-semibold text-clay">Ийм өдөр олдсонгүй. Өнөөдрийг харуулж байна.</p>
      )}
    </nav>
  );
}
