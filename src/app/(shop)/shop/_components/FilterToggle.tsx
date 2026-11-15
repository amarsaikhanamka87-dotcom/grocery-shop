import Link from "next/link";

export function FilterToggle({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-[14.5px] font-semibold text-ink-2 hover:bg-brand-50"
    >
      <span
        className={`grid size-5 place-items-center rounded-md border ${
          active ? "border-brand bg-brand text-white" : "border-line bg-white"
        }`}
      >
        {active && "✓"}
      </span>
      {label}
    </Link>
  );
}
