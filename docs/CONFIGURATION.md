# Configuration guide

Everything is configured from **one file**: [`config/site.config.ts`](../config/site.config.ts).
Its shape is enforced by the `SiteConfig` type in [`types/index.ts`](../types/index.ts),
so your editor will autocomplete and catch mistakes.

---

## `meta` — SEO

| Field         | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `title`       | Browser tab + OpenGraph title                      |
| `description` | Meta description + OG/Twitter description          |
| `locale`      | OpenGraph locale (`vi_VN`)                         |
| `siteUrl`     | Your deployed origin (used for `metadataBase`/OG)  |

## `identity`

`invitationTitle`, `ceremonyLabel`, `graduateName`, `guestPrefix`, and
`defaultGuestName` (shown when no `?guest=` is present).

## `event`

| Field                | Example                          |
| -------------------- | -------------------------------- |
| `dateLabel`          | `"10/07/2026"`                   |
| `timeLabel`          | `"15:40 - 16:50"`                |
| `address`            | array of lines                   |
| `phone`              | `"0394536855"` (used for `tel:`) |
| `countdownTargetISO` | `"2026-07-10T15:40:00+07:00"`    |
| `calendar`           | `{ year, month, highlightDay }`  |

> **Countdown** is driven by `countdownTargetISO` — always include the timezone
> offset (`+07:00` for Vietnam). The **calendar** is independent: set `year`,
> `month` (1-indexed) and the `highlightDay` to circle.

## `maps`

`embedUrl` (the `<iframe src>`) and `externalUrl` (opened by the button). The
defaults are built from a single `MAP_QUERY` constant near the top of the file —
edit that, or paste full URLs from **Google Maps → Share**:

- Embed: _Share → Embed a map → copy the `src`_.
- Link: _Share → Send a link → copy the URL_.

## `api`

`appsScriptUrl` — your deployed Apps Script `/exec` URL. It reads
`NEXT_PUBLIC_APPS_SCRIPT_URL` first (handy on Vercel), then this value. See
[APPS_SCRIPT_SETUP.md](APPS_SCRIPT_SETUP.md).

## `music`

`src` (path under `/public`), `enabledByDefault`, `volume` (0–1). A **silent
placeholder** ships at `public/music/background.wav`. Replace it with your track
and update `src`. See [`public/music/README.md`](../public/music/README.md).

## `theme` — colors

Each color is a **space-separated RGB triple** (no `#`), e.g. `"37 99 235"`.
This lets Tailwind apply opacity via `rgb(var(--color-...) / <alpha>)`.

```ts
theme: {
  colors: {
    primary: "37 99 235",            // buttons, accents, glow
    primaryForeground: "255 255 255",
    navy: "12 27 56",                // headings / dark surfaces
    sky: "56 189 248",               // light accent / particles
    ink: "15 23 42",                 // body text
    subtle: "100 116 139",           // muted text
    surface: "248 251 255",          // page background
    surface2: "234 243 255",         // panels
  },
},
```

Change `primary` to re-theme the whole site. (Want a hex picker? Convert hex →
RGB and drop the channels in.) The values are written onto `<body>` as CSS
variables in [`app/layout.tsx`](../app/layout.tsx).

## `animation`

| Field             | Effect                                              |
| ----------------- | --------------------------------------------------- |
| `enabled`         | Master switch for decorative motion                 |
| `introEnabled`    | Envelope opening intro                              |
| `introDurationMs` | Total intro length                                  |
| `confettiCount`   | Confetti pieces (intro + RSVP success)              |
| `flowerCount`     | Floating flowers                                    |
| `particleCount`   | Background particles                                |
| `mouseGlow`       | Desktop pointer glow                                |

All motion also yields to the OS **"reduce motion"** setting automatically.

## `text`

Every visible string (section titles, RSVP labels & validation, countdown
labels, the `weekdays` array, the countdown-finished message, closing quote,
music labels, …). Translate the site by editing this block.

## `socials`

Optional array. Each item: `{ label, href, icon }` where `icon` is one of
`facebook | instagram | mail | phone | link`. Rendered in the closing section.

---

## 🌱 Future extension ideas

- **Photo gallery** section (Next `<Image>` + a config array of images).
- **Multi-language** toggle (the `text` block is already centralized).
- **Add to calendar** — generate an `.ics` from `event`.
- **Admin view** — a protected route listing RSVPs from the sheet.
- **Notifications** — extend `Code.gs` to email / Telegram on each RSVP.
- **QR code** to the invite link for printed cards.
