import { siteConfig } from "@/config/site.config";
import type { PlanEntry, ResolvedGuest } from "@/types";

/**
 * Invitation-plan data layer (pure / isomorphic).
 *
 * `graPlan.csv` has two guest lists side by side:
 *   A: STT | Họ và tên | Thời gian   (offline guests, with session time)
 *   D: STT | Họ và tên                (online guests)
 * Row 0 = group headers, row 1 = column headers, data from row 2.
 *
 * The offline "Thời gian" column marks the start of a session and is
 * forward-filled onto the guests below it (they share that session time).
 */

/** Parse a single CSV line, respecting double-quoted fields. */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function parsePlan(csv: string): PlanEntry[] {
  const lines = csv.split(/\r?\n/);
  const entries: PlanEntry[] = [];
  let lastTime: string | null = null;

  for (let i = 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line || !line.trim()) continue;

    const cols = parseCsvLine(line);
    const offlineName = (cols[1] ?? "").trim();
    const offlineTime = (cols[2] ?? "").trim();
    const onlineName = (cols[4] ?? "").trim();

    if (offlineTime) lastTime = offlineTime;
    if (offlineName) {
      entries.push({ name: offlineName, type: "offline", time: lastTime });
    }
    if (onlineName) {
      entries.push({ name: onlineName, type: "online", time: null });
    }
  }

  return entries;
}

/** Normalize a Vietnamese name to a diacritic-free alphanumeric key. */
function normalizeName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/** Fallback: turn a raw `?guest=` value into a readable name. */
function humanize(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return siteConfig.identity.defaultGuestName;
  if (trimmed.includes(" ")) return trimmed;
  return trimmed.replace(/([a-zà-ỹ])([A-ZÀ-Ỹ])/g, "$1 $2");
}

/**
 * Resolve the invitation for the current visitor.
 * Matching is diacritic-insensitive and tolerant of honorific prefixes
 * (e.g. `?guest=NguyenThienTai` matches "Bạn thân Nguyễn Thiên Tài").
 */
export function resolveGuest(
  plan: PlanEntry[],
  raw: string | null,
): ResolvedGuest {
  if (!raw || !raw.trim()) {
    return {
      displayName: siteConfig.identity.defaultGuestName,
      type: null,
      time: null,
      matched: false,
    };
  }

  const key = normalizeName(raw);
  const withKeys = plan.map((entry) => ({ entry, key: normalizeName(entry.name) }));

  let match: PlanEntry | undefined;

  if (key.length >= 2) {
    // 1) exact
    match = withKeys.find((item) => item.key === key)?.entry;

    // 2) the plan name contains the query (query omitted an honorific) →
    //    prefer the tightest (shortest) containing name
    if (!match) {
      match = withKeys
        .filter((item) => item.key.includes(key))
        .sort((a, b) => a.key.length - b.key.length)[0]?.entry;
    }

    // 3) the query contains the plan name (query added an honorific) →
    //    prefer the longest matched name
    if (!match) {
      match = withKeys
        .filter((item) => item.key.length >= 3 && key.includes(item.key))
        .sort((a, b) => b.key.length - a.key.length)[0]?.entry;
    }
  }

  if (match) {
    return {
      displayName: match.name,
      type: match.type,
      time: match.time,
      matched: true,
    };
  }

  return { displayName: humanize(raw), type: null, time: null, matched: false };
}
