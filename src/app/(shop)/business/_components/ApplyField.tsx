type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
  inputMode?: "numeric" | "text";
  placeholder?: string;
  required?: boolean;
};

export function ApplyField({ name, label, defaultValue, error, inputMode, placeholder, required = true }: Props) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="input"
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1.5 text-[13px] font-medium text-clay">{error}</p>}
    </div>
  );
}
