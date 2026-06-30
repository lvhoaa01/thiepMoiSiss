"use client";

import { useEffect, useState } from "react";

import type { TimeLeft } from "@/types";

const ZERO: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isComplete: false,
};

function computeTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isComplete: false,
  };
}

/**
 * Live countdown to an ISO target.
 *
 * `mounted` starts `false` so the component can render a stable placeholder
 * during SSR / first paint (avoiding hydration mismatch), then flips to the
 * real values on the client. Keep this hook inside a small, isolated
 * component so the per-second update doesn't re-render the whole page.
 */
export function useCountdown(targetISO: string): {
  timeLeft: TimeLeft;
  mounted: boolean;
} {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    const targetMs = new Date(targetISO).getTime();
    if (Number.isNaN(targetMs)) {
      setMounted(true);
      return;
    }

    setMounted(true);
    setTimeLeft(computeTimeLeft(targetMs));

    const intervalId = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(targetMs));
    }, 1_000);

    return () => window.clearInterval(intervalId);
  }, [targetISO]);

  return { timeLeft, mounted };
}
