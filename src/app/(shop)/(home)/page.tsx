import { getCategories } from "@/lib/catalog/getCategories";
import { getDeals } from "@/lib/catalog/getDeals";
import { getProductCount } from "@/lib/catalog/getProductCount";
import { getPromoProducts } from "@/lib/catalog/getPromoProducts";
import { getFeaturedProducts } from "@/lib/catalog/getFeaturedProducts";
import { HeroSection } from "./_components/HeroSection";
import { FeatureStrip } from "./_components/FeatureStrip";
import { CategoriesSection } from "./_components/CategoriesSection";
import { FeaturedSection } from "./_components/FeaturedSection";
import { PromoBanners } from "./_components/PromoBanners";
import { DealsSection } from "./_components/DealsSection";
import { FarmsStory } from "./_components/FarmsStory";
import { SegmentsSection } from "./_components/SegmentsSection";
import { CtaSection } from "./_components/CtaSection";

export default async function HomePage() {
  const [categories, featured, deals, promo, productCount] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getDeals(),
    getPromoProducts(),
    getProductCount(),
  ]);

  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <CategoriesSection categories={categories} />
      <FeaturedSection products={featured} />
      <PromoBanners products={promo} />
      <DealsSection products={deals} />
      <FarmsStory productCount={productCount} />
      <SegmentsSection />
      <CtaSection />
    </>
  );
}
