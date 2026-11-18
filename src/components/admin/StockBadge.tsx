import { adminStockLevel, type StockLevel } from "@/lib/catalog/adminStockLevel";

const TONE: Record<StockLevel, string> = {
  out: "bg-clay-50 text-clay",
  low: "bg-amber-50 text-amber-700",
  ok: "bg-brand-50 text-brand",
};

/** Stock count as a colored pill: out (clay), below the min order qty (amber), fine (green). */
export function StockBadge({ stock, minQty }: { stock: number; minQty: number }) {
  const level = adminStockLevel(stock, minQty);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-bold ${TONE[level]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {level === "out" ? "Дууссан" : stock}
    </span>
  );
}
