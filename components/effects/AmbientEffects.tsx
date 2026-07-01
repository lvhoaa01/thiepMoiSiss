"use client";

import type { CSSProperties } from "react";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Typed CSS custom properties (no `any`). */
type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
function seeded(n: number): number {
  const value = Math.sin(n * 152.31) * 41265.77;
  return value - Math.floor(value);
}

const SPARKLE_COLORS = ["#D8B978", "#EAD9B0", "#FBF5EA"];

/** Show more particles on larger screens (pure CSS — no JS media query). */
function responsiveClass(index: number, mobile: number, tablet: number): string {
  if (index < mobile) return "";
  if (index < tablet) return "hidden sm:block";
  return "hidden lg:block";
}

// ── Edge sparkles: hug the left/right margins, never the content column ──
const SPARKLES = Array.from({ length: 20 }, (_, i) => {
  const onLeft = i % 2 === 0;
  return {
    left: onLeft ? 1 + seeded(i + 1) * 8 : 91 + seeded(i + 1) * 8,
    top: seeded(i + 2) * 100,
    size: 4 + seeded(i + 3) * 6,
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    duration: 3.5 + seeded(i + 4) * 3,
    delay: seeded(i + 5) * -4,
    opacity: 0.6 + seeded(i + 6) * 0.4,
  };
});

// ── Golden dust: motes drifting upward across the whole width ──
const DUST = Array.from({ length: 24 }, (_, i) => ({
  left: seeded(i + 20) * 100,
  size: 2.5 + seeded(i + 21) * 4.5,
  duration: 11 + seeded(i + 22) * 9,
  delay: seeded(i + 23) * -14,
  driftX: (seeded(i + 24) - 0.5) * 52,
  opacity: 0.32 + seeded(i + 25) * 0.42,
}));

// ── Shooting stars: a couple, staggered, upper background only ──
const STARS = [
  { left: "12%", top: "8%", delay: 0, width: 120 },
  { left: "58%", top: "5%", delay: 7, width: 96 },
];

/**
 * Subtle premium ambient layer: aurora glow, floating golden dust, edge
 * sparkles and occasional shooting stars. All motion is CSS transform/opacity
 * (GPU-friendly) and disabled under reduced-motion. Sits behind the content.
 */
export function AmbientEffects() {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced || !siteConfig.motion.enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora glow — two very large, very slow, low-opacity radials */}
      <div className="absolute -left-1/4 top-[-15%] h-[75vh] w-[75vh] rounded-full opacity-[0.6] blur-3xl animate-aurora-a [background:radial-gradient(circle,rgba(216,185,120,0.32),transparent_66%)]" />
      <div className="absolute -right-1/4 bottom-[-12%] h-[70vh] w-[70vh] rounded-full opacity-[0.55] blur-3xl animate-aurora-b [background:radial-gradient(circle,rgba(251,245,234,0.42),transparent_66%)]" />

      {/* Golden dust */}
      {DUST.map((dust, index) => (
        <span
          key={`dust-${index}`}
          className={`absolute bottom-[-14px] rounded-full bg-accent-soft animate-dust-rise ${responsiveClass(index, 8, 15)}`}
          style={
            {
              left: `${dust.left}%`,
              width: dust.size,
              height: dust.size,
              animationDuration: `${dust.duration}s`,
              animationDelay: `${dust.delay}s`,
              "--amb-dx": `${dust.driftX}px`,
              "--amb-op": dust.opacity,
            } as CSSVars
          }
        />
      ))}

      {/* Edge sparkles */}
      {SPARKLES.map((sparkle, index) => (
        <span
          key={`sparkle-${index}`}
          className={`absolute rounded-full animate-sparkle-float ${responsiveClass(index, 8, 14)}`}
          style={
            {
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              boxShadow: `0 0 ${sparkle.size * 2.4}px ${sparkle.color}`,
              animationDuration: `${sparkle.duration}s`,
              animationDelay: `${sparkle.delay}s`,
              "--amb-op": sparkle.opacity,
            } as CSSVars
          }
        />
      ))}

      {/* Shooting stars — upper background only, staggered */}
      {STARS.map((star, index) => (
        <span
          key={`star-${index}`}
          className="absolute h-[2px] rounded-full animate-shooting-star [background:linear-gradient(90deg,transparent,rgba(216,185,120,0.9),#fff)]"
          style={{ left: star.left, top: star.top, width: star.width, animationDelay: `${star.delay}s` }}
        />
      ))}
    </div>
  );
}
