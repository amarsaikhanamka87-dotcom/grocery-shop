type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
  inputMode?: "numeric" | "text";
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
};

export function ProductField({ name, label, defaultValue, error, inputMode, required = true, multiline, placeholder }: Props) {
  const shared = { id: name, name, defaultValue, required, placeholder, className: "input" };
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      {multiline ? <textarea {...shared} rows={4} /> : <input {...shared} inputMode={inputMode} />}
      {error && <p className="mt-1.5 text-[13px] font-medium text-clay">{error}</p>}
    </div>
  );
}
