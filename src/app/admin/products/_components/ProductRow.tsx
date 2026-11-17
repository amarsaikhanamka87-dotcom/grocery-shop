import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format/formatPrice";
import type { Category, ProductWithCategory } from "@/types/catalog";
import { ProductActions } from "./ProductActions";
import { StockBadge } from "./StockBadge";

type Props = { product: ProductWithCategory; categories: Category[] };

const tag = "rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand";

/** Phone view of one product: photo + name + price, then stock, min order and edit/delete. */
export function ProductRow({ product: p, categories }: Props) {
  return (
    <li className="space-y-2.5 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream">
          <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/product/${p.slug}`} target="_blank" className="block truncate font-bold text-ink hover:underline">
            {p.name}
          </Link>
          <p className="truncate text-[13px] text-muted-foreground">
            {p.category.name} · {p.unit}
          </p>
          {(p.isFeatured || p.isOrganic) && (
            <div className="mt-1 flex gap-1">
              {p.isFeatured && <span className={tag}>Онцлох</span>}
              {p.isOrganic && <span className={tag}>Органик</span>}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-extrabold text-ink">{formatPrice(p.price)}</p>
          {p.oldPrice && <p className="text-[12px] text-muted-foreground line-through">{formatPrice(p.oldPrice)}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <StockBadge stock={p.stock} minQty={p.minQty} />
        <p className="text-[13px] text-muted-foreground">Доод тоо {p.minQty}</p>
        <div className="ml-auto">
          <ProductActions product={p} categories={categories} />
        </div>
      </div>
    </li>
  );
}
