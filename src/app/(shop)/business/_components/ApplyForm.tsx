"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import type { FormState } from "@/types/forms";
import { submitApplication } from "../_features/submitApplication";
import { ApplyField } from "./ApplyField";

export function ApplyForm({ defaults }: { defaults: { contactName: string; phone: string } }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitApplication, {});
  const v = state.values ?? {};
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="card mt-8 grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      <ApplyField name="companyName" label="Байгууллагын нэр" defaultValue={v.companyName} error={fe.companyName} />
      <ApplyField name="companyRegNo" label="Регистрийн дугаар" defaultValue={v.companyRegNo} error={fe.companyRegNo} inputMode="numeric" placeholder="1234567" />
      <ApplyField name="contactName" label="Холбоо барих хүн" defaultValue={v.contactName ?? defaults.contactName} error={fe.contactName} />
      <ApplyField name="phone" label="Утас" defaultValue={v.phone ?? defaults.phone} error={fe.phone} inputMode="numeric" placeholder="99112233" />
      <div className="sm:col-span-2">
        <ApplyField name="address" label="Хаяг (заавал биш)" defaultValue={v.address} error={fe.address} required={false} />
      </div>
      {state.error && <p className="rounded-xl bg-clay-50 px-4 py-3 text-[14px] font-medium text-clay sm:col-span-2">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary h-12 sm:col-span-2">
        {pending && <Loader2 className="size-4 animate-spin" />}
        Хүсэлт илгээх
      </button>
    </form>
  );
}
