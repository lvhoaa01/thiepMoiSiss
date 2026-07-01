import type { Config } from "tailwindcss";

/**
 * Tailwind theme. Colors, radius, shadows and fonts all reference CSS
 * variables written from `config/site.config.ts` + `config/fonts.ts` (see
 * `app/layout.tsx`). Editing the config re-themes the whole site.
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
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        hairline: "rgb(var(--color-border) / <alpha-value>)",
        "on-dark": "rgb(var(--color-on-dark) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-serif", "Georgia", "serif"],
        section: ["var(--font-section)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-serif", "Georgia", "serif"],
        quote: ["var(--font-quote)", "ui-serif", "Georgia", "serif"],
        countdown: ["var(--font-countdown)", "ui-serif", "Georgia", "serif"],
        button: ["var(--font-button)", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        media: "var(--radius-media)",
        control: "var(--radius-control)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      backgroundImage: {
        "gradient-accent": "var(--gradient-accent)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        // ── Ambient effects (GPU: transform + opacity only) ──
        "card-shine": {
          "0%": { transform: "translateX(-160%) skewX(-16deg)", opacity: "0" },
          "8%": { opacity: "0.6" },
          "26%": { transform: "translateX(160%) skewX(-16deg)", opacity: "0" },
          "100%": { transform: "translateX(160%) skewX(-16deg)", opacity: "0" },
        },
        "dust-rise": {
          "0%": { transform: "translate3d(0,0,0)", opacity: "0" },
          "12%": { opacity: "var(--amb-op, 0.4)" },
          "88%": { opacity: "var(--amb-op, 0.4)" },
          "100%": {
            transform: "translate3d(var(--amb-dx, 0px), -102vh, 0)",
            opacity: "0",
          },
        },
        "sparkle-float": {
          "0%": { transform: "translateY(8px) scale(0.4)", opacity: "0" },
          "18%": { transform: "translateY(0) scale(1)", opacity: "var(--amb-op, 0.85)" },
          "82%": { transform: "translateY(-10px) scale(1)", opacity: "var(--amb-op, 0.85)" },
          "100%": { transform: "translateY(-22px) scale(0.4)", opacity: "0" },
        },
        "aurora-a": {
          "0%, 100%": { transform: "translate3d(-6%,-4%,0) scale(1)" },
          "50%": { transform: "translate3d(4%,3%,0) scale(1.12)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate3d(5%,4%,0) scale(1.05)" },
          "50%": { transform: "translate3d(-4%,-3%,0) scale(0.95)" },
        },
        "shooting-star": {
          "0%": { opacity: "0", transform: "translate3d(0,0,0) rotate(20deg)" },
          "2%": { opacity: "1" },
          "11%": { opacity: "0", transform: "translate3d(340px,190px,0) rotate(20deg)" },
          "100%": { opacity: "0", transform: "translate3d(340px,190px,0) rotate(20deg)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 20s ease infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "card-shine": "card-shine 8s ease-in-out infinite",
        "dust-rise": "dust-rise 16s linear infinite",
        "sparkle-float": "sparkle-float 5s ease-in-out infinite",
        "aurora-a": "aurora-a 30s ease-in-out infinite",
        "aurora-b": "aurora-b 36s ease-in-out infinite",
        "shooting-star": "shooting-star 14s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
