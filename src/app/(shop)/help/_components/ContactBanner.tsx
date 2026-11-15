import { Phone } from "lucide-react";
import { SHOP_PHONE } from "@/lib/constants";

export function ContactBanner() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-brand p-6 text-white">
      <p className="text-lg font-bold">Асуулт байна уу? Бидэнтэй холбогдоорой.</p>
      <a href={`tel:${SHOP_PHONE}`} className="btn h-11 bg-white px-5 text-brand">
        <Phone className="size-4" /> {SHOP_PHONE}
      </a>
    </div>
  );
}
