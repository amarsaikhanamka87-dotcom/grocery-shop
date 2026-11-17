import Link from "next/link";
import { SHOP_NAME } from "@/lib/constants";
import { LogoMark } from "./LogoMark";

/** Mark + "Ургац" wordmark, linking home. `light` = on a dark background (footer). */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SHOP_NAME} нүүр хуудас`}>
      <LogoMark light={light} className="size-9 shrink-0" />
      <span className={`text-[26px] leading-none font-extrabold tracking-[-0.03em] ${light ? "text-white" : "text-brand"}`}>
        {SHOP_NAME}
      </span>
    </Link>
  );
}
