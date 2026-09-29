import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * Keep Next 15 development and production artifacts separate. Unlike Next 16,
 * Next 15 writes both `next dev` and `next build` to the same directory by
 * default, which can corrupt the React Client Manifest when they overlap.
 *
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
export default function nextConfig(phase) {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-build",
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      qualities: [75, 95],
    },
  };
}
