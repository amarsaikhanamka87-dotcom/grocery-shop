import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  hint: string;
  icon: LucideIcon;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

/** One radio card ("Нэг удаа" / "Тогтмол давтах"). Only the chosen card gets the filled green icon. */
export function DeliveryTypeCard({ title, hint, icon: Icon, checked, disabled, onSelect }: Props) {
  return (
    <label className="group relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 transition-colors has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 sm:p-5">
      <span className="flex items-start gap-3">
        <input
          type="radio"
          name="deliveryType"
          checked={checked}
          disabled={disabled}
          onChange={onSelect}
          className="mt-0.5 size-5 shrink-0 accent-[#2e5d3d]"
        />
        <span className="grid">
          <span className="text-[16px] font-bold">{title}</span>
          <span className="text-[16px] text-muted-foreground">{hint}</span>
        </span>
      </span>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink/5 text-ink-2 group-has-[:checked]:bg-brand group-has-[:checked]:text-white">
        <Icon className="size-6" />
      </span>
    </label>
  );
}
