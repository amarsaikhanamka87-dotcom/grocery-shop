import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { idSchema } from "@/lib/validation/idSchema";
import { getReceiptData } from "@/lib/receipts/getReceiptData";
import { receiptHtml } from "@/lib/receipts/receiptHtml";
import { AdminPageHeader } from "../../_components/AdminPageHeader";
import { ReceiptToolbar } from "./_components/ReceiptToolbar";
import { ReceiptSheet } from "./_components/ReceiptSheet";
import { ReceiptSummary } from "./_components/ReceiptSummary";

export const metadata: Metadata = { title: "Баримт" };

type Params = Promise<{ id: string }>;

// Admin role is checked in app/admin/layout.tsx (requireAdmin).
export default async function AdminReceiptPage({ params }: { params: Params }) {
  const id = idSchema.safeParse((await params).id);
  if (!id.success) notFound();
  const [receipt, status] = await Promise.all([
    getReceiptData({ id: id.data }),
    prisma.receipt.findUnique({ where: { id: id.data }, select: { emailStatus: true, emailedAt: true } }),
  ]);
  if (!receipt || !status) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Зарлагын баримт № ${receipt.number}`}
        description={`Захиалга #${receipt.orderNumber} · ${receipt.buyer.name}`}
      />
      <ReceiptToolbar
        receiptId={receipt.receiptId}
        email={receipt.buyer.email}
        emailStatus={status.emailStatus}
        emailedAt={status.emailedAt}
      />
      <ReceiptSummary receipt={receipt} />
      <ReceiptSheet html={receiptHtml(receipt)} />
    </>
  );
}
