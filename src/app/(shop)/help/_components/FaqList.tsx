import { shopFaqs } from "@/lib/help/shopFaqs";
import { FaqItem } from "./FaqItem";

export function FaqList() {
  return (
    <div className="mt-8 grid gap-3">
      {shopFaqs.map((f) => (
        <FaqItem key={f.q} question={f.q} answer={f.a} />
      ))}
    </div>
  );
}
