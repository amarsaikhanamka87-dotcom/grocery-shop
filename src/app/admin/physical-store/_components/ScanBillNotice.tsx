import { ScanText } from "lucide-react";

type Props = { skipped: string | undefined; lineCount: number };

// Shown on Касс after a handwritten order was turned into the bill: check it, and what wasn't matched.
// With no usable line (unknown or sold-out products) it says so instead of "bill is ready".
export function ScanBillNotice({ skipped, lineCount }: Props) {
  return (
    <div role="status" className="mt-4 flex gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink">
      <ScanText className="mt-0.5 size-5 shrink-0 text-brand" />
      <div className="min-w-0">
        {lineCount > 0 ? (
          <p className="font-semibold">Гар бичмэл захиалгаас тооцоо бэлдлээ. Бараа, тоог шалгаад төлбөр авна уу.</p>
        ) : (
          <p className="font-semibold text-clay">
            Гар бичмэл захиалгын бараа олдсонгүй эсвэл дууссан байна. Бараагаа доороос гараар сонгоно уу.
          </p>
        )}
        {skipped && (
          <p className="mt-1 break-words text-clay">Олдоогүй мөр (гараар нэмнэ үү): {skipped}</p>
        )}
      </div>
    </div>
  );
}
