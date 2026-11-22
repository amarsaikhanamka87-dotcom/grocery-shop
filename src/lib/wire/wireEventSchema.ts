import { z } from "zod";

/** The parts of a Wire.mn webhook event we read; anything else in the body is ignored. */
export const wireEventSchema = z.object({
  id: z.string(),
  type: z.enum(["payment_intent.succeeded", "payment_intent.payment_failed", "payment_intent.canceled", "charge.refunded"]),
  created: z.number(),
  data: z.object({
    id: z.string(),
    object: z.string(),
    status: z.string(),
    amount: z.number().int(),
    currency: z.string().optional(),
  }),
});
