/**
 * MEDIA PIPELINE
 *
 * Converts the original photography in `source-media/` into optimised WebP in
 * `public/media/editorial/`, and trims the brand mark into `public/media/brand/`.
 *
 * Run after adding new photography:   node scripts/optimize-media.mjs
 *
 * Originals are kept in `source-media/` (not published) so this is always
 * repeatable and nothing is lost. Add the new file to `sources` below, then map
 * its published name to a media slot in `src/config/media.ts`.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "source-media";
const OUT_EDITORIAL = "public/media/editorial";
const OUT_BRAND = "public/media/brand";

/**
 * [source file, published name, pixels to crop from the top]
 * An object may be given instead of a number to crop other edges too:
 * { top, right, bottom, left }
 */
const sources = [
  // Prom
  ["prom-2026/Screenshot 2026-09-19 103531.png", "gown-ivory-beaded-arrival", 0],
  ["prom-2026/Screenshot 2026-09-19 103549.png", "detail-beaded-bodice-roses", 0],
  ["prom-2026/Screenshot 2026-09-19 103608.png", "arrival-champagne-street", 0],
  ["prom-2026/Screenshot 2026-09-19 103626.png", "gown-champagne-rose-wall", 0],
  ["prom-2026/Screenshot 2026-09-19 103649.png", "gown-silver-pearl-cape", 0],
  ["prom-2026/Screenshot 2026-09-19 103707.png", "gown-black-sequin-night", 0],
  ["prom-2026/Screenshot 2026-09-19 103724.png", "gown-emerald-sequin-doors", 0],
  ["prom-2026/Screenshot 2026-09-19 103749.png", "gown-purple-feather", 0],
  ["prom-2026/Screenshot 2026-09-19 103807.png", "gown-red-lace-feathers", 0],
  ["prom-2026/Screenshot 2026-09-19 103826.png", "gown-blue-velvet-skyline", 0],
  ["prom-2026/Screenshot 2026-09-19 103843.png", "gown-royal-blue-cape", 0],
  ["prom-2026/Screenshot 2026-09-19 103905.png", "gown-emerald-off-shoulder", 0],
  ["prom-2026/Screenshot 2026-09-19 103921.png", "gown-royal-blue-velvet-train", 0],
  ["prom-2026/Screenshot 2026-09-19 103938.png", "gown-gold-columns", 0],
  ["prom-2026/Screenshot 2026-09-19 103953.png", "gown-pink-ruffle-tulle", 0],
  ["prom-2026/Screenshot 2026-09-19 104006.png", "gown-red-tulle-balustrade", 0],
  ["prom-2026/Screenshot 2026-09-19 104024.png", "gown-chocolate-velvet", 0],
  ["prom-2026/Screenshot 2026-09-19 104044.png", "gown-white-silver-roses", 0],
  ["prom-2026/Screenshot 2026-09-19 104101.png", "gown-powder-blue-night", 0],
  // Browser/viewer chrome captured at the top of these two is cropped away.
  ["prom-2026/Screenshot 2026-09-19 104116.png", "gown-silver-satin-cape", 26],
  ["prom-2026/Screenshot 2026-09-19 104138.png", "gown-royal-blue-tulle-car", 30],
  ["prom-2026/Screenshot 2026-09-19 104149.png", "gown-pink-satin-waterfront", 0],
  ["prom-2026/Screenshot 2026-09-19 104210.png", "gown-magenta-velvet", 0],
  ["prom-2026/Screenshot 2026-09-19 104228.png", "gown-red-off-shoulder-ruffle", 0],
  ["prom-2026/Screenshot 2026-09-19 104250.png", "gown-white-hooded-cape", 0],
  ["prom-2026/Screenshot 2026-09-19 104308.png", "gown-royal-blue-feather-bridge", 0],
  ["prom-2026/Screenshot 2026-09-19 104328.png", "gown-black-feather-veil", 0],
  // Bridal
  ["bridal/Screenshot 2026-09-19 105124.png", "bridal-ivory-organza-seated", 0],
  ["bridal/Screenshot 2026-09-19 105140.png", "bridal-blush-overskirt-lawn", 0],
  ["bridal/Screenshot 2026-09-19 105203.png", "bridal-silver-lace-veil", 0],
  ["bridal/Screenshot 2026-09-19 105218.png", "bridal-rose-sequin-bouquet", 0],
  ["bridal/Screenshot 2026-09-19 105235.png", "bridal-ivory-halter-staircase", 0],
  // Kenya
  ["kenya/Screenshot 2026-09-19 105715.png", "kenya-buchanan-portrait", 0],
  ["kenya/Screenshot 2026-09-19 120114.png", "kenya-with-bride-lakeside", { left: 6, right: 3 }],
  ["kenya/kenya-meet-portrait-original.png", "kenya-meet-portrait", 0],
  // Custom — commissions, distinct from the prom season work
  ["custom/custom-fuchsia-orange-arrival.png", "custom-fuchsia-orange-arrival", 0],
  ["custom/custom-fuchsia-orange-steps.png", "custom-fuchsia-orange-steps", 0],
  ["custom/custom-fuchsia-candlelight.png", "custom-fuchsia-candlelight", 0],
  ["custom/custom-black-feather-collar.png", "custom-black-feather-collar", 0],
];

