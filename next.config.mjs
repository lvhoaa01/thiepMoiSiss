import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * Keep Next 15 development and local production artifacts separate. Unlike
 * Next 16, Next 15 writes both `next dev` and `next build` to the same
 * directory by default, which can corrupt the React Client Manifest when they
 * overlap. Vercel must keep the conventional `.next` directory because its
 * deployment adapter reads manifests from that location.
 *
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
export default function nextConfig(phase) {
  const isVercel = process.env.VERCEL === "1";

  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER || isVercel ? ".next" : ".next-build",
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      qualities: [65, 75, 85, 95],
    },
  };
}
