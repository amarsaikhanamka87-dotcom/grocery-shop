import { CircleCheck, Clock, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { BankTransferCard } from "@/components/payment/BankTransferCard";
import { PaymentPoller } from "./PaymentPoller";

type Props = {
  paid: boolean;
  cancelled: boolean;
  total: number;
  orderNumber: number;
  isTransfer: boolean;
  checkoutUrl: string | null;
};

export function PaymentStatusCard({
  paid,
  cancelled,
  total,
  orderNumber,
  isTransfer,
  checkoutUrl,
}: Props) {
  if (paid) {
    return (
      <section className="card flex items-center gap-4 border-brand bg-brand-50 p-5 sm:p-6">
        <CircleCheck className="size-10 shrink-0 text-brand" />
        <div>
          <p className="text-lg font-extrabold text-brand">Төлбөр төлөгдлөө</p>
          <p className="text-[14.5px] text-muted-foreground">
            {formatPrice(total)} хүлээн авлаа. Захиалгыг бэлтгэж эхэлнэ.
          </p>
        </div>
      </section>
    );
  }
  if (cancelled) {
    return (
      <section className="card flex items-center gap-4 p-5 sm:p-6">
        <XCircle className="size-10 shrink-0 text-clay" />
        <p className="text-lg font-extrabold">Захиалга цуцлагдсан</p>
      </section>
    );
  }
  return (
    <section className="card grid gap-4 p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <Clock className="size-10 shrink-0 text-clay" />
        <div>
          <p className="text-lg font-extrabold">
            {isTransfer ? "Шилжүүлэг хүлээгдэж байна" : "Төлбөр хүлээгдэж байна"}
          </p>
          <p className="text-[14.5px] text-muted-foreground">
            {isTransfer
              ? "Доорх данс руу шилжүүлнэ үү. Бид шалгаад баталгаажуулахад энэ хуудас шинэчлэгдэнэ."
              : "Төлбөр орсны дараа энэ хуудас автоматаар шинэчлэгдэнэ."}
          </p>
        </div>
      </div>
      {isTransfer && <BankTransferCard orderNumber={orderNumber} total={total} />}
      <div className="flex flex-wrap gap-2">
        {checkoutUrl && !isTransfer && (
          <a href={checkoutUrl} className="btn btn-primary h-11 px-6">
            Төлөх · {formatPrice(total)}
          </a>
        )}
        <PaymentPoller />
      </div>
    </section>
  );
}
