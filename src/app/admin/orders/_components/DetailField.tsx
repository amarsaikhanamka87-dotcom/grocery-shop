import { cn } from "@/lib/utils";

type Props = { label: string; value: React.ReactNode; wide?: boolean };

/** One label/value pair in the order dialog. */
export function DetailField({ label, value, wide }: Props) {
  return (
    <div className={cn("min-w-0", wide && "sm:col-span-2")}>
      <dt className="text-[12.5px] text-muted-foreground">{label}</dt>
      <dd className="break-words text-[14.5px] font-semibold">{value}</dd>
    </div>
  );
}
