import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  hint: string;
  icon: LucideIcon;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

/** One big radio card ("Шуурхай" / "Хуваарьт") in the delivery-time step. */
export function DeliveryTypeCard({ title, hint, icon: Icon, checked, disabled, onSelect }: Props) {
  return (
    <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 transition-colors has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
      <span className="grid gap-2">
        <input
          type="radio"
          name="deliveryType"
          checked={checked}
          disabled={disabled}
          onChange={onSelect}
          className="size-5 accent-[#2e5d3d]"
        />
        <span className="text-[16px] font-bold">{title}</span>
        <span className="text-[14px] text-muted-foreground">{hint}</span>
      </span>
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-sm">
        <Icon className="size-8" />
      </span>
    </label>
  );
}
