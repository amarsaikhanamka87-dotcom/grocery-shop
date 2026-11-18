import Image from "next/image";
import { StockBadge } from "@/components/admin/StockBadge";
import type { InventoryRow } from "@/lib/catalog/getInventory";

/** One product in "Агуулахын үлдэгдэл": photo, name, category, stock count and status. */
export function InventoryItem({ product: p }: { product: InventoryRow }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
      <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-cream">
        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{p.name}</span>
        <span className="block truncate text-[13px] text-muted-foreground">{p.category.name}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[15px] font-extrabold tabular-nums">
          {p.stock} <span className="text-[12.5px] font-medium text-muted-foreground">× {p.unit}</span>
        </span>
        <StockBadge stock={p.stock} minQty={p.minQty} />
      </span>
    </li>
  );
}
