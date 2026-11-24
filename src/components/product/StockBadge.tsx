import { PackageX, TriangleAlert } from "lucide-react";
import { stockLevel } from "@/lib/catalog/stockLevel";

type Props = { stock: number; minQty: number; unit: string };

/** "Үлдсэн 10 кг" (white) when stock is running low, "Дууссан" (grey) when it's gone; nothing otherwise. */
export function StockBadge({ stock, minQty, unit }: Props) {
  const level = stockLevel(stock, minQty);
  if (level === "ok") return null;
  if (level === "out") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-0.5 text-[16px] font-bold text-white">
        <PackageX className="size-3.5" /> Дууссан
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[16px] font-bold text-ink">
      <TriangleAlert className="size-3.5" /> Үлдсэн {stock} {unit.replace(/\s*\(.*\)\s*$/, "")}
    </span>
  );
}
