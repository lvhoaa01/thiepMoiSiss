"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { Blossom } from "@/components/illustrations/Florals";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TONES = ["sky", "blue", "white"] as const;

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
function seeded(n: number): number {
  const value = Math.sin(n * 127.1) * 43758.5453;
  return value - Math.floor(value);
}

/** Blossoms that drift slowly upward across the viewport. */
export function FloatingFlowers() {
  const prefersReduced = usePrefersReducedMotion();
  const count = siteConfig.animation.flowerCount;

  const flowers = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: seeded(index + 1) * 100,
        size: 14 + seeded(index + 2) * 22,
        duration: 16 + seeded(index + 3) * 16,
        delay: seeded(index + 4) * -28,
        drift: (seeded(index + 5) - 0.5) * 48,
        tone: TONES[index % TONES.length],
      })),
    [count],
  );

  if (prefersReduced || !siteConfig.animation.enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${flower.left}%`, top: "100%", width: flower.size, height: flower.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "-128vh"],
            x: [0, flower.drift, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 160],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Blossom tone={flower.tone} className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  );
}
