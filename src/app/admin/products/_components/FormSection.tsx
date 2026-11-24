/**
 * A block of form fields: one column on phones, two from `sm` up. The small title is optional
 * (left out when the dialog title already says the same thing).
 */
export function FormSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      {title && (
        <legend className="mb-3 text-[13px] font-bold tracking-wider text-muted-foreground uppercase">{title}</legend>
      )}
      {children}
    </fieldset>
  );
}
