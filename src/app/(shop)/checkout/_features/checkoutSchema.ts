import { z } from "zod";
import { DISTRICTS } from "@/lib/constants";

/** The checkout form as sent to placeOrder. Prices are NOT taken from here, only ids + quantities. */
export const checkoutSchema = z.object({
  customerName: z.string().trim().max(120).default(""),
  phone: z.string().trim().regex(/^[6-9]\d{7}$/, "8 оронтой утасны дугаар оруулна уу"),
  district: z.enum(DISTRICTS as [string, ...string[]], { message: "Дүүргээ сонгоно уу" }),
  address: z.string().trim().min(5, "Хаягаа дэлгэрэнгүй бичнэ үү").max(500),
  note: z.string().trim().max(300).optional(),
  deliveryType: z.enum(["express", "scheduled"]),
  deliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  deliverySlot: z.string().regex(/^\d{2}:\d{2}–\d{2}:\d{2}$/),
  items: z
    .array(z.object({ productId: z.string().min(1).max(64), quantity: z.number().int().positive().max(100000) }))
    .min(1, "Сагс хоосон байна")
    .max(100),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
