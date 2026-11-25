import type { Metadata } from "next";
import { getPosProducts } from "@/lib/catalog/getPosProducts";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { getStoreDaySales } from "@/lib/orders/getStoreDaySales";
import { PosTerminal } from "./_components/PosTerminal";
import { ScanBillNotice } from "./_components/ScanBillNotice";
import { StoreTodaySales } from "./_components/StoreTodaySales";
import { billFromParam } from "./_features/billFromParam";

export const metadata: Metadata = { title: "Касс" };

type Params = Promise<{ bill?: string; skipped?: string }>;

// Admin role is checked in app/admin/layout.tsx and again in recordStoreSale.
// One short title row (no description) so the bill and "Төлбөр авах" fit the screen without scrolling.
// "?bill=" pre-fills the bill from a handwritten order (/admin/handwriting).
export default async function PhysicalStorePage({ searchParams }: { searchParams: Params }) {
  const { bill, skipped } = await searchParams;
  const [today] = ubRecentDays(1);
  const [products, sales] = await Promise.all([getPosProducts(), getStoreDaySales(today)]);
  const initialLines = billFromParam(bill, products);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">Касс</h1>
        <StoreTodaySales total={sales.total} count={sales.count} />
      </div>
      {bill && <ScanBillNotice skipped={skipped?.slice(0, 500)} lineCount={initialLines.length} />}
      <PosTerminal key={bill ?? ""} products={products} initialLines={initialLines} />
    </>
  );
}
