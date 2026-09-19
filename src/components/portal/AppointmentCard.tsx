"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { getVideo } from "@/lib/services";
import { cx, formatDate, formatTime, formatWeekday } from "@/lib/format";
import type { Appointment } from "@/lib/types";
import { RescheduleDialog } from "./RescheduleDialog";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [rescheduling, setRescheduling] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const prepVideo = getVideo(appointment.preparation.videoId);
  const past = appointment.status === "completed";

  return (
    <article
      className={cx(
        "flex flex-col gap-6 border p-7 sm:p-9",
        past ? "border-ink/10 bg-transparent" : "border-ink/15 bg-white",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill tone={past ? "muted" : "progress"}>
              {past ? "Completed" : "Scheduled"}
            </StatusPill>
            {appointment.isChangeCheckpoint ? (
              <StatusPill tone="attention">Change checkpoint</StatusPill>
            ) : null}
          </div>
          <h3 className={cx("font-display text-2xl leading-tight", past && "text-ink/50")}>
            {appointment.title}
          </h3>
          <p className={cx("text-sm", past ? "text-ink/40" : "text-ink/65")}>
            {formatWeekday(appointment.startsAt)}, {formatDate(appointment.startsAt)} ·{" "}
            {formatTime(appointment.startsAt)} · {appointment.durationMinutes} minutes
          </p>
          <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
            {appointment.location}
          </p>
        </div>
      </div>

      {/* The change / communication checkpoint. */}
      {appointment.isChangeCheckpoint && !past ? (
        <div className="border-l-2 border-champagne bg-champagne/10 px-5 py-4">
          <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
            This is the time to speak up
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            This is the appropriate time to communicate concerns, ask questions and discuss
            requested adjustments while your gown is still progressing. Please do not wait until
            your gown is complete to raise something that could have been addressed during this
            fitting and change period.
          </p>
        </div>
      ) : null}

      {!past ? (
        <>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="flex items-center justify-between gap-4 border-t border-ink/10 pt-5 text-left"
          >
            <span className="eyebrow">What you need to know</span>
            <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
              {expanded ? "Hide" : "Show"}
            </span>
          </button>

          <div
            className={cx(
              "grid transition-all duration-700 ease-silk",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-7">
                <p className="font-display text-xl">{appointment.preparation.headline}</p>

                {prepVideo ? <VideoFrame video={prepVideo} size="sm" className="max-w-lg" /> : null}

                <ul className="flex flex-col gap-3">
                  {appointment.preparation.instructions.map((instruction) => (
                    <li key={instruction} className="flex gap-3 text-sm leading-relaxed text-ink/65">
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-ink/25" />
                      {instruction}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <p className="eyebrow">Before you arrive</p>
                  <ul className="flex flex-col gap-2">
                    {appointment.preparation.checklist.map((item) => (
                      <li key={item.id} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden
                          className={cx(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border",
                            item.done ? "border-ink bg-ink text-bone" : "border-ink/25",
                          )}
                        >
                          {item.done ? (
                            <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M2 6.5 4.5 9 10 3.5" />
                            </svg>
                          ) : null}
                        </span>
                        <span className={item.done ? "text-ink/40 line-through" : "text-ink/70"}>
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {appointment.preparation.acknowledgementRequired ? (
                  <p className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep">
                    {appointment.preparation.acknowledgedAt
                      ? `Acknowledged ${formatDate(appointment.preparation.acknowledgedAt)}`
                      : "Acknowledgement required before your appointment"}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row">
            {appointment.rescheduleable ? (
              <Button onClick={() => setRescheduling(true)}>Reschedule</Button>
            ) : null}
            <Button variant="outline">Add To Calendar</Button>
          </div>

          <RescheduleDialog
            appointment={appointment}
            open={rescheduling}
            onClose={() => setRescheduling(false)}
          />
        </>
      ) : null}
    </article>
  );
}
