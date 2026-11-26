import Link from "next/link";
import { filterChipClass } from "@/components/admin/filterChipClass";
import { cn } from "@/lib/utils";
import type { OrderView } from "@/types/orders";
import { ORDER_VIEWS } from "../_features/orderViews";
import { ordersHref } from "../_features/ordersHref";

type Props = { view: OrderView; type: string; counts: Record<OrderView, number> };

/**
 * The status tabs with their counts. Phones: a 2-column grid (nothing scrolls sideways or gets cut
 * off), "Цуцалсан" alone on the last row. A waiting bank transfer shows its count in clay.
 */
export function OrderViewTabs({ view, type, counts }: Props) {
  return (
    <nav aria-label="Захиалгын төлөв" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {ORDER_VIEWS.map((tab) => {
        const isSelected = view === tab.value;
        const isAlert = tab.value === "check" && counts.check > 0 && !isSelected;
        return (
          <Link
            key={tab.value}
            href={ordersHref(tab.value, type)}
            aria-current={isSelected ? "page" : undefined}
            className={cn(filterChipClass(isSelected), "justify-between gap-2 last:col-span-2")}
          >
            {tab.label}
            <span
              className={cn(
                "min-w-6 rounded-full px-1.5 text-center text-[13px] tabular-nums",
                isAlert ? "bg-clay text-white" : isSelected ? "bg-white/20" : "bg-ink/5",
              )}
            >
              {counts[tab.value]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
