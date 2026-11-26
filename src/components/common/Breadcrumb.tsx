import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center text-[16px] text-muted-foreground" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <Fragment key={c.label}>
          {i > 0 && <span className="mx-1.5">/</span>}
          {c.href ? (
            <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-brand">
              {c.label}
            </Link>
          ) : (
            <span className="text-ink">{c.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
