import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Product } from "@/types/catalog";

/** Photo promo banner. Name, photo and organic badge come from the product in the database. */
export function PromoSideBanner({ product: p }: { product: Product }) {
  return (
    <div className="relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[28px] bg-clay-50 p-8 sm:p-10">
      <Image src={p.image} alt="" fill sizes="500px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
      <div className="relative text-white">
        {p.isOrganic && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay px-3 py-1 text-[13px] font-bold">
            <BadgeCheck className="size-4" /> Органик
          </span>
        )}
        <h3 className="mt-3 text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em]">{p.name}</h3>
        <Link
          href={`/product/${p.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-bold underline-offset-4 hover:underline"
        >
          Одоо авах <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
