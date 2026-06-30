import type { ReactNode } from "react";

/** Shared control styling for inputs / selects / textareas. */
export const controlClass =
  "w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-ink shadow-soft outline-none transition placeholder:text-subtle/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/15 disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/**
 * Accessible field shell: associates a <label> with its control and renders a
 * validation message. The control passed as `children` should set
 * `aria-describedby={`${id}-error`}` and `aria-invalid` when an error exists.
 */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-navy/80">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-rose-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
