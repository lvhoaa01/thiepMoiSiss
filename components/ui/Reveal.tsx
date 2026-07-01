"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  once?: boolean;
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

/** Scroll-reveal wrapper. Duration is driven by config motion settings. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced || !siteConfig.motion.enabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = OFFSET[direction];
  const { durations, speed } = siteConfig.motion;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: durations.base / speed, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
