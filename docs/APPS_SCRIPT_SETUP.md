# Google Apps Script setup

This turns your Google Sheet into a tiny JSON API. ~5 minutes.

## 1. Open the script editor

In your spreadsheet (see [GOOGLE_SHEET_SETUP.md](GOOGLE_SHEET_SETUP.md)):

**Extensions → Apps Script**

A bound script project opens.

## 2. Paste the code

1. Delete the placeholder `function myFunction() {}`.
2. Copy the entire contents of [`apps-script/Code.gs`](../apps-script/Code.gs)
   and paste it in.
3. Click **Save** (💾).

## 3. Deploy as a Web App

1. **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → **Web app**.
3. Configure:
   - **Description:** `Graduation API` (anything)
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. **Deploy**. Approve the permissions prompt (choose your account →
   _Advanced_ → _Go to project (unsafe)_ → _Allow_). This is normal for personal
   Apps Script web apps.
5. Copy the **Web app URL** — it ends in **`/exec`**.

> ⚠️ **"Who has access: Anyone"** is required so the website (running in the
> visitor's browser) can reach it without a Google login. The script only ever
> appends RSVP rows and returns wishes.

## 4. Wire it into the site

Either edit the config directly:

```ts
// config/site.config.ts
api: { appsScriptUrl: "https://script.google.com/macros/s/AKfy…/exec" },
```

…or set an environment variable (recommended for Vercel):

```bash
# .env.local  (and/or Vercel project env)
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfy…/exec
```

## 5. Test it

- **Read (GET):** open `https://…/exec?action=wishes` in your browser → you
  should see `{"ok":true,"data":[]}`.
- **Write (POST):** submit the RSVP form on the site, then check the `RSVP`
  tab — a new row should appear. Leave a message and it shows in the guestbook.

## How the request works (CORS)

Apps Script web apps can't answer a CORS **preflight** (`OPTIONS`). So the site:

- **POSTs** with `mode: "no-cors"` and a `text/plain` body (a CORS-safelisted
  request → no preflight). The response is opaque, so the UI treats a completed
  request as success (the row is still written). Validation happens client-side
  too.
- **GETs** the wishes normally — Google serves those with permissive CORS, so
  the JSON is read directly.

## Updating the script later

After editing `Code.gs`, you must **re-deploy**:
**Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.**
(Editing the existing deployment keeps the **same URL** — no config change
needed. Creating a brand-new deployment gives a new URL.)

➡️ Next: [DEPLOYMENT.md](DEPLOYMENT.md)
