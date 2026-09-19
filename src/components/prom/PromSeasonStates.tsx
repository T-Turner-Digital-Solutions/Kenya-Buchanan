"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";
import { MockNotice } from "@/components/ui/MockNotice";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import type { Season } from "@/lib/types";
import { InterestForm } from "./InterestForm";

export type PromPresentationState = "pre_open" | "open" | "full" | "offer";

const stateLabels: Array<{ key: PromPresentationState; label: string }> = [
  { key: "pre_open", label: "Before books open" },
  { key: "open", label: "Books open" },
  { key: "full", label: "Books full" },
  { key: "offer", label: "Waitlist offer" },
];

/**
 * The Prom landing page's seasonal presentation.
 *
 * In production the state is derived from the season record + capacity, and the
 * switcher below does not exist. It is here so Phase 1 can be evaluated without
 * waiting for a real season to change state.
 */
export function PromSeasonStates({
  openSeason,
  fullSeason,
  upcomingSeason,
}: {
  openSeason: Season;
  fullSeason: Season;
  upcomingSeason: Season;
}) {
  const [state, setState] = useState<PromPresentationState>("open");

  return (
    <div className="flex flex-col">
      <div className="border-y border-bone/15 bg-ink">
        <div className="mx-auto flex max-w-editorial flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
            Phase 1 demo · preview the seasonal state
          </p>
          <div className="flex flex-wrap gap-2">
            {stateLabels.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setState(item.key)}
                aria-pressed={state === item.key}
                className={
                  state === item.key
                    ? "border border-bone bg-bone px-4 py-2 text-[0.55rem] uppercase tracking-wide2 text-ink"
                    : "border border-bone/25 px-4 py-2 text-[0.55rem] uppercase tracking-wide2 text-bone/60 transition-colors hover:border-bone/60 hover:text-bone"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-ink">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          {state === "pre_open" ? <PreOpenState season={upcomingSeason} /> : null}
          {state === "open" ? <OpenState season={openSeason} /> : null}
          {state === "full" ? <FullState season={fullSeason} /> : null}
          {state === "offer" ? <OfferState season={fullSeason} /> : null}
        </div>
      </div>
    </div>
  );
}

function PreOpenState({ season }: { season: Season }) {
  return (
    <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
            Kenya B. {season.name}
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
            The books open in
          </h2>
        </div>

        <Countdown target={season.opensAt} tone="dark" showSeconds={false} />

        <div className="flex flex-col gap-3 border-t border-bone/15 pt-8">
          <p className="text-sm leading-relaxed text-bone/60">
            {season.name} enrollment opens {formatDate(season.opensAt)} at {formatTime(season.opensAt)}.
          </p>
          <p className="font-display text-2xl text-bone">
            {season.initialCapacity} initial spaces available.
          </p>
          <p className="text-sm leading-relaxed text-bone/50">
            Spots are claimed with a {formatCurrency(season.depositCents)} deposit and are gone when
            they are gone. Being on the list is how you hear first.
          </p>
        </div>
      </div>

      <InterestForm variant="interest" seasonName={season.name} />
    </div>
  );
}

function OpenState({ season }: { season: Season }) {
  const remaining = season.initialCapacity - season.spotsClaimed;

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
            {season.name} · Enrollment open
          </p>
          <h2 className="font-display text-4xl leading-[1.02] text-bone text-balance sm:text-5xl lg:text-6xl">
            {season.name} books are open.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-bone/60">
            A Prom Spot is acceptance into the {season.name} season — it is not an appointment. Your
            appointments are scheduled with Kenya once you are in.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/enroll/prom" variant="light" size="lg">
              Claim Your Prom Spot
            </Button>
            <Button href="#what-a-spot-is" variant="ghost" size="lg" className="!text-bone/60 hover:!text-bone">
              What a spot includes
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-6">
            <p className="font-display text-5xl leading-none text-bone lg:text-6xl">
              {season.spotsClaimed}
              <span className="text-2xl text-bone/35"> / {season.initialCapacity}</span>
            </p>
            <p className="text-right text-[0.55rem] uppercase tracking-luxe text-bone/40">
              Spots claimed
            </p>
          </div>
          <ProgressBar value={season.spotsClaimed} max={season.initialCapacity} tone="champagne" label="Prom spots claimed" />
          <p className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
            {remaining} initial {remaining === 1 ? "space" : "spaces"} remaining
          </p>
          <p className="text-sm leading-relaxed text-bone/50">
            {formatCurrency(season.depositCents)} deposit secures your spot. Once initial capacity is
            reached, enrollment moves to the waitlist.
          </p>
        </div>
      </div>

      <MockNotice tone="dark">
        Phase 1 prototype — enrollment, agreement and deposit steps are demonstration screens. No
        payment is processed and no account is created.
      </MockNotice>
    </div>
  );
}

