import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";
import { getReceiptData } from "@/lib/receipts/getReceiptData";
import { receiptPdfDocument } from "@/lib/receipts/receiptPdfDocument";

type Context = { params: Promise<{ id: string }> };

/** The БМ-3 sheet on one A4 page (the same document n8n turns into the PDF), for printing. Admin only. */
export async function GET(_request: Request, { params }: Context) {
  await requireAdmin();
  const id = idSchema.safeParse((await params).id);
  if (!id.success) notFound();
  const receipt = await getReceiptData({ id: id.data });
  if (!receipt) notFound();
  return new Response(receiptPdfDocument(receipt, true), { headers: { "content-type": "text/html; charset=utf-8" } });
}
