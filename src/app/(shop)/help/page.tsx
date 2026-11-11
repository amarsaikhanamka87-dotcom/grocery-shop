import type { Metadata } from "next";
import { ChevronDown, Phone } from "lucide-react";
import { DELIVERY_FEE, DELIVERY_SLOTS, DISTRICTS, FREE_DELIVERY_FROM, SHOP_PHONE } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Тусламж" };

const faqs = [
  {
    q: "Хэн захиалга өгөх боломжтой вэ?",
    a: "Ресторан, зочид буудал, гуанз, хүнсний дэлгүүр зэрэг байгууллагууд. Байгууллагын нэр, регистрээр бүртгүүлэхэд манай ажилтан 1 ажлын өдрийн дотор шалгаж баталгаажуулна.",
  },
  { q: "Хамгийн бага захиалга хэд вэ?", a: "Бүтээгдэхүүн бүр өөрийн хамгийн бага захиалгын хэмжээтэй (жишээ нь төмс 25 кг, лооль 5 кг). Үүнийг бүтээгдэхүүн дээр харуулсан." },
  {
    q: "Хүргэлт хэдэн төгрөг вэ?",
    a: `${formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй. Түүнээс бага захиалгад ${formatPrice(DELIVERY_FEE)} хүргэлтийн төлбөр нэмэгдэнэ.`,
  },
  { q: "Төлбөрөө хэрхэн төлөх вэ?", a: "Захиалга өгсний дараа QPay нэхэмжлэх үүснэ. Ямар ч банкны аппаар QR кодыг уншуулж төлнө. Төлбөр орсны дараа захиалга бэлтгэгдэж эхэлнэ." },
  { q: "Захиалгаа цуцалж болох уу?", a: `Төлбөр төлөхөөс өмнө захиалгын хуудаснаас өөрөө цуцална. Төлсний дараа ${SHOP_PHONE} дугаарт залгана уу.` },
  { q: "Ногооны чанар шаардлага хангаагүй бол?", a: "Хүлээн авахдаа шалгаад шаардлага хангаагүй ногоогоо хүргэгчид буцааж өгнө. Бид дараагийн хүргэлтээр солих эсвэл мөнгийг буцаана." },
];

export default function HelpPage() {
  return (
    <div className="container-x max-w-3xl pt-10">
      <p className="eyebrow">Тусламж</p>
      <h1 className="mt-2 text-[38px] font-extrabold tracking-[-0.03em] sm:text-[48px]">Хэрхэн захиалах вэ</h1>

      <div className="mt-10 grid gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="card group p-5 open:shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold">
              {f.q}
              <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>

      <section id="delivery" className="mt-16 scroll-mt-48">
        <h2 className="text-2xl font-extrabold tracking-tight">Хүргэлтийн бүс ба цаг</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-bold">Хүргэдэг дүүргүүд</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {DISTRICTS.map((d) => (
                <li key={d} className="rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand">{d}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">Хүргэлтийн цагууд</h3>
            <ul className="mt-3 grid gap-1.5 text-[15px] text-ink-2">
              {DELIVERY_SLOTS.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-brand p-6 text-white">
        <p className="text-lg font-bold">Асуулт байна уу? Бидэнтэй холбогдоорой.</p>
        <a href={`tel:${SHOP_PHONE.replace("-", "")}`} className="btn h-11 bg-white px-5 text-brand">
          <Phone className="size-4" /> {SHOP_PHONE}
        </a>
      </div>
    </div>
  );
}