const brandMark = ["brand/Screenshot 2026-09-19 103349.png", "kenya-b-mark"];

await mkdir(OUT_EDITORIAL, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });

let published = 0;

for (const [file, name, crop] of sources) {
  let image = sharp(`${SRC}/${file}`);
  const meta = await image.metadata();

  const edges = typeof crop === "number" ? { top: crop } : { ...crop };
  const top = edges.top ?? 0;
  const right = edges.right ?? 0;
  const bottom = edges.bottom ?? 0;
  const left = edges.left ?? 0;

  if (top || right || bottom || left) {
    image = image.extract({
      left,
      top,
      width: meta.width - left - right,
      height: meta.height - top - bottom,
    });
  }

  const info = await image.webp({ quality: 86, effort: 5 }).toFile(`${OUT_EDITORIAL}/${name}.webp`);
  published += info.size;
  console.log(`${name.padEnd(34)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

/**
 * BRAND MARK
 *
 * The original artwork is black-and-red line art on a solid white field. Two
 * things are derived from it:
 *
 *  - a transparent version keeping the original colours, for light surfaces
 *  - a "reversed" bone monochrome version, for dark surfaces
 *
 * Reversing is NOT a CSS `invert()`: inverting this artwork produces a
 * photographic negative (white hair, cyan lips). Instead the white field is
 * turned into transparency and the remaining artwork is filled with bone.
 *
 * Each is produced as the figure alone (the mark) and the figure plus the
 * "KENYA B." wordmark beneath it (the lockup).
 */
const BONE = [247, 244, 239];

/** Turn a white field into transparency, un-premultiplying the artwork. */
async function liftFromWhite(input, { monochrome }) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, o = 0; i < data.length; i += info.channels, o += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // How far this pixel is from white becomes its opacity.
    const alpha = 255 - Math.min(r, g, b);

    if (alpha === 0) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    if (monochrome) {
      out[o] = BONE[0];
      out[o + 1] = BONE[1];
      out[o + 2] = BONE[2];
    } else {
      // Recover the artwork colour from its composite over white.
      const a = alpha / 255;
      const lift = (v) => Math.max(0, Math.min(255, Math.round((v - 255 * (1 - a)) / a)));
      out[o] = lift(r);
      out[o + 1] = lift(g);
      out[o + 2] = lift(b);
    }

    out[o + 3] = alpha;
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

const trimmed = await sharp(`${SRC}/${brandMark[0]}`).trim({ threshold: 12 }).png().toBuffer();
const trimmedMeta = await sharp(trimmed).metadata();

// The wordmark sits below a blank band; the figure alone is everything above it.
const FIGURE_HEIGHT = 255;

for (const [suffix, monochrome] of [
  ["", false],
  ["-reversed", true],
]) {
  const lockup = await (await liftFromWhite(trimmed, { monochrome }))
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_BRAND}/kenya-b-lockup${suffix}.png`);

  const figure = await sharp(trimmed)
    .extract({ left: 0, top: 0, width: trimmedMeta.width, height: FIGURE_HEIGHT })
    .png()
    .toBuffer();

  const mark = await (await liftFromWhite(figure, { monochrome }))
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_BRAND}/kenya-b-mark${suffix}.png`);

  published += lockup.size + mark.size;
  console.log(`kenya-b-lockup${suffix}.png`.padEnd(34) + ` ${lockup.width}x${lockup.height}  ${(lockup.size / 1024).toFixed(0)} KB`);
  console.log(`kenya-b-mark${suffix}.png`.padEnd(34) + ` ${mark.width}x${mark.height}  ${(mark.size / 1024).toFixed(0)} KB`);
}

console.log(`\n${sources.length + 1} files · ${(published / 1048576).toFixed(2)} MB published`);
