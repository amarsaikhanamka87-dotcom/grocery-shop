import { Loader2, MessageSquareText } from "lucide-react";
import type { VerifySession } from "@/types/auth";

type Props = {
  phone: string;
  session: VerifySession;
  pending: boolean;
  onResend: () => void;
  onBack: () => void;
};

/** Reverse SMS (verify.mn): the buyer texts the code from their own phone; we poll until it arrives. */
export function PhoneSmsStep({ phone, session, pending, onResend, onBack }: Props) {
  return (
    <div className="grid gap-3">
      <p className="text-[16px] text-muted-foreground">
        <b className="text-ink">+976 {phone}</b> дугаараасаа доорх кодыг{" "}
        <b className="text-ink">{session.shortcode}</b> дугаарт SMS-ээр илгээнэ үү.
      </p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-cream px-3 py-2.5">
          <div className="text-[16px] text-muted-foreground">Хүлээн авагч</div>
          <div className="text-xl font-bold tabular-nums text-ink">{session.shortcode}</div>
        </div>
        <div className="rounded-xl bg-cream px-3 py-2.5">
          <div className="text-[16px] text-muted-foreground">Код</div>
          <div className="text-xl font-bold tracking-[0.2em] tabular-nums text-ink">{session.text}</div>
        </div>
      </div>
      <a href={session.smsUri} className="btn btn-primary h-12">
        <MessageSquareText className="size-4" /> SMS илгээх
      </a>
      <p className="flex items-center justify-center gap-2 text-[16px] text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> SMS ирэхийг хүлээж байна…
      </p>
      <p className="text-center text-[16px] text-muted-foreground">
        2 SIM-тэй бол {phone} дугаартай SIM-ээ сонгоно уу. SMS-ийн төлбөр таны операторын үнээр.
      </p>
      <div className="flex justify-between text-[16px] font-bold text-brand">
        <button type="button" onClick={onBack} className="hover:underline">
          Дугаар солих
        </button>
        <button type="button" onClick={onResend} disabled={pending} className="hover:underline">
          Шинэ код авах
        </button>
      </div>
    </div>
  );
}
