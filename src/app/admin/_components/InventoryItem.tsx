import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { adminStockLevel, type StockLevel } from "@/lib/catalog/adminStockLevel";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import type { InventoryRow } from "@/lib/catalog/getInventory";

const LOOK: Record<StockLevel, { label: string; pill: string; tint: string }> = {
  out: { label: "Дууссан", pill: "bg-clay text-white", tint: "bg-ink/70" },
  low: { label: "Бага үлдсэн", pill: "bg-amber-400 text-ink", tint: "bg-ink/50" },
  ok: { label: "Хангалттай", pill: "bg-white/95 text-brand", tint: "bg-ink/35" },
};

/**
 * One product in "Агуулахын үлдэгдэл", styled like a shop product card: the stock is shown big
 * over the dimmed photo, the status pill on top, name + category below. Opens it in /admin/products.
 */
export function InventoryItem({ product: p }: { product: InventoryRow }) {
  const look = LOOK[adminStockLevel(p.stock, p.minQty)];
  return (
    <li>
      <Link
        href={`/admin/products?q=${encodeURIComponent(p.name)}`}
        className="group flex h-full flex-col rounded-[22px] bg-cream-2 p-2.5 transition-shadow hover:shadow-card"
      >
        <span className="relative block aspect-square overflow-hidden rounded-[16px] bg-white">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1536px) 220px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className={cn("absolute inset-0 grid place-items-center", look.tint)}>
            <span className="flex max-w-full items-baseline gap-1 px-2 text-white drop-shadow">
              <span className="text-4xl font-extrabold tabular-nums sm:text-5xl xl:text-6xl">{p.stock}</span>
              <span className="text-sm font-bold sm:text-lg xl:text-xl">{cartUnitLabel(p.unit)}</span>
            </span>
          </span>
          <span className={cn("absolute top-2 left-2 rounded-full px-2.5 py-1 text-[11.5px] font-bold", look.pill)}>
            {look.label}
          </span>
        </span>
        <span className="block px-1.5 pt-2.5 pb-1">
          <span className="block truncate text-[15px] font-bold text-ink">{p.name}</span>
          <span className="block truncate text-[12.5px] text-muted-foreground">
            {p.category.name} · багадаа {p.minQty}
          </span>
        </span>
      </Link>
    </li>
  );
}
