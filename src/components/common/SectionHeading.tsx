import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow?: React.ReactNode;
  title: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ eyebrow, title, link }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h-section">{title}</h2>
      </div>
      {link && (
        <Link href={link.href} className="flex min-h-11 items-center gap-1.5 text-[16px] font-bold text-brand hover:underline">
          {link.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
