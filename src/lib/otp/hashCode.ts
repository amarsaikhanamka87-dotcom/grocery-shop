import "server-only";
import { createHmac } from "node:crypto";

/** HMAC of phone + code. Only this is stored, never the code itself. */
export function hashCode(phone: string, code: string) {
  const secret = process.env.OTP_SECRET;
  if (!secret || secret.length < 32) throw new Error("OTP_SECRET must be set (32+ chars)");
  return createHmac("sha256", secret).update(`${phone}:${code}`).digest("hex");
}
