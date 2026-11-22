import { getCategories } from "@/lib/catalog/getCategories";
import { getDeals } from "@/lib/catalog/getDeals";
import { getProductCount } from "@/lib/catalog/getProductCount";
import { getFeaturedProducts } from "@/lib/catalog/getFeaturedProducts";
import { HeroSection } from "./_components/HeroSection";
import { CategoriesSection } from "./_components/CategoriesSection";
import { FeaturedSection } from "./_components/FeaturedSection";
import { DealsSection } from "./_components/DealsSection";
import { FarmsStory } from "./_components/FarmsStory";
import { CtaSection } from "./_components/CtaSection";

export default async function HomePage() {
  const [categories, featured, deals, productCount] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getDeals(),
    getProductCount(),
  ]);

  return (
    <>
      <HeroSection />
      {/* <FeatureStrip /> */}

      <FeaturedSection products={featured} />

      <DealsSection products={deals} />
      <CategoriesSection categories={categories} />
      <FarmsStory productCount={productCount} />
      {/* <SegmentsSection /> */}
      <CtaSection />
    </>
  );
}
