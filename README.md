# 🎓 Graduation Invitation Website

A premium, one-page graduation invitation built with the App Router. Open the
link and you step into an interactive invitation: a sealed envelope opens, the
card rises, soft flowers drift, confetti falls, a live countdown ticks beside a
real calendar, an embedded map shows the venue, guests RSVP, and their wishes
scroll endlessly in a movie-credits guestbook.

No traditional database — **Google Sheets is the database** and **Google Apps
Script is the API**. The whole site is themed and worded from **one config
file**.

---

## ✨ Features

- **Cinematic hero** — envelope-opening intro, graduate illustration, bunting &
  florals, per-guest greeting via `?guest=`.
- **Live countdown + calendar** — real July-2026 calendar with the event day
  highlighted; animated days/hours/minutes/seconds.
- **Location** — embedded Google Map + one-tap "Open in Google Maps".
- **RSVP** — validated form posting to Google Sheets, with a delightful success
  animation.
- **Digital guestbook** — wishes loaded from the sheet, looping infinitely with
  a soft gradient fade (pauses on hover).
- **Closing** — large thank-you, closing quote, tap-to-call phone.
- **Motion** — Framer Motion throughout (fade, slide, scale, ripple, parallax,
  scroll progress, back-to-top, desktop mouse glow), all respecting
  `prefers-reduced-motion`.
- **Production quality** — strict TypeScript (no `any`), SSR content for SEO,
  mobile-first responsive (320 → 1440), accessible, fast.

---

## 🧱 Tech stack

| Area       | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19                  |
| Language   | TypeScript (strict)                                 |
| Styling    | Tailwind CSS v3 (theme driven by CSS variables)     |
| Animation  | Framer Motion                                       |
| Icons      | lucide-react                                        |
| Fonts      | Be Vietnam Pro + Playfair Display (`next/font`)     |
| Backend    | Google Apps Script + Google Sheets                  |
| Hosting    | Vercel                                              |

---

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

> The app runs fully standalone out of the box. RSVP/guestbook persistence
> needs a Google Apps Script URL — see **[docs/APPS_SCRIPT_SETUP.md](docs/APPS_SCRIPT_SETUP.md)**.
> Until then, the RSVP shows its success animation (not persisted) and the
> guestbook shows a friendly empty state.

---

## ⚙️ Configure everything in one file

Open **[`config/site.config.ts`](config/site.config.ts)** — names, date, time,
address, phone, map, Apps Script URL, music, **theme color**, animation toggles
and **every UI string** live there. Full reference:
**[docs/CONFIGURATION.md](docs/CONFIGURATION.md)**.

```ts
identity: { graduateName: "NGUYỄN PHƯƠNG ANH", /* … */ },
event:    { dateLabel: "10/07/2026", countdownTargetISO: "2026-07-10T15:40:00+07:00", /* … */ },
theme:    { colors: { primary: "37 99 235", /* … */ } },
```

**Per-guest greeting:** share links like `?guest=Nguy%E1%BB%85n%20V%C4%83n%20A`
(encoded full name) or `?guest=NguyenVanA` (auto-spaced).

---

## 📁 Project structure

```
app/                  App Router shell
  layout.tsx          fonts, SEO metadata, theme CSS variables
  page.tsx            single page → <InvitationApp/>
  globals.css         Tailwind layers, base styles, utilities
  icon.svg            favicon (graduation cap)
components/
  InvitationApp.tsx   client root: intro + music + effects + sections
  GuestName.tsx       reads ?guest= inside a small Suspense boundary
  sections/           Hero · Countdown · Location · Rsvp · Guestbook · Closing
  effects/            EnvelopeIntro, Confetti, Particles, FloatingFlowers,
                      AnimatedBackground, MouseGlow, ScrollProgressBar, BackToTop
  ui/                 GlassCard, RippleButton, Reveal, Field, MusicToggle, SectionHeading
  illustrations/      GraduateIllustration, Bunting, Florals (inline SVG)
config/site.config.ts THE single source of truth
hooks/                useCountdown, useGuestName, usePrefersReducedMotion, useBackgroundMusic
lib/api.ts            submitRsvp() + fetchWishes()
types/index.ts        data-model + SiteConfig types
utils/                calendar, format, cn
apps-script/Code.gs   Google Apps Script backend
public/music/         background audio (silent placeholder included)
docs/                 setup & deployment guides
```

---

## 🔌 Backend & deployment

1. **[Google Sheet setup](docs/GOOGLE_SHEET_SETUP.md)** — create the sheet.
2. **[Apps Script setup](docs/APPS_SCRIPT_SETUP.md)** — paste `Code.gs`, deploy
   as a Web App, copy the `/exec` URL.
3. Put that URL in `config/site.config.ts` (`api.appsScriptUrl`) or in
   `NEXT_PUBLIC_APPS_SCRIPT_URL` (see `.env.example`).
4. **[Deploy to Vercel](docs/DEPLOYMENT.md)**.

Stuck? See **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)**.

---

## ♿ Accessibility & performance

- Semantic landmarks, labelled controls, visible focus rings, keyboard support.
- All large/continuous motion is disabled under `prefers-reduced-motion`.
- `next/font` (no layout shift), lazy map & effects, isolated countdown
  re-render, SSR'd content for SEO.

---

## 🌱 Future extension ideas

See the end of **[docs/CONFIGURATION.md](docs/CONFIGURATION.md)** — photo
gallery, multi-language, calendar (.ics) download, admin view of RSVPs,
email/Telegram notifications from Apps Script, and more.
