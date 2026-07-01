"use client";

import { Bike, Car, MapPin } from "lucide-react";
import Image from "next/image";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import type { ParkingRoute } from "@/types";

function RouteFlow({ route }: { route: ParkingRoute }) {
  return (
    <div>
      <p className="font-button text-sm font-semibold tracking-wide text-primary">
        {route.label}
      </p>
      <ol className="mt-3 space-y-2.5">
        {route.steps.map((step, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/12 font-button text-xs font-semibold text-accent">
              {index + 1}
            </span>
            <span className="font-body text-sm text-ink/90">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ParkingSection() {
  const { parking } = siteConfig;

  return (
    <section id="parking" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          scriptLabel={parking.scriptLabel}
          title={parking.title}
          subtitle={parking.subtitle}
        />

        <Reveal className="mt-10">
          <GlassCard strong className="overflow-hidden p-4 sm:p-5">
            <div className="overflow-hidden rounded-media bg-background/60">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={parking.mapImage}
                  alt="Bản đồ khuôn viên trường và khu vực gửi xe"
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6 grid gap-6">
          {/* Car */}
          <Reveal>
            <GlassCard strong className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/12 text-accent">
                  <Car className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {parking.car.title}
                </h3>
              </div>

              <p className="mt-5 font-button text-xs text-accent overline">{parking.noteLabel}</p>
              <div className="mt-2 space-y-2">
                {parking.car.notes.map((note, index) => (
                  <p key={index} className="font-body text-sm leading-relaxed text-ink/90">
                    {note}
                  </p>
                ))}
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <RouteFlow route={parking.car.routeIn} />
                <RouteFlow route={parking.car.routeOut} />
              </div>
            </GlassCard>
          </Reveal>

          {/* Motorbike */}
          <Reveal delay={0.05}>
            <GlassCard strong className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/12 text-accent">
                  <Bike className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {parking.motorbike.title}
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {parking.motorbike.locations.map((location, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="font-body text-sm text-ink/90">{location}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
