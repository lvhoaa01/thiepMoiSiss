# Deploy to Vercel

The project is a standard Next.js App Router app — Vercel detects everything
automatically.

## Option A — Git + Vercel dashboard (recommended)

1. Push the project to a GitHub/GitLab/Bitbucket repo.
2. Go to <https://vercel.com/new> and **import** the repo.
3. Framework preset: **Next.js** (auto-detected). Leave build settings default:
   - Build command: `next build`
   - Output: `.next`
   - Install: `npm install`
4. (Optional but recommended) add an **Environment Variable**:
   - `NEXT_PUBLIC_APPS_SCRIPT_URL` = your `/exec` URL.
5. **Deploy**. Every push to the default branch redeploys.

> If you skip the env var, set `api.appsScriptUrl` in
> [`config/site.config.ts`](../config/site.config.ts) instead.

## Option B — Vercel CLI

```bash
npm i -g vercel
vercel            # first run links/creates the project (preview)
vercel --prod     # production deploy
```

Add the env var once with:

```bash
vercel env add NEXT_PUBLIC_APPS_SCRIPT_URL
```

## After deploying

- Update `meta.siteUrl` in the config to your production URL (improves OG/SEO),
  then redeploy.
- Share guest links: `https://your-site.vercel.app/?guest=NguyenVanA`.

## Local production check

```bash
npm run build && npm run start   # serves the prod build on :3000
```

## Build inputs (must be committed)

These are read at **build time**, so they must be in the repo:

- `graPlan.csv` (project root) — the guest plan.
- `public/gallery/*` — gallery photos (auto-loaded).
- `public/mapXe.jpg` — parking map.

The provided source folders `imgGal/` and `imgForm/` at the root are **not**
used by the app (gallery is served from `public/gallery`); you may delete them to
shrink the repo.

## Notes

- No server, secrets, or database to provision — Google Sheets + Apps Script is
  the backend.
- `NEXT_PUBLIC_*` is exposed to the browser **by design** here (the Apps Script
  URL is a public web-app endpoint called from the client).
