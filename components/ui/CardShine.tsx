"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config/site.config";
import { useMobilePerformanceMode } from "@/hooks/useMobilePerformanceMode";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CardShineProps {
  /** Stagger the sweep so cards don't all shine at once (seconds). */
  delay?: number;
}

/**
 * A single, slow, elegant rose light sweep across a card (~once every 17s).
 * Sits above the card content at very low opacity, is pointer-inert, and is
 * disabled under reduced-motion. The parent card supplies the rounded clip.
 */
export function CardShine({ delay = 0 }: CardShineProps) {
  const prefersReduced = usePrefersReducedMotion();
  const mobilePerformance = useMobilePerformanceMode();
  if (prefersReduced || !siteConfig.motion.enabled) return null;

  if (mobilePerformance) {
    return (
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
      >
        <motion.span
          className="absolute inset-y-[-30%] left-0 w-1/2 [background:linear-gradient(100deg,transparent,rgba(255,255,255,0.48),rgba(241,180,201,0.36),transparent)]"
          initial={{ x: "-160%", skewX: -16, opacity: 0 }}
          whileInView={{ x: "160%", opacity: [0, 0.58, 0] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.35, delay: Math.min(delay, 0.5), ease: "easeInOut" }}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
    >
      <span
        className="absolute inset-y-[-30%] left-0 w-1/2 animate-card-shine [background:linear-gradient(100deg,transparent,rgba(255,255,255,0.48),rgba(241,180,201,0.36),transparent)]"
        style={{ animationDelay: `${delay}s` }}
      />
    </span>
  );
}
