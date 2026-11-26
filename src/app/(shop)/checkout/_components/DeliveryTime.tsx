"use client";

import { CalendarCheck, CalendarDays, CalendarSync } from "lucide-react";
import { useDeliveryTime } from "../_features/useDeliveryTime";
import { DeliveryTypeCard } from "./DeliveryTypeCard";
import { ScheduleChips } from "./ScheduleChips";
import { SlotChips } from "./SlotChips";
import { RecurrenceDialog } from "./RecurrenceDialog";

/** Step 2 "Хүргэлтийн хугацаа": Хуваарьт (day + slot) or Давтамжит (repeating plan + slot). */
export function DeliveryTime({ pickup = false }: { pickup?: boolean }) {
  const t = useDeliveryTime(pickup);
  const plan = t.type === "recurring" ? t.plan : null;
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-[16px] font-bold">{pickup ? "Хэзээ очиж авах вэ?" : "Хэзээ хүргэх вэ?"}</h2>
      {/* What the order carries; read by useCheckoutSubmit. */}
      <input type="hidden" name="deliveryType" value={t.type} />
      <input type="hidden" name="deliveryDate" value={t.date} />
      <input type="hidden" name="deliverySlot" value={t.windowText} />
      <input type="hidden" name="recurrence" value={plan?.frequency ?? ""} />
      <input type="hidden" name="recurrenceDays" value={plan?.days.join(",") ?? ""} />
      <input type="hidden" name="recurrenceStart" value={plan?.start ?? ""} />
      <input type="hidden" name="recurrenceEnd" value={plan?.end ?? ""} />

      {!pickup && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <DeliveryTypeCard
            title="Нэг удаа"
            hint="Өдөр, цагаа сонгоно"
            icon={CalendarCheck}
            checked={t.type === "scheduled"}
            onSelect={() => t.setType("scheduled")}
          />
          <DeliveryTypeCard
            title="Тогтмол давтах"
            hint="7 хоног, 14 хоног эсвэл сар бүр"
            icon={CalendarSync}
            checked={t.type === "recurring"}
            onSelect={() => t.setPlanOpen(true)}
          />
        </div>
      )}
      <RecurrenceDialog open={t.planOpen} onOpenChange={t.setPlanOpen} initial={t.plan} onSave={t.savePlan} />

      {(t.type === "scheduled" || t.type === "pickup") && (
        <div className="mt-5">
          <ScheduleChips days={t.days} day={t.day} slot={t.slot} onDay={t.setDay} onSlot={t.setSlot} />
        </div>
      )}
      {t.type === "recurring" && (
        <div className="mt-5">
          <SlotChips slot={t.slot} onSlot={t.setSlot} />
        </div>
      )}

      {/* Day + time chips already show the choice for Хуваарьт / Очиж авах; this summary only for
          the other kinds (Давтамжит plan with "Өөрчлөх", Шуурхай). */}
      {t.type !== "scheduled" && t.type !== "pickup" && (
      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
          <CalendarDays className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] text-muted-foreground">Давтах хуваарь</p>
          <p className="text-[16px] font-bold tabular-nums">{t.summary}</p>
        </div>
        {t.type === "recurring" && (
          <button type="button" onClick={() => t.setPlanOpen(true)} className="flex min-h-11 items-center px-2 text-[16px] font-bold text-brand hover:underline">
            Өөрчлөх
          </button>
        )}
      </div>
      )}
    </section>
  );
}
