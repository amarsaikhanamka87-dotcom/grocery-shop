import type { Product } from "@/types/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-24">
      <h2 className="h-section">Төстэй бүтээгдэхүүн</h2>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
