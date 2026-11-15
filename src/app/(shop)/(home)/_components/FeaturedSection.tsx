import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="container-x mt-24">
      <SectionHeading
        eyebrow="Үнийн жагсаалт"
        title="Хамгийн их захиалагддаг ногоо"
        link={{ href: "/shop", label: "Дэлгүүр рүү" }}
      />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
