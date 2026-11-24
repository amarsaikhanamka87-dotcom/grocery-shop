import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/catalog";
import { formatPrice } from "@/lib/format/formatPrice";

/** Large green promo banner. Name, text, price and photo come from the product in the database. */
export function PromoMainBanner({ product: p }: { product: Product }) {
  return (
    <div className="relative flex min-h-[340px] overflow-hidden rounded-[28px] bg-brand text-white">
      <div className="relative z-10 flex max-w-[60%] flex-col justify-center p-8 sm:p-10">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-100">{p.unit}</p>
        <h3 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[36px]">{p.name}</h3>
        <p className="mt-3 line-clamp-3 text-[15px] text-white/75">{p.description}</p>
        <Link
          href={`/product/${p.slug}`}
          className="btn mt-7 h-12 w-fit bg-white px-6 text-[15px] text-brand hover:bg-ink/5"
        >
          {formatPrice(p.price)} — Захиалах <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="absolute inset-y-0 right-0 w-[48%]">
        <Image src={p.image} alt="" fill sizes="400px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/30 to-transparent" />
      </div>
    </div>
  );
}
