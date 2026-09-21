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

import { mediaDimensions } from "@/config/mediaDimensions";

const editorial = (name: string) => `/media/editorial/${name}.webp`;

export const mediaSources: Record<string, string | undefined> = {
  /* Brand */
  "brand-mark": "/media/brand/kenya-b-lockup.png",

  /*
   * Kenya's own photographs are small originals (221x318 and 406x538), so they
   * are placed where they display at roughly their true size. Stretching either
   * across a full-bleed hero visibly softens it — a hero needs ~1400px wide.
   */
  "kenya-portrait": editorial("kenya-buchanan-portrait"),
  "kenya-with-bride": editorial("bridal-kenya-with-bride"),
  /* Full-resolution portrait — strong enough to lead a full-bleed hero. */
  "kenya-meet-hero": editorial("kenya-meet-portrait"),
  "archival-studio": editorial("kenya-studio-sewing"),

  /* Home */
  "home-hero": editorial("prom-royal-blue-tulle-arrival"),
  "featured-1": editorial("prom-silver-pearl-cape"),
  "featured-2": editorial("prom-blush-ruffle-brick"),
  "featured-3": editorial("prom-red-tulle-ruffle"),
  "featured-4": editorial("prom-gold-sequin-columns"),
  "prom-teaser": editorial("prom-royal-blue-satin-tulle"),
  "story-gown": editorial("prom-champagne-satin-roses"),
  "collection-1": editorial("prom-red-feather-off-shoulder"),
  "collection-2": editorial("prom-ice-blue-satin"),

  /* Experience cards */
  "prom-card": editorial("prom-sky-blue-mermaid"),
  "bridal-card": editorial("bridal-ivory-cathedral-veil"),
  "custom-card": editorial("custom-fuchsia-orange-steps"),

  /* Prom */
  "prom-hero": editorial("prom-red-lace-feather"),
  "prom-editorial": editorial("prom-royal-blue-velvet"),

  /* Bridal */
  "bridal-hero": editorial("bridal-ivory-organza-seated"),
  "bridal-1": editorial("bridal-rose-gold-sequin"),
  "bridal-2": editorial("bridal-champagne-barn-garden"),

  /* Maternity */
  "maternity-hero": editorial("maternity-hero-tulle"),
  "maternity-card": editorial("maternity-blush-stone-steps"),
  "maternity-1": editorial("maternity-fuchsia-puff-sleeve"),
  "maternity-2": editorial("maternity-blush-garden-couple"),
  "maternity-3": editorial("maternity-fuchsia-celebration"),
  "book-maternity": editorial("maternity-blush-garden-couple"),
  "col-maternity-1": editorial("maternity-blush-stone-steps"),
  "col-maternity-2": editorial("maternity-fuchsia-puff-sleeve"),
  "col-maternity-3": editorial("maternity-blush-flowing-skirt"),
  "col-maternity-4": editorial("maternity-fuchsia-celebration"),
  /* The numbered triptych that closes the Maternity page. */
  "maternity-look-1": editorial("maternity-chocolate-tulle-elegance"),
  "maternity-look-2": editorial("maternity-ivory-lace-goddess"),
  "maternity-look-3": editorial("maternity-black-tulle-bold"),

  /* Custom */
  "custom-hero": editorial("custom-black-feather-collar"),
  "custom-editorial": editorial("custom-fuchsia-orange-arrival"),

  /* Collections */
  "collections-hero": editorial("prom-powder-blue-cape-car"),
  "col-2026-1": editorial("prom-burgundy-velvet"),
  "col-2026-2": editorial("prom-red-lace-feather"),
  "col-2026-3": editorial("prom-emerald-sequin-terrace"),
  "col-2026-4": editorial("prom-gold-marigold"),
  "col-bridal-1": editorial("bridal-ivory-cathedral-veil"),
  "col-bridal-2": editorial("bridal-ivory-lace-staircase"),
  "col-bridal-3": editorial("bridal-rose-gold-sequin"),
  "col-bridal-4": editorial("bridal-champagne-barn-garden"),
  "col-custom-1": editorial("custom-fuchsia-orange-arrival"),
  "col-custom-2": editorial("custom-black-feather-collar"),
  "col-custom-3": editorial("custom-fuchsia-orange-steps"),
  "col-custom-4": editorial("custom-fuchsia-candlelight"),

  /* Book */
  "book-hero": editorial("prom-emerald-gold-doors"),
  "book-prom": editorial("prom-ivory-beaded-corvette"),
  "book-bridal": editorial("bridal-ivory-cathedral-veil"),
  "book-custom": editorial("custom-fuchsia-candlelight"),

  /* Partners */
  "partners-hero": editorial("prom-pink-satin-car"),

  /*
   * Kenya B. Live and video posters. These use Kenya's own studio photograph
   * and finished work — the only honest stand-ins until stills from the
   * broadcasts themselves exist.
   */
  "live-hero": editorial("kenya-studio-sewing"),
  /*
   * Upcoming sessions carry the branded "coming soon" cards — they have no
   * still yet, and saying so is honest. Past sessions carry real work.
   */
  "live-1-poster": editorial("live-coming-soon-atelier"),
  "live-2-poster": editorial("live-coming-soon-fabrics"),
  "live-3-poster": editorial("detail-beaded-bodice-roses"),
  "live-4-poster": editorial("prom-black-sequin-chandelier"),
  "video-welcome-poster": editorial("kenya-studio-sewing"),
  "video-sourcing-poster": editorial("live-coming-soon-fabrics"),

  /*
   * The demo client's portal. Her chosen gown is what she sees when she logs
   * in, and her two fabric swatches are details of that same gown — the
   * beading on her bodice and on her skirt is her fabric.
   */
  "karlie-sketch": editorial("karlie-gown-form"),
  "karlie-fabric-1": editorial("karlie-fabric-bodice"),
  "karlie-fabric-2": editorial("karlie-fabric-skirt"),

  /* Bridal sourcing — the beading the section describes, on a finished bodice. */
  "bridal-sourcing": editorial("bridal-sourcing-markets"),
};

/**
 * Galleries reference photography directly rather than needing a named slot per
 * image: a slot id of `photo/<published-name>` resolves straight to the
 * optimised file. Named slots above still win, so any of them can be re-pointed
 * without touching a component.
 */
export function resolveMedia(slotId: string): string | undefined {
  const named = mediaSources[slotId];
  if (named) return named;
  if (slotId.startsWith("photo/")) return editorial(slotId.slice("photo/".length));
  return undefined;
}

/**
 * The photograph's own proportions (width / height), so a frame can take the
 * shape of its picture instead of cropping it to a shape the layout chose.
 * Returns undefined when the slot has no photography yet.
 */
export function mediaAspect(slotId: string): number | undefined {
  const src = resolveMedia(slotId);
  if (!src) return undefined;
  const size = mediaDimensions[src];
  if (!size) return undefined;
  return size[0] / size[1];
}
