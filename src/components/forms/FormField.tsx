import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
