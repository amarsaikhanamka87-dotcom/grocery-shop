import { cn } from "@/lib/utils";

/** A grey pulsing block that stands in for content while data loads. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-xl bg-line/70", className)} />;
}
