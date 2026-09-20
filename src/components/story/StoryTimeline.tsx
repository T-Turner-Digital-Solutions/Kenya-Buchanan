"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import type { StoryTimelineEntry } from "@/lib/types";

/**
 * Interactive journey timeline.
 *
 * Horizontal on desktop, a vertical thread on mobile. Entries come from the
 * page content, so Kenya adds, edits or removes a moment without code.
 */
export function StoryTimeline({
  entries,
  eyebrow,
  headline,
}: {
  entries: StoryTimelineEntry[];
  eyebrow: string;
  headline: string;
}) {
  const [active, setActive] = useState(entries.length - 1);
  const current = entries[active];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">{eyebrow}</p>
        <h2 className="display-caps max-w-2xl text-3xl text-bone sm:text-4xl">{headline}</h2>
      </div>

      {/* Desktop: markers along a rule */}
      <div className="hidden lg:block">
        <div className="relative">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-bone/15" />
          <ol className="relative flex justify-between gap-2">
            {entries.map((entry, index) => {
              const selected = index === active;
              return (
                <li key={entry.id} className="flex min-w-0 flex-1 flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={selected}
                    className="flex flex-col items-center gap-4 focus:outline-none"
                  >
                    <span
                      aria-hidden
                      className={cx(
                        "h-[15px] w-[15px] rounded-full border transition-all duration-500 ease-silk",
                        selected
                          ? "border-champagne bg-champagne scale-110"
                          : "border-bone/35 bg-ink hover:border-bone",
                      )}
                    />
                    <span
                      className={cx(
                        "text-center text-[0.58rem] uppercase tracking-wide2 transition-colors duration-500",
                        selected ? "text-bone" : "text-bone/40",
                      )}
                    >
                      {entry.marker}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 min-h-[6rem] border-t border-bone/10 pt-8">
          <p className="font-display text-3xl text-bone">{current.title}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/55">{current.detail}</p>
        </div>
      </div>

      {/* Mobile: a vertical thread */}
      <ol className="relative flex flex-col lg:hidden">
        <span aria-hidden className="absolute bottom-4 left-[7px] top-3 w-px bg-bone/15" />
        {entries.map((entry) => (
          <li key={entry.id} className="relative flex gap-5 pb-8 last:pb-0">
            <span
              aria-hidden
              className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border border-champagne bg-ink"
            >
              <span className="absolute inset-[3px] rounded-full bg-champagne" />
            </span>
            <span className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[0.58rem] uppercase tracking-luxe text-champagne">
                {entry.marker}
              </span>
              <span className="font-display text-xl text-bone">{entry.title}</span>
              <span className="text-sm leading-relaxed text-bone/55">{entry.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
