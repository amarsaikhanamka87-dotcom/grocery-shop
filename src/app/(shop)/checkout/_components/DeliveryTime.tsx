"use client";

import { Bike, CalendarCheck, CalendarDays } from "lucide-react";
import { useDeliveryTime } from "../_features/useDeliveryTime";
import { DeliveryTypeCard } from "./DeliveryTypeCard";
import { ScheduleChips } from "./ScheduleChips";

/** Step 2 "Хүргэлтийн хугацаа": Шуурхай (today, within the hour) or Хуваарьт (day + slot). */
export function DeliveryTime() {
  const t = useDeliveryTime();
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-lg font-extrabold">Хүргэлтийн хугацаа</h2>
      {/* What the order will carry once orders are saved (Day 6). */}
      <input type="hidden" name="deliveryType" value={t.type} />
      <input type="hidden" name="deliveryDate" value={t.date} />
      <input type="hidden" name="deliverySlot" value={t.windowText} />

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <DeliveryTypeCard
          title="Шуурхай"
          hint={t.express ? "Шуурхай хүргэлт" : "Одоогоор боломжгүй"}
          icon={Bike}
          checked={t.type === "express"}
          disabled={!t.express}
          onSelect={() => t.setType("express")}
        />
        <DeliveryTypeCard
          title="Хуваарьт"
          hint="Хуваарьт хүргэлт"
          icon={CalendarCheck}
          checked={t.type === "scheduled"}
          onSelect={() => t.setType("scheduled")}
        />
      </div>

      {t.type === "scheduled" && (
        <div className="mt-5">
          <ScheduleChips days={t.days} day={t.day} slot={t.slot} onDay={t.setDay} onSlot={t.setSlot} />
        </div>
      )}

      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
          <CalendarDays className="size-6" />
        </span>
        <div>
          <p className="text-[14px] text-muted-foreground">Хүргэлтийн огноо</p>
          <p className="text-[16px] font-bold tabular-nums">{t.summary}</p>
        </div>
      </div>
    </section>
  );
}
