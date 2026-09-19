"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatCurrency } from "@/lib/format";
import type { Experience, Season } from "@/lib/types";

/**
 * Experience selection — the entry point for BOOK.
 *
 * Deliberately experience-first: nothing here assumes Prom. Seasonal
 * experiences show their season state; the rest open a consultation request.
 */
export function BookSelector({
  experiences,
  promSeason,
}: {
  experiences: Experience[];
  promSeason: Season;
}) {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-px bg-ink/10 lg:grid-cols-3">
        {experiences.map((experience) => {
          const isSeasonal = experience.seasonal;
          const remaining = promSeason.initialCapacity - promSeason.spotsClaimed;
          const active = selected?.slug === experience.slug;

          return (
            <button
              key={experience.slug}
              type="button"
              onClick={() => {
                setSelected(experience);
                setSubmitted(false);
              }}
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
                {isSeasonal ? (
                  <StatusPill tone={active ? "dark" : "attention"}>
                    {promSeason.name} open
                  </StatusPill>
                ) : (
                  <StatusPill tone={active ? "dark" : "neutral"}>Year-round</StatusPill>
                )}
              </div>

              <MediaFrame
                slot={{
                  id: `book-${experience.slug}`,
                  alt: `${experience.name} — Kenya B.`,
                  ratio: "landscape",
                  tone: active ? "dark" : "light",
                }}
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
                {isSeasonal
                  ? `${remaining} of ${promSeason.initialCapacity} spaces remaining · ${formatCurrency(promSeason.depositCents)} deposit`
                  : "Begins with a consultation"}
              </p>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="grid gap-12 border-t border-ink/10 pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Selected</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              {selected.name}
            </h2>
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

          <div>
            {selected.seasonal ? (
              <div className="flex flex-col gap-6 border border-ink/15 p-8 lg:p-10">
                <p className="eyebrow">{promSeason.name} · Books open</p>
                <p className="font-display text-2xl leading-snug">
                  Claim your Prom Spot to enter the season.
                </p>
                <p className="text-sm leading-relaxed text-ink/60">
                  A Prom Spot is acceptance into the season — not an appointment. You will complete
                  your agreement and {formatCurrency(promSeason.depositCents)} deposit, then your
                  My Kenya B. account activates.
                </p>
                <Button href="/enroll/prom" size="lg">
                  Claim Your Prom Spot
                </Button>
                <Button href="/prom" variant="outline" size="lg">
                  Read About The Season
                </Button>
              </div>
            ) : submitted ? (
              <div className="flex flex-col gap-5 border border-ink/15 p-8 lg:p-10">
                <p className="eyebrow">Request received</p>
                <p className="font-display text-2xl leading-snug">
                  Kenya will reach out to schedule your consultation.
                </p>
                <p className="text-sm leading-relaxed text-ink/60">
                  Nothing is owed yet. Your {selected.name} experience begins once you and Kenya have
                  spoken and the agreement is in place.
                </p>
                <MockNotice>
                  Demonstration only — no request was sent and nothing was stored in Phase 1.
                </MockNotice>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 border border-ink/15 p-8 lg:p-10">
                <p className="eyebrow">Request a consultation</p>
                <TextField id="book-name" label="Name" required autoComplete="name" />
                <TextField id="book-email" label="Email" type="email" required autoComplete="email" />
                <TextField id="book-mobile" label="Mobile" type="tel" required autoComplete="tel" />
                <TextField id="book-date" label="Event date" type="date" hint="If known" />
                <SelectField id="book-city" label="Where are you">
                  <option>Atlanta metro</option>
                  <option>Elsewhere in Georgia</option>
                  <option>Southeast U.S.</option>
                  <option>Elsewhere in the U.S.</option>
                  <option>Outside the U.S.</option>
                </SelectField>
                <TextAreaField
                  id="book-vision"
                  label="Tell Kenya about the occasion"
                  hint="Optional"
                  placeholder="The event, the feeling, anything you already know you want."
                />
                <Button type="submit" size="lg">
                  Send Request
                </Button>
                <MockNotice>Phase 1 prototype — this form does not send or store anything yet.</MockNotice>
              </form>
            )}
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
