import Link from "next/link";

type Props = { href: string; label: string; count?: number; active: boolean };

/** A category chip (phones: one row that scrolls sideways) / list row (desktop). Count only on desktop. */
export function CategoryLink({ href, label, count, active }: Props) {
  return (
    <Link
      href={href}
      data-active-chip={active || undefined}
      aria-current={active ? "page" : undefined}
      className={`flex h-11 shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full px-4 text-[16px] font-bold lg:rounded-xl lg:px-3.5 ${
        active ? "bg-brand text-white" : "bg-white text-ink-2 hover:bg-brand-50 max-lg:border max-lg:border-line lg:bg-transparent"
      }`}
    >
      {label}
      {count !== undefined && <span className="tabular-nums opacity-80 max-lg:hidden">{count}</span>}
    </Link>
  );
}
