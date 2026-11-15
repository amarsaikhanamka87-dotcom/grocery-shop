import { Loader2 } from "lucide-react";

type Props = {
  phone: string;
  code: string;
  pending: boolean;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  onResend: () => void;
  onBack: () => void;
};

export function PhoneCodeStep({ phone, code, pending, onCodeChange, onSubmit, onResend, onBack }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid gap-3"
    >
      <p className="text-[14px] text-muted-foreground">
        <b className="text-ink">+976 {phone}</b> дугаарт 6 оронтой код илгээлээ.
      </p>
      <label className="label" htmlFor="code">Баталгаажуулах код</label>
      <input
        id="code"
        value={code}
        onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="input text-center text-xl tracking-[0.5em] tabular-nums"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="••••••"
        required
        autoFocus
      />
      <button type="submit" disabled={pending || code.length !== 6} className="btn btn-primary h-12">
        {pending && <Loader2 className="size-4 animate-spin" />}
        Нэвтрэх
      </button>
      <div className="flex justify-between text-[13px] font-semibold text-brand">
        <button type="button" onClick={onBack} className="hover:underline">
          Дугаар солих
        </button>
        <button type="button" onClick={onResend} disabled={pending} className="hover:underline">
          Код дахин авах
        </button>
      </div>
    </form>
  );
}
