import type { ExperienceSlug } from "@/lib/types";

/**
 * THE BAND UNDER THE HERO.
 *
 * Three doors, immediately below the opening image: Prom, Bridal, Custom.
 * This is campaign copy, not policy — Kenya can rewrite any line here without
 * touching a component, and each panel links straight to its experience page.
 *
 * Maternity is deliberately absent: the band is the first thing a visitor
 * reads and three panels hold the eye. The full set lives in the experience
 * selector directly below it.
 */
export interface ExperienceBandPanel {
  slug: ExperienceSlug;
  /** The word set across the panel. */
  eyebrow: string;
  /** The campaign line. Kept short — it is set large and in caps. */
  headline: string;
  /** Two lines of supporting copy, rendered one above the other. */
  lines: [string, string];
  /** Photograph carried by this panel, resolved through the media manifest. */
  photo: string;
  alt: string;
}

export const experienceBand: ExperienceBandPanel[] = [
  {
    slug: "prom",
    eyebrow: "Prom",
    headline: "Made for your moment.",
    lines: ["One season, a limited number of gowns.", "Your entrance, designed from the first sketch."],
    photo: "photo/prom-red-lace-satin-train",
    alt: "Red lace prom gown with a satin train",
  },
  {
    slug: "bridal",
    eyebrow: "Bridal",
    headline: "For the moment that becomes the memory.",
    lines: ["The gown you will be remembered in.", "Fitted, refined and finished with you."],
    photo: "photo/bridal-ivory-cathedral-veil",
    alt: "Bride in ivory lace beneath a cathedral veil",
  },
  {
    slug: "custom",
    eyebrow: "Custom",
    headline: "One design. Yours.",
    lines: ["For the occasions that deserve their own design.", "Made once, and made for you."],
    photo: "photo/custom-fuchsia-orange-arrival",
    alt: "Fuchsia beaded gown with an orange satin train",
  },
];
