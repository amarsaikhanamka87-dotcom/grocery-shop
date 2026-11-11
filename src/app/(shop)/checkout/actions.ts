"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { canOrder, getCurrentUser } from "@/lib/session";
import { callbackUrl, cancelInvoice, createInvoice } from "@/lib/qpay";
import { DELIVERY_SLOTS, DISTRICTS, deliveryFeeFor } from "@/lib/constants";

const schema = z.object({
  customerName: z.string().trim().min(2, "Хүлээн авах хүний нэрийг оруулна уу"),
  phone: z.string().trim().regex(/^[0-9]{8}$/, "8 оронтой утасны дугаар оруулна уу"),
  district: z.enum(DISTRICTS as [string, ...string[]], { message: "Дүүргээ сонгоно уу" }),
  address: z.string().trim().min(5, "Хаягаа дэлгэрэнгүй бичнэ үү"),
  note: z.string().trim().max(500).optional(),
  deliverySlot: z.enum(DELIVERY_SLOTS as [string, ...string[]], { message: "Хүргэлтийн цагаа сонгоно уу" }),
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(100000) }))
    .min(1, "Сагс хоосон байна"),
});

export type CheckoutState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  orderId?: string;
  values?: Record<string, string>;
};

class OrderError extends Error {}

export async function placeOrder(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  // Echo the submitted fields so the form keeps them after a failed attempt.
  const values: Record<string, string> = {};
  for (const k of ["customerName", "phone", "district", "address", "note", "deliverySlot"]) {
    values[k] = String(formData.get(k) ?? "");
  }

  const user = await getCurrentUser();
  if (!user) return { values, error: "Захиалга өгөхийн тулд нэвтэрнэ үү." };
  if (!canOrder(user)) return { values, error: "Таны байгууллагын бүртгэл баталгаажаагүй байна." };

  let items: unknown;
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { values, error: "Сагсны мэдээлэл буруу байна." };
  }

  const parsed = schema.safeParse({
    customerName: formData.get("customerName"),
    phone: String(formData.get("phone") ?? "").replace(/\D/g, ""),
    district: formData.get("district"),
    address: formData.get("address"),
    note: formData.get("note") || undefined,
    deliverySlot: formData.get("deliverySlot"),
    items,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { values, fieldErrors, error: fieldErrors.items };
  }

  const data = parsed.data;

  // Merge duplicate lines.
  const qty = new Map<string, number>();
  for (const i of data.items) qty.set(i.productId, (qty.get(i.productId) ?? 0) + i.quantity);

  let order;
  try {
    order = await prisma.$transaction(
      async (tx) => {
        const products = await tx.product.findMany({ where: { id: { in: [...qty.keys()] } } });
        if (products.length !== qty.size) {
          throw new OrderError("Зарим бүтээгдэхүүн худалдаанаас хасагдсан байна. Сагсаа шинэчилнэ үү.");
        }
        for (const p of products) {
          if (qty.get(p.id)! < p.minQty) {
            throw new OrderError(`“${p.name}” хамгийн багадаа ${p.minQty} ${p.unit} захиална.`);
          }
        }

        // One atomic statement: reserve every line only where enough stock is left.
        const rows = [...qty.entries()].map(([id, q]) => Prisma.sql`(${id}, ${q}::int)`);
        const updated = await tx.$queryRaw<{ id: string }[]>`
          UPDATE "Product" AS p SET "stock" = p."stock" - v.q, "updatedAt" = NOW()
          FROM (VALUES ${Prisma.join(rows)}) AS v(id, q)
          WHERE p."id" = v.id AND p."stock" >= v.q
          RETURNING p."id"`;
        if (updated.length !== qty.size) {
          const ok = new Set(updated.map((r) => r.id));
          const short = products.find((p) => !ok.has(p.id))!;
          throw new OrderError(`“${short.name}” нөөц хүрэлцэхгүй байна (үлдэгдэл: ${short.stock} ${short.unit}).`);
        }

        const subtotal = products.reduce((n, p) => n + p.price * qty.get(p.id)!, 0);
        const deliveryFee = deliveryFeeFor(subtotal);

        return tx.order.create({
          data: {
            userId: user.id,
            customerName: data.customerName,
            companyName: user.companyName,
            companyRegNo: user.companyRegNo,
            phone: data.phone,
            district: data.district,
            address: data.address,
            note: data.note,
            deliverySlot: data.deliverySlot,
            paymentMethod: "QPAY",
            subtotal,
            deliveryFee,
            total: subtotal + deliveryFee,
            items: {
              create: products.map((p) => ({
                productId: p.id,
                name: p.name,
                image: p.image,
                unit: p.unit,
                price: p.price,
                quantity: qty.get(p.id)!,
              })),
            },
          },
        });
      },
      { maxWait: 10_000, timeout: 20_000 },
    );
  } catch (e) {
    if (e instanceof OrderError) return { values, error: e.message };
    console.error(e);
    return { values, error: "Захиалга бүртгэхэд алдаа гарлаа. Дахин оролдоно уу." };
  }

  // Create the QPay invoice for the order.
  try {
    const invoice = await createInvoice({
      orderNo: `URG-${order.number}`,
      amount: order.total,
      description: `Ургац захиалга #${order.number}`,
      callbackUrl: callbackUrl(order.id),
    });
    await prisma.order.update({
      where: { id: order.id },
      data: {
        qpayInvoiceId: invoice.invoice_id,
        qpayQrImage: invoice.qr_image,
        qpayShortUrl: invoice.qPay_shortUrl,
        qpayUrls: invoice.urls,
      },
    });
  } catch (e) {
    console.error(e);
    // Roll the order back so the stock isn't held by an order nobody can pay.
    await releaseOrder(order.id);
    return { values, error: "QPay нэхэмжлэх үүсгэж чадсангүй. Түр хүлээгээд дахин оролдоно уу." };
  }

  return { orderId: order.id };
}

async function releaseOrder(orderId: string) {
  await prisma.$transaction(
    async (tx) => {
      await tx.$executeRaw`
        UPDATE "Product" AS p SET "stock" = p."stock" + oi."quantity", "updatedAt" = NOW()
        FROM "OrderItem" AS oi
        WHERE oi."orderId" = ${orderId} AND oi."productId" = p."id"`;
      await tx.order.update({ where: { id: orderId }, data: { status: "CANCELLED" } });
    },
    { maxWait: 10_000, timeout: 20_000 },
  );
}

/** Lets the customer cancel an order they haven't paid yet. */
export async function cancelUnpaidOrder(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id"));
  const order = await prisma.order.findUnique({ where: { id } });
  if (!user || !order || order.userId !== user.id) return;
  if (order.paymentStatus !== "UNPAID" || order.status === "CANCELLED") return;
  if (order.qpayInvoiceId) await cancelInvoice(order.qpayInvoiceId);
  await releaseOrder(order.id);
  revalidatePath(`/order/${id}`);
}
