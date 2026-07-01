# Configuration guide

Two config files, plus a CSV and two asset folders:

| What              | Where                                    |
| ----------------- | ---------------------------------------- |
| Content + theme   | [`config/site.config.ts`](../config/site.config.ts) |
| Fonts (7 roles)   | [`config/fonts.ts`](../config/fonts.ts)  |
| Guest plan        | [`graPlan.csv`](../graPlan.csv) (project root) |
| Gallery photos    | `public/gallery/` (auto-loaded)          |
| Parking map       | `public/mapXe.jpg`                       |

The shape of `site.config.ts` is enforced by `SiteConfig` in
[`types/index.ts`](../types/index.ts).

---

## Theme (colors · gradient · radius · shadow)

```ts
theme: {
  colors: {
    primary: "38 33 29",       // charcoal (text/dark surfaces)
    secondary: "125 106 90",   // warm taupe
    accent: "176 137 75",      // champagne gold (accents, highlights)
    accentSoft: "216 185 120", // light gold
    background: "250 246 239", // ivory page
    surface: "255 253 249",    // card
    ink: "43 39 34",           // body text
    subtle: "138 124 110",     // muted text
    border: "223 209 186",     // hairline
    onDark: "247 240 228",     // cream on dark
  },
  gradient: "linear-gradient(100deg, #9C7636, #D8B978 46%, #B0894B)",
  radius: { card: "1.75rem", media: "1.25rem", control: "0.85rem" },
  shadow: { soft: "…", card: "…", lift: "…" },
},
```

- Colors are **space-separated RGB triples** ("R G B", no `#`) so Tailwind can
  apply opacity via `rgb(var(--color-…) / <alpha>)`.
- `gradient` is any CSS gradient (used by `.text-gradient`).
- `radius`/`shadow` are raw CSS values → Tailwind `rounded-card|media|control`
  and `shadow-soft|card|lift`.
- All values become CSS variables on `<body>` (see `app/layout.tsx`).
- **Prefer a warmer/cooler mood?** e.g. blush like the references — change
  `accent` + `background` + `gradient` and the whole site follows.

## Motion (speed · duration · delay)

```ts
motion: {
  enabled: true, introEnabled: true, introDurationMs: 2800,
  speed: 1,                                   // global multiplier (>1 = faster)
  durations: { fast: 0.35, base: 0.7, slow: 1.1 }, // seconds
  delayStep: 0.09,
  confettiCount: 70, particleCount: 22, mouseGlow: true,
},
```

Exposed as `--dur-fast|base|slow` / `--delay-step`, and read by animations
(e.g. `Reveal` uses `durations.base / speed`). All motion yields to the OS
"reduce motion" setting.

## Fonts (7 roles)

Edit [`config/fonts.ts`](../config/fonts.ts). Each role is a CSS variable mapped
to a family; change a role by pointing it at another family (or swapping the
next/font import):

```ts
export const fontRoleVars = {
  "--font-heading":   "var(--font-playfair)",
  "--font-section":   "var(--font-cormorant)",
  "--font-body":      "var(--font-lora)",
  "--font-quote":     "var(--font-cormorant)",
  "--font-countdown": "var(--font-playfair)",
  "--font-button":    "var(--font-be-vietnam)",
  "--font-script":    "var(--font-great-vibes)",
};
```

Used by Tailwind as `font-heading`, `font-body`, `font-script`, etc.
The **script** family is Latin-only (English accents) — keep Vietnamese text in
the Vietnamese-capable roles.

---

## Guest plan — `graPlan.csv`

Two lists side by side (offline with session time · online):

```
Danh sách khách mời đến trực tiếp,,,Danh sách khách mời online,
STT,Họ và tên,Thời gian,STT,Họ và tên
1,Mẹ yêu dấu của con,11h45 - 17h,1,Em iu Nguyễn Thị Phương & Người thương
...
```

- The **Thời gian** column marks a session start and is **forward-filled** onto
  the guests below it.
- `?guest=` is matched **diacritic-insensitively** and tolerates honorifics:
  `?guest=NguyenThienTai` → "Bạn thân Nguyễn Thiên Tài" (offline, 15h40).
- No match → the raw name is shown (no type/time). No `?guest=` →
  `identity.defaultGuestName`.

Parsing/matching live in [`lib/plan.ts`](../lib/plan.ts); the CSV is read at
build time by [`lib/serverData.ts`](../lib/serverData.ts).

## Gallery

Drop images into `public/gallery/` — every image file is auto-loaded (sorted by
name), optimized by `next/image`, shown in a masonry grid with a lightbox. Text
labels live in `gallery` in the config.

## Parking

`parking` in the config holds the map path (`public/mapXe.jpg`), notes, and the
car routes (in/out) + motorbike locations.

## Identity / event / maps / api / music

Names, `dateLabel`, `timeLabel`, `weekdayLabel`, `address`, `venueName`, `phone`,
`countdownTargetISO` (include the `+07:00` offset), `calendar`. Maps are built
from `maps.query` + `maps.zoom` (raise `zoom` to get closer). `api.appsScriptUrl`
reads `NEXT_PUBLIC_APPS_SCRIPT_URL` first. Music: `src` (a silent placeholder
ships at `public/music/background.wav`), `enabledByDefault`, `volume`.

---

## 🌱 Future extension ideas

- Per-session grouping page (list guests by session time).
- Multi-language toggle (the `text` block is centralized).
- "Add to calendar" (.ics) from `event`.
- Admin view of RSVPs; email/Telegram notifications from `Code.gs`.
