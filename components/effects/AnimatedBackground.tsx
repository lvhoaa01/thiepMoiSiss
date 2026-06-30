"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

/**
 * Fixed, full-viewport backdrop: a soft base gradient, a slowly panning sheen
 * and two parallax "blobs" that drift with scroll. Purely decorative.
 */
export function AnimatedBackground() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const blobOne = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const blobTwo = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface-2" />

      <div
        className={cn(
          "absolute inset-0 opacity-80 [background-image:radial-gradient(55%_45%_at_18%_8%,rgba(56,189,248,0.20),transparent),radial-gradient(50%_45%_at_85%_18%,rgba(37,99,235,0.16),transparent),linear-gradient(120deg,rgba(191,219,254,0.10),rgba(255,255,255,0))] [background-size:160%_160%]",
          !prefersReduced && "animate-gradient-pan",
        )}
      />

      <motion.div
        style={prefersReduced ? undefined : { y: blobOne }}
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
      />
      <motion.div
        style={prefersReduced ? undefined : { y: blobTwo }}
        className="absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />
    </div>
  );
}
