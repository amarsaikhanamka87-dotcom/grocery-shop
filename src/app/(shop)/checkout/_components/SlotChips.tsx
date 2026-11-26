import { DELIVERY_SLOTS } from "@/lib/constants";

const CHIP =
  "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-line bg-white px-3 py-3 text-center transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:text-brand";

/** "Цаг": the delivery time window (used by Хуваарьт and Давтамжит). */
export function SlotChips({ slot, onSlot }: { slot: string; onSlot: (value: string) => void }) {
  return (
    <div>
      <p className="label">Цаг</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {DELIVERY_SLOTS.map((s) => (
          <label key={s} className={CHIP}>
            <input type="radio" name="pickSlot" checked={slot === s} onChange={() => onSlot(s)} className="sr-only" />
            <span className="text-[16px] font-bold tabular-nums">{s}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
