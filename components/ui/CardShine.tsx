"use client";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CardShineProps {
  /** Stagger the sweep so cards don't all shine at once (seconds). */
  delay?: number;
}

/**
 * A single, slow, elegant golden light sweep across a card (~once every 17s).
 * Sits above the card content at very low opacity, is pointer-inert, and is
 * disabled under reduced-motion. The parent card supplies the rounded clip.
 */
export function CardShine({ delay = 0 }: CardShineProps) {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced || !siteConfig.motion.enabled) return null;

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
    >
      <span
        className="absolute inset-y-[-30%] left-0 w-1/2 animate-card-shine [background:linear-gradient(100deg,transparent,rgba(255,255,255,0.45),rgba(216,185,120,0.32),transparent)]"
        style={{ animationDelay: `${delay}s` }}
      />
    </span>
  );
}
