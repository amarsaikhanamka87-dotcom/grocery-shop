"use client";

import { Truck } from "lucide-react";
import { addressLabel } from "@/lib/location/addressLabel";
import type { FoundAddress } from "@/types/location";

type Props = { address: FoundAddress; onAnswer: (accept: boolean) => void };

/** "Энэ хаяг руу хүргүүлэх үү?" — shown under the header pill after the browser shares its location. */
export function ConfirmAddressCard({ address, onAnswer }: Props) {
  return (
    <div className="grid gap-4">
      <div>
        <p className="text-lg font-extrabold">Энэ хаяг руу хүргүүлэх үү?</p>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Хүргүүлэх хаягнаас шалтгаалж авах боломжтой бүтээгдэхүүн харагдана.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white">
          <Truck className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] text-muted-foreground">Хүргүүлэх хаяг:</p>
          <p className="text-[15px] font-bold">{addressLabel(address)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => onAnswer(false)} className="btn btn-outline h-11">
          Үгүй
        </button>
        <button type="button" onClick={() => onAnswer(true)} className="btn btn-primary h-11">
          Тийм
        </button>
      </div>
    </div>
  );
}
