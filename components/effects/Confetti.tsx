"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { cn } from "@/utils/cn";

const COLORS = ["#2563EB", "#38BDF8", "#1E3A8A", "#EAB308", "#F8FBFF", "#93C5FD"];

/** Deterministic pseudo-random in [0,1). */
function seeded(n: number): number {
  const value = Math.sin(n * 97.13) * 9973.17;
  return value - Math.floor(value);
}

interface ConfettiProps {
  count?: number;
  /** "fall" rains from the top; "burst" explodes from the centre. */
  variant?: "fall" | "burst";
  className?: string;
}

/**
 * Lightweight one-shot confetti built with framer-motion (no canvas / external
 * libs). Mount it to play; piece layout is deterministic, so it is SSR-safe.
 */
export function Confetti({ count = 80, variant = "fall", className }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const burstAngle = seeded(index + 3) * Math.PI * 2;
        return {
          color: COLORS[index % COLORS.length],
          size: 6 + seeded(index + 1) * 8,
          left: seeded(index + 2) * 100,
          rotate: seeded(index + 3) * 540,
          duration: 2.2 + seeded(index + 4) * 1.9,
          delay: seeded(index + 5) * 0.5,
          drift: (seeded(index + 6) - 0.5) * 240,
          burstX: Math.cos(burstAngle) * (110 + seeded(index + 7) * 190),
          burstY: Math.sin(burstAngle) * (110 + seeded(index + 7) * 190),
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {pieces.map((piece, index) => {
        const style = {
          width: piece.size,
          height: piece.size * 0.62,
          backgroundColor: piece.color,
          borderRadius: 2,
        } as const;

        if (variant === "burst") {
          return (
            <motion.span
              key={index}
              className="absolute left-1/2 top-[45%]"
              style={style}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: piece.burstX, y: piece.burstY + 160, opacity: 0, rotate: piece.rotate }}
              transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
            />
          );
        }

        return (
          <motion.span
            key={index}
            className="absolute"
            style={{ ...style, left: `${piece.left}%`, top: -24 }}
            initial={{ y: -24, opacity: 0, rotate: 0 }}
            animate={{ y: "112vh", x: piece.drift, opacity: [0, 1, 1, 0], rotate: piece.rotate }}
            transition={{ duration: piece.duration, delay: piece.delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
