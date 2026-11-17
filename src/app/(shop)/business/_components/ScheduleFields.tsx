import { nextDeliveryDate } from "../_features/nextDeliveryDate";

type Props = {
  dayOfMonth: number;
  active: boolean;
  onDayChange: (day: number) => void;
  onActiveChange: (active: boolean) => void;
};

export function ScheduleFields({ dayOfMonth, active, onDayChange, onActiveChange }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label className="label" htmlFor="dayOfMonth">Сар бүрийн хэдэнд</label>
        <select id="dayOfMonth" value={dayOfMonth} onChange={(e) => onDayChange(Number(e.target.value))} className="input w-28">
          {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <label className="flex h-[46px] cursor-pointer items-center gap-2.5 text-[15px] font-semibold">
        <input type="checkbox" checked={active} onChange={(e) => onActiveChange(e.target.checked)} className="size-4 accent-[#2e5d3d]" />
        Идэвхтэй
      </label>
      <p className="pb-3 text-[14px] text-muted-foreground">
        {active ? `Дараагийн: ${nextDeliveryDate(dayOfMonth)}` : "Түр зогссон"}
      </p>
    </div>
  );
}
