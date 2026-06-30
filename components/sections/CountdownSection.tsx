"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useMemo } from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { useCountdown } from "@/hooks/useCountdown";
import { buildMonthMatrix } from "@/utils/calendar";
import { pad2 } from "@/utils/format";
import { cn } from "@/utils/cn";

function CountdownTile({ value, label }: { value: number; label: string }) {
  const display = pad2(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-navy text-primary-foreground shadow-lift sm:h-20 sm:w-20">
        <AnimatePresence initial={false}>
          <motion.span
            key={display}
            className="absolute inset-0 grid place-items-center text-2xl font-bold tabular-nums sm:text-3xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-subtle">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { event, text } = siteConfig;
  const { timeLeft, mounted } = useCountdown(event.countdownTargetISO);

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
    <section id="countdown" className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title={text.countdown.title} subtitle={text.countdown.subtitle} />

        <Reveal className="mt-10">
          <GlassCard strong className="overflow-hidden p-5 sm:p-8">
            {/* Calendar */}
            <div className="rounded-3xl bg-white/60 p-4 sm:p-5">
              <div className="mb-4 flex items-baseline justify-between rounded-2xl bg-navy px-5 py-3 text-primary-foreground">
                <span className="font-display text-xl font-semibold sm:text-2xl">
                  {text.countdown.monthLabelPrefix} {pad2(event.calendar.month)}
                </span>
                <span className="font-display text-xl font-semibold sm:text-2xl">
                  {event.calendar.year}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {text.countdown.weekdays.map((weekday) => (
                  <div
                    key={weekday}
                    className="py-1 text-xs font-semibold text-subtle sm:text-sm"
                  >
                    {weekday}
                  </div>
                ))}

                {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    const isHighlight = day === event.calendar.highlightDay;
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="flex items-center justify-center py-1"
                      >
                        {day === null ? (
                          <span className="select-none text-subtle/30">·</span>
                        ) : isHighlight ? (
                          <span className="relative mx-auto grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md sm:h-10 sm:w-10">
                            {day}
                            <span className="absolute -top-2 left-1/2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-white text-primary shadow">
                              <GraduationCap className="h-3 w-3" aria-hidden />
                            </span>
                          </span>
                        ) : (
                          <span className="grid h-9 w-9 place-items-center text-sm text-ink/80 sm:h-10 sm:w-10">
                            {day}
                          </span>
                        )}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-8">
              {!mounted ? (
                <div className="flex justify-center gap-3 sm:gap-4" aria-hidden>
                  {units.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-navy/80 text-2xl font-bold text-primary-foreground sm:h-20 sm:w-20">
                        --
                      </div>
                      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-subtle">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : timeLeft.isComplete ? (
                <p
                  className={cn(
                    "rounded-2xl bg-primary/10 px-6 py-6 text-center font-display text-xl font-semibold text-navy sm:text-2xl",
                  )}
                  role="status"
                >
                  {text.countdown.finished}
                </p>
              ) : (
                <div
                  className="flex justify-center gap-3 sm:gap-4"
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
