"use server";

import { toMongolianE164 } from "@/lib/phone/toMongolianE164";
import { requestOtp } from "@/lib/otp/requestOtp";
import type { PhoneState } from "@/types/auth";
import { PHONE_MESSAGES as MESSAGES } from "./phoneMessages";

/** Step 1: text a 6-digit code to the phone. */
export async function sendPhoneCode(phoneInput: string): Promise<PhoneState> {
  const phone = toMongolianE164(phoneInput);
  if (!phone) return { error: MESSAGES.phone };
  try {
    const res = await requestOtp(phone);
    return res.ok ? { sent: true } : { error: MESSAGES[res.error] };
  } catch (err) {
    console.error("sendPhoneCode failed", err);
    return { error: MESSAGES.server };
  }
}
