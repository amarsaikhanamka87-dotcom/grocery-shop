import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Бүтээгдэхүүн" };

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const products = await prisma.product.findMany({
    where: q ? { name: { contains: q, mode: "insensitive" } } : {},
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[28px] font-extrabold tracking-tight">Бүтээгдэхүүн</h1>
        <Link href="/admin/products/new" className="btn btn-primary h-11 px-5">
          <Plus className="size-4" /> Шинэ бүтээгдэхүүн
        </Link>
      </div>
      <form className="relative mt-5 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input name="q" defaultValue={q} placeholder="Нэрээр хайх" className="input pl-10" />
      </form>

      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead className="border-b border-line text-[12.5px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Бүтээгдэхүүн</th>
              <th className="px-5 py-3 font-semibold">Ангилал</th>
              <th className="px-5 py-3 text-right font-semibold">Үнэ</th>
              <th className="px-5 py-3 text-right font-semibold">Нөөц</th>
              <th className="px-5 py-3 font-semibold">Шошго</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-cream">
                <td className="px-5 py-3">
                  <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3">
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-cream-2">
                      <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-bold hover:text-brand">{p.name}</span>
                      <span className="text-[12.5px] text-muted">{p.unit} · min {p.minQty}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-5 py-3 text-ink-2">{p.category.name}</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">
                  {formatPrice(p.price)}<span className="text-[12px] font-medium text-muted">/{p.unit}</span>
                  {p.oldPrice && <span className="block text-[12px] font-medium text-muted line-through">{formatPrice(p.oldPrice)}</span>}
                </td>
                <td className={`px-5 py-3 text-right font-bold tabular-nums ${p.stock < p.minQty ? "text-clay" : p.stock < p.minQty * 5 ? "text-amber-700" : ""}`}>{p.stock}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1.5">
                    {p.isFeatured && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[12px] font-bold text-brand">Онцлох</span>}
                    {p.isOrganic && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[12px] font-bold text-emerald-700">Органик</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
