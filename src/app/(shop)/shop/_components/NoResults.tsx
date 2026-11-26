import Link from "next/link";
import { SearchX } from "lucide-react";

type Props = { hint: string; action: { href: string; label: string } };

/** Empty list: why it is empty and one way out. */
export function NoResults({ hint, action }: Props) {
  return (
    <div className="grid place-items-center py-24 text-center">
      <SearchX className="size-10 text-muted-foreground" />
      <p className="mt-4 text-[16px] font-bold">Бүтээгдэхүүн олдсонгүй</p>
      <p className="mt-1 text-[16px] text-muted-foreground">{hint}</p>
      <Link href={action.href} className="btn btn-primary mt-6 h-11 px-6">
        {action.label}
      </Link>
    </div>
  );
}
