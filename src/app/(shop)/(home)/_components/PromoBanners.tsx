import type { Product } from "@/types/catalog";
import { PromoMainBanner } from "./PromoMainBanner";
import { PromoSideBanner } from "./PromoSideBanner";

/** Two promoted products side by side. Hidden when the database has none. */
export function PromoBanners({ products }: { products: Product[] }) {
  const [main, side] = products;
  if (!main) return null;
  return (
    <section className="container-x mt-24 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      <PromoMainBanner product={main} />
      {side && <PromoSideBanner product={side} />}
    </section>
  );
}
