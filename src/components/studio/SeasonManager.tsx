"use client";

import { useState } from "react";
import { Panel, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import { Toggle } from "@/components/ui/Toggle";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import type { Season } from "@/lib/types";

/**
 * PROM SEASON MANAGER.
 *
 * Every value here is season configuration, not code. In production Kenya edits
 * these from this screen and creates the next season (Prom 2028, 2029 …)
 * without developer involvement.
 */
export function SeasonManager({ seasons }: { seasons: Season[] }) {
  const [selectedId, setSelectedId] = useState(seasons[0]?.id);
  const [config, setConfig] = useState(() =>
    Object.fromEntries(
      seasons.map((season) => [
        season.id,
        {
          interestList: season.config.interestListEnabled,
          waitlist: season.config.waitlistEnabled,
          ai: season.config.aiAssistantEnabled,
          rescheduling: season.config.clientReschedulingEnabled,
        },
      ]),
    ),
  );

  const season = seasons.find((entry) => entry.id === selectedId)!;
  const flags = config[season.id];
  const remaining = season.initialCapacity - season.spotsClaimed;

  const setFlag = (key: keyof typeof flags, value: boolean) =>
    setConfig((current) => ({ ...current, [season.id]: { ...current[season.id], [key]: value } }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {seasons.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setSelectedId(entry.id)}
            aria-pressed={entry.id === selectedId}
            className={
              entry.id === selectedId
                ? "border border-bone bg-bone px-5 py-2.5 text-[0.6rem] uppercase tracking-wide2 text-ink"
                : "border border-bone/25 px-5 py-2.5 text-[0.6rem] uppercase tracking-wide2 text-bone/55 transition-colors hover:border-bone/60 hover:text-bone"
            }
          >
            {entry.name}
          </button>
        ))}
        <button
          type="button"
          className="border border-dashed border-bone/25 px-5 py-2.5 text-[0.6rem] uppercase tracking-wide2 text-bone/40 transition-colors hover:border-bone/50 hover:text-bone/70"
        >
          + New Season
        </button>
      </div>

      <Panel
        title={season.name}
        note={`Season ${season.year}`}
        action={
          <StatusPill tone="dark">
            {season.state === "open"
              ? "Books open"
              : season.state === "pre_open"
                ? "Books not yet open"
                : season.state === "full"
                  ? "Books full"
                  : "Closed"}
          </StatusPill>
        }
      >
        <div className="flex flex-col gap-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Books open</p>
              <p className="mt-2 text-sm text-bone/85">
                {formatDate(season.opensAt)}
                <br />
                {formatTime(season.opensAt)}
              </p>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Initial capacity</p>
              <p className="mt-2 font-display text-2xl text-bone">{season.initialCapacity}</p>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Active clients</p>
              <p className="mt-2 font-display text-2xl text-bone">{season.spotsClaimed}</p>
            </div>
            <div>
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Deposit</p>
              <p className="mt-2 font-display text-2xl text-bone">
                {formatCurrency(season.depositCents)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/50">
                {season.spotsClaimed} of {season.initialCapacity} claimed
              </p>
              <p className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
                {remaining} remaining · {season.waitlistCount} waitlisted
              </p>
            </div>
            <ProgressBar
              value={season.spotsClaimed}
              max={season.initialCapacity}
              tone="champagne"
              label={`${season.name} capacity`}
            />
          </div>

          <div className="flex flex-col gap-1 border-t border-bone/10 pt-6 [&_span]:text-bone [&_button]:border-bone/30">
            <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Season settings</p>
            <div className="[&_span.text-ink]:text-bone [&_span.text-ink\\/50]:text-bone/45">
              <Toggle
                label="Interest list"
                description="Collect names before books open"
                checked={flags.interestList}
                onChange={(value) => setFlag("interestList", value)}
              />
              <Toggle
                label="Waitlist"
                description="Accept waitlist entries once capacity is reached"
                checked={flags.waitlist}
                onChange={(value) => setFlag("waitlist", value)}
              />
              <Toggle
                label="Ask Kenya B. assistant"
                description="Client guidance inside My Kenya B."
                checked={flags.ai}
                onChange={(value) => setFlag("ai", value)}
              />
              <Toggle
                label="Client rescheduling"
                description="Let clients move their own appointments"
                checked={flags.rescheduling}
                onChange={(value) => setFlag("rescheduling", value)}
              />
            </div>
          </div>

          <dl className="grid gap-6 border-t border-bone/10 pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                Inspiration uploads
              </dt>
              <dd className="mt-2 text-sm text-bone/85">
                {season.config.inspirationUploadsMin}–{season.config.inspirationUploadsMax} images
              </dd>
            </div>
            <div>
              <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                Minimum appointments
              </dt>
              <dd className="mt-2 text-sm text-bone/85">{season.config.minimumAppointments}</dd>
            </div>
            <div>
              <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                Approvals available
              </dt>
              <dd className="mt-2 text-sm text-bone/85">
                {season.config.availableApprovals.length} types
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 border-t border-bone/10 pt-6">
            <Button variant="light" size="sm">
              {season.state === "open" ? "Close Books" : "Open Books"}
            </Button>
            <Button variant="light" size="sm">
              Release Waitlist Opening
            </Button>
            <Button variant="light" size="sm">
              Edit Season
            </Button>
          </div>
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — toggles change this screen only. Season creation, capacity changes and
        book open/close are owner-configurable in production without developer involvement.
      </StudioNotice>
    </div>
  );
}
