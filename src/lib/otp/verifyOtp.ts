import "server-only";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { OtpResult } from "@/types/auth";
import { hashCode } from "./hashCode";
import { OTP_LIMITS } from "./limits";

/** Checks the latest unused code for the phone. A correct code can be used exactly once. */
export async function verifyOtp(phone: string, code: string): Promise<OtpResult> {
  const row = await prisma.phoneOtp.findFirst({
    where: { phone, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!row) return { ok: false, error: "no_code" };
  if (row.expiresAt.getTime() < Date.now()) return { ok: false, error: "expired" };
  if (row.attempts >= OTP_LIMITS.maxAttempts) return { ok: false, error: "locked" };

  const expected = Buffer.from(row.codeHash, "hex");
  const given = Buffer.from(hashCode(phone, code), "hex");
  if (!timingSafeEqual(expected, given)) {
    await prisma.phoneOtp.update({ where: { id: row.id }, data: { attempts: { increment: 1 } } });
    return { ok: false, error: row.attempts + 1 >= OTP_LIMITS.maxAttempts ? "locked" : "wrong" };
  }

  // Conditional update so two parallel requests can't both use the same code.
  const used = await prisma.phoneOtp.updateMany({
    where: { id: row.id, consumedAt: null },
    data: { consumedAt: new Date() },
  });
  return used.count === 1 ? { ok: true } : { ok: false, error: "no_code" };
}
