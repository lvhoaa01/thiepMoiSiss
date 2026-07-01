import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Solid (opaque) surface for text-heavy panels. */
  strong?: boolean;
  /** Subtle lift on hover. */
  hover?: boolean;
}

/**
 * The shared elegant paper card (ivory surface, hairline border, soft shadow).
 * Server-safe; wrap with <Reveal> at the call site for scroll animation.
 */
export function GlassCard({ children, className, strong, hover }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-card",
        strong ? "card-solid" : "card",
        hover &&
          "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
