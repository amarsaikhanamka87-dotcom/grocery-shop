import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { WireEvent } from "@/types/wire";
import { wireEventSchema } from "./wireEventSchema";

const TOLERANCE_SECONDS = 300;

/**
 * Checks the `WirePayment-Signature: t=<unix>,v1=<hex>` header: HMAC-SHA256 of `${t}.${rawBody}`
 * with WIRE_WEBHOOK_SECRET (whsec_…), compared in constant time, max 5 minutes old.
 * Returns the checked event (zod), or null if it did not come from Wire.mn or has a bad shape.
 */
export function verifyWireWebhook(rawBody: string, header: string | null): WireEvent | null {
  const secret = process.env.WIRE_WEBHOOK_SECRET;
  if (!secret || !header) return null;

  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }),
  );
  const t = Number(parts.t);
  const v1 = parts.v1 ?? "";
  if (!Number.isFinite(t) || Math.abs(Date.now() / 1000 - t) > TOLERANCE_SECONDS) return null;
  if (!/^[0-9a-f]{64}$/i.test(v1)) return null;

  const expected = createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest();
  if (!timingSafeEqual(expected, Buffer.from(v1, "hex"))) return null;

  try {
    const parsed = wireEventSchema.safeParse(JSON.parse(rawBody));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
