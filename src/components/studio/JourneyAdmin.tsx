"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx } from "@/lib/format";
import type { JourneyStage } from "@/lib/types";

/**
 * HOW KENYA DRIVES A CLIENT'S JOURNEY.
 *
 * Two things happen on this panel, and they are the two things the client
 * actually feels: the stage moves, and a photograph appears on her journey.
 *
 * Phase 1 shows the interface and keeps the result in component state.
 * Production must, for every action here: write it to the client's activity
 * history against the staff member who took it, notify the client, and refuse
 * anything the signed-in role is not allowed to do. Photographs posted here
 * are client-visible by definition — the upload path must be separate from
 * owner notes so the two can never be confused.
 */
export function JourneyAdmin({ stages, clientName }: { stages: JourneyStage[]; clientName: string }) {
  const [journey, setJourney] = useState(stages);
  const [photoFor, setPhotoFor] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [posted, setPosted] = useState<string[]>([]);

  const currentIndex = journey.findIndex((stage) => stage.status === "current");
  const current = journey[currentIndex];
  const next = journey[currentIndex + 1];

  const advance = () => {
    if (currentIndex < 0 || !next) return;
    setJourney((stagesNow) =>
      stagesNow.map((stage, index) => {
        if (index === currentIndex) {
          return { ...stage, status: "complete", completedAt: new Date().toISOString() };
        }
        if (index === currentIndex + 1) return { ...stage, status: "current" };
        return stage;
      }),
    );
  };

  const postPhoto = () => {
    if (!photoFor) return;
    setPosted((current) => [...current, photoFor]);
    setPhotoFor(null);
    setCaption("");
  };

  return (
    <div className="flex flex-col gap-6">
      <ol className="flex flex-col">
        {journey.map((stage, index) => {
          const hasPhoto = (stage.progressPhotos?.length ?? 0) > 0 || posted.includes(stage.key);
          return (
            <li
              key={stage.key}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 py-3 last:border-b-0"
            >
              <span className="flex items-center gap-4">
                <span className="font-display text-sm text-bone/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cx(
                    "text-sm",
                    stage.status === "complete"
                      ? "text-bone/45"
                      : stage.status === "current"
                        ? "text-bone"
                        : "text-bone/55",
                  )}
                >
                  {stage.title}
                </span>
              </span>

              <span className="flex items-center gap-3">
                {hasPhoto ? <StatusPill tone="dark">Photo posted</StatusPill> : null}
                <StatusPill tone={stage.status === "current" ? "attention" : "dark"}>
                  {stage.status.replace("_", " ")}
                </StatusPill>
                <button
                  type="button"
                  onClick={() => setPhotoFor(stage.key)}
                  className="border border-bone/25 px-3 py-1.5 text-[0.55rem] uppercase tracking-wide2 text-bone/70 transition-colors hover:border-bone hover:text-bone"
                >
                  Post photo
                </button>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-4 border-t border-bone/10 pt-5">
        {next ? (
          <>
            <Button variant="light" onClick={advance}>
              Move to {next.title}
            </Button>
            <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/40">
              {clientName} is told as soon as the stage moves
            </p>
          </>
        ) : (
          <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/40">
            {current ? "Final stage" : "Journey complete"}
          </p>
        )}
      </div>

      <Modal
        open={photoFor !== null}
        onClose={() => setPhotoFor(null)}
        eyebrow="Post to her journey"
        title={journey.find((stage) => stage.key === photoFor)?.title ?? ""}
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setPhotoFor(null)}>
              Cancel
            </Button>
            <Button onClick={postPhoto}>Post To {clientName}</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-ink/25 px-6 py-12 text-center">
            <p className="text-sm text-ink/60">Drop a photograph here, or choose a file</p>
            <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/35">
              Phase 1 — no file is uploaded
            </p>
          </div>

          <TextAreaField
            id="photo-caption"
            label="What she is looking at"
            rows={3}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Your bodice, boned and ready for the first fitting."
          />

          <p className="border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ink/70">
            This photograph and caption go straight to {clientName}&apos;s journey. Anything you do
            not want her to read belongs in owner notes instead.
          </p>

          <MockNotice>
            Phase 1 prototype — nothing is uploaded, stored or sent.
          </MockNotice>
        </div>
      </Modal>
    </div>
  );
}
