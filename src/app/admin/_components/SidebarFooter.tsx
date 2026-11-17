import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SidebarFooter() {
  return (
    <div className="border-t border-line p-3">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-ink-2 hover:bg-cream-2 hover:text-ink"
      >
        <ArrowLeft className="size-[18px]" />
        Дэлгүүр рүү буцах
      </Link>
    </div>
  );
}
