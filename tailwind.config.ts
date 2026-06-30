import type { Config } from "tailwindcss";

/**
 * Tailwind theme.
 *
 * Colors intentionally reference CSS custom properties so the entire palette
 * can be driven from `config/site.config.ts` (see `app/layout.tsx`, where the
 * variables are written onto <body>). Changing the theme color in the config
 * file re-themes the whole site — no Tailwind edits required.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--color-primary-foreground) / <alpha-value>)",
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        sky: "rgb(var(--color-sky) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--color-surface-2) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px rgb(15 23 42 / 0.06)",
        glass:
          "0 1px 1px rgb(255 255 255 / 0.5) inset, 0 10px 40px -12px rgb(30 58 138 / 0.25)",
        lift: "0 20px 50px -20px rgb(30 58 138 / 0.35)",
        glow: "0 0 0 1px rgb(255 255 255 / 0.4) inset, 0 18px 60px -20px rgb(56 189 248 / 0.45)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 18s ease infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
