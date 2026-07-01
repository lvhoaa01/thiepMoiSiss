import type { Metadata, Viewport } from "next";

import { fontClassNames, fontRoleVars } from "@/config/fonts";
import { siteConfig } from "@/config/site.config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.siteUrl),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  applicationName: siteConfig.meta.title,
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.siteUrl,
    siteName: siteConfig.meta.title,
    locale: siteConfig.meta.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF6EF",
};

/** Strongly-typed CSS custom properties (no `any`). */
type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

/** Build every theme CSS variable from config (colors, gradient, radius, shadow, motion). */
function buildThemeVars(): CSSVars {
  const { colors, gradient, radius, shadow } = siteConfig.theme;
  const { durations, delayStep } = siteConfig.motion;

  return {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-accent-soft": colors.accentSoft,
    "--color-background": colors.background,
    "--color-surface": colors.surface,
    "--color-ink": colors.ink,
    "--color-subtle": colors.subtle,
    "--color-border": colors.border,
    "--color-on-dark": colors.onDark,

    "--gradient-accent": gradient,

    "--radius-card": radius.card,
    "--radius-media": radius.media,
    "--radius-control": radius.control,

    "--shadow-soft": shadow.soft,
    "--shadow-card": shadow.card,
    "--shadow-lift": shadow.lift,

    "--dur-fast": `${durations.fast}s`,
    "--dur-base": `${durations.base}s`,
    "--dur-slow": `${durations.slow}s`,
    "--delay-step": `${delayStep}s`,

    ...fontRoleVars,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={fontClassNames}>
      <body style={buildThemeVars()}>{children}</body>
    </html>
  );
}
