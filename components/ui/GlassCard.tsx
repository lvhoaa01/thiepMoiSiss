import type { ReactNode } from "react";

import { CardShine } from "@/components/ui/CardShine";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Solid (opaque) surface for text-heavy panels. */
  strong?: boolean;
  /** Subtle lift on hover. */
  hover?: boolean;
  /** Add the periodic golden light sweep (for important cards). */
  shine?: boolean;
  /** Stagger the shine sweep (seconds). */
  shineDelay?: number;
}

/**
 * The shared elegant paper card (ivory surface, hairline border, soft shadow).
 * Server-safe; wrap with <Reveal> at the call site for scroll animation.
 */
export function GlassCard({
  children,
  className,
  strong,
  hover,
  shine,
  shineDelay,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-card",
        strong ? "card-solid" : "card",
        hover &&
          "transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
      {shine ? <CardShine delay={shineDelay} /> : null}
    </div>
  );
}
