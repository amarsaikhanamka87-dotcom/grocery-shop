"use client";

import { MapPin } from "lucide-react";
import { DISTRICTS } from "@/lib/constants";
import { useDeliveryLocation } from "@/components/location/useDeliveryLocation";

type Props = { defaults: { name: string; phone: string } };

/** Step 1: where to deliver — pre-filled from the header address; phone for the courier. */
export function DeliveryAddress({ defaults }: Props) {
  const { current, setDialogOpen } = useDeliveryLocation();
  return (
    // Re-mount the fields when the chosen address changes so they pick up the new values.
    <section key={current?.id ?? "none"} className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <MapPin className="size-5 text-brand" /> Хүргүүлэх хаяг
        </h2>
        <button type="button" onClick={() => setDialogOpen(true)} className="text-[14px] font-bold text-brand hover:underline">
          {current ? "Хаяг солих" : "Хаяг сонгох"}
        </button>
      </div>
      {/* The name comes from the account; the courier only needs the phone below. */}
      <input type="hidden" name="customerName" value={defaults.name} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="district">Дүүрэг</label>
          <select id="district" name="district" className="input" defaultValue={current?.district ?? ""} required>
            <option value="" disabled>
              Сонгох
            </option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="phone">Утасны дугаар</label>
          <input
            id="phone"
            name="phone"
            defaultValue={defaults.phone}
            className="input"
            inputMode="numeric"
            pattern="[0-9]{8}"
            title="8 оронтой утасны дугаар"
            placeholder="99112233"
            autoComplete="tel"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="address">Дэлгэрэнгүй хаяг</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            defaultValue={current?.detail ?? ""}
            className="input"
            placeholder="Хороо, гудамж, байр/барилга, орц, давхар, тоот"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="note">Нэмэлт тайлбар (заавал биш)</label>
          <input id="note" name="note" className="input" placeholder="Жишээ нь: арын хаалгаар, хаалганы код" />
        </div>
      </div>
    </section>
  );
}
