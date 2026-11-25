import { z } from "zod";
import { idSchema } from "@/lib/validation/idSchema";
import { STORE_PAYMENT_METHODS } from "./storePaymentMethods";

/** One in-store sale from the POS screen, checked on the server before anything is saved. */
export const storeSaleSchema = z.object({
  items: z
    .array(z.object({ productId: idSchema, quantity: z.number().int().min(1).max(100000) }))
    .min(1)
    .max(100),
  paymentMethod: z.enum(STORE_PAYMENT_METHODS),
  customerName: z.string().trim().max(100).optional(),
});

export type StoreSaleInput = z.infer<typeof storeSaleSchema>;
