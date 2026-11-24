import type { Metadata } from "next";
import { getPosProducts } from "@/lib/catalog/getPosProducts";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { PosTerminal } from "./_components/PosTerminal";
import { StoreTodaySales } from "./_components/StoreTodaySales";

export const metadata: Metadata = { title: "Касс" };

// Admin role is checked in app/admin/layout.tsx and again in recordStoreSale.
// One short title row (no description) so the bill and "Төлбөр авах" fit the screen without scrolling.
export default async function PhysicalStorePage() {
  const [today] = ubRecentDays(1);
  const [products, sales] = await Promise.all([getPosProducts(), getStoreDaySales(today)]);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">Касс</h1>
        <StoreTodaySales total={sales.total} count={sales.count} />
      </div>
      <PosTerminal products={products} />
    </>
  );
}
