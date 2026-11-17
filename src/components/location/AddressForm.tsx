"use client";

import { Crosshair, LoaderCircle } from "lucide-react";
import { DISTRICTS } from "@/lib/constants";
import type { FoundAddress } from "@/types/location";
import { useAddressForm } from "./useAddressForm";

type Props = { id: string; initial?: FoundAddress | null; onSubmit: (address: FoundAddress) => void };

/** District + detailed address, with a button that fills them from the browser's location. */
export function AddressForm({ id, initial, onSubmit }: Props) {
  const f = useAddressForm(initial);
  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(f.value);
      }}
      className="grid gap-4"
    >
      <button
        type="button"
        onClick={f.locate}
        disabled={f.locating}
        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-brand bg-brand-50 text-[14px] font-bold text-brand disabled:opacity-60"
      >
        {f.locating ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
        Миний байршлыг ашиглах
      </button>
      {f.error && <p className="text-[13px] font-medium text-clay">{f.error}</p>}
      <div>
        <label className="label" htmlFor={`${id}-district`}>Дүүрэг</label>
        <select
          id={`${id}-district`}
          className="input"
          value={f.district}
          onChange={(e) => f.setDistrict(e.target.value)}
          required
        >
          <option value="" disabled>
            Сонгох
          </option>
          {DISTRICTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor={`${id}-detail`}>Дэлгэрэнгүй хаяг</label>
        <textarea
          id={`${id}-detail`}
          rows={3}
          className="input"
          value={f.detail}
          onChange={(e) => f.setDetail(e.target.value)}
          placeholder="Хороо, гудамж, байр/барилга, орц, давхар, тоот"
          required
        />
      </div>
    </form>
  );
}
