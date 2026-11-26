import Link from "next/link";
import { ArrowRight, Clock, Store, Truck, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DELIVERY_DAYS_AHEAD, DELIVERY_FEE, DELIVERY_SLOTS, FREE_DELIVERY_FROM, PICKUP_POINT } from "@/lib/constants";
import { formatPrice } from "@/lib/format/formatPrice";

const firstSlot = DELIVERY_SLOTS[0] ?? "";
const lastSlot = DELIVERY_SLOTS.at(-1) ?? "";
const hours = `${firstSlot.split("–")[0]}–${lastSlot.split("–")[1] ?? ""}`;

// Every number comes from lib/constants.ts (the same values checkout uses), never typed here.
// Only the three things that decide an order; payment, НӨАТ and repeats are on /help.
const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Truck,
    title: `Хүргэлт ${formatPrice(DELIVERY_FEE)}`,
    text: `${formatPrice(FREE_DELIVERY_FROM)}-с дээш захиалга, батлагдсан бизнес хэрэглэгчид үнэгүй.`,
  },
  {
    icon: Clock,
    title: `${hours} цагт хүргэнэ`,
    text: `Маргаашаас ${DELIVERY_DAYS_AHEAD} хоногийн дотор өдөр, цагаа сонгоно.`,
  },
  { icon: Store, title: "Очиж авах", text: `${PICKUP_POINT.detail}, ${PICKUP_POINT.district}. Хүргэлтийн төлбөргүй.` },
];

/** "Хэрхэн захиалах": fee, hours, pickup; the rest is on /help ("Түгээмэл асуулт"). */
export function HowItWorks() {
  return (
    <section className="container-x mt-12 sm:mt-16">
      <SectionHeading title="Хэрхэн захиалах" />
      <ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-3 rounded-[20px] border border-line bg-white p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 text-[16px] leading-snug">
              <span className="block font-bold text-ink">{title}</span>
              <span className="text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <Link href="/help" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[16px] font-bold text-brand hover:underline">
        Төлбөр, НӨАТ, давтамжит захиалга <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
