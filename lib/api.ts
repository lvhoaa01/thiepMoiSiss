import { siteConfig } from "@/config/site.config";
import type { ApiResponse, RsvpInput, Wish } from "@/types";

const ENDPOINT = siteConfig.api.appsScriptUrl;

/** True once a real Apps Script URL has been set (not the placeholder). */
function isConfigured(): boolean {
  return Boolean(ENDPOINT) && !ENDPOINT.includes("REPLACE_WITH_YOUR_DEPLOYMENT_ID");
}

/**
 * Submit an RSVP to the Google Apps Script Web App.
 *
 * Apps Script web apps cannot answer a CORS preflight (OPTIONS), so we POST
 * with `mode: "no-cors"` and a `text/plain` body (a CORS-safelisted request).
 * The response is therefore opaque — we can't read it — but the request still
 * reaches the script and appends the row. A completed request is treated as
 * success (optimistic UI). Client-side validation guards the payload.
 *
 * When no endpoint is configured yet, we resolve optimistically so the success
 * animation remains reviewable locally (data is NOT persisted in that case —
 * see docs/APPS_SCRIPT_SETUP.md).
 */
export async function submitRsvp(input: RsvpInput): Promise<ApiResponse<null>> {
  if (!isConfigured()) {
    return { ok: true, data: null };
  }

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "rsvp", ...input }),
    });
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "network" };
  }
}

/**
 * Load guestbook wishes. A GET to the Apps Script web app returns readable
 * JSON (Google serves it with permissive CORS), so we parse it normally.
 * Returns an empty list when no backend is configured yet.
 */
export async function fetchWishes(): Promise<ApiResponse<Wish[]>> {
  if (!isConfigured()) {
    return { ok: true, data: [] };
  }

  try {
    const response = await fetch(`${ENDPOINT}?action=wishes`, { method: "GET" });
    if (!response.ok) {
      return { ok: false, error: `http-${response.status}` };
    }

    const payload = (await response.json()) as ApiResponse<Wish[]>;
    if (!payload.ok) {
      return payload;
    }

    // Defensive: ensure we always hand back a well-formed array.
    const wishes = Array.isArray(payload.data) ? payload.data : [];
    return { ok: true, data: wishes };
  } catch {
    return { ok: false, error: "network" };
  }
}
