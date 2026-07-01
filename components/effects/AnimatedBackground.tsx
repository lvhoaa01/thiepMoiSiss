"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

/**
 * Fixed, full-viewport backdrop: warm ivory gradient, a slowly panning gold
 * sheen, two parallax gold blobs and a faint vignette. Purely decorative.
 */
export function AnimatedBackground() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const blobOne = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const blobTwo = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div
        className={cn(
          "absolute inset-0 opacity-80 [background-image:radial-gradient(50%_40%_at_18%_8%,rgba(216,185,120,0.24),transparent),radial-gradient(45%_40%_at_85%_16%,rgba(176,137,75,0.16),transparent),linear-gradient(120deg,rgba(233,222,201,0.20),transparent)] [background-size:170%_170%]",
          !prefersReduced && "animate-gradient-pan",
        )}
      />

      <motion.div
        style={prefersReduced ? undefined : { y: blobOne }}
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        style={prefersReduced ? undefined : { y: blobTwo }}
        className="absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-accent-soft/20 blur-3xl"
      />

      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_-10%,transparent,rgb(43_39_34_/_0.05))]" />
    </div>
  );
}
