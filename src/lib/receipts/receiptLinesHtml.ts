import { formatPrice } from "@/lib/format/formatPrice";
import type { ReceiptData } from "@/types/receipts";
import { escapeHtml } from "./escapeHtml";

const CELL = "border:1px solid #333;padding:6px 8px;font-size:13px;";
const HEAD = CELL + "background:#f3f3f3;font-weight:bold;text-align:center;";
const NUM = CELL + "text-align:right;white-space:nowrap;";
/** The printed БМ-3 form has 20 numbered lines; more items simply add rows. */
const FORM_ROWS = 20;

/**
 * The БМ-3 item table: №, name, code, unit, then "Худалдах" (quantity, unit price, total) + "Дүн".
 * `formRows` (PDF / print) pads it with empty numbered lines up to 20, like the paper form.
 */
export function receiptLinesHtml(receipt: ReceiptData, formRows = false): string {
  const rows = receipt.lines
    .map(
      (line) => `<tr>
  <td style="${CELL}text-align:center;">${line.no}</td>
  <td style="${CELL}">${escapeHtml(line.name)}</td>
  <td style="${CELL}">${escapeHtml(line.code)}</td>
  <td style="${CELL}text-align:center;">${escapeHtml(line.unit)}</td>
  <td style="${NUM}">${line.quantity}</td>
  <td style="${NUM}">${formatPrice(line.price)}</td>
  <td style="${NUM}">${formatPrice(line.total)}</td>
</tr>`,
    )
    .join("");
  const blankCount = formRows ? Math.max(0, FORM_ROWS - receipt.lines.length) : 0;
  const blanks = Array.from({ length: blankCount }, (_, index) => {
    const no = receipt.lines.length + index + 1;
    return `<tr><td style="${CELL}text-align:center;color:#888;">${no}</td>${`<td style="${CELL}">&nbsp;</td>`.repeat(6)}</tr>`;
  }).join("");
  const sumRow = (label: string, value: number, bold: boolean) =>
    `<tr><td colspan="6" style="${CELL}text-align:right;${bold ? "font-weight:bold;" : ""}">${label}</td>` +
    `<td style="${NUM}${bold ? "font-weight:bold;" : ""}">${formatPrice(value)}</td></tr>`;

  return `<table width="100%" cellspacing="0" style="border-collapse:collapse;">
<tr>
  <th rowspan="2" style="${HEAD}">№</th>
  <th rowspan="2" style="${HEAD}">Материалын үнэт зүйлийн нэр, зэрэг, дугаар</th>
  <th rowspan="2" style="${HEAD}">Код</th>
  <th rowspan="2" style="${HEAD}">Хэмжих нэгж</th>
  <th colspan="3" style="${HEAD}">Худалдах</th>
</tr>
<tr><th style="${HEAD}">Тоо</th><th style="${HEAD}">Нэгжийн үнэ</th><th style="${HEAD}">Нийт дүн</th></tr>
${rows}
${blanks}
${receipt.deliveryFee > 0 ? sumRow("Хүргэлтийн төлбөр", receipt.deliveryFee, false) : ""}
${sumRow("Дүн", receipt.total, true)}
</table>`;
}
