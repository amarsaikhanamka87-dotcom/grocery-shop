"use client";

import { CalendarDays, Loader2 } from "lucide-react";
import { useGoToDay } from "../_features/useGoToDay";

type Props = { selectedKey: string; todayKey: string; label: string };

/**
 * The middle of the day navigator: shows the chosen day and, on tap, the phone's own date picker
 * (a native <input type="date"> laid over the button), so any past day is two taps away.
 */
export function DayPickerButton({ selectedKey, todayKey, label }: Props) {
  const { pending, goToDay } = useGoToDay(todayKey);
  return (
    <label className="relative flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 text-[15px] font-bold text-ink hover:border-ink">
      {pending ? <Loader2 className="size-4 shrink-0 animate-spin" /> : <CalendarDays className="size-4 shrink-0" />}
      <span className="truncate">{label}</span>
      <input
        type="date"
        aria-label="Огноо сонгох"
        value={selectedKey}
        max={todayKey}
        onClick={(e) => e.currentTarget.showPicker?.()}
        onChange={(e) => goToDay(e.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}
