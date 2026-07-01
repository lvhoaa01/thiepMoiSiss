import {
  Be_Vietnam_Pro,
  Cormorant_Garamond,
  Great_Vibes,
  Lora,
  Playfair_Display,
} from "next/font/google";

/**
 * ============================================================================
 *  FONT CONFIGURATION
 * ============================================================================
 *  Typography has multiple roles (heading · section title · body · quote ·
 *  countdown · button · script). To change a role's typeface, either:
 *    • point the role at a different family in `fontRoleVars` below, or
 *    • swap the family import + instance.
 *
 *  next/font requires static imports, so the actual families live here (this
 *  IS the font config file). All non-Latin (Vietnamese) roles use fonts with
 *  the `vietnamese` subset; the decorative script is Latin-only (English).
 * ============================================================================
 */

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

/** Applied to <html> so every family variable is available. */
export const fontClassNames = [
  playfair.variable,
  cormorant.variable,
  lora.variable,
  beVietnam.variable,
  greatVibes.variable,
].join(" ");

/**
 * Role → family mapping (the configurable bit). Consumed in `app/layout.tsx`
 * and referenced by Tailwind's `fontFamily` (font-heading, font-body, …).
 */
export const fontRoleVars: Record<`--font-${string}`, string> = {
  "--font-heading": "var(--font-playfair)",
  "--font-section": "var(--font-cormorant)",
  "--font-body": "var(--font-lora)",
  "--font-quote": "var(--font-cormorant)",
  "--font-countdown": "var(--font-playfair)",
  "--font-button": "var(--font-be-vietnam)",
  "--font-script": "var(--font-great-vibes)",
};
