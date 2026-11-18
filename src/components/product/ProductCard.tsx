import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { discountPercent } from "@/lib/catalog/discountPercent";
import { formatPrice } from "@/lib/format/formatPrice";
import { CartButton } from "./CartButton";
import { CartQtyOverlay } from "./CartQtyOverlay";
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

/** Grey card: white photo (heart, cart quantity overlay), price, name, then "Сагслах" or − / +. */
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
    <article className="relative flex flex-col rounded-[24px] bg-cream-2 p-2.5 sm:p-3">
      <Link
        href={`/product/${p.slug}`}
        className="group relative block aspect-square overflow-hidden rounded-[18px] bg-white">
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
          {p.isOrganic && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand">
              <Leaf className="size-3" /> Органик
            </span>
          )}
          <StockBadge stock={p.stock} minQty={p.minQty} unit={p.unit} />
        </div>
        <CartQtyOverlay item={item} />
      </Link>
      <WishButton
        productId={p.id}
        className="absolute top-5 right-5 sm:top-5.5 sm:right-5.5"
      />

      <div className="flex flex-1 flex-col px-1.5 pt-3 sm:px-2">
        <div className="flex items-baseline gap-2">
          <p className="text-[17px] font-extrabold whitespace-nowrap tabular-nums sm:text-lg">
            {formatPrice(p.price)}
          </p>
          {p.oldPrice && (
            <p className="text-[12.5px] font-medium text-muted-foreground line-through tabular-nums">
              {formatPrice(p.oldPrice)}
            </p>
          )}
        </div>
        <h3 className="mt-1 line-clamp-2 text-[15px] leading-snug sm:text-base">
          <Link href={`/product/${p.slug}`} className="hover:text-brand">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 truncate text-[13px] text-muted-foreground">
          {p.unit} · багадаа {p.minQty} {shortUnit(p.unit)}
        </p>
        <div className="mt-auto pt-4">
          <CartButton item={item} />
        </div>
      </div>
    </article>
  );
}
