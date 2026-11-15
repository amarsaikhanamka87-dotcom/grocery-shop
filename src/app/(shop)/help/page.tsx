import type { Metadata } from "next";
import { FaqList } from "./_components/FaqList";
import { DeliveryInfo } from "./_components/DeliveryInfo";
import { ContactBanner } from "./_components/ContactBanner";

export const metadata: Metadata = { title: "Тусламж" };

export default function HelpPage() {
  return (
    <div className="container-x max-w-3xl pt-10">
      <p className="eyebrow">Тусламж</p>
      <h1 className="mt-2 text-[38px] font-extrabold tracking-[-0.03em] sm:text-[48px]">Хэрхэн захиалах вэ</h1>
      <FaqList />
      <DeliveryInfo />
      <ContactBanner />
    </div>
  );
}
