import type { ReceiptData } from "@/types/receipts";
import { receiptHtml } from "./receiptHtml";
import { receiptPdfDocument } from "./receiptPdfDocument";

/**
 * The `order.paid` event n8n receives. `body.order.*` keeps the fields the Gmail workflow already
 * maps (email, number, items, total, …); `body.receipt.*` adds the ready БМ-3 email (subject + html)
 * and `pdfHtml` + `pdfFileName`: the A4 form n8n converts to the PDF attachment (Gotenberg).
 * The total is final here (re-priced from the DB at checkout): n8n must not recalculate it.
 */
export function receiptEvent(receipt: ReceiptData) {
  return {
    event: "order.paid" as const,
    order: {
      id: receipt.orderId,
      number: receipt.orderNumber,
      paidAt: receipt.issuedAt,
      paidDate: receipt.date,
      email: receipt.buyer.email,
      customerName: receipt.buyer.contactName,
      companyName: receipt.buyer.companyName,
      phone: receipt.buyer.phone,
      companyRegNo: receipt.buyer.regNo || null,
      delivery: receipt.delivery.method,
      address: receipt.delivery.address,
      items: receipt.lines,
      subtotal: receipt.subtotal,
      deliveryFee: receipt.deliveryFee,
      total: receipt.total,
      url: receipt.orderUrl,
    },
    receipt: {
      id: receipt.receiptId,
      number: receipt.number,
      subject: `Зарлагын баримт № ${receipt.number} · ${receipt.seller.name}`,
      html: receiptHtml(receipt),
      pdfHtml: receiptPdfDocument(receipt),
      pdfFileName: `Zarlagyn-barimt-${receipt.number}.pdf`,
    },
    seller: receipt.seller,
  };
}
