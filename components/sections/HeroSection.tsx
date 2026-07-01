"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";

import { AvatarPortrait } from "@/components/AvatarPortrait";
import { GuestDetails } from "@/components/GuestDetails";
import { Flourish } from "@/components/illustrations/Flourish";
import { GraduateIllustration } from "@/components/illustrations/GraduateIllustration";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { PlanEntry } from "@/types";

interface HeroSectionProps {
  /** Starts the staggered entrance once the intro has finished. */
  revealed: boolean;
  plan: PlanEntry[];
}

const containerVariants: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ revealed, plan }: HeroSectionProps) {
  const prefersReduced = usePrefersReducedMotion();
  const { identity, event, text } = siteConfig;
  const animateState = prefersReduced || revealed ? "show" : "hide";

  const facts = [
    { icon: Calendar, value: `${event.weekdayLabel} · ${event.dateLabel}` },
    { icon: Clock, value: event.timeLabel },
    { icon: MapPin, value: event.venueName },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-24"
      aria-label={identity.invitationTitle}
    >
      <GlassCard
        strong
        shine
        shineDelay={0}
        className="relative w-full max-w-lg overflow-hidden px-7 py-14 text-center sm:px-12"
      >
        {/* inset gold frame */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 rounded-[1.45rem] border border-accent/25"
        />

        <motion.div
          className="relative z-10 flex flex-col items-center"
          variants={containerVariants}
          initial={prefersReduced ? "show" : "hide"}
          animate={animateState}
        >
          <motion.p
            variants={itemVariants}
            className="font-button text-[0.7rem] font-medium text-subtle overline"
          >
            {identity.invitationTitle}
          </motion.p>

          <motion.p variants={itemVariants} className="mt-7 font-body text-sm text-subtle">
            {identity.ceremonyLabel}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-2 font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl"
          >
            {identity.graduateName}
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-3 font-script text-3xl text-accent">
            {identity.degreeLabel}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-2 font-button text-[0.7rem] font-medium text-subtle overline"
          >
            {identity.schoolLabel}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Flourish className="mx-auto my-7 h-5 w-40 text-accent/70" />
          </motion.div>

          <motion.div variants={itemVariants}>
            {identity.avatar ? (
              <AvatarPortrait
                src={identity.avatar}
                alt={identity.graduateName}
                className="h-48 w-48 sm:h-56 sm:w-56"
              />
            ) : (
              <GraduateIllustration className="mx-auto h-40 w-auto" />
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-9">
            <p className="font-body text-sm text-subtle">{identity.guestPrefix}</p>
            <div className="mt-2">
              <Suspense
                fallback={
                  <p className="font-heading text-[1.7rem] font-semibold text-primary sm:text-4xl">
                    {identity.defaultGuestName}
                  </p>
                }
              >
                <GuestDetails plan={plan} />
              </Suspense>
            </div>
          </motion.div>

          <motion.ul variants={itemVariants} className="mt-9 space-y-2.5">
            {facts.map((fact, index) => (
              <li
                key={index}
                className="flex items-center justify-center gap-2.5 font-body text-sm text-ink/90"
              >
                <fact.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {fact.value}
              </li>
            ))}
          </motion.ul>

          <motion.a
            variants={itemVariants}
            href={`tel:${event.phone}`}
            className="mt-6 inline-flex items-center gap-2 font-button text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {event.phone}
          </motion.a>
        </motion.div>
      </GlassCard>

      <motion.div
        className="mt-10 flex flex-col items-center gap-2 text-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: animateState === "show" ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="font-button text-[0.7rem] overline">{text.hero.scrollHint}</span>
        <motion.span
          animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.div>
    </section>
  );
}
