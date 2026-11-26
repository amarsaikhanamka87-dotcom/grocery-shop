import { TriangleAlert } from "lucide-react";

/**
 * For an unpaid QR / bank-app order: what it means and what (not) to do, so the owner isn't left
 * guessing. Unlike transfers these are not cancelled automatically (owner to decide).
 */
export function UnpaidOrderNote() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-clay-50 p-4 text-[16px] text-clay">
      <TriangleAlert className="mt-0.5 size-5 shrink-0" />
      <p>
        <b>Худалдан авагч QR-ээр төлөөгүй байна.</b> Төлөхөөс нааш бараа гаргахгүй. Хэрэгтэй бол доорх
        утсаар нь залгана уу.
      </p>
    </div>
  );
}
