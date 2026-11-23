import Link from "next/link";
import type { ReceiptEmailStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const TABS: { value: ReceiptEmailStatus | ""; label: string }[] = [
  { value: "", label: "Бүгд" },
  { value: "SENT", label: "Илгээсэн" },
  { value: "SKIPPED", label: "Илгээгээгүй" },
  { value: "FAILED", label: "Алдаатай" },
];

type Props = { status: ReceiptEmailStatus | undefined; count: number };

/** Email-status filter for the receipt list, kept in the URL (?status=). */
export function ReceiptFilterTabs({ status, count }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
      {TABS.map((tab) => (
        <Link
          key={tab.value}
          href={tab.value ? `/admin/receipts?status=${tab.value}` : "/admin/receipts"}
          className={cn(
            "h-9 rounded-xl px-3.5 text-[13.5px] font-bold leading-9",
            (status ?? "") === tab.value ? "bg-ink text-white" : "bg-cream-2 text-muted-foreground hover:text-ink",
          )}
        >
          {tab.label}
        </Link>
      ))}
      <span className="ml-auto text-[13px] text-muted-foreground">{count} баримт</span>
    </div>
  );
}
