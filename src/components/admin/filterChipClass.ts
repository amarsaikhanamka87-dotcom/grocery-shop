import { cn } from "@/lib/utils";

/**
 * The one look of a "pick one" filter in the admin (orders, receipts, product categories):
 * 44px tall, ink when chosen, white with a line border otherwise.
 */
export function filterChipClass(isSelected: boolean): string {
  return cn(
    "inline-flex h-11 shrink-0 items-center gap-1 rounded-xl border px-3.5 text-[14px] font-bold whitespace-nowrap transition-colors",
    isSelected ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2 hover:border-ink hover:text-ink",
  );
}
