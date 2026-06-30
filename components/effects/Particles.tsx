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

/** Subtle drifting light particles that add depth behind the content. */
export function Particles() {
  const prefersReduced = usePrefersReducedMotion();
  const count = siteConfig.animation.particleCount;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: seeded(index + 1) * 100,
        top: seeded(index + 2) * 100,
        size: 3 + seeded(index + 3) * 6,
        duration: 6 + seeded(index + 4) * 8,
        delay: seeded(index + 5) * -10,
        drift: (seeded(index + 6) - 0.5) * 40,
      })),
    [count],
  );

  if (prefersReduced || !siteConfig.animation.enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-sky/40"
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
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
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
