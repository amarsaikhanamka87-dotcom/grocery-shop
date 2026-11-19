import "server-only";
import { randomInt } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { createVerifySession } from "@/lib/verify/createVerifySession";
import type { RequestOtpResult } from "@/types/auth";
import { hashCode } from "./hashCode";
import { OTP_LIMITS } from "./limits";

/**
 * Starts phone verification via verify.mn (the buyer texts a code to its shortcode).
 * We store an HMAC of phone + sessionId, so a session can only sign in the phone it was made for.
 * Rate-limited per phone number.
 */
export async function requestOtp(phone: string): Promise<RequestOtpResult> {
  const recent = await prisma.phoneOtp.findMany({
    where: { phone, createdAt: { gt: new Date(Date.now() - 60 * 60_000) } },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  if (recent[0] && Date.now() - recent[0].createdAt.getTime() < OTP_LIMITS.resendAfterMs) {
    return { ok: false, error: "too_soon" };
  }
  if (recent.length >= OTP_LIMITS.maxPerHour) return { ok: false, error: "too_many" };

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const { expiresAt, ...session } = await createVerifySession(phone, code);
  await prisma.phoneOtp.create({
    data: { phone, codeHash: hashCode(phone, session.sessionId), expiresAt },
  });
  return { ok: true, session };
}
