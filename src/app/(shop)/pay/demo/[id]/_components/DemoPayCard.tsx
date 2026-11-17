import Link from "next/link";
import { FlaskConical, QrCode } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { payDemoOrder } from "../_features/payDemoOrder";

type Props = { orderId: string; number: number; total: number; lines: number };

/** Stand-in for the Wire.mn payment page while testing: one button "pays" the order. */
export function DemoPayCard({ orderId, number, total, lines }: Props) {
  return (
    <section className="card grid gap-5 p-6 text-center">
      <p className="mx-auto flex items-center gap-1.5 rounded-full bg-clay-50 px-3 py-1 text-[12.5px] font-bold text-clay">
        <FlaskConical className="size-4" /> ДЕМО ТӨЛБӨР — жинхэнэ мөнгө татахгүй
      </p>
      <div>
        <p className="text-[14px] text-muted-foreground">
          Захиалга #{number} · {lines} бүтээгдэхүүн
        </p>
        <p className="mt-1 text-[34px] font-extrabold tabular-nums">{formatPrice(total)}</p>
      </div>
      <span className="mx-auto grid size-40 place-items-center rounded-2xl border-2 border-dashed border-line text-muted-foreground">
        <QrCode className="size-20" />
      </span>
      <p className="text-[13.5px] text-muted-foreground">
        Төлсний дараа бүтээгдэхүүний үлдэгдлээс захиалсан тоо хасагдана.
      </p>
      <form action={payDemoOrder.bind(null, orderId)}>
        <button type="submit" className="btn btn-primary h-12 w-full text-[15px]">
          Төлбөр төлөх (демо)
        </button>
      </form>
      <Link href={`/orders/${orderId}`} className="text-[14px] font-semibold text-muted-foreground hover:text-ink">
        Дараа төлөх
      </Link>
    </section>
  );
}
