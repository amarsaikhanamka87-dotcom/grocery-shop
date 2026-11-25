import "server-only";
import { GEMINI_OCR_MODEL } from "@/lib/constants";

/** The Gemini model used for handwriting: GEMINI_MODEL env if set, else the default in constants. */
export function ocrModel(): string {
  return process.env.GEMINI_MODEL || GEMINI_OCR_MODEL;
}
