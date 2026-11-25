import "server-only";
import type { VerifySession } from "@/types/auth";

/**
 * Starts a verify.mn session: the buyer must text `text` to `shortcode` from `phone`.
 * verify.mn does NOT send an SMS to the buyer (reverse SMS). Env: SMS_API_URL
 * (https://api.verify.mn/sessions), SMS_API_KEY (vrf_...).
 */
export async function createVerifySession(phone: string, text: string): Promise<VerifySession & { expiresAt: Date }> {
  const url = process.env.SMS_API_URL;
  if (!url) throw new Error("SMS_API_URL is not set");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.SMS_API_KEY ?? ""}` },
    body: JSON.stringify({ phone: phone.replace(/^\+976/, ""), text }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`verify.mn responded ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  return {
    sessionId: String(data.sessionId),
    shortcode: String(data.shortcode),
    text: String(data.text),
    smsUri: String(data.smsUri),
    expiresAt: new Date(data.expiresAt),
  };
}
