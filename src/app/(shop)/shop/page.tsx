import type { Metadata } from "next";
import { findProducts } from "@/lib/catalog/findProducts";
import { getCategories } from "@/lib/catalog/getCategories";
import { getProductCount } from "@/lib/catalog/getProductCount";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import type { ShopParams } from "./_features/shopHref";
import { shopTitle } from "./_features/shopTitle";
import { ShopSidebar } from "./_components/ShopSidebar";
import { ShopResults } from "./_components/ShopResults";

export const metadata: Metadata = { title: "Дэлгүүр" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopParams> }) {
  const sp = await searchParams;
  const params: ShopParams = { ...sp, q: sp.q?.trim() || undefined };
  const [categories, products, total] = await Promise.all([
    getCategories(),
    findProducts({ ...params, deals: !!params.deals, organic: !!params.organic }),
    getProductCount(),
  ]);

  const current = categories.find((c) => c.slug === params.category);
  const title = shopTitle(params, current);

  return (
    <div className="container-x pt-8">
      <Breadcrumb
        items={[
          { label: "Нүүр", href: "/" },
          { label: "Дэлгүүр", href: "/shop" },
          ...(current ? [{ label: current.name }] : []),
        ]}
      />
      <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">{title}</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <ShopSidebar categories={categories} total={total} params={params} />
        <ShopResults products={products} sort={params.sort ?? "popular"} />
      </div>
    </div>
  );
}
