import type { Product } from "@/types/catalog";
import { ProductCard } from "./ProductCard";

type Props = { products: Product[]; columns?: 3 | 4; priorityCount?: number };

export function ProductGrid({ products, columns = 4, priorityCount = 0 }: Props) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 ${columns === 4 ? "lg:grid-cols-4" : ""}`}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
