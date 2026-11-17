import { TriangleAlert } from "lucide-react";

/** Banner over the cart while some lines ask for more than is in stock. */
export function StockAlert({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" />
      <div>
        <p className="font-bold">{count} бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна</p>
        <p className="text-[13.5px]">Захиалга хийхийн өмнө доорх тоог засна уу.</p>
      </div>
    </div>
  );
}
