"use client";

import { MapPinned, Trash2 } from "lucide-react";
import { addressLabel } from "@/lib/location/addressLabel";
import type { DeliveryAddress } from "@/types/location";

type Props = {
  saved: DeliveryAddress[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

/** "Хадгалсан хаяг" tab: pick one of the saved addresses, or an empty state. */
export function SavedAddressList({ saved, selectedId, onSelect, onRemove }: Props) {
  if (saved.length === 0) {
    return (
      <div className="grid place-items-center gap-4 py-10 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-brand-50 text-brand">
          <MapPinned className="size-10" />
        </span>
        <p className="text-[15px] text-muted-foreground">Танд одоогоор хадгалсан хаяг байхгүй байна.</p>
      </div>
    );
  }
  return (
    <ul className="grid max-h-[45vh] gap-2.5 overflow-y-auto pr-1">
      {saved.map((a) => (
        <li key={a.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-50">
            <input
              type="radio"
              name="saved-address"
              checked={selectedId === a.id}
              onChange={() => onSelect(a.id)}
              className="size-4 shrink-0 accent-[#2e5d3d]"
            />
            <span className="min-w-0 flex-1 text-[14.5px] font-semibold">{addressLabel(a)}</span>
            <button
              type="button"
              onClick={() => onRemove(a.id)}
              aria-label="Хаяг устгах"
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-cream-2 hover:text-clay"
            >
              <Trash2 className="size-4" />
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
}
