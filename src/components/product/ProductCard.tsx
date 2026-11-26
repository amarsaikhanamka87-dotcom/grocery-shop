import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { discountPercent } from "@/lib/catalog/discountPercent";
import { stockLevel } from "@/lib/catalog/stockLevel";
import { formatPrice } from "@/lib/format/formatPrice";
import { CartButton } from "./CartButton";
import { StockBadge } from "./StockBadge";
import { WishButton } from "./WishButton";

export type CardProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice: number | null;
  unit: string;
  image: string;
  stock: number;
  minQty: number;
  isOrganic: boolean;
  origin: string | null;
};

/** "хайрцаг (20 кг)" -> "хайрцаг" so the minimum line stays short. */
function shortUnit(unit: string) {
  return unit.replace(/\s*\(.*\)\s*$/, "");
}

/** White card: white photo (heart, cart quantity overlay), price, name, then "Сагслах" or − / +. */
export function ProductCard({
  product: p,
  priority = false,
}: {
  product: CardProduct;
  priority?: boolean;
}) {
  const discount = discountPercent(p.price, p.oldPrice);
  const item = {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    image: p.image,
    unit: p.unit,
    price: p.price,
    stock: p.stock,
    minQty: p.minQty,
  };
  return (
    <article className="relative flex flex-col rounded-[24px] border border-line bg-white p-2.5 sm:p-3">
      <Link
        href={`/product/${p.slug}`}
        className="group relative block aspect-square overflow-hidden rounded-[18px] bg-brand-50">
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2.5 left-2.5 flex max-w-[calc(100%-3.75rem)] flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-[16px] font-bold text-white">
              -{discount}%
            </span>
          )}
          {p.isOrganic && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[16px] font-bold text-brand">
              <Leaf className="hidden size-3.5 sm:block" /> Органик
            </span>
          )}
          <StockBadge stock={p.stock} minQty={p.minQty} unit={p.unit} />
        </div>
      </Link>
      <WishButton
        productId={p.id}
        className="absolute top-4 right-4 sm:top-5 sm:right-5"
      />

      <div className="flex flex-1 flex-col px-1.5 pt-3 sm:px-2">
        {/* Price always with its unit; on a narrow card "/ шуудай" may wrap, never gets cut. The
            button stays aligned across a row (mt-auto below). */}
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[16px] font-bold whitespace-nowrap text-brand tabular-nums">{formatPrice(p.price)}</span>
          <span className="text-[16px] whitespace-nowrap text-muted-foreground">/ {shortUnit(p.unit)}</span>
          {p.oldPrice && (
            <span className="text-[16px] whitespace-nowrap text-muted-foreground line-through tabular-nums">
              {formatPrice(p.oldPrice)}
            </span>
          )}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-snug">
          <Link
            href={`/product/${p.slug}`}
            className="relative hover:text-brand after:absolute after:inset-x-0 after:-inset-y-3 after:content-['']"
          >
            {p.name}
          </Link>
        </h3>
        {/* Wholesale buyers plan by what is left: "Бэлэн 120 шуудай" when stock is fine (low / out
            show as a badge on the photo instead), plus the minimum with its unit when it matters (> 1). */}
        {stockLevel(p.stock, p.minQty) === "ok" && (
          <p className="mt-1 text-[16px] text-muted-foreground">
            Бэлэн {p.stock} {shortUnit(p.unit)}
          </p>
        )}
        {p.minQty > 1 && (
          <p className="text-[16px] text-muted-foreground">
            Хамгийн багадаа {p.minQty} {shortUnit(p.unit)}
          </p>
        )}
        <div className="mt-auto pt-4">
          <CartButton item={item} />
        </div>
      </div>
    </article>
  );
}
