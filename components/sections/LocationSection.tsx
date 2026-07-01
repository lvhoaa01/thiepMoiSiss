"use client";

import { ExternalLink } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { RippleButton } from "@/components/ui/RippleButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";

export function LocationSection() {
  const { maps, event, text } = siteConfig;

  return (
    <section id="location" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          scriptLabel={text.location.scriptLabel}
          title={text.location.title}
          subtitle={text.location.subtitle}
        />

        <Reveal className="mt-10">
          <GlassCard strong className="overflow-hidden p-4 sm:p-5">
            <div className="px-2 pb-5 pt-3 text-center">
              <p className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                {event.venueName}
              </p>
              <address className="mt-2 not-italic font-body text-sm text-subtle">
                {event.address.join(", ")}
              </address>
            </div>

            <div className="overflow-hidden rounded-media">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  src={maps.embedUrl}
                  title={`Bản đồ: ${event.venueName}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="px-3 pt-4 text-center font-body text-xs text-subtle">
              {text.location.hint}
            </p>

            <div className="flex justify-center px-3 pb-3 pt-5">
              <RippleButton href={maps.externalUrl} ariaLabel={text.location.openMaps}>
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
