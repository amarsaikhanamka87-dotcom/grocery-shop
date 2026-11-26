import type { ReceiptData } from "@/types/receipts";
import { escapeHtml } from "./escapeHtml";
import { receiptBarcodeHtml } from "./receiptBarcodeHtml";
import { receiptLinesHtml } from "./receiptLinesHtml";

const SMALL = "color:#666;font-size:11px;";
const FILLED = "display:inline-block;min-width:22px;border-bottom:1px solid #333;text-align:center;font-weight:bold;";
const BOX = "display:inline-block;width:18px;height:20px;line-height:20px;border:1px solid #333;margin-right:-1px;text-align:center;font-size:12px;";

/** "Регистрийн №" + 7 boxes, filled with the number when there is one. */
function regNoBoxes(regNo: string): string {
  const digits = regNo.padEnd(7, " ").slice(0, 7).split("");
  const boxes = digits.map((digit) => `<span style="${BOX}">${escapeHtml(digit.trim()) || "&nbsp;"}</span>`).join("");
  return `<span style="font-size:12px;">Регистрийн № </span>${boxes}`;
}

/** One party on the receipt: name on a line, its caption under it, then the register boxes. */
function party(name: string, caption: string, regNo: string): string {
  return `<div style="border-bottom:1px solid #333;font-weight:bold;font-size:14px;padding:2px 0;min-height:18px;">${escapeHtml(name)}</div>
<div style="${SMALL}text-align:center;">(${caption})</div>
<div style="margin-top:6px;">${regNoBoxes(regNo)}</div>`;
}

/**
 * The paid receipt as one HTML block laid out like НХМаягт БМ-3 "Зарлагын баримт". Inline styles
 * only, so the same HTML works in Gmail, in the admin "Баримт" view, on the print page and in the PDF.
 * `formRows` = the paper form's 20 numbered item lines (print + PDF; the email stays short).
 */
export function receiptHtml(receipt: ReceiptData, formRows = false): string {
  const { date, seller, buyer, delivery } = receipt;
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:720px;margin:0 auto;background:#fff;">
<table width="100%" style="font-size:11px;color:#444;"><tr>
  <td>НХМаягт БМ-3</td>
  <td style="text-align:right;">Сангийн сайдын 2017 оны 12 дугаар сарын<br>5-ны өдрийн 347 тоот тушаалын хавсралт</td>
</tr></table>
<h2 style="text-align:center;margin:16px 0 18px;font-size:20px;">ЗАРЛАГЫН БАРИМТ № ${receipt.number}</h2>
<table width="100%" style="margin-bottom:14px;"><tr>
  <td style="width:48%;vertical-align:top;">${party(seller.name, "байгууллагын нэр", seller.regNo)}</td>
  <td style="width:4%;"></td>
  <td style="width:48%;vertical-align:top;">${party(buyer.name, "худалдан авагчийн нэр", buyer.regNo)}</td>
</tr></table>
<table width="100%" style="font-size:13px;margin-bottom:12px;"><tr>
  <td style="vertical-align:bottom;white-space:nowrap;">20<span style="${FILLED}">${String(date.year).slice(2)}</span> оны <span style="${FILLED}">${date.month}</span> сарын <span style="${FILLED}">${date.day}</span> өдөр</td>
  <td style="width:55%;">
    <div style="border-bottom:1px solid #333;padding:2px 0;">${escapeHtml(delivery.method)} · ${escapeHtml(delivery.address)}</div>
    <div style="${SMALL}text-align:center;">(тээвэрлэгчийн хаяг, албан тушаал, нэр)</div>
  </td>
</tr></table>
${receiptLinesHtml(receipt, formRows)}
<p style="font-size:12.5px;margin:10px 0 0;color:#333;">
  Захиалга №${receipt.orderNumber} · Төлбөр төлөгдсөн${buyer.phone ? ` · Утас: ${escapeHtml(buyer.phone)}` : ""}
</p>
<table width="100%" style="font-size:13px;margin-top:22px;"><tr>
  <td style="width:90px;vertical-align:top;font-weight:bold;">Тэмдэг</td>
  <td style="line-height:2.1;">
    Хүлээлгэн өгсөн эд хариуцагч ........................................ /${escapeHtml(seller.name)}/<br>
    Хүлээн авагч ........................................ /${escapeHtml(buyer.name)}/<br>
    Шалгасан нягтлан бодогч ........................................
  </td>
  <td style="width:150px;vertical-align:bottom;text-align:center;">${receiptBarcodeHtml(receipt.number)}</td>
</tr></table>
${receipt.orderUrl ? `<p style="margin-top:18px;font-size:13px;"><a href="${escapeHtml(receipt.orderUrl)}">Захиалгаа сайтаас харах</a></p>` : ""}
<p style="${SMALL}margin-top:14px;">${escapeHtml(seller.name)} · ${escapeHtml(seller.phone)}</p>
</div>`;
}
