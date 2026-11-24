/** The one status badge of an order (see orderState). */
export function StatusPill({ label, className }: { label: string; className: string }) {
  return <span className={`rounded-full px-3 py-1 text-[13px] font-bold whitespace-nowrap ${className}`}>{label}</span>;
}
