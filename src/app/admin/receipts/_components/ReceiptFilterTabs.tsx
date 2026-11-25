import Link from "next/link";
import type { ReceiptEmailStatus } from "@prisma/client";
import { filterChipClass } from "@/components/admin/filterChipClass";

const TABS: { value: ReceiptEmailStatus | ""; label: string }[] = [
  { value: "", label: "Бүгд" },
  { value: "SENT", label: "И-мэйл илгээсэн" },
  { value: "SKIPPED", label: "Илгээгээгүй" },
  { value: "FAILED", label: "Илгээж чадсангүй" },
];

type Props = { status: ReceiptEmailStatus | undefined; count: number };

/** Email-status filter for the receipt list, kept in the URL (?status=). */
export function ReceiptFilterTabs({ status, count }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-line px-4 py-3 sm:flex-wrap sm:px-5">
      {TABS.map((tab) => (
        <Link
          key={tab.value}
          href={tab.value ? `/admin/receipts?status=${tab.value}` : "/admin/receipts"}
          className={filterChipClass((status ?? "") === tab.value)}
        >
          {tab.label}
        </Link>
      ))}
      <span className="ml-auto shrink-0 pl-2 text-[14px] text-muted-foreground">{count} баримт</span>
    </div>
  );
}
