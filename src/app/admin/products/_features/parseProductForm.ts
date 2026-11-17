import type { z } from "zod";
import type { FormState } from "@/types/forms";
import { productSchema } from "./productSchema";

type Parsed = { data: z.infer<typeof productSchema>; values: Record<string, string> } | { state: FormState };

/** Reads + validates the product form. Returns the clean data, or a FormState with field errors. */
export function parseProductForm(formData: FormData): Parsed {
  const values = Object.fromEntries([...formData].filter(([k]) => !k.startsWith("$"))) as Record<string, string>;
  const parsed = productSchema.safeParse(values);
  if (parsed.success) return { data: parsed.data, values };
  const fieldErrors: Record<string, string> = {};
  for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
  return { state: { values, fieldErrors } };
}
