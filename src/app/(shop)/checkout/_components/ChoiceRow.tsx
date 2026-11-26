type Props = {
  type: "radio" | "checkbox";
  name: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
};

/** A bordered row with a radio/checkbox, a label and an optional grey line under it. */
export function ChoiceRow({ type, name, label, hint, checked, onChange }: Props) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-[16px] transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-50">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-5 shrink-0 accent-[#2e5d3d]"
      />
      <span className="min-w-0">
        <span className="block font-bold">{label}</span>
        {hint && <span className="block text-muted-foreground">{hint}</span>}
      </span>
    </label>
  );
}
