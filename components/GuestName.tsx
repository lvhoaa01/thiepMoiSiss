"use client";

import { useGuestName } from "@/hooks/useGuestName";

/**
 * Renders just the guest's name from the `?guest=` URL parameter.
 *
 * Isolated into its own tiny client component so it can sit inside a small
 * <Suspense> boundary in the hero. That keeps `useSearchParams` from deopting
 * the whole page to client rendering — everything else still prerenders.
 */
export function GuestName() {
  return <>{useGuestName()}</>;
}
