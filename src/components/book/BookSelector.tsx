"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatCurrency } from "@/lib/format";
import type { Experience, Season } from "@/lib/types";

/**
 * Experience selection — the entry point for BOOK.
 *
 * Deliberately experience-first: nothing here assumes Prom. Choosing one leads
 * straight into that experience's booking form, which continues through the
 * agreement and deposit to Kenya's welcome video.
 */
export function BookSelector({
  experiences,
  promSeason,
}: {
  experiences: Experience[];
  promSeason: Season;
}) {
  const [selected, setSelected] = useState<Experience | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const remaining = promSeason.initialCapacity - promSeason.spotsClaimed;

  // Choosing an experience opens the application below the cards; without this
  // it simply appears off-screen and the card reads as doing nothing.
  useEffect(() => {
    if (!selected) return;
    const node = panelRef.current;
    if (!node) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  }, [selected]);

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-px bg-ink/10 lg:grid-cols-3">
        {experiences.map((experience) => {
          const active = selected?.slug === experience.slug;

          return (
            <button
              key={experience.slug}
              type="button"
              onClick={() => setSelected(experience)}
              aria-pressed={active}
              className={cx(
                "group flex flex-col gap-6 p-8 text-left transition-colors duration-500 lg:p-10",
                active ? "bg-ink text-bone" : "bg-bone hover:bg-bone-deep",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className={cx("font-display text-3xl leading-none", active ? "text-bone" : "text-ink")}>
                  {experience.name}
                </h3>
                {experience.seasonal ? (
                  <StatusPill tone={active ? "dark" : "attention"}>
                    {promSeason.name} open
                  </StatusPill>
                ) : (
                  <StatusPill tone={active ? "dark" : "neutral"}>Year-round</StatusPill>
                )}
              </div>

              {/*
               * Square, not 16:10. These are 2:3 portraits, and a landscape
               * crop threw away three quarters of the height and took the
               * faces with it. A square frame loses a third instead, and the
               * face anchor keeps the head well inside it.
               */}
              <MediaFrame
                slot={{
                  id: `book-${experience.slug}`,
                  alt: `${experience.name} — Kenya B.`,
                  ratio: "square",
                  tone: active ? "dark" : "light",
                }}
                focal="face"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              <p className={cx("text-sm leading-relaxed", active ? "text-bone/60" : "text-ink/60")}>
                {experience.tagline}
              </p>

              <p
                className={cx(
                  "mt-auto text-[0.55rem] uppercase tracking-luxe",
                  active ? "text-champagne" : "text-ink/40",
                )}
              >
                {experience.seasonal
                  ? `${remaining} of ${promSeason.initialCapacity} spaces remaining · ${formatCurrency(promSeason.depositCents)} deposit`
                  : "Begins with a consultation"}
              </p>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div
          ref={panelRef}
          className="scroll-mt-28 grid gap-12 border-t border-ink/10 pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
        >
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Selected</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">{selected.name}</h2>
            <p className="text-sm leading-relaxed text-ink/65">{selected.description}</p>

            <dl className="mt-4 flex flex-col gap-4 border-t border-ink/10 pt-6">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Appointments</dt>
                <dd className="text-sm text-ink/70">{selected.config.minimumAppointments} minimum</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Inspiration</dt>
                <dd className="text-sm text-ink/70">
                  {selected.config.inspirationUploadsMin}–{selected.config.inspirationUploadsMax} images
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">{selected.config.depositLabel}</dt>
                <dd className="text-sm text-ink/70">
                  {selected.config.depositAmountCents
                    ? formatCurrency(selected.config.depositAmountCents)
                    : "Quoted at consultation"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-6 border border-ink/15 p-8 lg:p-10">
            <p className="eyebrow">
              {selected.seasonal ? `${promSeason.name} · Books open` : `${selected.name} · Booking`}
            </p>
            <p className="font-display text-2xl leading-snug">
              {selected.seasonal
                ? "Claim your Prom Spot to enter the season."
                : `Begin your ${selected.name.toLowerCase()} experience.`}
            </p>
            <p className="text-sm leading-relaxed text-ink/60">
              Kenya reads your request before anything is owed. You are not charged to ask —
              {selected.config.depositAmountCents
                ? ` the ${formatCurrency(selected.config.depositAmountCents)} deposit is asked for once she takes your gown.`
                : " your deposit is quoted and asked for once she takes your gown."}
            </p>
            <p className="text-sm leading-relaxed text-ink/60">
              <span className="eyebrow">How long it takes</span>
              <br />
              {selected.config.leadTimeNote}
            </p>

            <ol className="flex flex-col gap-3 border-y border-ink/10 py-6">
              {[
                "Fill in your details",
                "Send Kenya your design — inspiration images and your date",
                "Kenya reviews it and comes back to you",
                "Sign your agreement",
                selected.config.depositAmountCents
                  ? `Pay your ${formatCurrency(selected.config.depositAmountCents)} deposit — this is what begins your gown`
                  : "Pay your deposit — this is what begins your gown",
                "Meet Kenya — your welcome video",
              ].map((label, index) => (
                <li key={label} className="flex items-baseline gap-4 text-sm text-ink/65">
                  <span className="font-display text-base text-champagne-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </li>
              ))}
            </ol>

            <Button href={`/enroll/${selected.slug}`} size="lg">
              {selected.seasonal ? "Claim Your Prom Spot" : `Start My ${selected.name} Design`}
            </Button>
            <Button href={`/${selected.slug}`} variant="outline" size="lg">
              Read About {selected.name}
            </Button>

            <MockNotice>
              Phase 1 prototype — the agreement and deposit steps are demonstration screens. No
              payment is processed and no account is created.
            </MockNotice>
          </div>
        </div>
      ) : (
        <p className="border-t border-ink/10 pt-10 text-center text-sm text-ink/45">
          Select an experience to continue.
        </p>
      )}
    </div>
  );
}
