"use client";

import { Dialog } from "@base-ui/react/dialog";
import { RECURRENCE_LABEL } from "@/lib/orders/recurrenceLabel";
import { WEEKDAY_OPTIONS } from "@/lib/orders/weekdayOptions";
import type { RecurrencePlan } from "../_features/checkoutSchema";
import { useRecurrenceForm } from "../_features/useRecurrenceForm";
import { ChoiceRow } from "./ChoiceRow";
import { DateField } from "./DateField";

const FREQUENCIES = Object.keys(RECURRENCE_LABEL) as RecurrencePlan["frequency"][];

type Props = { initial: RecurrencePlan | null; onSave: (plan: RecurrencePlan) => void };

/** Inside of the "Давтамжит" dialog: start date, how often, which weekdays, end date. */
export function RecurrenceForm({ initial, onSave }: Props) {
  const f = useRecurrenceForm(initial);
  return (
    <>
      <Dialog.Title className="border-b border-line px-6 py-5 text-lg font-extrabold">Хүргэлтийн огноо</Dialog.Title>
      <div className="grid gap-5 px-6 py-5">
        <DateField label="Циклийн эхлэх хугацаа" value={f.start} min={f.today} onChange={f.setStart} />
        <div className="grid gap-3 border-t border-line pt-5">
          <p className="font-extrabold">Захиалгын давтамж</p>
          {FREQUENCIES.map((value) => (
            <ChoiceRow
              key={value}
              type="radio"
              name="rec-frequency"
              label={RECURRENCE_LABEL[value]}
              checked={f.frequency === value}
              onChange={() => f.setFrequency(value)}
            />
          ))}
        </div>
        <div className="grid gap-3 border-t border-line pt-5">
          <p className="font-extrabold">Өдөр</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WEEKDAY_OPTIONS.map((d) => (
              <ChoiceRow
                key={d.value}
                type="checkbox"
                name="rec-day"
                label={d.label}
                checked={f.days.includes(d.value)}
                onChange={() => f.toggleDay(d.value)}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-line pt-5">
          <DateField
            label={
              <>
                Дуусах <span className="text-clay">*</span>
              </>
            }
            value={f.end}
            min={f.endMin}
            defaultOpen={!f.end}
            onChange={f.setEnd}
          />
        </div>
      </div>
      <div className="flex justify-end border-t border-line px-6 py-4">
        <button
          type="button"
          disabled={!f.plan}
          onClick={() => f.plan && onSave(f.plan)}
          className="btn btn-primary h-11 px-6 disabled:opacity-50"
        >
          Сонгох
        </button>
      </div>
    </>
  );
}
