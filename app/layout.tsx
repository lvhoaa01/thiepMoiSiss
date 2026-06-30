import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";

import { siteConfig } from "@/config/site.config";

import "./globals.css";

/** Body / UI font — first-class Vietnamese diacritics. */
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/** Elegant display serif for names & section titles. */
const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

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
  // Allow zoom for accessibility.
  maximumScale: 5,
  themeColor: "#ffffff",
};

/** Strongly-typed CSS custom properties (no `any`). */
type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

function buildThemeVars(): CSSVars {
  const c = siteConfig.theme.colors;
  return {
    "--color-primary": c.primary,
    "--color-primary-foreground": c.primaryForeground,
    "--color-navy": c.navy,
    "--color-sky": c.sky,
    "--color-ink": c.ink,
    "--color-subtle": c.subtle,
    "--color-surface": c.surface,
    "--color-surface-2": c.surface2,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${sans.variable} ${display.variable}`}>
      <body style={buildThemeVars()}>{children}</body>
    </html>
  );
}
