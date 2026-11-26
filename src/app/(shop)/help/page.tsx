import type { Metadata } from "next";
import { FaqList } from "./_components/FaqList";
import { DeliveryInfo } from "./_components/DeliveryInfo";
import { ContactBanner } from "./_components/ContactBanner";

export const metadata: Metadata = { title: "Түгээмэл асуулт" };

export default function HelpPage() {
  return (
    <div className="container-x max-w-3xl pt-10">
      <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-[42px]">Түгээмэл асуулт</h1>
      <FaqList />
      <DeliveryInfo />
      <ContactBanner />
    </div>
  );
}
