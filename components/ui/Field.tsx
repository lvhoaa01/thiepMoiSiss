"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Shared control styling for inputs / selects / textareas. */
export const controlClass =
  "w-full rounded-control border border-hairline bg-surface/80 px-4 py-3 font-body text-ink shadow-soft outline-none transition-all duration-300 placeholder:text-subtle/70 focus:border-accent/60 focus:bg-surface focus:shadow-card focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Accessible field shell: associates a <label> with its control + error text. */
export function Field({ id, label, error, children }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="space-y-1.5"
      animate={prefersReduced ? undefined : { y: focused ? -2 : 0, scale: focused ? 1.005 : 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      <motion.label
        htmlFor={id}
        className="block font-button text-sm font-medium tracking-wide text-primary/80"
        animate={prefersReduced ? undefined : { x: focused ? 4 : 0, opacity: focused ? 1 : 0.82 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key={error}
            id={`${id}-error`}
            className="font-button text-xs font-medium text-red-600"
            initial={prefersReduced ? false : { opacity: 0, x: -8, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
