import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { WishlistGrid } from "./WishlistGrid";

export const metadata: Metadata = { title: "Хадгалсан бараа" };

export default async function WishlistPage() {
  // The wishlist lives in the browser; send the (small) catalog and filter client-side.
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="container-x pt-8">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Хадгалсан бараа</h1>
      <WishlistGrid products={products} />
    </div>
  );
}
