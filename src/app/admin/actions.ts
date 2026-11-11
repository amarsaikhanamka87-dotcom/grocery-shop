"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { slugify } from "@/lib/format";
import { cancelInvoice } from "@/lib/qpay";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean; values?: Record<string, string> };

const imageUrl = z
  .string()
  .trim()
  .url("Зургийн холбоос буруу байна")
  .refine((v) => v.startsWith("https://images.unsplash.com/"), "Одоогоор зөвхөн images.unsplash.com зураг дэмжинэ");

function echo(formData: FormData) {
  const values: Record<string, string> = {};
  for (const [k, v] of formData) if (typeof v === "string" && !k.startsWith("$")) values[k] = v;
  return values;
}

function issues(err: z.ZodError, formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  for (const i of err.issues) fieldErrors[String(i.path[0])] ??= i.message;
  return { fieldErrors, values: echo(formData) };
}

/* ---------------- Products ---------------- */

const productSchema = z.object({
  name: z.string().trim().min(2, "Нэр оруулна уу"),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(5, "Тайлбар оруулна уу"),
  price: z.coerce.number().int("Бүхэл тоо оруулна уу").min(1, "Үнэ оруулна уу"),
  oldPrice: z.preprocess((v) => (v === "" || v == null ? null : v), z.coerce.number().int().min(1).nullable()),
  unit: z.string().trim().min(1, "Хэмжих нэгж оруулна уу"),
  image: imageUrl,
  stock: z.coerce.number().int().min(0, "0-с бага байж болохгүй"),
  minQty: z.coerce.number().int().min(1, "Хамгийн багадаа 1"),
  categoryId: z.string().min(1, "Ангилал сонгоно уу"),
  origin: z.string().trim().optional(),
  isFeatured: z.preprocess((v) => v === "on", z.boolean()),
  isOrganic: z.preprocess((v) => v === "on", z.boolean()),
});

export async function saveProduct(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return issues(parsed.error, formData);
  const { slug: rawSlug, origin, ...rest } = parsed.data;
  if (rest.oldPrice != null && rest.oldPrice <= rest.price) {
    return { values: echo(formData), fieldErrors: { oldPrice: "Хуучин үнэ одоогийн үнээс их байх ёстой" } };
  }
  const slug = slugify(rawSlug || rest.name) || `product-${Date.now()}`;

  const clash = await prisma.product.findFirst({ where: { slug, NOT: id ? { id } : undefined } });
  if (clash) return { values: echo(formData), fieldErrors: { slug: "Энэ slug ашиглагдсан байна" } };

  const data = { ...rest, slug, origin: origin || null };
  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  // Order items keep a snapshot of name/price, so the link is simply cleared.
  await prisma.product.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

/* ---------------- Categories ---------------- */

const categorySchema = z.object({
  name: z.string().trim().min(2, "Нэр оруулна уу"),
  slug: z.string().trim().optional(),
  image: imageUrl,
  sortOrder: z.coerce.number().int().default(0),
});

export async function saveCategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return issues(parsed.error, formData);
  const slug = slugify(parsed.data.slug || parsed.data.name);
  const clash = await prisma.category.findFirst({ where: { slug, NOT: id ? { id } : undefined } });
  if (clash) return { values: echo(formData), fieldErrors: { slug: "Энэ slug ашиглагдсан байна" } };

  const data = { ...parsed.data, slug };
  if (id) await prisma.category.update({ where: { id }, data });
  else await prisma.category.create({ data });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count === 0) await prisma.category.delete({ where: { id } });
  revalidatePath("/", "layout");
}

/* ---------------- Orders ---------------- */

const STATUSES = ["PENDING", "CONFIRMED", "DELIVERING", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = z.enum(STATUSES).parse(formData.get("status")) as OrderStatus;

  const cancelled = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUniqueOrThrow({ where: { id } });
    if (order.status === status || order.status === "CANCELLED") return null; // cancelled orders are final
    if (status === "CANCELLED") {
      // Put the reserved stock back in one statement.
      await tx.$executeRaw`
        UPDATE "Product" AS p SET "stock" = p."stock" + oi."quantity", "updatedAt" = NOW()
        FROM "OrderItem" AS oi
        WHERE oi."orderId" = ${order.id} AND oi."productId" = p."id"`;
    }
    await tx.order.update({ where: { id }, data: { status } });
    return status === "CANCELLED" && order.paymentStatus === "UNPAID" ? order.qpayInvoiceId : null;
  }, { maxWait: 10_000, timeout: 20_000 });
  // Unpaid invoice can no longer be paid once the order is cancelled.
  if (cancelled) await cancelInvoice(cancelled);
  revalidatePath("/admin", "layout");
}

/** Manual confirmation, e.g. when QPay's callback was missed or for sandbox testing. */
export async function markOrderPaid(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.order.updateMany({
    where: { id, paymentStatus: "UNPAID", status: { not: "CANCELLED" } },
    data: { paymentStatus: "PAID", paidAt: new Date(), status: "CONFIRMED" },
  });
  revalidatePath("/admin", "layout");
}

/** Re-check the payment with QPay. */
export async function recheckPayment(formData: FormData) {
  await requireAdmin();
  const { syncOrderPayment } = await import("@/lib/payments");
  await syncOrderPayment(String(formData.get("id")));
  revalidatePath("/admin", "layout");
}

/* ---------------- Users ---------------- */

export async function setUserApproved(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const approved = formData.get("approved") === "true";
  await prisma.user.update({ where: { id }, data: { approved } });
  revalidatePath("/admin", "layout");
}

export async function setUserRole(formData: FormData) {
  const me = await requireAdmin();
  const id = String(formData.get("id"));
  const role = z.enum(["USER", "ADMIN"]).parse(formData.get("role"));
  if (id === me.id) return; // don't lock yourself out
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}
