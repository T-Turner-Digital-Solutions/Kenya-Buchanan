"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { Countdown } from "@/components/ui/Countdown";
import { promSeasonFeature } from "@/data/gallery";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Season } from "@/lib/types";

/**
 * Prom season panel — a split section, image left, state right.
 *
 * Entirely driven by the season record: an open season shows capacity, a season
 * whose books have not opened shows the countdown and an interest CTA. Adding
 * Prom 2028 changes nothing here.
 */
export function SeasonPanel({ season }: { season: Season }) {
  const src = resolveMedia(promSeasonFeature.id);
  const remaining = season.initialCapacity - season.spotsClaimed;
  const claimedPct = Math.round((season.spotsClaimed / season.initialCapacity) * 100);
  const open = season.state === "open";

  return (
    <div className="grid overflow-hidden bg-ink lg:grid-cols-[0.85fr_1.15fr]">
      <div className="relative min-h-[22rem] lg:min-h-[32rem]">
        {src ? (
          <Image
            src={src}
            alt={promSeasonFeature.alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-[50%_15%]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink lg:from-transparent" />
      </div>

      <div className="flex flex-col justify-center gap-7 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">{season.name}</p>
          <h2 className="display-caps text-4xl text-bone sm:text-5xl">
            {open ? "Books are open" : "Books open in"}
          </h2>
        </div>

        {open ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex items-end gap-4">
                <p className="font-display text-6xl leading-none text-bone lg:text-7xl">
                  {season.spotsClaimed}
                </p>
                <p className="pb-2 font-display text-2xl text-bone/35">/ {season.initialCapacity}</p>
                <p className="pb-3 text-[0.55rem] uppercase tracking-luxe text-bone/45">
                  Spots claimed
                </p>
              </div>

              {/* Capacity indicator */}
              <div
                className="h-[3px] w-full bg-bone/15"
                role="progressbar"
                aria-valuenow={claimedPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${season.name} capacity`}
              >
                <div
                  className="h-[3px] bg-champagne transition-all duration-1000 ease-silk"
                  style={{ width: `${claimedPct}%` }}
                />
              </div>

              <p className="text-[0.62rem] uppercase tracking-wide2 text-champagne">
                {remaining} {remaining === 1 ? "spot" : "spots"} remaining
              </p>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-bone/60">
              A Prom Spot is acceptance into the season — not an appointment. Spots are limited,
              claimed with a {formatCurrency(season.depositCents)} deposit, and held for one person
              at a time.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/enroll/prom"
                className="group inline-flex items-center justify-center gap-3 bg-champagne px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
              >
                Claim Your Prom Spot
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/prom"
                className="inline-flex items-center justify-center border border-bone/30 px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-bone transition-all duration-500 hover:border-bone hover:bg-bone/10"
              >
                How Prom Works
              </Link>
            </div>
          </>
        ) : (
          <>
            <Countdown target={season.opensAt} tone="dark" />
            <p className="max-w-md text-sm leading-relaxed text-bone/60">
              {season.name} enrollment opens {formatDate(season.opensAt)}.{" "}
              {season.initialCapacity} initial spaces, claimed with a{" "}
              {formatCurrency(season.depositCents)} deposit.
            </p>
            <Link
              href="/prom"
              className="group inline-flex w-fit items-center justify-center gap-3 bg-champagne px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
            >
              Notify Me
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
