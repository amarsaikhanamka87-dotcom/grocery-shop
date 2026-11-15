import type { Metadata } from "next";
import { getAllProducts } from "@/lib/catalog/getAllProducts";
import { WishlistGrid } from "./_components/WishlistGrid";

export const metadata: Metadata = { title: "Хадгалсан бараа" };

export default async function WishlistPage() {
  const products = await getAllProducts();
  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Хадгалсан бараа</h1>
      <WishlistGrid products={products} />
    </div>
  );
}
