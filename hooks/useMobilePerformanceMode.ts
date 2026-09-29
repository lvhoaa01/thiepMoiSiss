"use client";

import { useEffect, useState } from "react";

/**
 * Detect touch-first devices that benefit from a lighter animation pipeline.
 * This intentionally uses input capabilities instead of viewport width, so a
 * narrow desktop window keeps the full desktop presentation.
 */
export function useMobilePerformanceMode(): boolean {
  // Start conservatively for SSR/first paint. Desktop progressively enables
  // the richer pipeline after capability detection; touch devices never pay
  // the cost of hydrating it first.
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const noHover = window.matchMedia("(hover: none)");
    const update = () => setEnabled(coarse.matches || noHover.matches);

    update();
    coarse.addEventListener("change", update);
    noHover.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      noHover.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
