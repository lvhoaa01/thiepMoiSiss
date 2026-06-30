"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useCallback, useState } from "react";

import { Confetti } from "@/components/effects/Confetti";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface EnvelopeIntroProps {
  /** Fired on the user's tap — the gesture that lets us start audio. */
  onOpen: () => void;
  /** Fired once the intro animation has finished. */
  onComplete: () => void;
}

/**
 * Full-screen opening sequence: a sealed envelope the guest taps to open. The
 * flap lifts, the invitation card rises out, confetti falls, then the overlay
 * fades to reveal the hero. The tap doubles as the user gesture required to
 * begin background music.
 */
export function EnvelopeIntro({ onOpen, onComplete }: EnvelopeIntroProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (opening) return;
    onOpen();
    setOpening(true);
    const duration = prefersReduced ? 600 : siteConfig.animation.introDurationMs;
    window.setTimeout(onComplete, duration);
  }, [opening, onOpen, onComplete, prefersReduced]);

  const fadeDelay = prefersReduced
    ? 0.15
    : siteConfig.animation.introDurationMs / 1000 - 0.8;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-surface via-white to-surface-2 px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: prefersReduced ? 0.4 : 0.7, delay: opening ? fadeDelay : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={siteConfig.identity.invitationTitle}
    >
      {opening && !prefersReduced ? (
        <Confetti variant="fall" count={siteConfig.animation.confettiCount} />
      ) : null}

      <motion.p
        className="mb-10 text-sm font-medium uppercase tracking-[0.3em] text-subtle"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {siteConfig.identity.invitationTitle}
      </motion.p>

      {/* Envelope */}
      <motion.div
        className="relative h-48 w-72"
        style={{ transformPerspective: 900 }}
        animate={{ y: opening && !prefersReduced ? -16 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* envelope back */}
        <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] shadow-2xl" />

        {/* rising letter (behind the front pocket) */}
        <motion.div
          className="absolute left-1/2 top-3 z-10 w-60 rounded-xl bg-white p-4 text-center shadow-lg"
          initial={{ x: "-50%", y: 8 }}
          animate={{
            x: "-50%",
            y: opening && !prefersReduced ? -150 : 8,
            scale: opening && !prefersReduced ? 1.06 : 1,
          }}
          transition={{ duration: 0.9, delay: opening ? 0.55 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <GraduationCap className="mx-auto h-7 w-7 text-primary" aria-hidden />
          <p className="mt-2 font-display text-lg font-semibold text-navy">
            {siteConfig.identity.invitationTitle}
          </p>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          <p className="mt-2 text-xs text-subtle">{siteConfig.identity.graduateName}</p>
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 z-30 rounded-[1.4rem] bg-gradient-to-br from-[#2563EB] to-[#1E40AF]"
          style={{ clipPath: "polygon(0% 32%, 50% 70%, 100% 32%, 100% 100%, 0% 100%)" }}
        />

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 z-40 h-[62%] bg-gradient-to-br from-[#0C1B38] to-[#1E3A8A]"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 50% 92%)",
            transformOrigin: "top",
            transformPerspective: 900,
          }}
          initial={{ rotateX: 0, opacity: 1 }}
          animate={{
            rotateX: opening && !prefersReduced ? -165 : 0,
            opacity: opening && !prefersReduced ? 0 : 1,
          }}
          transition={{ duration: 0.7, delay: opening ? 0.1 : 0, ease: "easeInOut" }}
        />

        {/* wax seal */}
        <motion.div
          className="absolute left-1/2 top-[42%] z-50 grid h-12 w-12 place-items-center rounded-full bg-white/95 text-primary shadow-md"
          initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
          animate={{
            x: "-50%",
            y: "-50%",
            scale: opening ? 0 : 1,
            opacity: opening ? 0 : 1,
          }}
          transition={{ duration: 0.4, delay: opening ? 0.05 : 0 }}
        >
          <GraduationCap className="h-6 w-6" aria-hidden />
        </motion.div>
      </motion.div>

      {/* Tap-to-open control */}
      <motion.button
        type="button"
        onClick={handleOpen}
        autoFocus
        aria-label={siteConfig.text.hero.openEnvelope}
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift tap-transparent"
        animate={{ opacity: opening ? 0 : 1, y: opening ? 10 : 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <GraduationCap className="h-4 w-4" aria-hidden />
        {siteConfig.text.hero.openEnvelope}
      </motion.button>
    </motion.div>
  );
}
