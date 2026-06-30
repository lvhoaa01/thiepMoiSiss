"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-primary via-sky to-primary"
      style={{ scaleX }}
    />
  );
}
