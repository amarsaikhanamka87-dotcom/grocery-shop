import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

/** "Онцлох ногоо": the featured products (topped up with other ones in stock), then the full list. */
export function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="container-x mt-6 sm:mt-10">
      <SectionHeading title="Онцлох ногоо" link={{ href: "/shop", label: "Бүх ногоо" }} />
      <div className="mt-5 sm:mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
