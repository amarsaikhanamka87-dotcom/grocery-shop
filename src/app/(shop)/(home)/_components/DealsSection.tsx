import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function DealsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="container-x mt-12 sm:mt-16">
      <SectionHeading title="Энэ долоо хоногийн хямдрал" link={{ href: "/shop?deals=1", label: "Бүх хямдрал" }} />
      <div className="mt-5 sm:mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
