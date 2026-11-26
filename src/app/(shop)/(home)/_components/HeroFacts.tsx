import { Truck, Wallet } from "lucide-react";
import { DELIVERY_SLOTS, FREE_DELIVERY_FROM } from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";

// By when: a cook ordering at 06:00 must not expect it the same morning.
const firstDeliveryTime = (DELIVERY_SLOTS[0] ?? "").split("–")[0];

/** The two promises under the hero banner, from the settings so they match checkout. */
export function HeroFacts() {
  const facts = [
    { icon: Truck, text: `Өнөөдөр захиалбал маргааш ${firstDeliveryTime}-аас хүргэнэ` },
    { icon: Wallet, text: `${formatPrice(FREE_DELIVERY_FROM)}-с дээш хүргэлт үнэгүй` },
  ];

  return (
    <ul className="mt-4 flex flex-col gap-2 text-[16px] text-ink sm:flex-row sm:flex-wrap sm:gap-x-8">
      {facts.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon className="size-5 shrink-0 text-brand" aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  );
}
