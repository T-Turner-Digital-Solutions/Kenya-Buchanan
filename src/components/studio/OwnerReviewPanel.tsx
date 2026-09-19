"use client";

import { useState } from "react";
import { OwnerOnly, Panel, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDate } from "@/lib/format";
import type { OwnerReviewCase } from "@/lib/types";

/**
 * OWNER REVIEW.
 *
 * A returning client whose previous account was cancelled during an active
 * contract is routed here automatically. The system never accepts or declines
 * on Kenya's behalf — she does.
 */
export function OwnerReviewPanel({ cases }: { cases: OwnerReviewCase[] }) {
  const [decisions, setDecisions] = useState<Record<string, OwnerReviewCase["decision"]>>(
    Object.fromEntries(cases.map((entry) => [entry.id, entry.decision])),
  );

  return (
    <div className="flex flex-col gap-8">
      {cases.map((entry) => {
        const decision = decisions[entry.id];
        return (
          <Panel
            key={entry.id}
            title={entry.clientName}
            note={`Requested ${formatDate(entry.requestedAt)} · ${entry.requestedExperience}`}
            action={
              <StatusPill tone={decision === "pending" ? "attention" : "dark"}>
                {decision === "pending" ? "Review required" : decision}
              </StatusPill>
            }
          >
            <div className="flex flex-col gap-7">
              <p className="font-display text-2xl leading-snug text-bone">
                Returning client — review required
              </p>

              <dl className="grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                    Previous experience
                  </dt>
                  <dd className="mt-2 text-sm text-bone/85">{entry.previousExperience}</dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                    Previous status
                  </dt>
                  <dd className="mt-2 text-sm text-bone/85">{entry.previousStatus}</dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Requesting</dt>
                  <dd className="mt-2 text-sm capitalize text-bone/85">
                    {entry.requestedExperience}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3 border-y border-bone/10 py-5">
                <Button variant="light" size="sm">
                  View Contract
                </Button>
                <Button variant="light" size="sm">
                  View Payment History
                </Button>
                <Button variant="light" size="sm">
                  View Activity
                </Button>
              </div>

              <OwnerOnly>
                {entry.ownerNotes.map((note) => (
                  <p key={note.id}>
                    <span className="mr-3 text-[0.55rem] uppercase tracking-wide2 text-bone/35">
                      {formatDate(note.at)} · {note.author}
                    </span>
                    {note.body}
                  </p>
                ))}
              </OwnerOnly>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="light"
                  onClick={() => setDecisions((c) => ({ ...c, [entry.id]: "accepted" }))}
                >
                  Accept Client
                </Button>
                <Button
                  variant="light"
                  onClick={() => setDecisions((c) => ({ ...c, [entry.id]: "hold" }))}
                >
                  Keep On Hold
                </Button>
                <Button
                  variant="light"
                  onClick={() => setDecisions((c) => ({ ...c, [entry.id]: "declined" }))}
                >
                  Decline Client
                </Button>
              </div>

              {decision !== "pending" ? (
                <p className="border-l-2 border-champagne bg-bone/5 px-5 py-4 text-sm text-bone/70">
                  Decision recorded as <span className="capitalize text-bone">{decision}</span>. The
                  client is told only that a decision has been made — never the reason or any owner
                  note.
                </p>
              ) : null}
            </div>
          </Panel>
        );
      })}

      <StudioNotice>
        Phase 1 prototype — decisions update this screen only. Client-facing hold messaging is at
        /portal/account-review and deliberately exposes no internal reason.
      </StudioNotice>
    </div>
  );
}
