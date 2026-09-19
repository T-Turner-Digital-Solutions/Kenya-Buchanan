"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { TextAreaField } from "@/components/ui/Field";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { getVideo } from "@/lib/services";
import { formatDateTime } from "@/lib/format";
import type { ApprovalRequest } from "@/lib/types";

const kindLabel: Record<ApprovalRequest["kind"], string> = {
  design_sketch: "Design approval",
  color: "Colour approval",
  fabric: "Fabric approval",
  embellishment: "Embellishment approval",
  major_change: "Change approval",
};

/**
 * Optional per-client approvals (design, colour, fabric, embellishment, major
 * change). Kenya decides which apply — an approval only appears here when she
 * has enabled and requested it.
 *
 * There is deliberately no blunt "Reject". The alternative to approving is
 * starting a conversation.
 */
export function ApprovalCard({ approval }: { approval: ApprovalRequest }) {
  const [status, setStatus] = useState(approval.status);
  const [question, setQuestion] = useState(false);
  const [sent, setSent] = useState(false);
  const video = getVideo(approval.videoId);
  const approvedAt = approval.approvedAt ?? new Date().toISOString();

  return (
    <article className="flex flex-col gap-7 border border-ink/15 bg-white p-7 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">{kindLabel[approval.kind]}</p>
          <h2 className="font-display text-2xl leading-tight">{approval.title}</h2>
        </div>
        {status === "approved" ? (
          <StatusPill tone="positive">Approved ✓</StatusPill>
        ) : status === "question_raised" ? (
          <StatusPill tone="attention">Question sent to Kenya</StatusPill>
        ) : (
          <StatusPill tone="attention">Waiting on you</StatusPill>
        )}
      </div>

      {approval.note ? (
        <blockquote className="border-l-2 border-champagne pl-5">
          <p className="font-display text-lg leading-snug text-ink/80">
            &ldquo;{approval.note}&rdquo;
          </p>
          <footer className="mt-2 text-[0.55rem] uppercase tracking-luxe text-ink/40">Kenya</footer>
        </blockquote>
      ) : null}

      {approval.media.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:max-w-lg">
          {approval.media.map((slot) => (
            <MediaFrame key={slot.id} slot={slot} sizes="(max-width: 640px) 45vw, 240px" />
          ))}
        </div>
      ) : null}

      {video ? <VideoFrame video={video} size="sm" className="max-w-lg" /> : null}

      {approval.showColorDisclaimer ? (
        <p className="border border-ink/10 bg-bone-deep/60 px-5 py-4 text-xs leading-relaxed text-ink/55">
          Colours and textures may appear differently depending on your screen, the photography and
          the lighting. Kenya will show you the material in person at your next appointment.
        </p>
      ) : null}

      {status === "approved" ? (
        <div className="flex flex-col gap-2 border-t border-ink/10 pt-6">
          <p className="font-display text-xl text-ink">Approved ✓</p>
          <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
            Recorded {formatDateTime(approvedAt)} · kept on your permanent account record
          </p>
        </div>
      ) : sent ? (
        <div className="flex flex-col gap-2 border-t border-ink/10 pt-6">
          <p className="font-display text-xl">Your question is with Kenya.</p>
          <p className="text-sm leading-relaxed text-ink/60">
            She will come back to you here. Nothing moves forward until you have both talked it
            through.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 border-t border-ink/10 pt-6">
          {question ? (
            <div className="flex flex-col gap-5">
              <TextAreaField
                id={`approval-question-${approval.id}`}
                label="Your question for Kenya"
                placeholder="Tell Kenya what you are wondering about."
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => {
                    setSent(true);
                    setStatus("question_raised");
                  }}
                >
                  Send To Kenya
                </Button>
                <Button variant="ghost" onClick={() => setQuestion(false)}>
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setStatus("approved")} size="lg">
                I Love It — Approve
              </Button>
              <Button variant="outline" size="lg" onClick={() => setQuestion(true)}>
                I Have A Question
              </Button>
            </div>
          )}

          <MockNotice>
            Phase 1 prototype — approving updates this screen only. In production the approval and
            its timestamp become part of the permanent client activity record.
          </MockNotice>
        </div>
      )}
    </article>
  );
}
