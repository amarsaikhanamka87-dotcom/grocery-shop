type Props = {
  type: "radio" | "checkbox";
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

/** A bordered row with a radio/checkbox and a label (frequency and weekday choices). */
export function ChoiceRow({ type, name, label, checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] font-semibold transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-50">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-5 shrink-0 accent-[#2e5d3d]"
      />
      {label}
    </label>
  );
}
