"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import { CardShine } from "@/components/ui/CardShine";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Solid (opaque) surface for text-heavy panels. */
  strong?: boolean;
  /** Subtle lift on hover. */
  hover?: boolean;
  /** Add the periodic rose light sweep (for important cards). */
  shine?: boolean;
  /** Stagger the shine sweep (seconds). */
  shineDelay?: number;
  /** Very subtle pointer tilt on hover-capable devices. */
  tilt?: boolean;
}

/**
 * The shared elegant blush card (soft surface, hairline border, soft shadow).
 * Wrap with <Reveal> at the call site for scroll animation.
 */
export function GlassCard({
  children,
  className,
  strong,
  hover,
  shine,
  shineDelay,
  tilt = true,
}: GlassCardProps) {
  const prefersReduced = usePrefersReducedMotion();
  const tiltEnabled = tilt && siteConfig.motion.enabled && !prefersReduced;
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 190, damping: 24, mass: 0.45 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 190, damping: 24, mass: 0.45 });

  const resetTilt = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !tiltEnabled ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    rotateXRaw.set(y * -3);
    rotateYRaw.set(x * 3);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={
        tiltEnabled
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }
          : undefined
      }
      className={cn(
        "relative rounded-card",
        strong ? "card-solid" : "card",
        hover && "transition-shadow duration-300 ease-out-expo hover:shadow-lift",
        className,
      )}
    >
      {children}
      {shine ? <CardShine delay={shineDelay} /> : null}
    </motion.div>
  );
}
