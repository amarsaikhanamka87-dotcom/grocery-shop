import { Loader2, Smartphone } from "lucide-react";

type Props = {
  phone: string;
  pending: boolean;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
};

export function PhoneNumberStep({ phone, pending, onPhoneChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid gap-3"
    >
      <label className="label" htmlFor="phone">Утасны дугаар</label>
      <div className="flex items-center gap-2">
        <span className="input w-auto shrink-0 bg-cream-2 font-semibold">+976</span>
        <input
          id="phone"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="input"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="9911 2233"
          maxLength={9}
          required
        />
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary h-12">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Smartphone className="size-4" />}
        SMS код авах
      </button>
    </form>
  );
}
