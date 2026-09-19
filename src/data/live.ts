import type { LiveSession } from "@/lib/types";

/** Kenya B. Live — mock schedule. Embeds/permalinks are wired in a later phase. */
export const liveSessions: LiveSession[] = [
  {
    id: "live-1",
    title: "Prom 2027 Q&A",
    startsAt: "2026-09-24T23:00:00.000Z",
    state: "upcoming",
    platform: "Facebook Live",
    description: "Everything about the season — timeline, fittings, payments and what makes a spot yours.",
    externalUrl: null,
    poster: { id: "live-1-poster", alt: "Kenya on camera in the studio", ratio: "landscape", tone: "dark" },
  },
  {
    id: "live-2",
    title: "Sourcing Diaries — New York",
    startsAt: "2026-10-08T23:30:00.000Z",
    state: "upcoming",
    platform: "Instagram Live",
    description: "Kenya walks the fabric district and talks through what she looks for.",
    externalUrl: null,
    poster: { id: "live-2-poster", alt: "Fabric showroom shelves", ratio: "landscape", tone: "dark" },
  },
  {
    id: "live-3",
    title: "Behind The Bodice",
    startsAt: "2026-08-28T23:00:00.000Z",
    state: "past",
    platform: "Facebook Live",
    description: "How structure is built into a Kenya B. gown.",
    externalUrl: null,
    poster: { id: "live-3-poster", alt: "Bodice construction detail", ratio: "landscape", tone: "dark" },
  },
  {
    id: "live-4",
    title: "Kenya Dolls Reveal Night",
    startsAt: "2026-05-16T00:00:00.000Z",
    state: "past",
    platform: "Facebook Live",
    description: "The 2026 reveals, gown by gown.",
    externalUrl: null,
    poster: { id: "live-4-poster", alt: "Reveal night gowns", ratio: "landscape", tone: "dark" },
  },
];
