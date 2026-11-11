import Link from "next/link";
import { Leaf } from "lucide-react";
import { SHOP_NAME } from "@/lib/constants";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SHOP_NAME} нүүр хуудас`}>
      <span
        className={`grid size-9 place-items-center rounded-[10px] ${light ? "bg-white text-brand" : "bg-brand text-white"}`}
      >
        <Leaf className="size-5" strokeWidth={2.4} />
      </span>
      <span className={`text-[26px] font-extrabold tracking-[-0.03em] ${light ? "text-white" : "text-brand"}`}>
        {SHOP_NAME}
      </span>
    </Link>
  );
}
