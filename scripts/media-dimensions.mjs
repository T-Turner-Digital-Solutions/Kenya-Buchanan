#!/usr/bin/env node
/**
 * Writes `src/config/mediaDimensions.ts` from the files in `public/media`.
 *
 * Why this exists: the photography Kenya supplies is not one shape. Gown
 * portraits run about 2:3, some frames are square, a few are landscape. Any
 * layout that hard-codes one aspect ratio crops whichever photographs disagree
 * with it — and on a hero that means showing a bodice instead of a dress.
 * Knowing each file's real proportions lets a frame match its photograph.
 *
 * Run after `node scripts/optimize-media.mjs`; both are safe to re-run.
 */
import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const MEDIA = join(ROOT, "public/media");
const OUT = join(ROOT, "src/config/mediaDimensions.ts");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(webp|png|jpe?g|avif)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const files = (await walk(MEDIA)).sort();
const rows = [];
for (const file of files) {
  const { width, height } = await sharp(file).metadata();
  if (!width || !height) continue;
  rows.push([`/${relative(join(ROOT, "public"), file)}`, width, height]);
}

const body = rows.map(([path, w, h]) => `  "${path}": [${w}, ${h}],`).join("\n");

await writeFile(
  OUT,
  `/**
 * GENERATED — do not edit by hand.
 * Run \`node scripts/media-dimensions.mjs\` after adding photography.
 *
 * Intrinsic pixel dimensions for every published image, so a frame can take
 * the shape of its photograph rather than cropping it to fit.
 */

export const mediaDimensions: Record<string, [number, number]> = {
${body}
};
`,
  "utf8",
);

console.log(`mediaDimensions: ${rows.length} files`);
