import { z } from "zod";

const int = (msg: string) => z.coerce.number({ error: msg }).int(msg).min(0, msg);

/** Admin product edit form. Money is integer tögrög; images must be Unsplash (next.config.ts). */
export const productSchema = z.object({
  name: z.string().trim().min(2, "Нэрээ оруулна уу"),
  slug: z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Зөвхөн латин жижиг үсэг, тоо, зураас (-)"),
  description: z.string().trim().min(1, "Тайлбар оруулна уу"),
  price: int("Үнэ 0-ээс их бүхэл тоо байна"),
  oldPrice: z
    .string()
    .trim()
    .transform((s) => (s === "" ? null : Number(s)))
    .refine((n) => n === null || (Number.isInteger(n) && n >= 0), "Хуучин үнэ бүхэл тоо байна"),
  unit: z.string().trim().min(1, "Нэгж оруулна уу (жишээ: 1 кг)"),
  image: z
    .string()
    .trim()
    .url("Зургийн холбоос буруу байна")
    .refine((u) => URL.canParse(u) && new URL(u).hostname === "images.unsplash.com", "Зөвхөн images.unsplash.com зураг"),
  stock: int("Үлдэгдэл 0-ээс их бүхэл тоо байна"),
  minQty: int("Доод тоо бүхэл тоо байна").min(1, "Доод тоо 1-ээс бага байж болохгүй"),
  categoryId: z.string().min(1, "Ангилал сонгоно уу"),
  origin: z.string().trim().transform((s) => s || null),
  isFeatured: z.literal("on").optional().transform(Boolean),
  isOrganic: z.literal("on").optional().transform(Boolean),
});
