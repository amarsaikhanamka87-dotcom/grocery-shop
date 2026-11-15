import type { Product } from "@/types/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortSelect } from "@/components/product/SortSelect";
import { NoResults } from "./NoResults";

export function ShopResults({ products, sort }: { products: Product[]; sort: string }) {
  return (
    <section className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="text-[14.5px] text-muted-foreground">
          <span className="font-bold text-ink">{products.length}</span> бүтээгдэхүүн олдлоо
        </p>
        <SortSelect value={sort} />
      </div>
      {products.length === 0 ? (
        <NoResults />
      ) : (
        <div className="mt-6">
          <ProductGrid products={products} columns={3} priorityCount={3} />
        </div>
      )}
    </section>
  );
}
