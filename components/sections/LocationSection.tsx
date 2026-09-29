"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { RippleButton } from "@/components/ui/RippleButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LocationSection() {
  const { maps, event, text } = siteConfig;
  const prefersReduced = usePrefersReducedMotion();
  const shouldAnimate = siteConfig.motion.enabled && !prefersReduced;

  return (
    <section id="location" className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          scriptLabel={text.location.scriptLabel}
          title={text.location.title}
          subtitle={text.location.subtitle}
        />

        <Reveal className="mt-10">
          <GlassCard strong shine shineDelay={4} className="overflow-hidden p-4 sm:p-5">
            <div className="px-2 pb-5 pt-3 text-center">
              <p className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                {event.venueName}
              </p>
              <address className="mt-2 not-italic font-body text-sm text-subtle">
                {event.address.join(", ")}
              </address>
            </div>

            <div className="overflow-hidden rounded-media bg-accent-soft/15">
              <motion.div
                className="relative aspect-[4/3] w-full sm:aspect-[16/10]"
                initial={shouldAnimate ? { opacity: 0.72, scale: 1.035 } : false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <iframe
                  src={maps.embedUrl}
                  title={`Bản đồ: ${event.venueName}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                {shouldAnimate ? (
                  <>
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-1/2 origin-left bg-gradient-to-r from-surface/55 to-accent-soft/20"
                      initial={{ scaleX: 1 }}
                      whileInView={{ scaleX: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-1/2 origin-right bg-gradient-to-l from-surface/55 to-accent-soft/20"
                      initial={{ scaleX: 1 }}
                      whileInView={{ scaleX: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </>
                ) : null}

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-surface/90 text-accent shadow-card backdrop-blur-sm sm:left-6 sm:top-6"
                  initial={shouldAnimate ? { y: -28, scale: 0.55, opacity: 0 } : false}
                  whileInView={{ y: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ type: "spring", stiffness: 260, damping: 17, delay: 0.55 }}
                >
                  {shouldAnimate ? (
                    <>
                      <motion.span
                        className="absolute inset-0 rounded-full border border-accent/50"
                        animate={{ scale: [0.8, 1.8], opacity: [0.55, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute inset-0 rounded-full border border-accent/35"
                        animate={{ scale: [0.8, 1.8], opacity: [0.45, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 0.9, ease: "easeOut" }}
                      />
                    </>
                  ) : null}
                  <MapPin className="relative h-5 w-5" />
                </motion.div>
              </motion.div>
            </div>

            <p className="px-3 pt-4 text-center font-body text-xs text-subtle">
              {text.location.hint}
            </p>

            <div className="flex justify-center px-3 pb-3 pt-5">
              <RippleButton href={maps.externalUrl} ariaLabel={text.location.openMaps}>
                <ExternalLink className="h-4 w-4" aria-hidden />
                {text.location.openMaps}
              </RippleButton>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
