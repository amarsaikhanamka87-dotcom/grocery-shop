import Image from "next/image";
import Link from "next/link";
import { cartUnitLabel } from "@/lib/format/cartUnitLabel";
import { formatPrice } from "@/lib/format/formatPrice";
import type { Category, ProductWithCategory } from "@/types/catalog";
import { ProductActions } from "./ProductActions";
import { StockBadge } from "@/components/admin/StockBadge";

type Props = { product: ProductWithCategory; categories: Category[] };

const tag = "rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-brand shadow-sm";

/** Laptop view of one product: a card in the grid with photo, price, stock and edit/delete. */
export function AdminProductCard({ product: p, categories }: Props) {
  return (
    <li className="card group flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-card">
      <div className="relative aspect-[4/3] bg-cream">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 45vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {p.isFeatured && <span className={tag}>Онцлох</span>}
          {p.isOrganic && <span className={tag}>Органик</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold tracking-wider text-muted-foreground uppercase">{p.category.name}</p>
          <Link href={`/product/${p.slug}`} target="_blank" className="mt-0.5 block truncate font-bold text-ink hover:underline">
            {p.name}
          </Link>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-extrabold text-ink">{formatPrice(p.price)}</span>
          <span className="text-[14px] text-muted-foreground">/ {cartUnitLabel(p.unit)}</span>
          {p.oldPrice && <span className="text-[14px] text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}
        </div>

        {/* Stock (+ the minimum, only when it's more than 1) on one line, the actions on their own. */}
        <div className="mt-auto grid gap-3 border-t border-line pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <StockBadge stock={p.stock} minQty={p.minQty} unit={p.unit} />
            {p.minQty > 1 && (
              <span className="text-[13px] text-muted-foreground">
                Багадаа {p.minQty} {cartUnitLabel(p.unit)}
              </span>
            )}
          </div>
          <ProductActions product={p} categories={categories} />
        </div>
      </div>
    </li>
  );
}
