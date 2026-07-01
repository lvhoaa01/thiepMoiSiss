"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Loader2, RotateCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fetchWishes } from "@/lib/api";
import { formatTimestamp, getInitials } from "@/utils/format";
import type { FetchStatus, Wish } from "@/types";

const SCROLL_SPEED = 0.035; // px per millisecond

interface GuestbookSectionProps {
  /** Bump to trigger a refetch (e.g. after a new RSVP). */
  reloadSignal: number;
}

function WishCard({ wish }: { wish: Wish }) {
  return (
    <article className="card rounded-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-heading text-sm font-bold text-on-dark">
          {getInitials(wish.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-semibold text-primary">
            {wish.name}
          </p>
          <p className="font-button text-xs text-subtle">{formatTimestamp(wish.timestamp)}</p>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-ink/90">
        {wish.message}
      </p>
    </article>
  );
}

export function GuestbookSection({ reloadSignal }: GuestbookSectionProps) {
  const copy = siteConfig.text.guestbook;
  const prefersReduced = usePrefersReducedMotion();

  const [status, setStatus] = useState<FetchStatus>("loading");
  const [wishes, setWishes] = useState<Wish[]>([]);

  const load = useCallback(async () => {
    setStatus("loading");
    const result = await fetchWishes();
    if (result.ok) {
      setWishes(result.data);
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, reloadSignal]);

  // ── Movie-credits marquee ────────────────────────────────────────────────
  const y = useMotionValue(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyHeight = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (copyRef.current) copyHeight.current = copyRef.current.offsetHeight;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [wishes]);

  useAnimationFrame((_, delta) => {
    if (prefersReduced || paused.current || copyHeight.current === 0) return;
    let next = y.get() - SCROLL_SPEED * delta;
    if (next <= -copyHeight.current) next += copyHeight.current;
    y.set(next);
  });

  const hasWishes = status === "success" && wishes.length > 0;

  return (
    <section id="guestbook" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          scriptLabel={copy.scriptLabel}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <Reveal className="mt-10">
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2 py-16 font-body text-subtle">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              <span>{copy.loading}</span>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="font-body text-sm text-subtle">{copy.error}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-5 py-2.5 font-button text-sm font-medium text-accent tap-transparent"
              >
                <RotateCw className="h-4 w-4" aria-hidden />
                {copy.retry}
              </button>
            </div>
          ) : !hasWishes ? (
            <p className="py-16 text-center font-body text-sm text-subtle">{copy.empty}</p>
          ) : prefersReduced ? (
            <div className="no-scrollbar max-h-[30rem] space-y-4 overflow-y-auto">
              {wishes.map((wish, index) => (
                <WishCard key={index} wish={wish} />
              ))}
            </div>
          ) : (
            <div
              className="mask-fade-y relative h-[26rem] overflow-hidden sm:h-[30rem]"
              onMouseEnter={() => (paused.current = true)}
              onMouseLeave={() => (paused.current = false)}
              onFocusCapture={() => (paused.current = true)}
              onBlurCapture={() => (paused.current = false)}
            >
              <motion.div style={{ y }} className="absolute inset-x-0 top-0">
                <div ref={copyRef} className="space-y-4 pb-4">
                  {wishes.map((wish, index) => (
                    <WishCard key={`a-${index}`} wish={wish} />
                  ))}
                </div>
                <div className="space-y-4 pb-4" aria-hidden>
                  {wishes.map((wish, index) => (
                    <WishCard key={`b-${index}`} wish={wish} />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
