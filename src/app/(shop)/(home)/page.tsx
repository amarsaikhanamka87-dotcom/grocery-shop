import { getCategories } from "@/lib/catalog/getCategories";
import { getDeals } from "@/lib/catalog/getDeals";
import { getFeaturedProducts } from "@/lib/catalog/getFeaturedProducts";
import { HeroSection } from "./_components/HeroSection";
import { CategoryChips } from "./_components/CategoryChips";
import { FeaturedSection } from "./_components/FeaturedSection";
import { DealsSection } from "./_components/DealsSection";
import { HowItWorks } from "./_components/HowItWorks";
import { BusinessBand } from "./_components/BusinessBand";

/**
 * Landing page for wholesale buyers, in the order they need it: what we are (one line), where to
 * look (categories), prices (featured + deals), how ordering works, then the business sign-up.
 * 3 colors (white, ink, brand green), one font (Manrope) in 3 sizes (display, heading, body).
 */
export default async function HomePage() {
  const [categories, featured, deals] = await Promise.all([getCategories(), getFeaturedProducts(), getDeals()]);

  return (
    <>
      <HeroSection />
      <CategoryChips categories={categories} />
      <FeaturedSection products={featured} />
      <DealsSection products={deals} />
      <HowItWorks />
      <BusinessBand />
    </>
  );
}
