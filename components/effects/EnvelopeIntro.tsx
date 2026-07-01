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

// Front pocket + flap share this chevron edge, so the closed envelope is fully
// opaque — nothing behind it can leak through. (Percent of the box height.)
const CHEVRON = 42;
const POCKET_CLIP = `polygon(0% 0%, 50% ${CHEVRON}%, 100% 0%, 100% 100%, 0% 100%)`;
const FLAP_CLIP = `polygon(0% 0%, 100% 0%, 50% ${CHEVRON}%)`;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Realistic light (cream) envelope opening, matched to the ivory background.
 *
 * Closed: a clearly-read cream envelope (tonal flap, gold-foil crease, soft cast
 * shadow) whose card sits low, entirely behind the opaque front. On tap → flap
 * lifts fully → card slides up and out → overlay fades to reveal the hero. The
 * tap also starts background music.
 */
export function EnvelopeIntro({ onOpen, onComplete }: EnvelopeIntroProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [opening, setOpening] = useState(false);
  const animate = opening && !prefersReduced;

  const handleOpen = useCallback(() => {
    if (opening) return;
    onOpen();
    setOpening(true);
    window.setTimeout(onComplete, prefersReduced ? 600 : siteConfig.motion.introDurationMs);
  }, [opening, onOpen, onComplete, prefersReduced]);

  const fadeDelay = prefersReduced ? 0.15 : siteConfig.motion.introDurationMs / 1000 - 0.8;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-surface to-background px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: prefersReduced ? 0.4 : 0.7, delay: opening ? fadeDelay : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={siteConfig.identity.invitationTitle}
    >
      {animate ? <Confetti variant="fall" count={siteConfig.motion.confettiCount} /> : null}

      <motion.p
        className="mb-12 font-button text-xs font-medium text-subtle overline"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {siteConfig.identity.invitationTitle}
      </motion.p>

      {/* Envelope */}
      <motion.div
        className="relative aspect-[3/2] w-[min(20rem,80vw)] rounded-2xl shadow-[0_30px_60px_-24px_rgb(120_92_50_/_0.45)]"
        style={{ transformPerspective: 1200 }}
        animate={{ y: animate ? -18 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* back panel */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F7EFE0] to-[#EBDDC5] ring-1 ring-accent/30" />

        {/* card — sits low, fully behind the pocket; slides up on open */}
        <motion.div
          className="absolute left-1/2 top-[48%] w-[82%] rounded-lg bg-gradient-to-b from-white to-[#FBF5EA] p-3 text-center shadow-lg ring-1 ring-accent/25"
          initial={{ x: "-50%", y: 0 }}
          animate={{ x: "-50%", y: animate ? -152 : 0, scale: animate ? 1.05 : 1 }}
          transition={{ duration: 0.9, delay: animate ? 1 : 0, ease: EASE }}
        >
          <GraduationCap className="mx-auto h-6 w-6 text-accent" aria-hidden />
          <p className="mt-1 font-heading text-sm font-semibold text-primary">
            {siteConfig.identity.invitationTitle}
          </p>
          <div className="mx-auto mt-1.5 h-px w-12 bg-accent/40" />
          <p className="mt-1.5 font-body text-[0.7rem] text-subtle">
            {siteConfig.identity.graduateName}
          </p>
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-[#F4EAD7] to-[#E6D6BA]"
          style={{ clipPath: POCKET_CLIP }}
        />
        {/* pocket bottom seam (envelope front look) */}
        <svg
          aria-hidden
          viewBox="0 0 100 66.7"
          preserveAspectRatio="none"
          className="absolute inset-0 z-20 h-full w-full"
        >
          <path d="M0 66.7 L50 44 L100 66.7" fill="none" stroke="rgb(176 137 75 / 0.35)" strokeWidth="0.4" />
        </svg>
        {/* soft shadow the closed flap casts on the pocket (fades as it opens) */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-20 rounded-2xl [background:linear-gradient(180deg,rgb(140_108_58_/_0.24),transparent_26%)]"
          style={{ clipPath: POCKET_CLIP }}
          animate={{ opacity: animate ? 0 : 1 }}
          transition={{ duration: 0.4, delay: animate ? 0.15 : 0 }}
        />

        {/* flap — a touch deeper cream, with a gold-foil crease */}
        <motion.div
          className="absolute inset-0 z-30 origin-top"
          style={{ transformOrigin: "top", transformPerspective: 1200 }}
          initial={{ rotateX: 0, opacity: 1 }}
          animate={{ rotateX: animate ? -172 : 0, opacity: animate ? 0 : 1 }}
          transition={{
            rotateX: { duration: 0.7, delay: animate ? 0.12 : 0, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: animate ? 0.6 : 0 },
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F1E6CF] to-[#DFCDA9]"
            style={{ clipPath: FLAP_CLIP }}
          />
          {/* soft sheen on the flap */}
          <div
            className="absolute inset-0 rounded-2xl [background:linear-gradient(150deg,rgb(255_255_255_/_0.45),transparent_55%)]"
            style={{ clipPath: FLAP_CLIP }}
          />
          {/* gold-foil crease line along the flap edge (with light emboss) */}
          <svg
            aria-hidden
            viewBox="0 0 100 66.7"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path d="M0 0 L50 28 L100 0" fill="none" stroke="rgb(176 137 75 / 0.8)" strokeWidth="0.6" />
            <path d="M0 1.1 L50 29.1 L100 1.1" fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="0.4" />
          </svg>
        </motion.div>

        {/* wax seal */}
        <motion.div
          className="absolute left-1/2 top-[42%] z-40 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent-soft to-accent text-on-dark shadow-md ring-1 ring-white/40"
          initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
          animate={{ x: "-50%", y: "-50%", scale: opening ? 0 : 1, opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.35, delay: opening ? 0.05 : 0 }}
        >
          <GraduationCap className="h-5 w-5" aria-hidden />
        </motion.div>
      </motion.div>

      {/* Tap-to-open control */}
      <motion.button
        type="button"
        onClick={handleOpen}
        autoFocus
        aria-label={siteConfig.text.hero.openEnvelope}
        className="mt-14 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-button text-sm font-semibold tracking-wide text-on-dark shadow-lift tap-transparent"
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
