"use client";

import { Clock, MapPin, Video } from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { useResolvedGuest } from "@/hooks/useResolvedGuest";
import type { PlanEntry } from "@/types";

/**
 * Personalized hero block: the guest's resolved name plus, when they are found
 * in the plan, their invitation type and session time. Rendered inside a
 * <Suspense> boundary in the hero (it reads the `?guest=` param).
 */
export function GuestDetails({ plan }: { plan: PlanEntry[] }) {
  const guest = useResolvedGuest(plan);
  const { text } = siteConfig;
  const isOffline = guest.type === "offline";

  return (
    <div className="flex flex-col items-center">
      <p className="font-heading text-[1.7rem] font-semibold leading-tight text-primary sm:text-4xl">
        {guest.displayName}
      </p>

      {guest.matched && guest.type ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 font-button">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-primary">
            {isOffline ? (
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
            ) : (
              <Video className="h-3.5 w-3.5 text-accent" aria-hidden />
            )}
            {isOffline ? text.hero.attendOffline : text.hero.attendOnline}
          </span>

          {isOffline && guest.time ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
              {text.hero.timeLabel}: {guest.time}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
