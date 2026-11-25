import { getDeals } from "@/lib/catalog/getDeals";
import { getProductCount } from "@/lib/catalog/getProductCount";
import { getFeaturedProducts } from "@/lib/catalog/getFeaturedProducts";
import { HeroSection } from "./_components/HeroSection";
import { StatsStrip } from "./_components/StatsStrip";
import { FeaturedSection } from "./_components/FeaturedSection";
import { DealsSection } from "./_components/DealsSection";
import { FarmsStory } from "./_components/FarmsStory";

// Landing page: 3 colors (white, ink, brand green), one font (Manrope) in 3 sizes (display, heading, body).
export default async function HomePage() {
  const [featured, deals, productCount] = await Promise.all([
    getFeaturedProducts(),
    getDeals(),
    getProductCount(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedSection products={featured} />
      <StatsStrip productCount={productCount} />
      <DealsSection products={deals} />
      <FarmsStory />
    </>
  );
}
