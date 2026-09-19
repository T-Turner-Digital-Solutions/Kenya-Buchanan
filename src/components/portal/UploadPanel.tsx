"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatDate } from "@/lib/format";
import type { UploadItem, UploadPrompt } from "@/lib/types";

/**
 * Inspiration / file uploads.
 *
 * Phase 1: placeholders only — no file is read, stored or transmitted.
 * Production: signed uploads to object storage, with Kenya able to require
 * completion before scheduling becomes available.
 */
export function UploadPanel({
  prompt,
  existing,
}: {
  prompt: UploadPrompt;
  existing: UploadItem[];
}) {
  const [items, setItems] = useState(existing);

  const addPlaceholder = () => {
    if (items.length >= prompt.max) return;
    setItems((current) => [
      ...current,
      {
        id: `demo-${current.length + 1}-${Date.now()}`,
        label: `Inspiration 0${current.length + 1}`,
        kind: "image",
        uploadedAt: new Date().toISOString(),
        uploadedBy: "client",
      },
    ]);
  };

  const complete = items.length >= prompt.min;

  return (
    <section className="flex flex-col gap-7 border border-ink/15 bg-white p-7 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">
            {prompt.min}–{prompt.max} images
          </p>
          <h2 className="font-display text-2xl leading-tight">{prompt.title}</h2>
        </div>
        <StatusPill tone={complete ? "positive" : "attention"}>
          {complete ? "Complete" : `${prompt.min - items.length} still needed`}
        </StatusPill>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-ink/65">{prompt.helpText}</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="flex flex-col gap-2">
            <div className="placeholder-surface flex aspect-[3/4] items-center justify-center border border-ink/10 bg-bone-deep px-3 text-center">
              <span className="text-[0.55rem] uppercase tracking-luxe text-ink/40">
                {item.label}
              </span>
            </div>
            <figcaption className="text-[0.55rem] uppercase tracking-wide2 text-ink/35">
              Uploaded {formatDate(item.uploadedAt)}
            </figcaption>
          </figure>
        ))}

        {items.length < prompt.max ? (
          <button
            type="button"
            onClick={addPlaceholder}
            className={cx(
              "flex aspect-[3/4] flex-col items-center justify-center gap-3 border border-dashed border-ink/25 px-3 text-center transition-colors duration-300 hover:border-ink/60",
            )}
          >
            <span aria-hidden className="font-display text-3xl text-ink/30">
              +
            </span>
            <span className="text-[0.55rem] uppercase tracking-luxe text-ink/45">
              Add an image
            </span>
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={addPlaceholder} disabled={items.length >= prompt.max}>
            Upload Image
          </Button>
          {items.length > 0 ? (
            <Button variant="ghost" onClick={() => setItems([])}>
              Clear (demo)
            </Button>
          ) : null}
        </div>
        <MockNotice>
          Phase 1 prototype — uploading adds a placeholder tile. No file is selected, stored or
          transmitted.
        </MockNotice>
      </div>
    </section>
  );
}
