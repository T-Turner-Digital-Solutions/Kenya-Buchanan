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

/** [source file, published name, pixels to crop from the top] */
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
];

const brandMark = ["brand/Screenshot 2026-09-19 103349.png", "kenya-b-mark"];

await mkdir(OUT_EDITORIAL, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });

let published = 0;

for (const [file, name, cropTop] of sources) {
  let image = sharp(`${SRC}/${file}`);
  const meta = await image.metadata();

  if (cropTop > 0) {
    image = image.extract({
      left: 0,
      top: cropTop,
      width: meta.width,
      height: meta.height - cropTop,
    });
  }

  const info = await image.webp({ quality: 86, effort: 5 }).toFile(`${OUT_EDITORIAL}/${name}.webp`);
  published += info.size;
  console.log(`${name.padEnd(34)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

const logo = await sharp(`${SRC}/${brandMark[0]}`)
  .trim({ threshold: 12 })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_BRAND}/${brandMark[1]}.png`);
published += logo.size;
console.log(`${brandMark[1]}.png`.padEnd(34) + ` ${logo.width}x${logo.height}  ${(logo.size / 1024).toFixed(0)} KB`);

console.log(`\n${sources.length + 1} files · ${(published / 1048576).toFixed(2)} MB published`);
