import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow: React.ReactNode;
  title: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ eyebrow, title, link }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-section mt-2">{title}</h2>
      </div>
      {link && (
        <Link href={link.href} className="flex items-center gap-1.5 text-[15px] font-bold text-brand hover:underline">
          {link.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