function FullState({ season }: { season: Season }) {
  return (
    <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
      <div className="flex flex-col gap-8">
        <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">{season.name}</p>
        <h2 className="font-display text-4xl leading-[1.02] text-bone text-balance sm:text-5xl lg:text-6xl">
          {season.name} books are currently full.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-bone/60">
          All {season.initialCapacity} initial spaces have been claimed. The waitlist is how the next
          spot finds its person.
        </p>

        <ol className="flex flex-col gap-6 border-t border-bone/15 pt-8">
          {[
            "Kenya releases an opening when one becomes available.",
            "The opening is offered to the next eligible person on the waitlist — one person at a time.",
            "That person holds an exclusive 60-minute window to claim it.",
            "The opening is filled only when the deposit is paid. If the window closes, it passes to the next person.",
          ].map((step, index) => (
            <li key={step} className="flex gap-5">
              <span className="font-display text-xl text-champagne">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-bone/60">{step}</p>
            </li>
          ))}
        </ol>

        <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/40">
          {season.waitlistCount} currently waiting
        </p>
      </div>

      <InterestForm variant="waitlist" seasonName={season.name} />
    </div>
  );
}

function OfferState({ season }: { season: Season }) {
  // Prototype hold window. Production computes this from the offer record
  // created when Kenya releases an opening.
  const [holdTarget, setHoldTarget] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // Started after paint so the server-rendered markup stays time-neutral.
    const frame = window.requestAnimationFrame(() =>
      setHoldTarget(new Date(Date.now() + 47 * 60_000 + 32_000).toISOString()),
    );
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const resetHold = useMemo(
    () => () => {
      setExpired(false);
      setHoldTarget(new Date(Date.now() + 47 * 60_000 + 32_000).toISOString());
    },
    [],
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
      <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
        {season.name} · Waitlist offer
      </p>
      <h2 className="font-display text-4xl leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
        {expired ? "This offer has expired." : "Your Prom spot is being held."}
      </h2>

      {expired ? (
        <p className="max-w-xl text-sm leading-relaxed text-bone/60">
          The hold window closed without a deposit. In production the opening passes automatically to
          the next eligible person on the waitlist, and you keep your place in line for the next one.
        </p>
      ) : (
        <>
          <div className="flex flex-col items-center gap-3 border-y border-bone/15 px-10 py-10">
            {holdTarget ? (
              <Countdown
                target={holdTarget}
                unitStyle="clock"
                tone="dark"
                className="text-5xl tabular-nums sm:text-7xl"
                onExpire={() => setExpired(true)}
              />
            ) : (
              <p className="font-display text-5xl text-bone sm:text-7xl">--:--:--</p>
            )}
            <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
              Exclusive hold · 60 minutes
            </p>
          </div>

          <p className="font-display text-2xl text-bone">
            {formatCurrency(season.depositCents)} deposit required
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-bone/60">
            This opening is yours alone until the timer ends. It is filled only when the deposit is
            received — if the window closes, it passes to the next person on the waitlist.
          </p>

          <Button href="/enroll/prom" variant="light" size="lg">
            Claim My Spot
          </Button>
        </>
      )}

      {expired ? (
        <Button variant="light" size="lg" onClick={resetHold}>
          Replay The Hold
        </Button>
      ) : null}

      <MockNotice tone="dark" className="text-left">
        Phase 1 prototype — the hold timer is a visual state only. Timer enforcement, automatic
        pass-through to the next person and payment are backend work for a later phase.
      </MockNotice>
    </div>
  );
}
