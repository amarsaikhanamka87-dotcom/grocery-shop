/** A small colored status badge. */
export function StatusPill({ label, className }: { label: string; className: string }) {
  return <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${className}`}>{label}</span>;
}
