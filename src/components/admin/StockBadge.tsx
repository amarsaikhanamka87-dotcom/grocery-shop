import { adminStockLevel, type StockLevel } from "@/lib/catalog/adminStockLevel";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";

// Admin palette: clay = warning (out / low), green = fine.
const TONE: Record<StockLevel, string> = {
  out: "bg-clay text-white",
  low: "bg-clay-50 text-clay",
  ok: "bg-brand-50 text-brand",
};

type Props = { stock: number; minQty: number; unit: string };

/** Stock left with its unit as a colored pill, e.g. "Үлдэгдэл 100 шуудай"; "Дууссан" at 0. */
export function StockBadge({ stock, minQty, unit }: Props) {
  const level = adminStockLevel(stock, minQty);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold ${TONE[level]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {level === "out" ? "Дууссан" : `Үлдэгдэл ${stock} ${cartUnitLabel(unit)}`}
    </span>
  );
}
