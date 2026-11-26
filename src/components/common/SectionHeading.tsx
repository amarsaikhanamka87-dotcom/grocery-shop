import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow?: React.ReactNode;
  title: string;
  link?: { href: string; label: string };
};

/** Section title (display size) with an optional short link on the same row, right-aligned. */
export function SectionHeading({ eyebrow, title, link }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h-section">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="flex min-h-11 shrink-0 items-center gap-1.5 text-[16px] font-bold whitespace-nowrap text-brand hover:underline"
        >
          {link.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
