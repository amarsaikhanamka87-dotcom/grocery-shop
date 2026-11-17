import { CalendarClock, Truck } from "lucide-react";

export function PerksCard() {
  return (
    <section className="card grid gap-4 p-6">
      <h2 className="text-lg font-extrabold">Таны давуу тал</h2>
      <p className="flex items-center gap-3 text-[15px]">
        <Truck className="size-5 shrink-0 text-brand" /> Бүх захиалгад хүргэлт үнэгүй
      </p>
      <p className="flex items-center gap-3 text-[15px]">
        <CalendarClock className="size-5 shrink-0 text-brand" /> Сар бүрийн захиалгын жагсаалт
      </p>
    </section>
  );
}
