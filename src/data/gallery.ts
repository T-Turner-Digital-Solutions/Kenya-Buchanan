import type { MediaSlot } from "@/lib/types";

/**
 * CURATED PHOTOGRAPHY SETS.
 *
 * The homepage does not show every photograph that exists — each set is chosen
 * for its job. `photo/<name>` resolves straight to the optimised file, so
 * re-ordering a set is a data change, not a component change.
 */

export interface GalleryItem extends MediaSlot {
  /** Short caption shown under the active slide where the design calls for it. */
  label?: string;
  note?: string;
  /**
   * Vertical crop anchor for full-bleed use, as a CSS percentage. Tightly
   * framed portraits need a higher anchor or the subject loses her head.
   */
  focalY?: string;
}

const photo = (
  name: string,
  alt: string,
  extra: Partial<GalleryItem> = {},
): GalleryItem => ({
  id: `photo/${name}`,
  alt,
  ratio: "portrait",
  tone: "dark",
  ...extra,
});

/** Full-viewport hero rotation — the widest, most cinematic frames. */
export const heroSlides: GalleryItem[] = [
  photo("prom-black-sequin-high-neck", "Black sequin gown with lace sleeves in the candlelit lobby", {
    label: "Prom",
    focalY: "0%",
  }),
  photo("prom-royal-blue-tulle-arrival", "Royal blue tulle gown at the car door", {
    ratio: "landscape",
    label: "Prom",
  }),
  photo("prom-red-tulle-ruffle", "Red tulle gown on the avenue", { label: "Prom" }),
  photo("prom-silver-pearl-cape", "Silver beaded gown with a pearl cape", { label: "Prom" }),
  photo("prom-emerald-gold-doors", "Emerald sequin gown before gold doors", { label: "Prom" }),
  photo("prom-gold-sequin-columns", "Gold sequin gown beneath lit columns", { label: "Prom" }),
];

/** The Prom rail — the strongest silhouettes, varied in colour. */
export const promGowns: GalleryItem[] = [
  photo("prom-silver-pearl-cape", "Silver beaded gown with a pearl cape", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-red-lace-feather", "Red lace gown with feather detail", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-royal-blue-velvet", "Royal blue velvet gown with a sweeping train", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-blush-ruffle-skyline", "Blush ruffled gown against the skyline", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-emerald-gold-doors", "Emerald sequin gown before gold doors", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-blush-ruffle-brick", "Blush ruffled tulle gown with a beaded bodice", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-burgundy-velvet", "Burgundy velvet gown with a long train", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-ivory-beaded-corvette", "Ivory beaded gown with a cathedral train", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-sky-blue-mermaid", "Sky blue mermaid gown at sunset", { label: "Prom", note: "Custom Kenya B." }),
  photo("prom-black-sequin-high-neck", "Black sequin gown with lace sleeves", { label: "Prom", note: "Custom Kenya B." }),
];

/** Collections lookbook — deliberately mixed across experiences. */
export const lookbook: GalleryItem[] = [
  photo("custom-black-feather-collar", "Black beaded gown with a feather collar", { label: "Custom" }),
  photo("bridal-ivory-cathedral-veil", "Bride in ivory lace with a cathedral veil", { label: "Bridal" }),
  photo("custom-fuchsia-orange-arrival", "Fuchsia beaded gown with an orange satin train", { label: "Custom" }),
  photo("prom-red-lace-satin-train", "Red lace gown with a satin train", { label: "Prom" }),
  photo("bridal-ivory-lace-staircase", "Bride on the staircase in ivory lace", { label: "Bridal" }),
  photo("custom-fuchsia-candlelight", "Fuchsia beaded gown with a satin overskirt", { label: "Custom" }),
  photo("prom-rose-satin-marquee", "Rose satin gown beneath the marquee", { label: "Prom" }),
  photo("prom-champagne-satin-roses", "Champagne satin gown against a wall of roses", { label: "Prom" }),
  photo("bridal-rose-gold-sequin", "Bride in a rose gold sequin gown with a satin overskirt", { label: "Bridal" }),
  photo("prom-emerald-sequin-terrace", "Emerald sequin gown on the terrace", { label: "Prom" }),
];

/** Featured imagery for the experience selector. */
export const experienceFeature: Record<string, GalleryItem> = {
  prom: photo("prom-red-tulle-ruffle", "Red tulle prom gown", { ratio: "portrait" }),
  bridal: photo("bridal-ivory-cathedral-veil", "Bride in ivory lace with a cathedral veil", { ratio: "portrait" }),
  maternity: photo("maternity-blush-stone-steps", "Maternity gown on the stone steps", { ratio: "portrait" }),
  custom: photo("custom-fuchsia-orange-steps", "Fuchsia and orange custom gown on the steps", { ratio: "portrait" }),
};

export const bridalFeature = photo(
  "bridal-ivory-organza-seated",
  "Bride seated in an ivory organza ballgown with a beaded bodice",
  { ratio: "square" },
);

export const customFeature: GalleryItem[] = [
  photo("custom-black-feather-collar", "Black beaded gown with a dramatic feather collar"),
  photo("custom-fuchsia-orange-arrival", "Fuchsia beaded gown with an orange satin train"),
];

export const promSeasonFeature = photo(
  "prom-red-lace-feather",
  "Red lace gown with feather detail",
  { ratio: "portrait" },
);

export const liveFeature = photo(
  "prom-royal-blue-tulle-arrival",
  "Evening arrival in a royal blue tulle gown",
  { ratio: "landscape" },
);

export const partnerBackdrops: Record<string, string> = {
  photographers: "photo/prom-ivory-beaded-corvette",
  luxury_cars: "photo/prom-royal-blue-tulle-arrival",
  hair: "photo/prom-champagne-satin-roses",
  makeup: "photo/prom-silver-pearl-cape",
  nails: "photo/prom-blush-ruffle-brick",
  videographers: "photo/prom-gold-sequin-columns",
  florists: "photo/bridal-rose-gold-sequin",
  jewelry: "photo/prom-rose-satin-marquee",
  transportation: "photo/prom-powder-blue-cape-car",
  event_planners: "photo/bridal-champagne-barn-garden",
  venues: "photo/bridal-ivory-lace-staircase",
};
