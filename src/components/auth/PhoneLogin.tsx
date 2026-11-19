"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { sendPhoneCode } from "@/lib/auth/sendPhoneCode";
import type { VerifySession } from "@/types/auth";
import { PhoneNumberStep } from "./PhoneNumberStep";
import { PhoneSmsStep } from "./PhoneSmsStep";
import { usePhoneVerifyPoll } from "./usePhoneVerifyPoll";
import { useTicketSignIn } from "./useTicketSignIn";

/**
 * Phone login for Mongolian numbers via verify.mn (reverse SMS): the buyer texts a code from their
 * phone, our server polls verify.mn and returns a one-time Clerk sign-in ticket.
 * Works for new and existing users alike.
 */
export function PhoneLogin() {
  const signInWithTicket = useTicketSignIn(useSearchParams().get("redirect_url") ?? "/");
  const [phone, setPhone] = useState("");
  const [session, setSession] = useState<VerifySession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function requestCode() {
    setPending(true);
    setError(null);
    try {
      const res = await sendPhoneCode(phone);
      if (res.error) return setError(res.error);
      setSession(res.session ?? null);
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setPending(false);
    }
  }

  async function finishSignIn(ticket: string) {
    setSession(null);
    const failed = await signInWithTicket(ticket);
    if (failed) setError(failed);
  }

  usePhoneVerifyPoll(phone, session, finishSignIn, (message) => {
    setSession(null);
    setError(message);
  });

  return (
    <div className="card w-full max-w-[400px] p-6">
      {session ? (
        <PhoneSmsStep
          phone={phone}
          session={session}
          pending={pending}
          onResend={requestCode}
          onBack={() => setSession(null)}
        />
      ) : (
        <PhoneNumberStep phone={phone} pending={pending} onPhoneChange={setPhone} onSubmit={requestCode} />
      )}
      {error && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-clay-50 px-3 py-2.5 text-[13.5px] font-medium text-clay">
          <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
