"use server";

import { z } from "zod";
import { toMongolianE164 } from "@/lib/phone/toMongolianE164";
import { verifyOtp } from "@/lib/otp/verifyOtp";
import type { PhoneState } from "@/types/auth";
import { createPhoneSignInTicket } from "./createPhoneSignInTicket";
import { PHONE_MESSAGES as MESSAGES } from "./phoneMessages";

/** Step 2: check the code and return a Clerk sign-in ticket. */
export async function verifyPhoneCode(phoneInput: string, codeInput: string): Promise<PhoneState> {
  const phone = toMongolianE164(phoneInput);
  if (!phone) return { error: MESSAGES.phone };
  const code = z.string().regex(/^\d{6}$/).safeParse(codeInput.trim());
  if (!code.success) return { error: MESSAGES.code };
  try {
    const res = await verifyOtp(phone, code.data);
    if (!res.ok) return { error: MESSAGES[res.error] };
    return { ticket: await createPhoneSignInTicket(phone) };
  } catch (err) {
    console.error("verifyPhoneCode failed", err);
    return { error: MESSAGES.server };
  }
}
