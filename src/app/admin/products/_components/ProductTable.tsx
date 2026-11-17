import { PackageSearch } from "lucide-react";
import type { Category, ProductWithCategory } from "@/types/catalog";
import { AdminProductCard } from "./AdminProductCard";
import { ProductRow } from "./ProductRow";

type Props = { products: ProductWithCategory[]; categories: Category[]; filtered?: boolean };

/** Phones: a compact list of rows. Tablet / laptop (md+): a grid of cards in columns. */
export function ProductTable({ products, categories, filtered }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
        <PackageSearch className="size-8" />
        {filtered ? "Хайлтад тохирох бүтээгдэхүүн олдсонгүй." : "Одоогоор бүтээгдэхүүн алга."}
      </div>
    );
  }
  return (
    <>
      <ul className="divide-y divide-line md:hidden">
        {products.map((p) => (
          <ProductRow key={p.id} product={p} categories={categories} />
        ))}
      </ul>
      <ul className="hidden gap-4 bg-cream/50 p-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((p) => (
          <AdminProductCard key={p.id} product={p} categories={categories} />
        ))}
      </ul>
    </>
  );
}
