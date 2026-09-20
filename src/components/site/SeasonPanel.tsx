"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { Countdown } from "@/components/ui/Countdown";
import { promSeasonFeature } from "@/data/gallery";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Season } from "@/lib/types";

/**
 * Prom season band.
 *
 * A wide, cinematic strip: the gown bleeds in from the left and dissolves into
 * the dark, the state sits centre, capacity sits right behind a rule.
 *
 * Entirely driven by the season record — an open season shows capacity, a
 * season whose books have not opened shows the countdown and a notify CTA.
 * Creating Prom 2028 changes nothing here.
 */
export function SeasonPanel({ season }: { season: Season }) {
  const src = resolveMedia(promSeasonFeature.id);
  const remaining = season.initialCapacity - season.spotsClaimed;
  const claimedPct = Math.round((season.spotsClaimed / season.initialCapacity) * 100);
  const open = season.state === "open";

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Gown bleeding in from the left */}
      {src ? (
        <div
          aria-hidden
          className="fade-into-right absolute inset-y-0 left-0 hidden w-[30%] lg:block xl:w-[26%]"
        >
          <Image
            src={src}
            alt=""
            fill
            loading="lazy"
            sizes="30vw"
            className="object-cover object-[55%_12%]"
          />
        </div>
      ) : null}

      {/* Warm depth behind the type */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_50%,rgba(193,161,107,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-editorial px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        {/* Mobile lead image */}
        {src ? (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden lg:hidden">
            <Image
              src={src}
              alt={promSeasonFeature.alt}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-[50%_12%]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          </div>
        ) : null}

        <div className="grid items-center gap-10 lg:grid-cols-[30%_1fr_auto] xl:grid-cols-[26%_1fr_auto]">
          {/* Spacer beneath the bleeding image */}
          <span aria-hidden className="hidden lg:block" />

          {/* State */}
          <div className="flex flex-col gap-5 lg:pr-12">
            <p className="text-[0.62rem] uppercase tracking-luxe text-champagne">{season.name}</p>
            <h2 className="display-caps text-4xl text-bone sm:text-5xl">
              {open ? "Books are open" : "Books open in"}
            </h2>

            {open ? (
              <p className="max-w-lg text-sm leading-relaxed text-bone/60">
                A Prom Spot is acceptance into the season — not an appointment. Spots are limited,
                claimed with a {formatCurrency(season.depositCents)} deposit, and held for one
                person at a time.
              </p>
            ) : (
              <>
                <Countdown target={season.opensAt} tone="dark" />
                <p className="max-w-lg text-sm leading-relaxed text-bone/60">
                  {season.name} enrollment opens {formatDate(season.opensAt)}.{" "}
                  {season.initialCapacity} initial spaces, claimed with a{" "}
                  {formatCurrency(season.depositCents)} deposit.
                </p>
              </>
            )}

            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              {open ? (
                <>
                  <Link
                    href="/enroll/prom"
                    className="group inline-flex items-center justify-center gap-3 bg-champagne px-8 py-4 text-[0.64rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
                  >
                    Claim Your Prom Spot
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/prom"
                    className="inline-flex items-center justify-center border border-bone/30 px-8 py-4 text-[0.64rem] uppercase tracking-wide2 text-bone transition-all duration-500 hover:border-bone hover:bg-bone/10"
                  >
                    How Prom Works
                  </Link>
                </>
              ) : (
                <Link
                  href="/prom"
                  className="group inline-flex items-center justify-center gap-3 bg-champagne px-8 py-4 text-[0.64rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
                >
                  Notify Me
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Capacity, behind a rule */}
          {open ? (
            <div className="flex flex-col gap-3 border-t border-bone/15 pt-8 lg:min-w-[15rem] lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="flex items-baseline gap-2">
                <span className="font-display text-5xl leading-none text-bone lg:text-6xl">
                  {season.spotsClaimed}
                </span>
                <span className="font-display text-2xl text-bone/40">/ {season.initialCapacity}</span>
              </p>
              <p className="text-[0.58rem] uppercase tracking-luxe text-bone/50">Spots claimed</p>

              <div
                className="mt-2 h-[6px] w-full rounded-full bg-bone/15"
                role="progressbar"
                aria-valuenow={claimedPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${season.name} capacity`}
              >
                <div
                  className="h-[6px] rounded-full bg-bone transition-all duration-1000 ease-silk"
                  style={{ width: `${claimedPct}%` }}
                />
              </div>

              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl leading-none text-bone">{remaining}</span>
                <span className="text-[0.58rem] uppercase tracking-luxe text-bone/60">
                  {remaining === 1 ? "Spot" : "Spots"} remaining
                </span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 border-t border-bone/15 pt-8 lg:min-w-[15rem] lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="font-display text-5xl leading-none text-bone lg:text-6xl">
                {season.initialCapacity}
              </p>
              <p className="text-[0.58rem] uppercase tracking-luxe text-bone/50">
                Initial spaces available
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
