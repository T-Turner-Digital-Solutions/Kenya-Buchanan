import { getExperience } from "./experiences";
import type { Season, WaitlistActivityEvent, WaitlistEntry } from "@/lib/types";

/**
 * SEASONS — mock records.
 *
 * Two Prom seasons exist so the prototype can demonstrate both a live,
 * near-capacity season and one whose books have not yet opened. Creating
 * "Prom 2028" required no code change beyond this record, which is the point:
 * in production Kenya creates a season from Kenya B. Studio.
 */

const promConfig = getExperience("prom")!.config;

export const promSeason2027: Season = {
  id: "season-prom-2027",
  experience: "prom",
  name: "Prom 2027",
  year: 2027,
  state: "open",
  opensAt: "2026-08-14T19:00:00.000Z",
  initialCapacity: 80,
  spotsClaimed: 76,
  depositCents: 15_000,
  waitlistCount: 9,
  config: promConfig,
};

/** Books have not opened — drives the countdown + interest list state. */
export const promSeason2028: Season = {
  id: "season-prom-2028",
  experience: "prom",
  name: "Prom 2028",
  year: 2028,
  state: "pre_open",
  opensAt: "2026-10-10T19:00:00.000Z",
  initialCapacity: 80,
  spotsClaimed: 0,
  depositCents: 15_000,
  waitlistCount: 0,
  config: promConfig,
};

export const seasons: Season[] = [promSeason2027, promSeason2028];

export function getSeason(id: string): Season | undefined {
  return seasons.find((season) => season.id === id);
}

/** The season currently taking enrolments. */
export const currentPromSeason = promSeason2027;

/** Variant used to preview the "books full" presentation state. */
export const promSeason2027Full: Season = {
  ...promSeason2027,
  state: "full",
  spotsClaimed: 80,
};

export const waitlist: WaitlistEntry[] = [
  {
    id: "wl-1",
    position: 1,
    name: "Amara Whitfield",
    city: "Douglasville, GA",
    joinedAt: "2026-09-02T14:22:00.000Z",
    status: "offered",
    offerExpiresAt: "2026-09-19T23:59:00.000Z",
  },
  { id: "wl-2", position: 2, name: "Sydney Ramos", city: "Atlanta, GA", joinedAt: "2026-09-03T09:10:00.000Z", status: "waiting" },
  { id: "wl-3", position: 3, name: "Jaeda Coleman", city: "Marietta, GA", joinedAt: "2026-09-03T16:48:00.000Z", status: "waiting" },
  { id: "wl-4", position: 4, name: "Noelle Arrington", city: "Birmingham, AL", joinedAt: "2026-09-05T11:02:00.000Z", status: "waiting" },
  { id: "wl-5", position: 5, name: "Camille Vaughn", city: "Decatur, GA", joinedAt: "2026-09-06T18:31:00.000Z", status: "waiting" },
  { id: "wl-6", position: 6, name: "Zaria Pennington", city: "Charlotte, NC", joinedAt: "2026-09-08T08:15:00.000Z", status: "waiting" },
  { id: "wl-7", position: 7, name: "Imani Bostick", city: "Stonecrest, GA", joinedAt: "2026-09-09T20:44:00.000Z", status: "waiting" },
  { id: "wl-8", position: 8, name: "Riley Fontaine", city: "Nashville, TN", joinedAt: "2026-09-11T13:06:00.000Z", status: "waiting" },
  { id: "wl-9", position: 9, name: "Tatum Reyes", city: "Columbus, GA", joinedAt: "2026-09-14T17:52:00.000Z", status: "waiting" },
];

export const waitlistActivity: WaitlistActivityEvent[] = [
  { id: "wa-1", at: "2026-09-18T15:02:00.000Z", label: "Opening offered to Waitlist #1", detail: "60-minute exclusive hold" },
  { id: "wa-2", at: "2026-09-18T16:02:00.000Z", label: "Offer expired", detail: "No deposit received" },
  { id: "wa-3", at: "2026-09-18T16:02:00.000Z", label: "Opening offered to Waitlist #2", detail: "60-minute exclusive hold" },
  { id: "wa-4", at: "2026-09-18T16:31:00.000Z", label: "$150 deposit received", detail: "Waitlist #2" },
  { id: "wa-5", at: "2026-09-18T16:31:00.000Z", label: "Opening filled", detail: "Prom 2027 · 76 of 80 claimed" },
];
