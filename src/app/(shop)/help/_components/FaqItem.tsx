import { ChevronDown } from "lucide-react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="card group p-5 open:shadow-card">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold">
        {question}
        <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{answer}</p>
    </details>
  );
}
