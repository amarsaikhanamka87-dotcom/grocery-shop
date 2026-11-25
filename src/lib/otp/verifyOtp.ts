import "server-only";
import { prisma } from "@/lib/prisma";
import { getVerifyStatus } from "@/lib/verify/getVerifyStatus";
import type { OtpResult } from "@/types/auth";
import { hashCode } from "./hashCode";

/**
 * Checks whether the buyer's SMS for this verify.mn session arrived. The session must be one we
 * created for this phone (matched by HMAC) and can be used exactly once.
 */
export async function verifyOtp(phone: string, sessionId: string): Promise<OtpResult> {
  const row = await prisma.phoneOtp.findFirst({
    where: { phone, codeHash: hashCode(phone, sessionId), consumedAt: null },
  });

  if (!row) return { ok: false, error: "no_code" };
  if (row.expiresAt.getTime() < Date.now()) return { ok: false, error: "expired" };

  const status = await getVerifyStatus(sessionId);
  if (status === "EXPIRED") return { ok: false, error: "expired" };
  if (status === "PENDING") return { ok: false, error: "pending" };

  // Conditional update so two parallel polls can't both sign in with the same session.
  const used = await prisma.phoneOtp.updateMany({
    where: { id: row.id, consumedAt: null },
    data: { consumedAt: new Date() },
  });
  return used.count === 1 ? { ok: true } : { ok: false, error: "no_code" };
}
