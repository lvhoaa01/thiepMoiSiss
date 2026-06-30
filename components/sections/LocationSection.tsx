"use client";

import { ExternalLink, MapPin } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { RippleButton } from "@/components/ui/RippleButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";

export function LocationSection() {
  const { maps, event, text } = siteConfig;

  return (
    <section id="location" className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title={text.location.title} subtitle={text.location.subtitle} />

        <Reveal className="mt-10">
          <GlassCard strong className="overflow-hidden p-3 sm:p-4">
            <div className="overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  src={maps.embedUrl}
                  title={`Bản đồ địa điểm: ${event.address.join(", ")}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="px-3 pt-3 text-center text-xs text-subtle">{text.location.hint}</p>

            <div className="flex flex-col items-center gap-4 px-3 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <address className="not-italic text-sm leading-relaxed text-ink/90">
                  {event.address.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <RippleButton
                href={maps.externalUrl}
                ariaLabel={text.location.openMaps}
                className="shrink-0"
              >
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
