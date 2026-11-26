"use client";

import { CalendarDays, Loader2 } from "lucide-react";
import type { PeriodKind } from "@/types/period";
import { usePeriodDatePicker } from "./usePeriodDatePicker";

type Props = {
  path: string;
  kind: PeriodKind;
  selectedKey: string;
  todayKey: string;
  label: string;
  extra: Record<string, string>;
};

/**
 * The middle of the period navigator: shows the period and, on tap, the phone's own date picker
 * (a native <input type="date"> laid over it). Any picked day opens the period that holds it.
 */
export function PeriodDateButton({ path, kind, selectedKey, todayKey, label, extra }: Props) {
  const { isPending, goToDate } = usePeriodDatePicker({ path, kind, todayKey, extra });
  return (
    <label className="relative flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 text-[15px] font-bold text-ink hover:border-ink">
      {isPending ? <Loader2 className="size-4 shrink-0 animate-spin" /> : <CalendarDays className="size-4 shrink-0" />}
      <span className="truncate">{label}</span>
      <input
        type="date"
        aria-label="Огноо сонгох"
        value={selectedKey}
        max={todayKey}
        onClick={(e) => e.currentTarget.showPicker?.()}
        onChange={(e) => goToDate(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}
