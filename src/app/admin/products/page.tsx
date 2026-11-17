import type { Metadata } from "next";
import { getAdminProducts } from "@/lib/catalog/getAdminProducts";
import { getCategories } from "@/lib/catalog/getCategories";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { ProductDialog } from "./_components/ProductDialog";
import { ProductFilters } from "./_components/ProductFilters";
import { ProductStats } from "./_components/ProductStats";
import { ProductTable } from "./_components/ProductTable";

export const metadata: Metadata = { title: "Бүтээгдэхүүн" };

type Params = Promise<{ q?: string; category?: string }>;

export default async function AdminProductsPage({ searchParams }: { searchParams: Params }) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([getAdminProducts({ q, category }), getCategories()]);
  const total = categories.reduce((sum, c) => sum + c.productCount, 0);
  const filtered = Boolean(q?.trim() || category);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <AdminPageHeader title="Бүтээгдэхүүн" description="Үнэ, үлдэгдэл, ангилал болон нүүрэнд онцлох бараагаа удирдана." />
        <ProductDialog categories={categories} />
      </div>
      <ProductStats products={products} total={total} filtered={filtered} />
      <section className="card mt-6 overflow-hidden">
        <ProductFilters categories={categories} />
        <ProductTable products={products} categories={categories} filtered={filtered} />
      </section>
    </>
  );
}
