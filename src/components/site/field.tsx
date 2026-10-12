"use client";

/** Underline-only input used in the checkout and contact forms. */
export function LineField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-left">
      <span className="text-xs font-semibold tracking-[.16em] text-muted uppercase">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 border-b border-ink/30 bg-transparent py-2.5 text-[17px] text-ink outline-none focus:border-ink"
      />
    </label>
  );
}
