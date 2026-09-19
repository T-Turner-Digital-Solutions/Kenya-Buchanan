import type { VideoAsset } from "@/lib/types";

/**
 * Kenya's video library. Phase 1 renders premium placeholders — `source` stays
 * null until real recordings are uploaded and a player/CDN is wired up.
 */
export const videos: VideoAsset[] = [
  {
    id: "vid-welcome",
    title: "Welcome to Kenya B.",
    label: "A Message From Kenya",
    durationLabel: "4 min",
    description:
      "Kenya welcomes you personally and walks you through the experience — what to expect, how we communicate, and how to trust the process.",
    source: null,
    poster: { id: "video-welcome-poster", alt: "Kenya Buchanan in the studio", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-measurements-prep",
    title: "Preparing For Your Measurement Appointment",
    label: "Before You Come In",
    durationLabel: "3 min",
    description: "What to wear, what to bring, and how to make the most of your first studio visit.",
    source: null,
    poster: { id: "video-measure-poster", alt: "Measuring tape and studio form", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-measurements-complete",
    title: "Your Measurements Are Complete",
    label: "What Happens Next",
    durationLabel: "2 min",
    description: "Kenya explains what happens between measurements and your first fitting.",
    source: null,
    poster: { id: "video-measured-poster", alt: "Sketch and notes on the studio table", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-sourcing",
    title: "Sourcing Your Materials",
    label: "From The Road",
    durationLabel: "2 min",
    description: "Why specialty materials sometimes take time, and what Kenya is looking for.",
    source: null,
    poster: { id: "video-sourcing-poster", alt: "Bolts of fabric in a sourcing showroom", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-construction",
    title: "Your Gown Is In Construction",
    label: "In The Studio",
    durationLabel: "2 min",
    description: "A look at how your gown is coming together.",
    source: null,
    poster: { id: "video-construction-poster", alt: "Hand-stitching detail in progress", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-fitting-two",
    title: "Preparing For Fitting #2",
    label: "Before Your Fitting",
    durationLabel: "3 min",
    description:
      "The most important appointment for communication — Kenya explains what to bring and how to talk about fit.",
    source: null,
    poster: { id: "video-fitting-poster", alt: "Gown on the fitting form", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-final-fitting",
    title: "Your Final Fitting",
    label: "Almost There",
    durationLabel: "2 min",
    description: "What the final fitting covers and how to prepare for release day.",
    source: null,
    poster: { id: "video-final-poster", alt: "Finished gown hanging in the studio", ratio: "landscape", tone: "dark" },
  },
  {
    id: "vid-gown-ready",
    title: "Your Gown Is Ready",
    label: "Release Day",
    durationLabel: "1 min",
    description: "Care, transport and the moment you have been waiting for.",
    source: null,
    poster: { id: "video-ready-poster", alt: "Garment bag with the Kenya B. mark", ratio: "landscape", tone: "dark" },
  },
];

export function getVideo(id?: string): VideoAsset | undefined {
  if (!id) return undefined;
  return videos.find((video) => video.id === id);
}
