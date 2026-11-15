import type { Product } from "@/types/catalog";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export function DealsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="container-x mt-24">
      <SectionHeading
        eyebrow={
          <>
            <span className="size-1.5 rounded-full bg-clay" /> Хямдрал
          </>
        }
        title="Энэ долоо хоногийн санал"
        link={{ href: "/shop?deals=1", label: "Бүх хямдрал" }}
      />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
