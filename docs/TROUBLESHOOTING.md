# Troubleshooting

## RSVP doesn't appear in the sheet

- **Endpoint not set** — confirm `api.appsScriptUrl` (or
  `NEXT_PUBLIC_APPS_SCRIPT_URL`) is your real `/exec` URL, not the
  `REPLACE_WITH_YOUR_DEPLOYMENT_ID` placeholder. While it's the placeholder the
  form shows success but **does not persist** (demo mode).
- **Access** — the deployment must be **Execute as: Me**, **Who has access:
  Anyone** ([APPS_SCRIPT_SETUP](APPS_SCRIPT_SETUP.md)).
- **Edited the script but nothing changed?** Re-deploy a **new version**
  (Manage deployments → Edit → New version).
- **Wrong tab name** — the sheet tab must be `RSVP` (the script also creates it
  if missing).

> Because POST uses `mode: "no-cors"` (fire-and-forget), the browser can't read
> the response — the UI always shows success once the request is sent. Verify
> persistence by checking the sheet, or by opening `…/exec?action=wishes`.

## Guestbook is empty / won't load

- Empty is normal until someone leaves a wish (a row **with a Message**).
- Loading error → open `https://…/exec?action=wishes` directly:
  - `{"ok":true,"data":[...]}` → API is fine; check the browser console/network.
  - Error or login page → fix the deployment access (must be **Anyone**) and
    re-deploy.

## Map doesn't show

- Make sure `maps.embedUrl` is an **embeddable** URL. Easiest: Google Maps →
  **Share → Embed a map → copy the `src`** and paste it into `maps.embedUrl`.
  The `…?q=…&output=embed` form (used by default) also works without an API key.

## Music doesn't play

- A **silent** placeholder ships at `public/music/background.wav`, so the toggle
  works but you hear nothing until you add a real track and update `music.src`
  (see [`public/music/README.md`](../public/music/README.md)).
- Music starts on the **first tap** (opening the envelope) to satisfy browser
  autoplay rules. If the intro is disabled, use the top-right toggle.

## Guest name shows "Quý khách"

- That's the default when there's no `?guest=`. Add it to the URL, e.g.
  `?guest=NguyenVanA` or an encoded full name
  `?guest=Nguy%E1%BB%85n%20V%C4%83n%20A`.

## Build or type errors

- Use Node 18.18+ (Node 20/22 recommended). Run `npm install` first.
- `useSearchParams()` Suspense error → only `components/GuestName.tsx` reads the
  param and it's wrapped in `<Suspense>` in the hero; don't call
  `useSearchParams` outside a Suspense boundary elsewhere.

## Diacritics look wrong

- Fonts load the `vietnamese` subset via `next/font`. If you swap fonts, pick
  ones that include Vietnamese and add `"vietnamese"` to their `subsets`.

## Horizontal scroll on mobile

- The layout clips overflow globally. If you add wide custom content, keep it
  within the section padding and avoid fixed widths larger than the viewport.
