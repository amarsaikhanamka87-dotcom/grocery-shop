import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { QuickAdd } from "./AddToCartButton";
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

/** "хайрцаг (20 кг)" -> "хайрцаг" so the minimum badge stays on one line. */
function shortUnit(unit: string) {
  return unit.replace(/\s*\(.*\)\s*$/, "");
}

export function ProductCard({ product: p, priority = false }: { product: CardProduct; priority?: boolean }) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-white transition-shadow hover:shadow-card">
      <Link href={`/product/${p.slug}`} className="relative block aspect-square overflow-hidden bg-cream-2">
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-white">-{discount}%</span>
          )}
          {p.isOrganic && (
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand">
              <Leaf className="size-3" /> Органик
            </span>
          )}
        </div>
        {p.stock < p.minQty && (
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-ink/80 py-1.5 text-center text-xs font-bold text-white">
            Дууссан
          </span>
        )}
      </Link>
      <WishButton productId={p.id} className="absolute right-3 top-3" />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {p.origin && <p className="truncate text-[11.5px] font-medium text-muted sm:text-xs">{p.origin}</p>}
        <h3 className="mt-1 line-clamp-2 text-[14.5px] font-bold leading-snug sm:text-[15px]">
          <Link href={`/product/${p.slug}`} className="hover:text-brand">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1.5 w-fit max-w-full truncate rounded-md bg-cream-2 px-1.5 py-0.5 text-[11.5px] font-semibold text-ink-2 sm:text-[12px]">
          Багадаа {p.minQty} {shortUnit(p.unit)}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:pt-4">
          <div className="min-w-0 leading-tight">
            {p.oldPrice && (
              <p className="text-[12px] font-medium text-muted line-through tabular-nums">{formatPrice(p.oldPrice)}</p>
            )}
            <p className="whitespace-nowrap text-[16px] font-extrabold tabular-nums sm:text-[17px]">{formatPrice(p.price)}</p>
            <p className="truncate text-[12px] font-semibold text-muted">/ {p.unit}</p>
          </div>
          <QuickAdd
            item={{
              productId: p.id,
              slug: p.slug,
              name: p.name,
              image: p.image,
              unit: p.unit,
              price: p.price,
              stock: p.stock,
              minQty: p.minQty,
            }}
          />
        </div>
      </div>
    </article>
  );
}
