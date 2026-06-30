"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/utils/cn";

type Variant = "primary" | "outline" | "ghost";

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Button mode. */
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  /** When provided, renders an external anchor instead of a button. */
  href?: string;
  ariaLabel?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-lift hover:shadow-glow",
  outline: "bg-white/70 text-navy border border-primary/25 hover:border-primary/45",
  ghost: "bg-transparent text-navy hover:bg-primary/5",
};

/**
 * A tactile button with a material-style ripple, hover lift and press feedback.
 * Renders as <a target="_blank"> when `href` is set, otherwise as <button>.
 */
export function RippleButton({
  children,
  className,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  href,
  ariaLabel,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    setRipples((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }, []);

  const baseClass = cn(
    "relative inline-flex select-none items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-shadow duration-300 tap-transparent disabled:pointer-events-none disabled:opacity-60",
    VARIANT_CLASS[variant],
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-white/40"
            style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={baseClass}
        onPointerDown={spawnRipple}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClass}
      onPointerDown={spawnRipple}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}
