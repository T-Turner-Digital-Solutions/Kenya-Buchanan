/**
 * MEDIA MANIFEST
 *
 * Maps a media slot id (used by `<MediaFrame slot={{ id: ... }} />`) to a real
 * file. A slot with no entry renders a tasteful editorial placeholder instead,
 * so the site is always complete — mapped photography simply replaces the
 * placeholder everywhere that slot appears.
 *
 * To add photography:
 *   1. drop the original into `source-media/<set>/`
 *   2. add it to `scripts/optimize-media.mjs` and run `node scripts/optimize-media.mjs`
 *   3. map the published name to a slot below
 *
 * Slots intentionally left unmapped (they need photography that does not exist
 * yet): Kenya's own portraits, video posters, fabric/sketch approval imagery and
 * preferred-partner imagery. Using client gown photography for those would
 * misrepresent what the picture shows.
 */

const editorial = (name: string) => `/media/editorial/${name}.webp`;

export const mediaSources: Record<string, string | undefined> = {
  /* Brand */
  "brand-mark": "/media/brand/kenya-b-mark.png",

  /* Home */
  "home-hero": editorial("gown-royal-blue-tulle-car"),
  "featured-1": editorial("gown-silver-pearl-cape"),
  "featured-2": editorial("gown-pink-ruffle-tulle"),
  "featured-3": editorial("gown-red-tulle-balustrade"),
  "featured-4": editorial("gown-gold-columns"),
  "prom-teaser": editorial("gown-royal-blue-cape"),
  "collection-1": editorial("gown-red-off-shoulder-ruffle"),
  "collection-2": editorial("gown-powder-blue-night"),

  /* Experience cards */
  "prom-card": editorial("gown-blue-velvet-skyline"),
  "bridal-card": editorial("bridal-ivory-halter-staircase"),
  "custom-card": editorial("gown-chocolate-velvet"),

  /* Prom */
  "prom-hero": editorial("gown-black-sequin-night"),
  "prom-editorial": editorial("gown-royal-blue-velvet-train"),

  /* Bridal */
  "bridal-hero": editorial("bridal-silver-lace-veil"),
  "bridal-1": editorial("bridal-rose-sequin-bouquet"),
  "bridal-2": editorial("bridal-blush-overskirt-lawn"),

  /* Custom */
  "custom-hero": editorial("gown-royal-blue-feather-bridge"),
  "custom-editorial": editorial("gown-purple-feather"),

  /* Collections */
  "collections-hero": editorial("gown-silver-satin-cape"),
  "col-2026-1": editorial("gown-magenta-velvet"),
  "col-2026-2": editorial("gown-red-lace-feathers"),
  "col-2026-3": editorial("gown-emerald-off-shoulder"),
  "col-2026-4": editorial("detail-beaded-bodice-roses"),
  "col-bridal-1": editorial("bridal-silver-lace-veil"),
  "col-bridal-2": editorial("bridal-ivory-organza-seated"),
  "col-bridal-3": editorial("bridal-ivory-halter-staircase"),
  "col-bridal-4": editorial("bridal-blush-overskirt-lawn"),
  "col-custom-1": editorial("gown-pink-satin-waterfront"),
  "col-custom-2": editorial("gown-black-feather-veil"),
  "col-custom-3": editorial("gown-champagne-rose-wall"),
  "col-custom-4": editorial("gown-white-silver-roses"),

  /* Book */
  "book-hero": editorial("gown-emerald-sequin-doors"),
  "book-prom": editorial("gown-ivory-beaded-arrival"),
  "book-bridal": editorial("bridal-rose-sequin-bouquet"),
  "book-custom": editorial("gown-white-hooded-cape"),

  /* Partners */
  "partners-hero": editorial("arrival-champagne-street"),
};

export function resolveMedia(slotId: string): string | undefined {
  return mediaSources[slotId];
}
