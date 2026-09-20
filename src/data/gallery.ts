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
  photo("gown-royal-blue-tulle-car", "Royal blue tulle gown at the car door", {
    ratio: "landscape",
    label: "Prom 2026",
  }),
  photo("gown-black-sequin-night", "Black sequin gown with lace sleeves at night", {
    label: "Prom 2026",
  }),
  photo("gown-silver-satin-cape", "Silver satin gown with a full cape", {
    ratio: "landscape",
    label: "Prom 2026",
  }),
  photo("gown-red-tulle-balustrade", "Red tulle gown against a marble balustrade", {
    label: "Prom 2026",
  }),
  photo("gown-gold-columns", "Gold gown beneath lit columns", { label: "Prom 2026" }),
];

/** The Prom rail — the strongest silhouettes, varied in colour. */
export const promGowns: GalleryItem[] = [
  photo("gown-silver-pearl-cape", "Silver beaded gown with a pearl cape", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-red-lace-feathers", "Red lace gown with feather detail", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-royal-blue-velvet-train", "Royal blue velvet gown with a sweeping train", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-royal-blue-feather-bridge", "Royal blue velvet gown with feather detail", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-emerald-sequin-doors", "Emerald sequin gown before gold doors", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-pink-ruffle-tulle", "Blush ruffled tulle gown with a beaded bodice", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-magenta-velvet", "Magenta velvet gown with beaded sleeves", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-ivory-beaded-arrival", "Ivory beaded gown with a cathedral train", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-blue-velvet-skyline", "Powder blue velvet gown against the skyline", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
  photo("gown-royal-blue-cape", "Royal blue sequin gown with a cape", {
    label: "Prom 2026",
    note: "Custom Kenya B.",
  }),
];

/** Collections lookbook — deliberately mixed across experiences. */
export const lookbook: GalleryItem[] = [
  photo("gown-white-hooded-cape", "Ivory beaded gown with a hooded cape", { label: "Custom" }),
  photo("bridal-silver-lace-veil", "Bridal gown with a cathedral veil", { label: "Bridal" }),
  photo("gown-chocolate-velvet", "Chocolate velvet gown with a gold bodice", { label: "Custom" }),
  photo("gown-red-off-shoulder-ruffle", "Red off-shoulder gown with ruffle detail", { label: "Prom 2026" }),
  photo("bridal-ivory-halter-staircase", "Bridal gown on the staircase", { label: "Bridal" }),
  photo("gown-pink-satin-waterfront", "Blush satin gown with a flowing cape", { label: "Custom" }),
  photo("gown-powder-blue-night", "Powder blue satin gown at night", { label: "Prom 2026" }),
  photo("gown-champagne-rose-wall", "Champagne gown against a wall of roses", { label: "Prom 2026" }),
  photo("bridal-rose-sequin-bouquet", "Rose sequin bridal gown with a bouquet", { label: "Bridal" }),
  photo("gown-emerald-off-shoulder", "Emerald off-shoulder gown by the columns", { label: "Prom 2026" }),
];

/** Featured imagery for the experience selector. */
export const experienceFeature: Record<string, GalleryItem> = {
  prom: photo("gown-red-tulle-balustrade", "Red tulle prom gown", { ratio: "portrait" }),
  bridal: photo("bridal-silver-lace-veil", "Bridal gown with a cathedral veil", { ratio: "portrait" }),
  custom: photo("gown-white-hooded-cape", "Custom gown with a hooded cape", { ratio: "portrait" }),
};

export const bridalFeature = photo(
  "bridal-ivory-organza-seated",
  "Bride seated in an ivory organza gown",
  { ratio: "landscape" },
);

export const customFeature: GalleryItem[] = [
  photo("gown-purple-feather", "Beaded bodice with a purple feather skirt"),
  photo("gown-black-feather-veil", "Black feather gown with a veil", { ratio: "square" }),
];

export const promSeasonFeature = photo(
  "gown-white-silver-roses",
  "Ivory and silver beaded gown beside the car",
  { ratio: "portrait" },
);

export const liveFeature = photo(
  "arrival-champagne-street",
  "Champagne gown and evening arrival on the street",
  { ratio: "landscape" },
);

export const partnerBackdrops: Record<string, string> = {
  photographers: "photo/gown-ivory-beaded-arrival",
  luxury_cars: "photo/gown-royal-blue-tulle-car",
  hair: "photo/detail-beaded-bodice-roses",
  makeup: "photo/gown-silver-pearl-cape",
  nails: "photo/gown-pink-ruffle-tulle",
  videographers: "photo/gown-gold-columns",
  florists: "photo/bridal-rose-sequin-bouquet",
  jewelry: "photo/gown-champagne-rose-wall",
  transportation: "photo/gown-silver-satin-cape",
  event_planners: "photo/bridal-ivory-organza-seated",
  venues: "photo/bridal-ivory-halter-staircase",
};
