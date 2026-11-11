import Link from "next/link";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { SearchX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/product/SortSelect";

export const metadata: Metadata = { title: "Дэлгүүр" };

type SP = Promise<{ category?: string; q?: string; sort?: string; deals?: string; organic?: string }>;

const SORTS: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  popular: { isFeatured: "desc" },
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
  new: { createdAt: "desc" },
};

function href(base: Record<string, string | undefined>, patch: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...base, ...patch })) if (v) params.set(k, v);
  const s = params.toString();
  return s ? `/shop?${s}` : "/shop";
}

export default async function ShopPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = sp.q?.trim();
  const where: Prisma.ProductWhereInput = {
    ...(sp.category ? { category: { slug: sp.category } } : {}),
    ...(sp.deals ? { oldPrice: { not: null } } : {}),
    ...(sp.organic ? { isOrganic: true } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { origin: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [categories, products, total] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ where, orderBy: [SORTS[sp.sort ?? "popular"] ?? SORTS.popular, { name: "asc" }] }),
    prisma.product.count(),
  ]);

  const current = categories.find((c) => c.slug === sp.category);
  const title = q ? `“${q}” хайлтын үр дүн` : sp.deals ? "Хямдралтай бүтээгдэхүүн" : current?.name ?? "Бүх бүтээгдэхүүн";
  const base = { category: sp.category, q, sort: sp.sort, deals: sp.deals, organic: sp.organic };

  return (
    <div className="container-x pt-8">
      <nav className="text-[13px] font-medium text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Нүүр</Link> <span className="mx-1.5">/</span>
        <Link href="/shop" className="hover:text-brand">Дэлгүүр</Link>
        {current && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{current.name}</span>
          </>
        )}
      </nav>
      <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">{title}</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-[200px] lg:self-start">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted max-lg:sr-only">Ангилал</h2>
          <ul className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:grid lg:gap-1 lg:px-0">
            <li>
              <Link
                href={href(base, { category: undefined })}
                className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] font-semibold lg:rounded-xl lg:px-3.5 lg:py-2.5 ${
                  !sp.category ? "bg-brand text-white" : "bg-white text-ink-2 hover:bg-brand-50 lg:bg-transparent"
                }`}
              >
                Бүгд <span className="text-xs opacity-70 max-lg:hidden">{total}</span>
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={href(base, { category: c.slug })}
                  className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] font-semibold lg:rounded-xl lg:px-3.5 lg:py-2.5 ${
                    sp.category === c.slug ? "bg-brand text-white" : "bg-white text-ink-2 hover:bg-brand-50 lg:bg-transparent"
                  }`}
                >
                  {c.name} <span className="text-xs opacity-70 max-lg:hidden">{c._count.products}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden gap-2 lg:grid">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Шүүлтүүр</h2>
            <Link
              href={href(base, { organic: sp.organic ? undefined : "1" })}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-[14.5px] font-semibold text-ink-2 hover:bg-brand-50"
            >
              <span className={`grid size-5 place-items-center rounded-md border ${sp.organic ? "border-brand bg-brand text-white" : "border-line bg-white"}`}>
                {sp.organic && "✓"}
              </span>
              Зөвхөн органик
            </Link>
            <Link
              href={href(base, { deals: sp.deals ? undefined : "1" })}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-[14.5px] font-semibold text-ink-2 hover:bg-brand-50"
            >
              <span className={`grid size-5 place-items-center rounded-md border ${sp.deals ? "border-brand bg-brand text-white" : "border-line bg-white"}`}>
                {sp.deals && "✓"}
              </span>
              Хямдралтай
            </Link>
          </div>
        </aside>

        {/* Results */}
        <section className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-[14.5px] text-muted">
              <span className="font-bold text-ink">{products.length}</span> бүтээгдэхүүн олдлоо
            </p>
            <SortSelect value={sp.sort ?? "popular"} />
          </div>
          {products.length === 0 ? (
            <div className="grid place-items-center py-24 text-center">
              <SearchX className="size-10 text-muted" />
              <p className="mt-4 text-lg font-bold">Бүтээгдэхүүн олдсонгүй</p>
              <p className="mt-1 text-muted">Өөр түлхүүр үгээр хайж үзнэ үү.</p>
              <Link href="/shop" className="btn btn-primary mt-6 h-11 px-6">Бүх бүтээгдэхүүн</Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
