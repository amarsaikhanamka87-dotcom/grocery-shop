import Link from "next/link";
import { QrCode } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { PayButton } from "./PayButton";

type Props = {
  orderId: string;
  orderNumber: number;
  total: number;
  lineCount: number;
};

export function PayCard({ orderId, orderNumber, total, lineCount }: Props) {
  return (
    <section className="card grid gap-5 p-6 text-center">
      <div>
        <p className="text-[14px] text-muted-foreground">
          Захиалга #{orderNumber} · {lineCount} бүтээгдэхүүн
        </p>
        <p className="mt-1 text-[34px] font-extrabold tabular-nums">
          {formatPrice(total)}
        </p>
      </div>
      <span className="mx-auto grid size-28 place-items-center rounded-2xl bg-brand-50 text-brand">
        <QrCode className="size-14" />
      </span>
      <p className="text-[13.5px] text-muted-foreground">
        Wire.mn-ийн төлбөрийн хуудас руу шилжинэ. QR уншуулах эсвэл банкны
        аппаар төлнө.
      </p>
      <PayButton orderId={orderId} total={total} />
      <Link
        href={`/orders/${orderId}`}
        className="text-[14px] font-semibold text-muted-foreground hover:text-ink">
        Дараа төлөх
      </Link>
    </section>
  );
}
