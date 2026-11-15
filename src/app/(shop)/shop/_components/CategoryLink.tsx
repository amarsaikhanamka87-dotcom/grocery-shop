import Link from "next/link";

type Props = { href: string; label: string; count: number; active: boolean };

export function CategoryLink({ href, label, count, active }: Props) {
  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] font-semibold lg:rounded-xl lg:px-3.5 lg:py-2.5 ${
        active ? "bg-brand text-white" : "bg-white text-ink-2 hover:bg-brand-50 lg:bg-transparent"
      }`}
    >
      {label} <span className="text-xs opacity-70 max-lg:hidden">{count}</span>
    </Link>
  );
}
