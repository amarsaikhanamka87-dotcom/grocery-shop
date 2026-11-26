import type { ReceiptData } from "@/types/receipts";
import { receiptHtml } from "./receiptHtml";

const PRINT_BUTTON = `<button class="print" onclick="window.print()">Хэвлэх</button>`;

/**
 * A complete A4 HTML page with the БМ-3 form (20 item lines) that fits one sheet. Used twice:
 * sent to n8n as `receipt.pdfHtml` (Gotenberg turns it into the email's PDF attachment) and served
 * by the admin print page (`printButton`). Noto Sans is loaded with the Cyrillic subset so Ө/Ү render
 * on a bare Linux PDF server; `!important` wins over the form's inline Arial and cell padding.
 * Gotenberg needs `preferCssPageSize=true` to use the @page size.
 */
export function receiptPdfDocument(receipt: ReceiptData, printButton = false): string {
  return `<!doctype html>
<html lang="mn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Зарлагын баримт № ${receipt.number}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&subset=cyrillic&display=block" rel="stylesheet">
<style>
  @page { size: A4 portrait; margin: 12mm; }
  html, body { margin: 0; background: #fff; }
  body * { font-family: "Noto Sans", Arial, sans-serif !important; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  table td, table th { padding-top: 3px !important; padding-bottom: 3px !important; }
  h2 { margin: 10px 0 14px !important; }
  tr { page-break-inside: avoid; }
  a { color: #111; text-decoration: none; }
  .print { font: bold 14px Arial, sans-serif; margin: 16px auto; display: block; padding: 10px 18px; cursor: pointer; }
  @media screen { body { padding: 0 16px 24px; } }
  @media print { .print { display: none; } body > div { zoom: 0.94; } }
</style></head>
<body>${printButton ? PRINT_BUTTON : ""}${receiptHtml(receipt, true)}</body></html>`;
}
