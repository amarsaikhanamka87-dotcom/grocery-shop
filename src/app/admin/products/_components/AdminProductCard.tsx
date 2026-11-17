import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format/formatPrice";
import type { Category, ProductWithCategory } from "@/types/catalog";
import { ProductActions } from "./ProductActions";
import { StockBadge } from "./StockBadge";

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
          <p className="text-[13px] text-muted-foreground">{p.unit}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-ink">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-[13px] text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-line pt-3">
          <StockBadge stock={p.stock} minQty={p.minQty} />
          <span className="text-[12.5px] text-muted-foreground">Доод {p.minQty}</span>
          <div className="ml-auto">
            <ProductActions product={p} categories={categories} />
          </div>
        </div>
      </div>
    </li>
  );
}
