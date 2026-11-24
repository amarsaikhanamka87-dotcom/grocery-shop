import Image from "next/image";
import Link from "next/link";
import type { CategoryWithCount } from "@/types/catalog";

export function CategoryTile({ category: c }: { category: CategoryWithCount }) {
  return (
    <Link
      href={`/shop?category=${c.slug}`}
      className="group flex flex-col items-center gap-2.5 rounded-[20px] border border-line bg-white p-3 text-center transition-shadow hover:shadow-card sm:flex-row sm:gap-3.5 sm:text-left"
    >
      <span className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-ink/5 sm:size-[72px] sm:w-auto">
        <Image
          src={c.image}
          alt=""
          fill
          sizes="(min-width: 640px) 72px, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="min-w-0 pb-1 sm:pb-0">
        <span className="block text-[15px] font-bold leading-snug group-hover:text-brand sm:truncate">
          {c.name}
        </span>
        <span className="text-[13px] text-muted-foreground">{c.productCount} бүтээгдэхүүн</span>
      </span>
    </Link>
  );
}
