import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-[13px] font-medium text-muted-foreground" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <Fragment key={c.label}>
          {i > 0 && <span className="mx-1.5">/</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-brand">
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
