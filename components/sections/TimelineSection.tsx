"use client";

import { motion } from "framer-motion";
import { Camera, Clock, FileSignature, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { TimelineIcon } from "@/types";

const ICONS: Record<TimelineIcon, LucideIcon> = {
  sign: FileSignature,
  cap: GraduationCap,
  camera: Camera,
  clock: Clock,
};

export function TimelineSection() {
  const { timeline } = siteConfig;
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="timeline" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          scriptLabel={timeline.scriptLabel}
          title={timeline.title}
          subtitle={timeline.subtitle}
        />

        <div className="relative mt-12">
          {/* base spine */}
          <span
            aria-hidden
            className="absolute bottom-3 left-6 top-3 w-px bg-hairline"
          />
          {/* gold line that grows on entering the viewport */}
          <motion.span
            aria-hidden
            className="absolute bottom-3 left-6 top-3 w-[2px] origin-top bg-gradient-to-b from-accent to-accent-soft"
            initial={{ scaleY: prefersReduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          <ol className="space-y-6">
            {timeline.items.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={index} className="relative pl-16 sm:pl-20">
                  <Reveal delay={index * siteConfig.motion.delayStep}>
                    <span className="absolute left-0 top-1 z-10 grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-surface text-accent shadow-card">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>

                    <GlassCard hover shine shineDelay={1 + index * 2} className="p-5 sm:p-6">
                      <time className="text-gradient font-heading text-lg font-bold sm:text-xl">
                        {item.time}
                      </time>
                      <h3 className="mt-1 font-heading text-base font-semibold text-primary sm:text-lg">
                        {item.title}
                      </h3>

                      {item.notes && item.notes.length > 0 ? (
                        <>
                          <p className="mt-4 font-button text-xs text-accent overline">
                            {siteConfig.parking.noteLabel}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {item.notes.map((note, noteIndex) => (
                              <li
                                key={noteIndex}
                                className="flex gap-2.5 font-body text-sm leading-relaxed text-ink/85"
                              >
                                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </GlassCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
