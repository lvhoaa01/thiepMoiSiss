"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

interface AvatarPortraitProps {
  src: string;
  alt: string;
  className?: string;
}

// Star sparkles around the medallion (deterministic → SSR-safe).
const SPARKLES = [
  { top: "-5%", left: "18%", size: 22, delay: 0, duration: 1.8 },
  { top: "4%", left: "86%", size: 18, delay: 0.4, duration: 2 },
  { top: "-3%", left: "52%", size: 15, delay: 0.8, duration: 1.7 },
  { top: "28%", left: "99%", size: 20, delay: 0.6, duration: 2.1 },
  { top: "70%", left: "-8%", size: 17, delay: 1, duration: 1.9 },
  { top: "93%", left: "68%", size: 21, delay: 1.3, duration: 2 },
  { top: "48%", left: "-6%", size: 14, delay: 0.2, duration: 1.8 },
  { top: "90%", left: "24%", size: 16, delay: 1.1, duration: 2.2 },
  { top: "12%", left: "1%", size: 17, delay: 0.7, duration: 1.9 },
  { top: "60%", left: "97%", size: 15, delay: 1.5, duration: 2 },
  { top: "-6%", left: "72%", size: 18, delay: 0.5, duration: 1.7 },
];

const STAR_PATH =
  "M12 0 C12.6 8 16 11.4 24 12 C16 12.6 12.6 16 12 24 C11.4 16 8 12.6 0 12 C8 11.4 11.4 8 12 0 Z";

/**
 * Premium glowing portrait: a circular medallion with a champagne-gold gradient
 * ring, soft radial light, a rotating shimmer sweep, a glint that crosses the
 * photo, gentle float and twinkling star sparkles. All continuous motion is
 * disabled under reduced-motion.
 *
 * The provided photo is not background-removed, so it is framed inside the
 * circular mask (object-cover) rather than floated as a cutout.
 */
export function AvatarPortrait({ src, alt, className }: AvatarPortraitProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("relative mx-auto", className)}
      animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* large soft radial halo that slowly pulses */}
      <motion.div
        aria-hidden
        className="absolute -inset-12 rounded-full bg-accent/25 blur-[64px]"
        animate={prefersReduced ? undefined : { scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* rotating shimmer sweep */}
      {!prefersReduced ? (
        <motion.div
          aria-hidden
          className="absolute -inset-[3px] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(216,185,120,0.7) 40deg, transparent 110deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      {/* gold ring + portrait */}
      <div className="absolute inset-0 rounded-full bg-gradient-accent p-[3px] shadow-lift">
        <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/40">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="240px"
            className="object-cover object-[center_38%]"
            priority
          />
          {/* subtle inner sheen */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full [background:linear-gradient(150deg,rgba(255,255,255,0.28),transparent_45%)]"
          />
          {/* glint that sweeps across the portrait */}
          {!prefersReduced ? (
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.55) 50%, transparent 62%)",
              }}
              initial={{ x: "-130%" }}
              animate={{ x: "160%" }}
              transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
            />
          ) : null}
        </div>
      </div>

      {/* twinkling star sparkles */}
      {!prefersReduced
        ? SPARKLES.map((sparkle, index) => (
            <motion.svg
              key={index}
              aria-hidden
              viewBox="0 0 24 24"
              className="absolute text-accent-soft drop-shadow-[0_0_6px_rgba(216,185,120,0.95)]"
              style={{
                top: sparkle.top,
                left: sparkle.left,
                width: sparkle.size,
                height: sparkle.size,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.4], rotate: [0, 90] }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d={STAR_PATH} fill="currentColor" />
            </motion.svg>
          ))
        : null}
    </motion.div>
  );
}
