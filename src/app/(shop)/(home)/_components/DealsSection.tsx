import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function DealsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="container-x mt-16 sm:mt-24">
      <SectionHeading title="Энэ долоо хоногийн хямдрал" link={{ href: "/shop?deals=1", label: "Бүх хямдрал" }} />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
