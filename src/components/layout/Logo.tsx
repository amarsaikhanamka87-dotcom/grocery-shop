import Link from "next/link";
import { SHOP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

const words = SHOP_NAME.split(" ");
const lastWord = words.pop();
const firstWords = words.join(" ");

/**
 * Sack mark + the store name stacked in two lines ("Бөөний Зах" / "ОНЛАЙН"), linking home.
 * Header, footer and mobile menu. `light` = on a dark background (footer). Two short lines keep it
 * narrow enough for the crowded phone header. The one brand mark, outside the 3 text styles.
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label={SHOP_NAME} className="flex min-h-11 shrink-0 items-center gap-2 md:gap-2.5">
      <LogoMark className="size-8 shrink-0 md:size-9" />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={cn(
            "text-[16px] font-extrabold tracking-[-0.02em] md:text-[19px]",
            light ? "text-white" : "text-ink",
          )}
        >
          {firstWords}
        </span>
        <span
          className={cn(
            "mt-1 text-[9.5px] font-extrabold tracking-[0.3em] uppercase md:text-[10.5px]",
            light ? "text-brand-100" : "text-brand",
          )}
        >
          {lastWord}
        </span>
      </span>
    </Link>
  );
}
