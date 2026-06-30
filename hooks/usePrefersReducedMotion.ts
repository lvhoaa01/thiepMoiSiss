"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's "prefers-reduced-motion" setting.
 * Defaults to `false` on the server and first paint so the SSR/CSR markup
 * matches (we only ever *remove* motion, never add it, after hydration).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReduced;
}
