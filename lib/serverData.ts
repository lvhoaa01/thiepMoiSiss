import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { parsePlan } from "@/lib/plan";
import type { GalleryImage, PlanEntry } from "@/types";

/**
 * Server-only data loaders. Imported from `app/page.tsx` (a Server Component),
 * so these run at build time and the results are baked into the static page.
 */

const IMAGE_PATTERN = /\.(jpe?g|png|webp|avif|gif)$/i;
const FALLBACK_SIZE = { width: 1200, height: 1500 };

/** Read intrinsic image dimensions from the file header (no dependencies). */
function readImageSize(buffer: Buffer): { width: number; height: number } | null {
  // PNG
  if (buffer.length >= 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // GIF
  if (buffer.length >= 10 && buffer.toString("ascii", 0, 3) === "GIF") {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  // JPEG — walk the marker segments to the SOF frame.
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const isSof =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const segLength = buffer.readUInt16BE(offset + 2);
      if (segLength <= 0) break;
      offset += 2 + segLength;
    }
  }
  return null;
}

/** Read + parse graPlan.csv from the project root. */
export function loadPlan(): PlanEntry[] {
  try {
    const csv = readFileSync(join(process.cwd(), "graPlan.csv"), "utf8");
    return parsePlan(csv);
  } catch {
    return [];
  }
}

/** List every image in public/gallery with its intrinsic dimensions. */
export function loadGalleryImages(): GalleryImage[] {
  try {
    const dir = join(process.cwd(), "public", "gallery");
    return readdirSync(dir)
      .filter((file) => IMAGE_PATTERN.test(file))
      .sort()
      .map((file) => {
        let size = FALLBACK_SIZE;
        try {
          const parsed = readImageSize(readFileSync(join(dir, file)));
          if (parsed && parsed.width > 0 && parsed.height > 0) size = parsed;
        } catch {
          // keep fallback
        }
        return { src: `/gallery/${file}`, width: size.width, height: size.height };
      });
  } catch {
    return [];
  }
}
