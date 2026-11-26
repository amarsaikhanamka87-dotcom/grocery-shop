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

/** Inside of the "Тогтмол захиалга" dialog: start date, how often, which weekdays, end date. */
export function RecurrenceForm({ initial, onSave }: Props) {
  const f = useRecurrenceForm(initial);
  const monthly = f.frequency === "MONTHLY";
  return (
    <>
      <Dialog.Title className="border-b border-line px-6 py-5 text-[16px] font-bold">Тогтмол захиалга</Dialog.Title>
      <div className="grid gap-5 px-6 py-5">
        <DateField label="Эхлэх өдөр" value={f.start} min={f.firstDay} onChange={f.setStart} />
        <div className="grid gap-3 border-t border-line pt-5">
          <p className="text-[16px] font-bold">Хэр давтамжтай вэ?</p>
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
          <p className="text-[16px] font-bold">
            {monthly ? "Сар бүрийн эхний аль гарагт хүргэх вэ?" : "Аль гарагт хүргэх вэ?"}
          </p>
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
          <DateField label="Дуусах өдөр" value={f.end} min={f.endMin} defaultOpen={!f.end} onChange={f.setEnd} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line px-6 py-4">
        {/* Say what is still missing instead of a silent grey button. */}
        {f.missing && <p className="mr-auto text-[16px] text-muted-foreground">Сонгоно уу: {f.missing}</p>}
        <Dialog.Close className="btn btn-outline h-11 px-6">Болих</Dialog.Close>
        <button
          type="button"
          disabled={!f.plan}
          onClick={() => f.plan && onSave(f.plan)}
          className="btn btn-primary h-11 px-6 disabled:opacity-50"
        >
          Хадгалах
        </button>
      </div>
    </>
  );
}
