"use client";

import { useSearchParams } from "next/navigation";

import { resolveGuest } from "@/lib/plan";
import type { PlanEntry, ResolvedGuest } from "@/types";

/**
 * Resolves the current visitor's invitation from the `?guest=` parameter and
 * the parsed plan. Must be used inside a <Suspense> boundary (useSearchParams).
 */
export function useResolvedGuest(plan: PlanEntry[]): ResolvedGuest {
  const params = useSearchParams();
  return resolveGuest(plan, params.get("guest"));
}
