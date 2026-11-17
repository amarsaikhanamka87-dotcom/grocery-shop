/** A titled block of form fields: one column on phones, two from `sm` up. */
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="mb-3 text-[12px] font-bold tracking-wider text-muted-foreground uppercase">{title}</legend>
      {children}
    </fieldset>
  );
}
