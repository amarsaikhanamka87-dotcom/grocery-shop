import { Leaf, RotateCcw, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format/formatPrice";
import { FREE_DELIVERY_FROM } from "@/lib/constants";

export function DeliveryPerks() {
  return (
    <ul className="mt-8 grid gap-3 rounded-[20px] border border-line bg-white p-5 text-[14.5px]">
      <li className="flex items-center gap-3">
        <Truck className="size-5 text-brand" />
        {formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалгад хүргэлт үнэгүй
      </li>
      <li className="flex items-center gap-3">
        <Leaf className="size-5 text-brand" /> QR кодоор бүх банкны аппаар төлнө
      </li>
      <li className="flex items-center gap-3">
        <RotateCcw className="size-5 text-brand" /> Чанарын шаардлага хангаагүй бол хүлээн авахдаа буцаана
      </li>
    </ul>
  );
}
