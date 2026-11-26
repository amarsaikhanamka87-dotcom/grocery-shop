import type { Metadata } from "next";
import { getProductsBySlugs } from "@/lib/catalog/getProductsBySlugs";
import { FARMS } from "./_features/farms";
import { FarmsIntro } from "./_components/FarmsIntro";
import { FarmsGrid } from "./_components/FarmsGrid";

export const metadata: Metadata = { title: "Манай фермүүд" };

export default async function FarmsPage() {
  const products = await getProductsBySlugs(FARMS.flatMap((farm) => farm.productSlugs));
  return (
    <div className="container-x pt-8">
      <FarmsIntro farmCount={FARMS.length} />
      <FarmsGrid farms={FARMS} products={products} />
    </div>
  );
}
