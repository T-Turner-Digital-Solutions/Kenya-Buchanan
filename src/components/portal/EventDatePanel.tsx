"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { daysUntil, formatDate } from "@/lib/format";

/**
 * THE CLIENT SETS HER OWN EVENT DATE.
 *
 * Most clients enrol before they know the date — a school announces prom
 * months after Kenya's books open — so the account carries no date at first
 * and she adds it here the moment she has it. Everything downstream is
 * scheduled back from this one field, which is why changing it is treated as a
 * real event rather than an edit.
 *
 * Phase 1 keeps the new date in component state. Production must persist it,
 * stamp who set it and when, notify Kenya, and re-check every scheduled
 * appointment against the new date — an earlier date can put a fitting past
 * the point it is useful.
 */
export function EventDatePanel({
  eventLabel,
  eventDate,
  firstName,
}: {
  eventLabel: string;
  eventDate?: string;
  firstName: string;
}) {
  const [date, setDate] = useState<string | undefined>(eventDate);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(date ? date.slice(0, 10) : "");
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  // A date already gone cannot be the date she is being dressed for.
  const today = new Date().toISOString().slice(0, 10);

  const save = () => {
    if (!draft) {
      setError("Choose a date.");
      return;
    }
    if (draft <= today) {
      setError("That date has already passed. Check the day your school announced.");
      return;
    }
    setError(null);
    setDate(new Date(`${draft}T00:00:00.000Z`).toISOString());
    setJustSaved(true);
    setOpen(false);
  };

  const close = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <section className="flex flex-col gap-5 border border-ink/15 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="eyebrow">Your date</p>
          {date ? (
            <>
              <p className="font-display text-2xl leading-tight">{formatDate(date)}</p>
              <p className="text-sm leading-relaxed text-ink/60">
                {daysUntil(date)} days away. Kenya schedules your fittings back from this date, so
                tell her straight away if it moves.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl leading-tight">
                {firstName}, when is {eventLabel}?
              </p>
              <p className="max-w-md text-sm leading-relaxed text-ink/60">
                You do not need it to start — most people enrol before their school announces it.
                Add it here the day you find out, and Kenya will work your fittings back from it.
              </p>
            </>
          )}
        </div>
        {justSaved ? <StatusPill tone="positive">Saved ✓</StatusPill> : null}
      </div>

      <Button
        variant={date ? "outline" : "ink"}
        className="self-start"
        onClick={() => {
          setDraft(date ? date.slice(0, 10) : "");
          setOpen(true);
        }}
      >
        {date ? "Change my date" : "Add my date"}
      </Button>

      <Modal
        open={open}
        onClose={close}
        eyebrow={date ? "Change your date" : "Add your date"}
        title={eventLabel}
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={save}>{date ? "Save The New Date" : "Save My Date"}</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <TextField
            id="event-date"
            type="date"
            label="Date"
            min={today}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setError(null);
            }}
            hint="The day of the event itself, not the day you want your gown."
          />

          {error ? (
            <p className="border-l-2 border-wine pl-4 text-sm leading-relaxed text-wine">{error}</p>
          ) : null}

          {date ? (
            <p className="border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ink/70">
              Moving your date moves your fittings. Kenya is told as soon as you save, and she will
              come back to you about any appointment that no longer sits right.
            </p>
          ) : null}

          <MockNotice>
            Phase 1 prototype — the date is held on screen only. Nothing is saved to an account and
            Kenya is not notified.
          </MockNotice>
        </div>
      </Modal>
    </section>
  );
}
