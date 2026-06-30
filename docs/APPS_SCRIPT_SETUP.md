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

### Read (GET)

Open `https://…/exec?action=wishes` in your browser → you should see
`{"ok":true,"data":[]}` (empty until there are wishes).

### Write (POST)

> ⚠️ You **cannot** test a write by opening a URL in the browser — that's a GET
> (`doGet`). A write is a POST (`doPost`). Use one of these:

**Option A — run `testWrite` in the editor (easiest, no website/CORS needed):**

1. In the Apps Script editor, pick **`testWrite`** in the function dropdown
   (top toolbar) and click **Run**.
2. Open the **`RSVP`** tab in your sheet — a new row should appear.
3. (Optional) **View ▸ Logs** shows the response: `{"ok":true}`.

**Option B — PowerShell (simulates the real request):**

```powershell
Invoke-RestMethod -Uri "https://…/exec" -Method Post `
  -ContentType "text/plain" `
  -Body '{"action":"rsvp","name":"Test","attending":"yes","message":"Xin chào"}'
```

**Option C — submit the RSVP form on the running site** (`npm run dev` with
`appsScriptUrl` configured).

### What a successful write looks like

A new row is appended to the **`RSVP`** tab with four columns:

| Timestamp           | Name | Attending | Message              |
| ------------------- | ---- | --------- | -------------------- |
| _(submit time)_     | Test | yes       | Xin chào             |

Rows that include a **Message** then show up in the guestbook
(`?action=wishes`).

### If nothing appears in the sheet

- You **edited `Code.gs` after deploying** → re-deploy a new version
  (see "Updating the script later" below). The pasted code must be saved **and**
  deployed.
- The tab isn't named **`RSVP`** (case-sensitive). The script auto-creates it on
  first write, so a fresh `RSVP` tab appearing is normal.
- You ran `testWrite` but looked at the wrong spreadsheet — the script is bound
  to the sheet you opened it from (Extensions ▸ Apps Script).
- Permission prompt wasn't completed (re-run and approve).

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
