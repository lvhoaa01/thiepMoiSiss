"use client";

import { Facebook, Instagram, Link as LinkIcon, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GraduateIllustration } from "@/components/illustrations/GraduateIllustration";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site.config";
import type { SocialIcon } from "@/types";

const SOCIAL_ICONS: Record<SocialIcon, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  mail: Mail,
  phone: Phone,
  link: LinkIcon,
};

export function ClosingSection() {
  const { text, event, identity, socials } = siteConfig;

  return (
    <section id="closing" className="relative px-4 pb-28 pt-20 sm:pt-24">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <GraduateIllustration className="mx-auto h-40 w-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-gradient mt-6 font-display text-5xl font-bold sm:text-6xl">
            {text.closing.thankYou}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-md text-balance text-sm italic leading-relaxed text-ink/80 sm:text-base">
            “{text.closing.quote}”
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-subtle">
              {text.closing.contactLabel}
            </span>
            <a
              href={`tel:${event.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-200 ease-out-expo hover:-translate-y-0.5 tap-transparent"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {event.phone}
            </a>
          </div>
        </Reveal>

        {socials.length > 0 ? (
          <Reveal delay={0.25}>
            <div className="mt-8 flex items-center justify-center gap-3">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="glass grid h-11 w-11 place-items-center rounded-full text-navy transition-transform duration-200 hover:-translate-y-0.5 tap-transparent"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.3}>
          <p className="mt-12 text-xs text-subtle">
            © {event.calendar.year} · {identity.graduateName}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
