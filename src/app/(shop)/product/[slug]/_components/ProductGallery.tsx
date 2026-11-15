import Image from "next/image";
import { Leaf } from "lucide-react";
import { discountPercent } from "@/lib/catalog/discountPercent";
import type { Product } from "@/types/catalog";
import { WishButton } from "@/components/product/WishButton";

export function ProductGallery({ product: p }: { product: Product }) {
  const discount = discountPercent(p.price, p.oldPrice);
  return (
    <div className="relative aspect-square overflow-hidden rounded-[28px] bg-cream-2">
      <Image
        src={p.image.replace("w=800", "w=1200")}
        alt={p.name}
        fill
        priority
        sizes="(min-width:1024px) 540px, 100vw"
        className="object-cover"
      />
      <div className="absolute left-5 top-5 flex flex-col items-start gap-2">
        {discount > 0 && (
          <span className="rounded-full bg-clay px-3 py-1.5 text-sm font-bold text-white">-{discount}%</span>
        )}
        {p.isOrganic && (
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-brand">
            <Leaf className="size-4" /> Органик
          </span>
        )}
      </div>
      <WishButton productId={p.id} className="absolute right-5 top-5 size-11" />
    </div>
  );
}
