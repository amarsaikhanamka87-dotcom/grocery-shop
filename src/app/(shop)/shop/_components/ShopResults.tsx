import type { Product } from "@/types/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortSelect } from "@/components/product/SortSelect";
import { NoResults } from "./NoResults";

type Props = {
  products: Product[];
  sort: string;
  empty: { hint: string; action: { href: string; label: string } };
};

/** Count + sort over the grid; with 0 results only the empty state (it already says "олдсонгүй"). */
export function ShopResults({ products, sort, empty }: Props) {
  if (products.length === 0) {
    return (
      <section className="min-w-0 border-t border-line lg:border-t-0">
        <NoResults hint={empty.hint} action={empty.action} />
      </section>
    );
  }
  return (
    <section className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="text-[16px] text-muted-foreground">
          <span className="font-bold text-ink">{products.length}</span> бүтээгдэхүүн олдлоо
        </p>
        <SortSelect value={sort} />
      </div>
      <div className="mt-6">
        <ProductGrid products={products} columns={3} priorityCount={3} />
      </div>
    </section>
  );
}
