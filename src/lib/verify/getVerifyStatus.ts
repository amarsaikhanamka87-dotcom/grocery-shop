import "server-only";
import type { VerifyStatus } from "@/types/auth";

/** Asks verify.mn whether the buyer's SMS for this session has arrived. */
export async function getVerifyStatus(sessionId: string): Promise<VerifyStatus> {
  const base = process.env.SMS_API_URL;
  if (!base) throw new Error("SMS_API_URL is not set");

  const res = await fetch(`${base.replace(/\/$/, "")}/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${process.env.SMS_API_KEY ?? ""}` },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`verify.mn status responded ${res.status}`);
  const { sessionStatus } = await res.json();
  return sessionStatus === "VERIFIED" || sessionStatus === "EXPIRED" ? sessionStatus : "PENDING";
}
