import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PeriodNavigator } from "@/components/admin/PeriodNavigator";
import { formatPrice } from "@/lib/format/formatPrice";
import { resolvePeriod } from "@/lib/date/resolvePeriod";
import { ubRecentDays } from "@/lib/date/ubRecentDays";
import { getReceiptPeriodSummary } from "@/lib/receipts/getReceiptPeriodSummary";
import { listReceipts } from "@/lib/receipts/listReceipts";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { ReceiptFilterTabs } from "./_components/ReceiptFilterTabs";
import { ReceiptRow } from "./_components/ReceiptRow";
import { ReceiptTotals } from "./_components/ReceiptTotals";
import { groupReceiptsByDay } from "./_features/groupReceiptsByDay";
import { parseReceiptStatus } from "./_features/parseReceiptStatus";

export const metadata: Metadata = { title: "Баримт" };

type Params = Promise<{ status?: string; period?: string; date?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminReceiptsPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const status = parseReceiptStatus(params.status);
  const [today] = ubRecentDays(1);
  const period = resolvePeriod(params.period, params.date, today);
  const [receipts, summary] = await Promise.all([listReceipts(period, status), getReceiptPeriodSummary(period)]);
  const shownOf = status ? summary.byStatus[status] : summary.count;

  return (
    <>
      <AdminPageHeader title="Баримт" />
      <PeriodNavigator path="/admin/receipts" period={period} todayKey={today.key} extra={{ status: status ?? "" }} />
      <ReceiptTotals summary={summary} />
      <div className="mt-4">
        <ReceiptFilterTabs status={status} period={period} summary={summary} />
      </div>
      <section className="card mt-4 overflow-hidden">
        {receipts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
            <FileText className="size-8" />
            {period.title} баримт алга.
          </div>
        ) : (
          groupReceiptsByDay(receipts).map((group) => (
            <section key={group.key} aria-label={group.title}>
              <h2 className="flex justify-between gap-3 border-b border-line bg-cream px-4 py-2 text-[14px] font-extrabold sm:px-5">
                <span>
                  {group.title} <span className="font-semibold text-muted-foreground">· {group.receipts.length} баримт</span>
                </span>
                <span className="tabular-nums">{formatPrice(group.total)}</span>
              </h2>
              <ul className="divide-y divide-line">
                {group.receipts.map((receipt) => (
                  <ReceiptRow key={receipt.id} receipt={receipt} />
                ))}
              </ul>
            </section>
          ))
        )}
        {shownOf > receipts.length && (
          <p className="border-t border-line px-4 py-3 text-center text-[13.5px] text-muted-foreground">
            Сүүлийн {receipts.length} баримтыг харуулж байна ({shownOf}-с). Богино хугацаа сонгоно уу.
          </p>
        )}
      </section>
    </>
  );
}
