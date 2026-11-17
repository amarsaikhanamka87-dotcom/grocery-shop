type Props = { light?: boolean; className?: string };

/** The Ургац mark: a market crate of produce with a sprouting leaf, on a green (or white) tile. */
export function LogoMark({ light = false, className }: Props) {
  const tile = light ? "#ffffff" : "var(--color-brand)";
  const crate = light ? "var(--color-brand)" : "#faf8f3";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="11" fill={tile} />
      <circle cx="14.5" cy="18.5" r="5" fill="#e0703d" />
      <circle cx="24.5" cy="17.5" r="5.5" fill="#f2b84b" />
      <path d="M24.5 12.2c-.2-3.4 2.1-5.8 6-5.9.1 3.5-2.2 5.8-6 5.9z" fill="#8cc152" />
      <path d="M24.5 12.2c.9-1.7 2.4-3 4.2-3.9" stroke={tile} strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M8 21h24l-2.1 10.4a2.2 2.2 0 0 1-2.2 1.8H12.3a2.2 2.2 0 0 1-2.2-1.8z" fill={crate} />
      <path d="M10.4 25.4h19.2M11.2 29.2h17.6" stroke={tile} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
