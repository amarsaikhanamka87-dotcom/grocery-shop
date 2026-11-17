import { z } from "zod";

/** What the monthly-order editor sends to the server. */
export const monthlyOrderSchema = z.object({
  dayOfMonth: z.number().int().min(1).max(28),
  active: z.boolean(),
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(100_000) }))
    .max(100),
});

export type MonthlyOrderInput = z.infer<typeof monthlyOrderSchema>;
