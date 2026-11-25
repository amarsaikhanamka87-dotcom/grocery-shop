import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="container-x mt-12 sm:mt-24">
      <SectionHeading title="Хамгийн их захиалагддаг ногоо" link={{ href: "/shop", label: "Бүгдийг үзэх" }} />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
