"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMnDate } from "../_features/formatMnDate";
import { useDateField } from "../_features/useDateField";
import { MonthCalendar } from "./MonthCalendar";

type Props = {
  label: React.ReactNode;
  value: string;
  min: string;
  defaultOpen?: boolean;
  onChange: (iso: string) => void;
};

/** A date box ("Огноо сонгох") with the month calendar right below it; picking a day closes it. */
export function DateField({ label, value, min, defaultOpen = false, onChange }: Props) {
  const f = useDateField(value, min, defaultOpen);
  return (
    <div>
      <p className="label">{label}</p>
      <button
        type="button"
        onClick={() => f.setOpen(!f.open)}
        aria-expanded={f.open}
        className={cn("input flex items-center gap-3 text-left", f.open && "border-brand")}
      >
        <CalendarDays className="size-5 shrink-0 text-muted-foreground" />
        <span className={cn("flex-1", !value && "text-muted-foreground")}>
          {value ? formatMnDate(value) : "Огноо сонгох"}
        </span>
        <ChevronDown className={cn("size-5 text-muted-foreground transition-transform", f.open && "rotate-180")} />
      </button>
      {f.open && (
        <MonthCalendar
          year={f.view.year}
          month={f.view.month}
          value={value}
          min={min}
          canGoBack={f.canGoBack}
          onPrev={f.prev}
          onNext={f.next}
          onPick={(iso) => {
            onChange(iso);
            f.setOpen(false);
          }}
        />
      )}
    </div>
  );
}
