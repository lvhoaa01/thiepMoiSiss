"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useMemo } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { useCountdown } from "@/hooks/useCountdown";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { buildMonthMatrix } from "@/utils/calendar";
import { pad2 } from "@/utils/format";

const calendarVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022, delayChildren: 0.08 } },
};

const dayVariants = {
  hidden: { opacity: 0, y: 9, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function CountdownTile({ value, label }: { value: number; label: string }) {
  const display = pad2(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-20 w-full place-items-center overflow-hidden rounded-media bg-primary text-on-dark shadow-card sm:h-24">
        <AnimatePresence initial={false}>
          <motion.span
            key={display}
            className="absolute inset-0 grid place-items-center font-countdown text-2xl font-bold tabular-nums sm:text-3xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-button text-xs font-semibold tracking-wide text-subtle sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { event, text } = siteConfig;
  const { timeLeft, mounted } = useCountdown(event.countdownTargetISO);
  const prefersReduced = usePrefersReducedMotion();
  const shouldAnimate = siteConfig.motion.enabled && !prefersReduced;

  const weeks = useMemo(
    () => buildMonthMatrix(event.calendar.year, event.calendar.month),
    [event.calendar.year, event.calendar.month],
  );

  const units = [
    { value: timeLeft.days, label: text.countdown.days },
    { value: timeLeft.hours, label: text.countdown.hours },
    { value: timeLeft.minutes, label: text.countdown.minutes },
    { value: timeLeft.seconds, label: text.countdown.seconds },
  ];

  return (
    <section id="countdown" className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          scriptLabel={text.countdown.scriptLabel}
          title={text.countdown.title}
          subtitle={text.countdown.subtitle}
        />

        <Reveal className="mt-10">
          <GlassCard strong shine shineDelay={2} className="overflow-hidden p-5 sm:p-9">
            {/* Big date */}
            <div className="text-center">
              <p className="font-body text-sm text-subtle">
                {event.weekdayLabel} · {event.timeLabel}
              </p>
              <p className="text-gradient mt-1 font-heading text-4xl font-bold sm:text-5xl">
                {event.dateLabel}
              </p>
            </div>

            {/* Calendar */}
            <div className="mx-auto mt-8 max-w-2xl rounded-media bg-background/60 p-3 sm:p-5">
              <p className="mb-3 text-center font-heading text-lg font-semibold text-primary">
                {text.countdown.monthLabelPrefix} {pad2(event.calendar.month)}, {event.calendar.year}
              </p>

              <motion.div
                className="grid grid-cols-7 gap-1 text-center"
                variants={calendarVariants}
                initial={shouldAnimate ? "hidden" : false}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                {text.countdown.weekdays.map((weekday) => (
                  <motion.div
                    key={weekday}
                    className="pb-1 font-button text-[0.7rem] font-semibold text-accent sm:text-xs"
                    variants={shouldAnimate ? dayVariants : undefined}
                  >
                    {weekday}
                  </motion.div>
                ))}

                {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    const isHighlight = day === event.calendar.highlightDay;
                    return (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className="relative flex aspect-square items-center justify-center"
                        variants={shouldAnimate ? dayVariants : undefined}
                      >
                        {day === null ? (
                          <span className="select-none text-subtle/30">·</span>
                        ) : isHighlight ? (
                          <>
                            {shouldAnimate ? (
                              <motion.span
                                className="absolute inset-[15%] rounded-full border border-accent/60"
                                initial={{ scale: 0.75, opacity: 0 }}
                                whileInView={{ scale: [0.75, 1.75, 2.1], opacity: [0, 0.45, 0] }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{ duration: 1.25, delay: 0.9, ease: "easeOut" }}
                              />
                            ) : null}
                            <motion.span
                              className="absolute inset-[15%] rounded-full bg-accent shadow-md"
                              initial={shouldAnimate ? { scale: 0.35, rotate: -20 } : false}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ once: true, amount: 0.8 }}
                              transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.45 }}
                            />
                            <span className="relative font-body text-xs font-bold text-on-dark sm:text-sm">
                              {day}
                            </span>
                            <span className="absolute -top-1 left-1/2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-surface text-accent shadow">
                              <GraduationCap className="h-2.5 w-2.5" aria-hidden />
                            </span>
                          </>
                        ) : (
                          <span className="font-body text-xs text-ink/80 sm:text-sm">{day}</span>
                        )}
                      </motion.div>
                    );
                  }),
                )}
              </motion.div>
            </div>

            {/* Countdown */}
            <div className="mt-9">
              {!mounted ? (
                <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-3" aria-hidden>
                  {units.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <div className="grid h-20 w-full place-items-center rounded-media bg-primary/80 font-countdown text-2xl font-bold text-on-dark sm:h-24 sm:text-3xl">
                        --
                      </div>
                      <span className="mt-2 font-button text-xs font-semibold tracking-wide text-subtle sm:text-sm">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : timeLeft.isComplete ? (
                <p
                  className="rounded-media bg-accent/12 px-6 py-6 text-center font-heading text-xl font-semibold text-primary sm:text-2xl"
                  role="status"
                >
                  {text.countdown.finished}
                </p>
              ) : (
                <div
                  className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-3"
                  role="timer"
                  aria-live="off"
                >
                  {units.map((unit) => (
                    <CountdownTile key={unit.label} value={unit.value} label={unit.label} />
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
