import { Calculator } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";

/** Today's in-store takings, one line next to the POS title. */
export function StoreTodaySales({ total, count }: { total: number; count: number }) {
  return (
    <p className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[15px]">
      <Calculator className="size-4 text-brand" />
      <span className="text-muted-foreground">Өнөөдөр · {count} борлуулалт</span>
      <span className="font-extrabold tabular-nums text-ink">{formatPrice(total)}</span>
    </p>
  );
}
