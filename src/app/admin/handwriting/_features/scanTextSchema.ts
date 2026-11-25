import { z } from "zod";

/** A scan id plus the admin's corrected text, checked on the server before saving. */
export const scanTextSchema = z.object({
  scanId: z.string().min(1).max(40),
  text: z.string().trim().min(1).max(20_000),
});

export type ScanTextInput = z.infer<typeof scanTextSchema>;
