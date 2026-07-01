import type { ReactNode } from "react";

/** Shared control styling for inputs / selects / textareas. */
export const controlClass =
  "w-full rounded-control border border-hairline bg-surface/80 px-4 py-3 font-body text-ink shadow-soft outline-none transition placeholder:text-subtle/70 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Accessible field shell: associates a <label> with its control + error text. */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-button text-sm font-medium tracking-wide text-primary/80"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-button text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
