import type { DeliveryDay } from "../_features/deliveryDays";
import { SlotChips } from "./SlotChips";

const CHIP =
  "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-line bg-white px-3 py-3 text-center transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:text-brand";

type Props = {
  days: DeliveryDay[];
  day: string;
  slot: string;
  onDay: (value: string) => void;
  onSlot: (value: string) => void;
};

/** "Хуваарьт": choose the day and the time window. */
export function ScheduleChips({ days, day, slot, onDay, onSlot }: Props) {
  return (
    <div>
      <p className="label">Өдөр</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {days.map((d) => (
          <label key={d.value} className={CHIP}>
            <input type="radio" name="pickDay" checked={day === d.value} onChange={() => onDay(d.value)} className="sr-only" />
            <span className="text-[15px] font-bold">{d.title}</span>
            <span className="text-[13px] text-muted-foreground">{d.date}</span>
          </label>
        ))}
      </div>
      <div className="mt-5">
        <SlotChips slot={slot} onSlot={onSlot} />
      </div>
    </div>
  );
}
