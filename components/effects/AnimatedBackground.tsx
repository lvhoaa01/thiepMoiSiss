"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useMobilePerformanceMode } from "@/hooks/useMobilePerformanceMode";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

const SECTION_GLOWS: Record<
  string,
  { one: { left: string; top: string; opacity: number }; two: { left: string; top: string; opacity: number } }
> = {
  hero: {
    one: { left: "-16%", top: "-18%", opacity: 0.2 },
    two: { left: "70%", top: "4%", opacity: 0.13 },
  },
  gallery: {
    one: { left: "8%", top: "-8%", opacity: 0.16 },
    two: { left: "66%", top: "28%", opacity: 0.16 },
  },
  countdown: {
    one: { left: "56%", top: "2%", opacity: 0.18 },
    two: { left: "-12%", top: "42%", opacity: 0.13 },
  },
  location: {
    one: { left: "4%", top: "28%", opacity: 0.17 },
    two: { left: "68%", top: "52%", opacity: 0.14 },
  },
  rsvp: {
    one: { left: "58%", top: "20%", opacity: 0.18 },
    two: { left: "-10%", top: "66%", opacity: 0.15 },
  },
  guestbook: {
    one: { left: "10%", top: "54%", opacity: 0.17 },
    two: { left: "66%", top: "8%", opacity: 0.13 },
  },
  closing: {
    one: { left: "38%", top: "58%", opacity: 0.18 },
    two: { left: "-8%", top: "4%", opacity: 0.12 },
  },
};

const MOBILE_GLOWS: Record<string, string> = {
  hero: "radial-gradient(55% 42% at 16% 14%, rgb(241 180 201 / 0.28), transparent 72%), radial-gradient(48% 38% at 88% 28%, rgb(201 112 145 / 0.16), transparent 74%)",
  gallery: "radial-gradient(58% 44% at 28% 20%, rgb(241 180 201 / 0.3), transparent 72%), radial-gradient(44% 40% at 84% 72%, rgb(201 112 145 / 0.14), transparent 74%)",
  countdown: "radial-gradient(54% 42% at 82% 18%, rgb(241 180 201 / 0.28), transparent 72%), radial-gradient(46% 38% at 12% 70%, rgb(201 112 145 / 0.15), transparent 74%)",
  location: "radial-gradient(58% 44% at 18% 48%, rgb(241 180 201 / 0.3), transparent 72%), radial-gradient(44% 36% at 88% 76%, rgb(201 112 145 / 0.14), transparent 74%)",
  rsvp: "radial-gradient(54% 44% at 82% 36%, rgb(241 180 201 / 0.3), transparent 72%), radial-gradient(46% 38% at 12% 80%, rgb(201 112 145 / 0.15), transparent 74%)",
  guestbook: "radial-gradient(58% 44% at 24% 68%, rgb(241 180 201 / 0.29), transparent 72%), radial-gradient(42% 36% at 88% 18%, rgb(201 112 145 / 0.13), transparent 74%)",
  closing: "radial-gradient(58% 46% at 56% 76%, rgb(241 180 201 / 0.3), transparent 72%), radial-gradient(44% 38% at 8% 20%, rgb(201 112 145 / 0.13), transparent 74%)",
};

/**
 * Fixed, full-viewport backdrop: soft blush gradient, a slowly panning rose
 * sheen, two parallax pink blobs and a faint vignette. Purely decorative.
 */
export function AnimatedBackground() {
  const prefersReduced = usePrefersReducedMotion();
  const mobilePerformance = useMobilePerformanceMode();
  const [activeSection, setActiveSection] = useState("hero");
  const visibility = useRef(new Map<string, number>());
  const { scrollYProgress } = useScroll();
  const blobOne = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const blobTwo = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const glow = SECTION_GLOWS[activeSection] ?? SECTION_GLOWS.hero;

  useEffect(() => {
    if (prefersReduced) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.current.set(entry.target.id, entry.intersectionRatio);
        }

        const visible = [...visibility.current.entries()].sort((a, b) => b[1] - a[1])[0];
        if (visible && visible[1] > 0) setActiveSection(visible[0]);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div
        className={cn(
          "absolute inset-0 opacity-80 [background-image:radial-gradient(50%_40%_at_18%_8%,rgba(241,180,201,0.28),transparent),radial-gradient(45%_40%_at_85%_16%,rgba(201,112,145,0.18),transparent),linear-gradient(120deg,rgba(250,224,234,0.24),transparent)] [background-size:170%_170%]",
          !prefersReduced && !mobilePerformance && "animate-gradient-pan",
        )}
      />

      {!prefersReduced && mobilePerformance ? (
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSection}
            className="absolute inset-0"
            style={{ backgroundImage: MOBILE_GLOWS[activeSection] ?? MOBILE_GLOWS.hero }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.78 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </AnimatePresence>
      ) : !prefersReduced ? (
        <>
          <motion.div
            className="absolute h-[46vmax] w-[46vmax]"
            initial={false}
            animate={glow.one}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="h-full w-full rounded-full bg-accent blur-3xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div
            className="absolute h-[38vmax] w-[38vmax]"
            initial={false}
            animate={glow.two}
            transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="h-full w-full rounded-full bg-accent-soft blur-3xl"
              animate={{ scale: [1.06, 0.96, 1.06], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </>
      ) : null}

      <motion.div
        style={prefersReduced ? undefined : { y: blobOne }}
        className={cn(
          "absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl",
          mobilePerformance && "hidden",
        )}
      />
      <motion.div
        style={prefersReduced ? undefined : { y: blobTwo }}
        className={cn(
          "absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-accent-soft/20 blur-3xl",
          mobilePerformance && "hidden",
        )}
      />

      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_-10%,transparent,rgb(77_54_64_/_0.05))]" />
    </div>
  );
}
