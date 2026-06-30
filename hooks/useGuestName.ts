"use client";

import { useSearchParams } from "next/navigation";

import { siteConfig } from "@/config/site.config";

/**
 * Resolves the guest's display name from the `?guest=` URL parameter.
 *
 * Accepts two forms:
 *   • An encoded full name (recommended for diacritics):
 *       ?guest=Nguy%E1%BB%85n%20V%C4%83n%20A  →  "Nguyễn Văn A"
 *   • A PascalCase token:
 *       ?guest=NguyenVanA                      →  "Nguyen Van A"
 *
 * Falls back to `identity.defaultGuestName` when the parameter is absent.
 *
 * NOTE: components using this hook must sit inside a <Suspense> boundary,
 * which `app/page.tsx` provides.
 */
export function useGuestName(): string {
  const params = useSearchParams();
  const raw = params.get("guest");

  if (!raw) return siteConfig.identity.defaultGuestName;

  const trimmed = raw.trim();
  if (!trimmed) return siteConfig.identity.defaultGuestName;

  // Already spaced (came in as a real, encoded name) — use as-is.
  if (trimmed.includes(" ")) return trimmed;

  // Otherwise split PascalCase/camelCase into words.
  return trimmed.replace(/([a-zà-ỹ])([A-ZÀ-Ỹ])/g, "$1 $2");
}
