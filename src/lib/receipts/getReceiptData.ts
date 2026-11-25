import "server-only";
import { prisma } from "@/lib/prisma";
import { SHOP_NAME, SHOP_PHONE, SHOP_REG_NO } from "@/lib/constants";
import { DELIVERY_TYPE_LABEL } from "@/lib/orders/deliveryTypeLabel";
import type { ReceiptData } from "@/types/receipts";

// Mongolia is UTC+8 all year (no daylight saving).
const UB_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * Everything a БМ-3 "Зарлагын баримт" shows, by receipt id or order id. Item names, units and
 * prices come from the order lines (saved at order time), so the receipt never changes later.
 */
export async function getReceiptData(where: { id: string } | { orderId: string }): Promise<ReceiptData | null> {
  const receipt = await prisma.receipt.findUnique({
    where,
    include: {
      order: { include: { items: true } },
    },
  });
  if (!receipt) return null;

  const { order } = receipt;
  const ub = new Date(receipt.createdAt.getTime() + UB_OFFSET_MS);
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  const method = DELIVERY_TYPE_LABEL[order.deliveryType ?? ""] ?? "Хүргэлт";
  return {
    receiptId: receipt.id,
    number: receipt.number,
    orderId: order.id,
    orderNumber: order.number,
    issuedAt: receipt.createdAt.toISOString(),
    date: { year: ub.getUTCFullYear(), month: ub.getUTCMonth() + 1, day: ub.getUTCDate() },
    seller: { name: SHOP_NAME, regNo: SHOP_REG_NO, phone: SHOP_PHONE },
    buyer: {
      name: order.companyName || order.customerName || order.phone,
      contactName: order.customerName,
      companyName: order.companyName,
      regNo: order.companyRegNo ?? "",
      phone: order.phone,
      email: receipt.email ?? order.email,
    },
    delivery: { method, address: `${order.district}, ${order.address}` },
    lines: order.items.map((item, index) => ({
      no: index + 1,
      name: item.name,
      // Products have no stock code yet; the English URL slug ("carrot") only confused people.
      code: "",
      unit: item.unit,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    orderUrl: siteUrl ? `${siteUrl}/orders/${order.id}` : null,
  };
}
