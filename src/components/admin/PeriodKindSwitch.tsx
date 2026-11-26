import Link from "next/link";
import { periodHref } from "@/lib/date/periodHref";
import { cn } from "@/lib/utils";
import type { Period, PeriodKind } from "@/types/period";
import { PendingRing } from "./PendingRing";

const KINDS: { value: PeriodKind; label: string }[] = [
  { value: "day", label: "Өдөр" },
  { value: "week", label: "7 хоног" },
  { value: "month", label: "Сар" },
  { value: "year", label: "Жил" },
];

type Props = { path: string; period: Period; extra: Record<string, string> };

/** Өдөр / 7 хоног / Сар / Жил: a 4-part switch. A past day opens the week / month / year holding it. */
export function PeriodKindSwitch({ path, period, extra }: Props) {
  const dateKey = period.isCurrent ? null : period.key;
  return (
    <div role="tablist" aria-label="Хугацаа" className="grid grid-cols-4 rounded-xl bg-ink/5 p-1 sm:w-[26rem]">
      {KINDS.map((kind) => {
        const isSelected = period.kind === kind.value;
        return (
          <Link
            key={kind.value}
            role="tab"
            aria-selected={isSelected}
            href={periodHref(path, kind.value, dateKey, extra)}
            className={cn(
              "relative flex h-11 items-center justify-center rounded-lg text-[14px] font-bold whitespace-nowrap",
              isSelected ? "bg-white text-ink shadow-sm" : "text-ink-2 hover:text-ink",
            )}
          >
            {kind.label}
            <PendingRing />
          </Link>
        );
      })}
    </div>
  );
}
