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
  { top: "-4%", left: "18%", size: 16, delay: 0, duration: 2.4 },
  { top: "5%", left: "86%", size: 13, delay: 0.6, duration: 2.6 },
  { top: "-2%", left: "54%", size: 11, delay: 1.2, duration: 2.2 },
  { top: "30%", left: "98%", size: 14, delay: 0.9, duration: 2.8 },
  { top: "72%", left: "-6%", size: 12, delay: 1.5, duration: 2.5 },
  { top: "92%", left: "70%", size: 15, delay: 2, duration: 2.6 },
  { top: "50%", left: "-4%", size: 10, delay: 0.3, duration: 2.3 },
  { top: "88%", left: "26%", size: 11, delay: 1.8, duration: 2.7 },
  { top: "14%", left: "3%", size: 12, delay: 1.1, duration: 2.4 },
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
      {/* soft radial light behind */}
      <div aria-hidden className="absolute -inset-7 rounded-full bg-accent/30 blur-2xl" />

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
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
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
