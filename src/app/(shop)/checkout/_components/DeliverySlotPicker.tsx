import { DELIVERY_SLOTS } from "@/lib/constants";

export function DeliverySlotPicker() {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">3. Хүргэлтийн цаг</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {DELIVERY_SLOTS.map((s, i) => (
          <label
            key={s}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] font-semibold has-[:checked]:border-brand has-[:checked]:bg-brand-50"
          >
            <input type="radio" name="deliverySlot" value={s} defaultChecked={i === 0} className="size-4 accent-[#2e5d3d]" />
            {s}
          </label>
        ))}
      </div>
    </section>
  );
}
