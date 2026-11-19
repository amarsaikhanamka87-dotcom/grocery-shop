"use server";

import { z } from "zod";
import { toMongolianE164 } from "@/lib/phone/toMongolianE164";
import { verifyOtp } from "@/lib/otp/verifyOtp";
import type { PhoneState } from "@/types/auth";
import { createPhoneSignInTicket } from "./createPhoneSignInTicket";
import { PHONE_MESSAGES as MESSAGES } from "./phoneMessages";

/** Step 2 (polled): once the buyer's SMS arrived, return a Clerk sign-in ticket. */
export async function verifyPhoneCode(phoneInput: string, sessionIdInput: string): Promise<PhoneState> {
  const phone = toMongolianE164(phoneInput);
  if (!phone) return { error: MESSAGES.phone };
  const sessionId = z.string().uuid().safeParse(sessionIdInput);
  if (!sessionId.success) return { error: MESSAGES.no_code };
  try {
    const res = await verifyOtp(phone, sessionId.data);
    if (!res.ok) return res.error === "pending" ? { pending: true } : { error: MESSAGES[res.error] };
    return { ticket: await createPhoneSignInTicket(phone) };
  } catch (err) {
    console.error("verifyPhoneCode failed", err);
    return { error: MESSAGES.server };
  }
}
