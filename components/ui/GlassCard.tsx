import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Use the more opaque variant for text-heavy surfaces. */
  strong?: boolean;
  /** Add a subtle lift on hover (the "glass hover" interaction). */
  hover?: boolean;
}

/**
 * The shared glassmorphism surface. Server-safe (no client APIs); wrap with
 * <Reveal> at the call site when scroll animation is desired.
 */
export function GlassCard({ children, className, strong, hover }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-4xl",
        hover &&
          "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
