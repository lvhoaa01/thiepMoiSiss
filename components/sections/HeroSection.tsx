"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";

import { GuestName } from "@/components/GuestName";
import { Bunting } from "@/components/illustrations/Bunting";
import { FloralCluster } from "@/components/illustrations/Florals";
import { GraduateIllustration } from "@/components/illustrations/GraduateIllustration";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroSectionProps {
  /** Starts the staggered entrance once the intro has finished. */
  revealed: boolean;
}

const containerVariants: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ revealed }: HeroSectionProps) {
  const prefersReduced = usePrefersReducedMotion();
  const { identity, event, text } = siteConfig;

  const animateState = prefersReduced || revealed ? "show" : "hide";

  const infoRows = [
    { icon: Calendar, value: event.dateLabel },
    { icon: Clock, value: event.timeLabel },
    { icon: MapPin, value: event.address.join(", ") },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-24"
      aria-label={identity.invitationTitle}
    >
      <GlassCard
        strong
        className="relative w-full max-w-md overflow-hidden px-6 pb-12 pt-16 text-center sm:px-10"
      >
        <Bunting className="pointer-events-none absolute inset-x-0 top-2 w-full" />
        <FloralCluster className="pointer-events-none absolute -bottom-2 left-0 w-24 opacity-90" />
        <FloralCluster flip className="pointer-events-none absolute -bottom-2 right-0 w-24 opacity-90" />

        <motion.div
          className="relative z-10 flex flex-col items-center"
          variants={containerVariants}
          initial={prefersReduced ? "show" : "hide"}
          animate={animateState}
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80"
          >
            {identity.invitationTitle}
          </motion.p>

          <motion.p variants={itemVariants} className="mt-6 text-sm text-subtle">
            {identity.ceremonyLabel}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-gradient mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
          >
            {identity.graduateName}
          </motion.h1>

          <motion.div variants={itemVariants} className="my-6 h-px w-16 bg-primary/30" />

          <motion.p variants={itemVariants} className="text-sm text-subtle">
            {identity.guestPrefix}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-1 inline-block border-b border-dashed border-primary/40 pb-1 font-display text-2xl font-semibold text-navy"
          >
            <Suspense fallback={identity.defaultGuestName}>
              <GuestName />
            </Suspense>
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <GraduateIllustration className="mx-auto h-44 w-auto" />
          </motion.div>

          <motion.ul variants={itemVariants} className="mt-8 w-full space-y-3 text-left">
            {infoRows.map((row, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <row.icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-ink/90">{row.value}</span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <a
                href={`tel:${event.phone}`}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {event.phone}
              </a>
            </li>
          </motion.ul>
        </motion.div>
      </GlassCard>

      <motion.div
        className="mt-10 flex flex-col items-center gap-2 text-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: animateState === "show" ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">{text.hero.scrollHint}</span>
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
