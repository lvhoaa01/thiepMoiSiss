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

function CountdownTile({ value, label }: { value: number; label: string }) {
  const display = pad2(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-media bg-primary text-on-dark shadow-card">
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
      <span className="mt-2.5 font-button text-xs font-medium tracking-wide text-subtle">
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
    <section id="countdown" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
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
            <div className="mx-auto mt-8 max-w-md rounded-media bg-background/60 p-3 sm:p-5">
              <p className="mb-3 text-center font-heading text-lg font-semibold text-primary">
                {text.countdown.monthLabelPrefix} {pad2(event.calendar.month)}, {event.calendar.year}
              </p>

              <div className="grid grid-cols-7 gap-1 text-center">
                {text.countdown.weekdays.map((weekday) => (
                  <div
                    key={weekday}
                    className="pb-1 font-button text-[0.7rem] font-semibold text-accent sm:text-xs"
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
                        className="relative flex aspect-square items-center justify-center"
                      >
                        {day === null ? (
                          <span className="select-none text-subtle/30">·</span>
                        ) : isHighlight ? (
                          <>
                            <span className="absolute inset-[15%] rounded-full bg-accent shadow-md" />
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
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-9">
              {!mounted ? (
                <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3" aria-hidden>
                  {units.map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <div className="grid aspect-square w-full place-items-center rounded-media bg-primary/80 font-countdown text-2xl font-bold text-on-dark sm:text-3xl">
                        --
                      </div>
                      <span className="mt-2.5 font-button text-xs font-medium tracking-wide text-subtle">
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
                  className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3"
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
