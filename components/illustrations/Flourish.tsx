"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FlourishProps {
  className?: string;
}

/** Delicate line-art divider with a small center diamond (uses currentColor). */
export function Flourish({ className }: FlourishProps) {
  const prefersReduced = usePrefersReducedMotion();
  const shouldAnimate = siteConfig.motion.enabled && !prefersReduced;

  return (
    <motion.svg
      viewBox="0 0 240 24"
      className={className}
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      initial={shouldAnimate ? "hidden" : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.path
        d="M8 12 C 56 12, 82 4, 106 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M232 12 C 184 12, 158 4, 134 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M106 12 L120 5 L134 12 L120 19 Z"
        fill="currentColor"
        style={{ transformOrigin: "120px 12px" }}
        variants={{
          hidden: { scale: 0, rotate: -45, opacity: 0 },
          visible: { scale: 1, rotate: 0, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.5 }}
      />
    </motion.svg>
  );
}
