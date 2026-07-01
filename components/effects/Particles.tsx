"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
function seeded(n: number): number {
  const value = Math.sin(n * 311.7) * 52963.21;
  return value - Math.floor(value);
}

/** Subtle drifting gold "dust" that adds depth behind the content. */
export function Particles() {
  const prefersReduced = usePrefersReducedMotion();
  const count = siteConfig.motion.particleCount;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: seeded(index + 1) * 100,
        top: seeded(index + 2) * 100,
        size: 2 + seeded(index + 3) * 5,
        duration: 7 + seeded(index + 4) * 9,
        delay: seeded(index + 5) * -10,
        drift: (seeded(index + 6) - 0.5) * 36,
      })),
    [count],
  );

  if (prefersReduced || !siteConfig.motion.enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-accent/40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -particle.drift, 0],
            x: [0, particle.drift, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
