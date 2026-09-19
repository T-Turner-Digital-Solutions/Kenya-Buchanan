"use client";

import { useState } from "react";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDate, formatDateTime, formatTime } from "@/lib/format";
import type { WaitlistActivityEvent, WaitlistEntry } from "@/lib/types";

/**
 * WAITLIST ADMIN.
 *
 * Kenya releases one opening or several. Each opening is offered to the next
 * eligible person in order, for an exclusive 60-minute hold, and is filled only
 * when the deposit is paid. Phase 1 prototypes the controls and the record —
 * the timers, automatic pass-through and payment capture are backend work.
 */
export function WaitlistAdmin({
  entries,
  activity,
  seasonName,
}: {
  entries: WaitlistEntry[];
  activity: WaitlistActivityEvent[];
  seasonName: string;
}) {
  const [list, setList] = useState(entries);
  const [log, setLog] = useState(activity);
  const [count, setCount] = useState(1);

  const release = () => {
    const eligible = list.filter((entry) => entry.status === "waiting").slice(0, count);
    if (eligible.length === 0) return;

    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60_000);

    setList((current) =>
      current.map((entry) =>
        eligible.some((match) => match.id === entry.id)
          ? { ...entry, status: "offered", offerExpiresAt: expires.toISOString() }
          : entry,
      ),
    );

    setLog((current) => [
      ...eligible.map((entry, index) => ({
        id: `local-${now.getTime()}-${index}`,
        at: now.toISOString(),
        label: `Opening offered to Waitlist #${entry.position}`,
        detail: "60-minute exclusive hold",
      })),
      ...current,
    ]);
  };

  const waiting = list.filter((entry) => entry.status === "waiting").length;
  const offered = list.filter((entry) => entry.status === "offered").length;

  return (
    <div className="flex flex-col gap-8">
      <Panel
        title={`${seasonName} waitlist`}
        note={`${waiting} waiting · ${offered} on an active offer`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="release-count" className="sr-only">
              Openings to release
            </label>
            <select
              id="release-count"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="border border-bone/25 bg-transparent px-3 py-2 text-[0.6rem] uppercase tracking-wide2 text-bone"
            >
              {[1, 2, 3, 5].map((value) => (
                <option key={value} value={value} className="bg-ink">
                  {value} opening{value > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <Button variant="light" size="sm" onClick={release}>
              Release
            </Button>
          </div>
        }
      >
        <ol className="flex flex-col">
          {list.map((entry) => (
            <Row key={entry.id}>
              <span className="flex items-center gap-5">
                <span className="font-display text-xl text-bone/35">
                  {String(entry.position).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{entry.name}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {entry.city} · joined {formatDate(entry.joinedAt)}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-4">
                {entry.offerExpiresAt && entry.status === "offered" ? (
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
                    Holds until {formatTime(entry.offerExpiresAt)}
                  </span>
                ) : null}
                <StatusPill tone={entry.status === "offered" ? "attention" : "dark"}>
                  {entry.status}
                </StatusPill>
              </span>
            </Row>
          ))}
        </ol>
      </Panel>

      <Panel title="Activity" note="Offer, expiry and deposit history">
        <ul className="flex flex-col">
          {log.map((event) => (
            <li
              key={event.id}
              className="flex flex-col gap-1 border-b border-bone/10 py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-sm text-bone/80">
                <span className="mr-3 text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {formatDateTime(event.at)}
                </span>
                {event.label}
              </span>
              {event.detail ? (
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {event.detail}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — releasing an opening updates this screen and the activity record only.
        No offer is sent, no hold timer runs, and no deposit is taken. An opening is considered
        filled only when the deposit is successfully paid.
      </StudioNotice>
    </div>
  );
}
