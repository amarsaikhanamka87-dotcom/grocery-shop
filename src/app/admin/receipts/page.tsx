import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { listReceipts } from "@/lib/receipts/listReceipts";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { ReceiptFilterTabs } from "./_components/ReceiptFilterTabs";
import { ReceiptRow } from "./_components/ReceiptRow";
import { parseReceiptStatus } from "./_features/parseReceiptStatus";

export const metadata: Metadata = { title: "Баримт" };

type Params = Promise<{ status?: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminReceiptsPage({ searchParams }: { searchParams: Params }) {
  const status = parseReceiptStatus((await searchParams).status);
  const receipts = await listReceipts(status);
  return (
    <>
      <AdminPageHeader
        title="Баримт"
        description="Төлөгдсөн захиалга бүрийн зарлагын баримт (БМ-3): харах, хэвлэх, и-мэйлээр дахин илгээх."
      />
      <section className="card mt-6 overflow-hidden">
        <ReceiptFilterTabs status={status} count={receipts.length} />
        {receipts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
            <FileText className="size-8" />
            Баримт алга.
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {receipts.map((receipt) => (
              <ReceiptRow key={receipt.id} receipt={receipt} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
