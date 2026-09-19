import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "My Journey" };

export default function PortalJourneyPage() {
  const client = getDemoPortalClient();
  const current = client.journey.find((stage) => stage.status === "current");
  const sourcing = client.fabric;

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4 border border-ink/10 bg-white p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Right now</p>
          <StatusPill tone="attention">{current?.statusNote ?? "In progress"}</StatusPill>
        </div>
        <h2 className="font-display text-3xl leading-tight">{current?.title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-ink/65">{current?.description}</p>
        {sourcing ? (
          <dl className="mt-2 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3">
            <div>
              <dt className="eyebrow">Sourcing from</dt>
              <dd className="mt-2 text-sm">{sourcing.sourcingLocation}</dd>
            </div>
            <div>
              <dt className="eyebrow">Materials</dt>
              <dd className="mt-2 text-sm">{sourcing.descriptor}</dd>
            </div>
            <div>
              <dt className="eyebrow">Status</dt>
              <dd className="mt-2 text-sm capitalize">{sourcing.sourcingStatus.replace("_", " ")}</dd>
            </div>
          </dl>
        ) : null}
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-display text-2xl">Every stage</h2>
        <JourneyTimeline stages={client.journey} />
      </section>

      <MockNotice>
        Phase 1 prototype — stage content, checklists and timestamps are mock data. Stage
        progression is driven by Kenya B. Studio in production.
      </MockNotice>
    </div>
  );
}
