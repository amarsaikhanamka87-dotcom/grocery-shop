import { Calculator, Globe, TrendingUp } from "lucide-react";
import type { ReceiptPeriodSummary } from "@/lib/receipts/getReceiptPeriodSummary";
import { MoneyCard } from "../../_components/MoneyCard";

/** The chosen period's receipts as money: the total, then online orders and Касс side by side. */
export function ReceiptTotals({ summary }: { summary: ReceiptPeriodSummary }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      <MoneyCard wide label="Нийт баримт" amount={summary.total} hint={`${summary.count} баримт`} icon={TrendingUp} tone="brand" />
      <MoneyCard
        label="Онлайн захиалга"
        amount={summary.total - summary.storeTotal}
        hint={`${summary.count - summary.storeCount} баримт`}
        icon={Globe}
        tone="ink"
      />
      <MoneyCard label="Касс" amount={summary.storeTotal} hint={`${summary.storeCount} баримт`} icon={Calculator} tone="ink" />
    </div>
  );
}
