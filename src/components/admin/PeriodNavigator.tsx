import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { periodHref } from "@/lib/date/periodHref";
import type { Period } from "@/types/period";
import { PendingRing } from "./PendingRing";
import { PeriodDateButton } from "./PeriodDateButton";
import { PeriodKindSwitch } from "./PeriodKindSwitch";

type Props = { path: string; period: Period; todayKey: string; extra?: Record<string, string> };

const arrow =
  "relative grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink hover:border-ink";
const BACK_TO_NOW = { day: "Өнөөдөр рүү буцах", week: "Энэ 7 хоног руу буцах", month: "Энэ сар руу буцах", year: "Энэ жил рүү буцах" };
const STEP = { day: "өдөр", week: "7 хоног", month: "сар", year: "жил" };

/**
 * The admin report period picker (dashboard, Баримт): Өдөр / 7 хоног / Сар / Жил, then
 * ‹ previous · [period, tap = date picker] · next ›, and a way back to the current period.
 * On the current period there is no ›, only a same-size gap so the row doesn't jump.
 */
export function PeriodNavigator({ path, period, todayKey, extra = {} }: Props) {
  return (
    <nav aria-label="Хугацаа сонгох" className="mt-4 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2">
      <PeriodKindSwitch path={path} period={period} extra={extra} />
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2 sm:flex sm:items-center sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:w-[26rem]">
          <Link href={periodHref(path, period.kind, period.previousKey, extra)} aria-label={`Өмнөх ${STEP[period.kind]}`} className={arrow}>
            <ChevronLeft className="size-5" />
            <PendingRing />
          </Link>
          <PeriodDateButton
            path={path}
            kind={period.kind}
            selectedKey={period.key}
            todayKey={todayKey}
            label={period.label}
            extra={extra}
          />
          {period.nextKey ? (
            <Link href={periodHref(path, period.kind, period.nextKey, extra)} aria-label={`Дараагийн ${STEP[period.kind]}`} className={arrow}>
              <ChevronRight className="size-5" />
              <PendingRing />
            </Link>
          ) : (
            <span aria-hidden className="size-11 shrink-0" />
          )}
        </div>
        {!period.isCurrent && (
          <Link
            href={periodHref(path, period.kind, null, extra)}
            className="relative inline-flex h-11 w-fit items-center rounded-xl border border-line bg-white px-4 text-[14px] font-bold text-ink hover:border-ink"
          >
            {BACK_TO_NOW[period.kind]}
            <PendingRing />
          </Link>
        )}
        {period.isFallback && (
          <p className="text-[14px] font-semibold text-clay">Ийм өдөр олдсонгүй. Одоогийн хугацааг харуулж байна.</p>
        )}
      </div>
    </nav>
  );
}
