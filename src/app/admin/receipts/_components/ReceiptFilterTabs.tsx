import Link from "next/link";
import type { ReceiptEmailStatus } from "@prisma/client";
import { filterChipClass } from "@/components/admin/filterChipClass";
import { periodHref } from "@/lib/date/periodHref";
import type { ReceiptPeriodSummary } from "@/lib/receipts/getReceiptPeriodSummary";
import { cn } from "@/lib/utils";
import type { Period } from "@/types/period";

const TABS: { value: ReceiptEmailStatus | ""; label: string }[] = [
  { value: "", label: "Бүгд" },
  { value: "SENT", label: "И-мэйл илгээсэн" },
  { value: "SKIPPED", label: "Илгээгээгүй" },
  { value: "FAILED", label: "Илгээж чадаагүй" },
];

type Props = { status: ReceiptEmailStatus | undefined; period: Period; summary: ReceiptPeriodSummary };

/**
 * E-mail status tabs with their counts for the chosen period (kept in the URL with it). Phones: a
 * 2-column grid, nothing scrolls sideways. Failed e-mails show their count in clay.
 */
export function ReceiptFilterTabs({ status, period, summary }: Props) {
  const dateKey = period.isCurrent ? null : period.key;
  return (
    <nav aria-label="Баримтын и-мэйл" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {TABS.map((tab) => {
        const isSelected = (status ?? "") === tab.value;
        const count = tab.value ? summary.byStatus[tab.value] : summary.count;
        const isAlert = tab.value === "FAILED" && count > 0 && !isSelected;
        return (
          <Link
            key={tab.value}
            href={periodHref("/admin/receipts", period.kind, dateKey, { status: tab.value })}
            aria-current={isSelected ? "page" : undefined}
            className={cn(filterChipClass(isSelected), "justify-between gap-2")}
          >
            <span className="truncate">{tab.label}</span>
            <span
              className={cn(
                "min-w-6 rounded-full px-1.5 text-center text-[13px] tabular-nums",
                isAlert ? "bg-clay text-white" : isSelected ? "bg-white/20" : "bg-ink/5",
              )}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
