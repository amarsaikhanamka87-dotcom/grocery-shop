import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/roles/requireAdmin";
import { idSchema } from "@/lib/validation/idSchema";
import { getReceiptData } from "@/lib/receipts/getReceiptData";
import { receiptHtml } from "@/lib/receipts/receiptHtml";

type Context = { params: Promise<{ id: string }> };

/** The БМ-3 sheet alone on an A5-sized page, for printing or "Save as PDF". Admin only. */
export async function GET(_request: Request, { params }: Context) {
  await requireAdmin();
  const id = idSchema.safeParse((await params).id);
  if (!id.success) notFound();
  const receipt = await getReceiptData({ id: id.data });
  if (!receipt) notFound();

  const page = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Зарлагын баримт № ${receipt.number}</title>
<style>
  body { margin: 0; padding: 24px; background: #fff; }
  .print { font: bold 14px Arial, sans-serif; margin: 0 auto 16px; display: block; padding: 8px 16px; cursor: pointer; }
  @page { size: A5 portrait; margin: 10mm; }
  @media print { body { padding: 0; } .print { display: none; } }
</style></head><body>
<button class="print" onclick="window.print()">Хэвлэх</button>
${receiptHtml(receipt)}
</body></html>`;
  return new Response(page, { headers: { "content-type": "text/html; charset=utf-8" } });
}
