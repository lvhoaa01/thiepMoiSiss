# 🎓 Graduation Invitation Website

A premium, one-page graduation invitation with an **academic editorial** style
(charcoal · champagne gold · ivory), inspired by high-end invitation design.
Open the link and a sealed envelope opens into a personalised invitation: the
graduate, the guest's own name/session, a photo gallery, a live countdown by a
real calendar, the venue map, a parking guide, RSVP, a scrolling guestbook and a
closing thank-you.

The backend is **Google Sheets + Google Apps Script** (no other database), guest
personalisation is driven by a **CSV plan**, and the whole look (colors, fonts,
radius, shadows, motion) is **config-driven**.

---

## ✨ Features

- **Personalised per guest** — `?guest=` is matched against `graPlan.csv`
  (diacritic-insensitive) to show the guest's canonical name, invitation type
  (**trực tiếp / trực tuyến**) and session time.
- **Cinematic hero** — envelope-opening intro (content stays fully hidden until
  it finishes), graduate illustration, inset gold frame.
- **Gallery** — responsive masonry (auto-loads every image in `public/gallery`),
  optimized via `next/image`, with a fullscreen lightbox (keyboard + swipe).
- **Save the Date** — big date + real calendar with the event day highlighted +
  animated countdown.
- **Location** — venue emphasis + embedded Google Map (sensible default zoom) +
  "Open in Maps".
- **Parking guide** — campus map + typographic car/motorbike instructions.
- **RSVP** — validated form → Google Sheets, with a success animation.
- **Guestbook** — wishes from the sheet, looping movie-credits style.
- **Motion** — Framer Motion throughout, all respecting `prefers-reduced-motion`.
- **Fully configurable** — theme + typography from config only; strict
  TypeScript, SSR content for SEO, mobile-first (320 → 1440).

---

## 🧱 Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v3
(CSS-variable theming) · Framer Motion · lucide-react · `next/font`
(Playfair Display · Cormorant Garamond · Lora · Be Vietnam Pro · Great Vibes) ·
Google Apps Script + Google Sheets · Vercel.

---

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build` · `npm run start` · `npm run lint`.

> Runs standalone. RSVP/guestbook persistence needs a Google Apps Script URL —
> see **[docs/APPS_SCRIPT_SETUP.md](docs/APPS_SCRIPT_SETUP.md)**.

---

## ⚙️ Configure everything

- **Content + theme:** [`config/site.config.ts`](config/site.config.ts) — names,
  date, address, phone, map, **theme** (colors · gradient · radius · shadow ·
  motion), gallery/parking text and all UI strings.
- **Fonts:** [`config/fonts.ts`](config/fonts.ts) — seven typography roles
  (heading · section · body · quote · countdown · button · script).
- **Guest plan:** [`graPlan.csv`](graPlan.csv) at the project root.
- **Gallery images:** drop into `public/gallery/` (auto-loaded).
- **Parking map:** `public/mapXe.jpg`.

Full reference: **[docs/CONFIGURATION.md](docs/CONFIGURATION.md)**.

**Guest links:** `?guest=Nguy%E1%BB%85n%20V%C4%83n%20A` (encoded name) or
`?guest=NguyenThienTai` (slug — matched to the plan, honorifics tolerated).

---

## 📁 Project structure

```
app/                 layout (fonts, SEO, theme vars) · page · globals · icon
components/
  InvitationApp.tsx  client root (intro · music · effects · sections)
  GuestDetails.tsx   personalised guest block (reads ?guest=)
  sections/          Hero · Gallery · Countdown · Location · Parking ·
                     Rsvp · Guestbook · Closing
  effects/           EnvelopeIntro · Confetti · Particles · AnimatedBackground ·
                     MouseGlow · ScrollProgressBar · BackToTop
  ui/                GlassCard · RippleButton · Field · Reveal · MusicToggle ·
                     SectionHeading
  illustrations/     GraduateIllustration · Flourish
config/              site.config.ts · fonts.ts
hooks/               useCountdown · useResolvedGuest · usePrefersReducedMotion ·
                     useBackgroundMusic
lib/                 plan.ts (CSV parse + guest resolve) · serverData.ts
                     (build-time load) · api.ts (RSVP + wishes)
types/index.ts       data-model + SiteConfig types
utils/               calendar · format · cn
apps-script/Code.gs  Google Apps Script backend
public/gallery/      gallery photos (auto-loaded)   public/mapXe.jpg
graPlan.csv          invitation plan (guest → type · session time)
docs/                setup & deployment guides
```

Section order: **Invitation → Gallery → Save the Date → Location → Parking →
RSVP → Guestbook → Thank You**.

---

## 🔌 Backend & deployment

1. [Create the sheet](docs/GOOGLE_SHEET_SETUP.md) →
   2. [Deploy the Apps Script](docs/APPS_SCRIPT_SETUP.md) → paste the `/exec` URL
   into config / `NEXT_PUBLIC_APPS_SCRIPT_URL` →
   3. [Deploy to Vercel](docs/DEPLOYMENT.md).

Troubleshooting: **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)**.

---

## ♿ Accessibility & performance

Semantic landmarks, labelled controls, keyboard support (incl. lightbox), visible
focus, reduced-motion honored. `next/image` optimization + lazy gallery,
`next/font` (no CLS), isolated countdown re-render, SSR'd content for SEO.
