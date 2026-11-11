"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QuickAdd } from "@/components/product/AddToCartButton";
import { WishButton } from "@/components/product/WishButton";
import { formatPrice } from "@/lib/format";
import type { CardProduct } from "@/components/product/ProductCard";

export function WishlistGrid({ products }: { products: CardProduct[] }) {
  const { wishlist, ready } = useCart();
  if (!ready) return <div className="min-h-[30vh]" />;
  const list = products.filter((p) => wishlist.includes(p.id));

  if (list.length === 0) {
    return (
      <div className="grid place-items-center py-20 text-center">
        <Heart className="size-10 text-muted" />
        <p className="mt-4 text-lg font-bold">Хадгалсан бараа алга</p>
        <p className="mt-1 text-muted">Бүтээгдэхүүн дээрх зүрхэн дээр дарж хадгална уу.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">Дэлгүүр хэсэх</Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {list.map((p) => (
        <article key={p.id} className="relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
          <Link href={`/product/${p.slug}`} className="relative block aspect-square bg-cream-2">
            <Image src={p.image} alt={p.name} fill sizes="280px" className="object-cover" />
          </Link>
          <WishButton productId={p.id} className="absolute right-3 top-3" />
          <div className="flex flex-1 items-end justify-between gap-2 p-4">
            <div className="min-w-0">
              <Link href={`/product/${p.slug}`} className="line-clamp-2 font-bold hover:text-brand">{p.name}</Link>
              <p className="text-[13px] text-muted">{p.unit}</p>
              <p className="mt-2 text-[17px] font-extrabold tabular-nums">{formatPrice(p.price)} <span className="text-[13px] font-semibold text-muted">/ {p.unit}</span></p>
            </div>
            <QuickAdd item={{ productId: p.id, slug: p.slug, name: p.name, image: p.image, unit: p.unit, price: p.price, stock: p.stock, minQty: p.minQty }} />
          </div>
        </article>
      ))}
    </div>
  );
}
