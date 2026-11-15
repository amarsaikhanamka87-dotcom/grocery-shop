import { QrCode } from "lucide-react";

export function PaymentInfo() {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">4. Төлбөр</h2>
      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-brand bg-brand-50 px-4 py-3.5">
        <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
          <QrCode className="size-5" />
        </span>
        <p className="text-[14.5px] font-semibold">QR код — бүх банкны аппаар уншуулж төлнө</p>
      </div>
      <p className="mt-3 text-[13px] text-muted-foreground">
        Захиалга баталгаажсаны дараа нэхэмжлэх үүсч, төлбөр орсны дараа захиалга бэлтгэгдэж эхэлнэ.
      </p>
    </section>
  );
}
