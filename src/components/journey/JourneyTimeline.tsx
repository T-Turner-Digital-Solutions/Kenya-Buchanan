"use client";

import { useState } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusPill } from "@/components/ui/StatusPill";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { getVideo } from "@/lib/services";
import { cx, formatDate } from "@/lib/format";
import type { JourneyStage } from "@/lib/types";
import { StageStatusMark, stageStatusLabel } from "./StageStatusMark";

const toneFor = {
  complete: "muted",
  current: "attention",
  waiting_on_client: "attention",
  blocked: "neutral",
  upcoming: "muted",
} as const;

/**
 * Client-facing journey. Renders only client-visible stage content —
 * internal studio notes are never part of a `JourneyStage`.
 */
export function JourneyTimeline({ stages }: { stages: JourneyStage[] }) {
  const currentIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.status === "current"),
  );
  const [openKey, setOpenKey] = useState<string | null>(stages[currentIndex]?.key ?? null);

  return (
    <ol className="relative flex flex-col">
      <span aria-hidden className="absolute bottom-6 left-[5px] top-6 w-px bg-ink/10" />
      {stages.map((stage, index) => {
        const video = getVideo(stage.videoId);
        const open = openKey === stage.key;
        const clientTodo = stage.checklist.filter((item) => item.clientAction && !item.done);

        return (
          <li key={stage.key} className="relative flex gap-5 pb-2">
            <StageStatusMark status={stage.status} />

            <div className="min-w-0 flex-1 border-b border-ink/10 pb-6">
              <button
                type="button"
                onClick={() => setOpenKey(open ? null : stage.key)}
                aria-expanded={open}
                className="flex w-full flex-col gap-2 text-left"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.55rem] uppercase tracking-luxe text-ink/35">
                    Stage {String(index + 1).padStart(2, "0")}
                  </span>
                  <StatusPill tone={toneFor[stage.status]}>
                    {stage.statusNote ?? stageStatusLabel[stage.status]}
                  </StatusPill>
                  {clientTodo.length > 0 ? (
                    <StatusPill tone="attention">{clientTodo.length} for you</StatusPill>
                  ) : null}
                </div>
                <h3
                  className={cx(
                    "font-display text-2xl leading-tight",
                    stage.status === "upcoming" || stage.status === "blocked" ? "text-ink/45" : "text-ink",
                  )}
                >
                  {stage.title}
                </h3>
                {stage.completedAt ? (
                  <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/35">
                    Completed {formatDate(stage.completedAt)}
                  </p>
                ) : null}
              </button>

              <div className={cx("grid transition-all duration-700 ease-silk", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-6 pt-5">
                    <p className="max-w-2xl text-sm leading-relaxed text-ink/65">{stage.description}</p>

                    {stage.whatToExpect.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <p className="eyebrow">What to expect</p>
                        <ul className="flex flex-col gap-2">
                          {stage.whatToExpect.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-ink/60">
                              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-ink/25" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {stage.checklist.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <p className="eyebrow">Checklist</p>
                        <ul className="flex flex-col gap-2">
                          {stage.checklist.map((item) => (
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
                              <span className={cx(item.done ? "text-ink/40 line-through" : "text-ink/70")}>
                                {item.label}
                                {item.clientAction && !item.done ? (
                                  <span className="ml-2 text-[0.55rem] uppercase tracking-luxe text-champagne-deep">
                                    Your turn
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {stage.progressPhotos?.length ? (
                      <div className="flex flex-col gap-3">
                        <p className="eyebrow">From the studio</p>
                        <ul className="grid gap-5 sm:grid-cols-2 lg:max-w-2xl">
                          {stage.progressPhotos.map((photo) => (
                            <li key={photo.id} className="flex flex-col gap-3">
                              <MediaFrame slot={photo.media} sizes="(max-width: 640px) 90vw, 300px" />
                              <p className="text-sm leading-relaxed text-ink/65">{photo.caption}</p>
                              <p className="text-[0.55rem] uppercase tracking-luxe text-ink/35">
                                Posted {formatDate(photo.postedAt)}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {video ? <VideoFrame video={video} size="sm" className="max-w-xl" /> : null}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
