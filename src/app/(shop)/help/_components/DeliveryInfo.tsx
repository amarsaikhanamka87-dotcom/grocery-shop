import { DELIVERY_SLOTS, DISTRICTS } from "@/lib/constants";

export function DeliveryInfo() {
  return (
    <section id="delivery" className="mt-16 scroll-mt-48">
      <h2 className="text-2xl font-extrabold tracking-tight">Хүргэлтийн бүс ба цаг</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-bold">Хүргэдэг дүүргүүд</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {DISTRICTS.map((d) => (
              <li key={d} className="rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-bold">Хүргэлтийн цагууд</h3>
          <ul className="mt-3 grid gap-1.5 text-[15px] text-ink-2">
            {DELIVERY_SLOTS.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
