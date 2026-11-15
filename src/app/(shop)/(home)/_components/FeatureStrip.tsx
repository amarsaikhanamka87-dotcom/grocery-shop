import { QrCode, Scale, Tractor, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { FREE_DELIVERY_FROM } from "@/lib/constants";

const features = [
  { icon: Scale, title: "Бөөний үнэ", text: "Кг-аар, зуучлагчгүй" },
  { icon: Truck, title: "Өглөө 06:00-с", text: `${formatPrice(FREE_DELIVERY_FROM)}-с дээш үнэгүй` },
  { icon: Tractor, title: "40+ ферм", text: "Монголын тариаланчид" },
  { icon: QrCode, title: "QR төлбөр", text: "Бүх банкны аппаар" },
];

export function FeatureStrip() {
  return (
    <section className="container-x">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-line bg-line lg:grid-cols-4">
        {features.map((f) => (
          <li
            key={f.title}
            className="flex flex-col items-start gap-3 bg-white p-4 sm:flex-row sm:items-center sm:gap-3.5 sm:p-6"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
              <f.icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold">{f.title}</p>
              <p className="text-[13px] text-muted-foreground">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
