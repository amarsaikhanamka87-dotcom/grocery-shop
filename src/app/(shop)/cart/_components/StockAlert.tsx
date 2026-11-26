import { TriangleAlert } from "lucide-react";

/** Banner over the cart while some lines ask for more than is in stock (ink + green only). */
export function StockAlert({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-ink bg-white p-4 text-[16px]">
      <TriangleAlert className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-bold">{count} бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна</p>
        <p className="text-muted-foreground">Захиалахын өмнө доорх тоог засна уу.</p>
      </div>
    </div>
  );
}
