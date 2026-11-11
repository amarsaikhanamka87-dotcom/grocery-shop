"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { login, register, type AuthState } from "./actions";

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-[13px] font-medium text-clay">{msg}</p> : null;
}

function Shell({ title, subtitle, children }: { title: string; subtitle: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="container-x grid place-items-center pt-12">
      <div className="card w-full max-w-md p-7 sm:p-9">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em]">{title}</h1>
        <p className="mt-1.5 text-[15px] text-muted">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});
  return (
    <Shell
      title="Нэвтрэх"
      subtitle={
        <>
          Бүртгэлгүй юу?{" "}
          <Link href={`/register${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-bold text-brand hover:underline">
            Бүртгүүлэх
          </Link>
        </>
      }
    >
      <form action={action} className="mt-7 grid gap-4">
        <input type="hidden" name="next" value={next ?? ""} />
        <div>
          <label className="label" htmlFor="email">Имэйл</label>
          <input id="email" name="email" type="email" defaultValue={state.values?.email} className="input" autoComplete="email" required />
        </div>
        <div>
          <label className="label" htmlFor="password">Нууц үг</label>
          <input id="password" name="password" type="password" className="input" autoComplete="current-password" required />
        </div>
        {state.error && (
          <p className="flex items-center gap-2 rounded-xl bg-clay-50 px-4 py-3 text-[14px] font-medium text-clay">
            <AlertCircle className="size-4" /> {state.error}
          </p>
        )}
        <button disabled={pending} className="btn btn-primary mt-2 h-12">
          {pending && <Loader2 className="size-4 animate-spin" />} Нэвтрэх
        </button>
      </form>
    </Shell>
  );
}

export function RegisterForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(register, {});
  const fe = state.fieldErrors ?? {};
  return (
    <Shell
      title="Байгууллагаар бүртгүүлэх"
      subtitle={
        <>
          Бүртгэлтэй юу?{" "}
          <Link href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-bold text-brand hover:underline">
            Нэвтрэх
          </Link>
        </>
      }
    >
      <form action={action} className="mt-7 grid gap-4">
        <input type="hidden" name="next" value={next ?? ""} />
        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <div>
            <label className="label" htmlFor="companyName">Байгууллагын нэр</label>
            <input id="companyName" name="companyName" defaultValue={state.values?.companyName} className="input" autoComplete="organization" required />
            <Err msg={fe.companyName} />
          </div>
          <div>
            <label className="label" htmlFor="companyRegNo">Регистр</label>
            <input id="companyRegNo" name="companyRegNo" defaultValue={state.values?.companyRegNo} className="input" inputMode="numeric" maxLength={7} placeholder="1234567" required />
            <Err msg={fe.companyRegNo} />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="name">Холбогдох хүний нэр</label>
          <input id="name" name="name" defaultValue={state.values?.name} className="input" autoComplete="name" required />
          <Err msg={fe.name} />
        </div>
        <div>
          <label className="label" htmlFor="email">Имэйл</label>
          <input id="email" name="email" type="email" defaultValue={state.values?.email} className="input" autoComplete="email" required />
          <Err msg={fe.email} />
        </div>
        <div>
          <label className="label" htmlFor="phone">Утасны дугаар</label>
          <input id="phone" name="phone" inputMode="numeric" defaultValue={state.values?.phone} className="input" autoComplete="tel" required />
          <Err msg={fe.phone} />
        </div>
        <div>
          <label className="label" htmlFor="password">Нууц үг</label>
          <input id="password" name="password" type="password" className="input" autoComplete="new-password" minLength={8} required />
          <Err msg={fe.password} />
        </div>
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-[13.5px] text-ink-2">
          Бүртгэлийг манай ажилтан 1 ажлын өдрийн дотор шалгаж баталгаажуулсны дараа захиалга өгөх боломжтой болно.
        </p>
        <button disabled={pending} className="btn btn-primary h-12">
          {pending && <Loader2 className="size-4 animate-spin" />} Бүртгүүлэх
        </button>
      </form>
    </Shell>
  );
}
