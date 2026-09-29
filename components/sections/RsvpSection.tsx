"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Confetti } from "@/components/effects/Confetti";
import { Field, controlClass } from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { RippleButton } from "@/components/ui/RippleButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { submitRsvp } from "@/lib/api";
import { cn } from "@/utils/cn";
import type { Attendance } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

interface RsvpSectionProps {
  /** Called after a successful submit so the guestbook can refresh. */
  onSubmitted?: () => void;
}

export function RsvpSection({ onSubmitted }: RsvpSectionProps) {
  const { text, motion: motionCfg } = siteConfig;
  const copy = text.rsvp;
  const prefersReduced = usePrefersReducedMotion();

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | Attendance>("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; attending?: string }>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const nextErrors: { name?: string; attending?: string } = {};
    if (!name.trim()) nextErrors.name = copy.validation.nameRequired;
    if (attending !== "yes" && attending !== "no") {
      nextErrors.attending = copy.validation.attendanceRequired;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    const result = await submitRsvp({
      name: name.trim(),
      attending: attending as Attendance,
      message: message.trim(),
    });

    if (result.ok) {
      setStatus("success");
      onSubmitted?.();
    } else {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setMessage("");
    setErrors({});
  };

  return (
    <section id="rsvp" className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          scriptLabel={copy.scriptLabel}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <Reveal className="mt-10">
          <GlassCard strong shine shineDelay={3} className="relative overflow-hidden p-6 sm:p-9">
            {status === "success" ? (
              <Confetti variant="burst" count={motionCfg.confettiCount} />
            ) : null}

            <motion.div
              layout={!prefersReduced}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    layout={!prefersReduced}
                    className="flex flex-col items-center py-6 text-center"
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.94, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, scale: 0.97 }}
                    transition={{ duration: prefersReduced ? 0 : 0.4 }}
                  >
                    <motion.span
                      className="grid h-16 w-16 place-items-center rounded-full bg-accent/12 text-accent"
                      initial={prefersReduced ? false : { scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 220, damping: 14 }
                      }
                    >
                      <CheckCircle2 className="h-9 w-9" aria-hidden />
                    </motion.span>
                    <h3 className="mt-5 font-heading text-2xl font-semibold text-primary">
                      {copy.successTitle}
                    </h3>
                    <p className="mt-2 font-body text-sm text-subtle">{copy.successBody}</p>
                    <motion.button
                      type="button"
                      onClick={resetForm}
                      className="mt-6 font-button text-sm font-medium text-accent underline-offset-4 hover:underline"
                      whileHover={prefersReduced ? undefined : { y: -2 }}
                      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                    >
                      {copy.sendAnother}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    layout={!prefersReduced}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: prefersReduced ? 0 : 0.28 }}
                    noValidate
                  >
                  <Field id="rsvp-name" label={copy.nameLabel} error={errors.name}>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={name}
                      onChange={(changeEvent) => setName(changeEvent.target.value)}
                      placeholder={copy.namePlaceholder}
                      className={controlClass}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                    />
                  </Field>

                  <Field id="rsvp-attending" label={copy.attendanceLabel} error={errors.attending}>
                    <div className="relative">
                      <select
                        id="rsvp-attending"
                        value={attending}
                        onChange={(changeEvent) =>
                          setAttending(changeEvent.target.value as "" | Attendance)
                        }
                        className={cn(controlClass, "appearance-none pr-10")}
                        aria-invalid={Boolean(errors.attending)}
                        aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
                      >
                        <option value="" disabled>
                          {copy.attendancePlaceholder}
                        </option>
                        <option value="yes">{copy.attendingYes}</option>
                        <option value="no">{copy.attendingNo}</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
                        aria-hidden
                      />
                    </div>
                  </Field>

                  <Field id="rsvp-message" label={copy.messageLabel}>
                    <textarea
                      id="rsvp-message"
                      value={message}
                      onChange={(changeEvent) => setMessage(changeEvent.target.value)}
                      placeholder={copy.messagePlaceholder}
                      rows={4}
                      className={cn(controlClass, "resize-none")}
                      maxLength={500}
                    />
                  </Field>

                  {status === "error" ? (
                    <p className="font-button text-sm font-medium text-red-600" role="alert">
                      {copy.errorGeneric}
                    </p>
                  ) : null}

                    <RippleButton type="submit" disabled={status === "submitting"} className="w-full">
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          {copy.submitting}
                        </>
                      ) : (
                        <>
                          <motion.span
                            initial={prefersReduced ? false : { x: -4, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={
                              prefersReduced
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 360, damping: 22 }
                            }
                          >
                            <Send className="h-4 w-4" aria-hidden />
                          </motion.span>
                          {copy.submit}
                        </>
                      )}
                    </RippleButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
