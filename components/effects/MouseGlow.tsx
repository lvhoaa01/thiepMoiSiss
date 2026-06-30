"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Desktop-only soft glow that trails the pointer. Disabled on touch devices
 * (no fine pointer), when reduced motion is requested, or via config.
 */
export function MouseGlow() {
  const prefersReduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (!siteConfig.animation.mouseGlow) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (prefersReduced || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed left-0 top-0 -z-10 -ml-[240px] -mt-[240px] h-[480px] w-[480px] rounded-full bg-sky/15 blur-[120px]"
    />
  );
}
