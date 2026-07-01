"use client";

import { Facebook, Instagram, Link as LinkIcon, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Flourish } from "@/components/illustrations/Flourish";
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
    <section id="closing" className="relative px-4 pb-28 pt-24 sm:pt-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <GraduateIllustration className="mx-auto h-36 w-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 font-script text-5xl text-accent sm:text-6xl">
            {text.closing.scriptLabel}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
            {text.closing.thankYou}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <Flourish className="mx-auto my-7 h-5 w-40 text-accent/70" />
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mx-auto max-w-md text-balance font-quote text-lg italic leading-relaxed text-ink/80 sm:text-xl">
            “{text.closing.quote}”
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <span className="font-button text-[0.7rem] text-subtle overline">
              {text.closing.contactLabel}
            </span>
            <a
              href={`tel:${event.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-button text-sm font-semibold tracking-wide text-on-dark shadow-card transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift tap-transparent"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {event.phone}
            </a>
          </div>
        </Reveal>

        {socials.length > 0 ? (
          <Reveal delay={0.35}>
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
                    className="card grid h-11 w-11 place-items-center rounded-full text-primary transition-transform duration-200 hover:-translate-y-0.5 tap-transparent"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.4}>
          <p className="mt-12 font-button text-xs text-subtle">
            © {event.calendar.year} · {identity.graduateName}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
