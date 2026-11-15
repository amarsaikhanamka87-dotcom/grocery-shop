import "server-only";
import { randomInt } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendSms } from "@/lib/sms";
import type { OtpResult } from "@/types/auth";
import { hashCode } from "./hashCode";
import { OTP_LIMITS } from "./limits";

/** Creates a code for the phone and texts it. Rate-limited per phone number. */
export async function requestOtp(phone: string): Promise<OtpResult> {
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
  await prisma.phoneOtp.create({
    data: { phone, codeHash: hashCode(phone, code), expiresAt: new Date(Date.now() + OTP_LIMITS.codeTtlMs) },
  });
  await sendSms(phone, `Urgats nevtrekh kod: ${code}. 5 minutad khuchintei. Busdad bitgii kheleerei.`);
  return { ok: true };
}
