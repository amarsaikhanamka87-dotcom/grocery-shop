"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";
import { sendPhoneCode } from "@/lib/auth/sendPhoneCode";
import { verifyPhoneCode } from "@/lib/auth/verifyPhoneCode";
import { PhoneNumberStep } from "./PhoneNumberStep";
import { PhoneCodeStep } from "./PhoneCodeStep";

/**
 * Phone + SMS login for Mongolian numbers. Clerk can't text +976, so our server sends and checks
 * the code (src/lib/otp.ts) and returns a one-time Clerk sign-in ticket. Works for new and
 * existing users alike.
 */
export function PhoneLogin() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const redirectUrl = useSearchParams().get("redirect_url") ?? "/";
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function run(task: () => Promise<void>) {
    setPending(true);
    setError(null);
    try {
      await task();
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setPending(false);
    }
  }

  const requestCode = () =>
    run(async () => {
      const res = await sendPhoneCode(phone);
      if (res.error) return setError(res.error);
      setCode("");
      setStep("code");
    });

  const confirmCode = () =>
    run(async () => {
      const res = await verifyPhoneCode(phone, code);
      if (!res.ticket) return setError(res.error ?? "Алдаа гарлаа.");
      const ticketResult = await signIn.ticket({ ticket: res.ticket });
      if (ticketResult.error) return setError("Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.");
      const done = await signIn.finalize({ navigate: () => router.push(redirectUrl.startsWith("/") ? redirectUrl : "/") });
      if (done.error) setError("Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.");
    });

  return (
    <div className="card w-full max-w-[400px] p-6">
      {step === "phone" ? (
        <PhoneNumberStep phone={phone} pending={pending} onPhoneChange={setPhone} onSubmit={requestCode} />
      ) : (
        <PhoneCodeStep
          phone={phone}
          code={code}
          pending={pending}
          onCodeChange={setCode}
          onSubmit={confirmCode}
          onResend={requestCode}
          onBack={() => setStep("phone")}
        />
      )}
      {error && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-clay-50 px-3 py-2.5 text-[13.5px] font-medium text-clay">
          <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
