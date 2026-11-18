import { z } from "zod";
import { DISTRICTS } from "@/lib/constants";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** The checkout form as sent to placeOrder. Prices are NOT taken from here, only ids + quantities. */
export const checkoutSchema = z.object({
  customerName: z.string().trim().max(120).default(""),
  phone: z.string().trim().regex(/^[6-9]\d{7}$/, "8 оронтой утасны дугаар оруулна уу"),
  district: z.enum(DISTRICTS as [string, ...string[]], { message: "Дүүргээ сонгоно уу" }),
  address: z.string().trim().min(5, "Хаягаа дэлгэрэнгүй бичнэ үү").max(500),
  note: z.string().trim().max(300).optional(),
  deliveryType: z.enum(["express", "scheduled", "recurring", "pickup"]),
  deliveryDate: z.string().regex(ISO_DATE),
  deliverySlot: z.string().regex(/^\d{2}:\d{2}–\d{2}:\d{2}$/),
  items: z
    .array(z.object({ productId: z.string().min(1).max(64), quantity: z.number().int().positive().max(100000) }))
    .min(1, "Сагс хоосон байна")
    .max(100),
  /** НӨАТ receipt: a person, or a company with its 7-digit register number and name. */
  invoiceType: z.enum(["person", "company"]).default("person"),
  companyRegNo: z.string().trim().optional(),
  companyName: z.string().trim().max(160).optional(),
  /** Only for "Давтамжит": how often, which weekdays (0 = Ням) and from/until when. */
  recurrence: z
    .object({
      frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
      days: z.array(z.number().int().min(0).max(6)).min(1, "Хүргэх өдрөө сонгоно уу").max(7),
      start: z.string().regex(ISO_DATE),
      end: z.string().regex(ISO_DATE),
    })
    .refine((r) => r.end > r.start, { message: "Дуусах огноо эхлэх огнооноос хойш байна" })
    .optional(),
})
  .refine((f) => f.deliveryType !== "recurring" || !!f.recurrence, { message: "Давтамжаа сонгоно уу" })
  .refine((f) => f.invoiceType !== "company" || /^\d{7}$/.test(f.companyRegNo ?? ""), {
    message: "Байгууллагын регистр 7 оронтой тоо байна",
  })
  .refine((f) => f.invoiceType !== "company" || (f.companyName ?? "").length >= 2, {
    message: "Байгууллагын нэрээ оруулна уу",
  });

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type RecurrencePlan = NonNullable<CheckoutInput["recurrence"]>;
