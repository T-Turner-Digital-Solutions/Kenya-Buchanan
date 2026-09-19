import type { Metadata } from "next";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "My Designs" };

export default function PortalDesignsPage() {
  const client = getDemoPortalClient();
  const design = client.approvals.find((approval) => approval.kind === "design_sketch");

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-7 border border-ink/15 bg-white p-7 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Your gown</p>
            <h2 className="font-display text-2xl leading-tight">The design</h2>
          </div>
          {design?.status === "approved" ? <StatusPill tone="positive">Approved ✓</StatusPill> : null}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {design?.media[0] ? (
            <MediaFrame slot={design.media[0]} className="max-w-sm" sizes="(max-width: 1024px) 80vw, 340px" />
          ) : null}
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-relaxed text-ink/70">{client.designNotes}</p>
            {design?.note ? (
              <blockquote className="border-l-2 border-champagne pl-5">
                <p className="font-display text-lg leading-snug text-ink/80">
                  &ldquo;{design.note}&rdquo;
                </p>
                <footer className="mt-2 text-[0.55rem] uppercase tracking-luxe text-ink/40">
                  Kenya
                </footer>
              </blockquote>
            ) : null}
          </div>
        </div>
      </section>

      {client.fabric ? (
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl">Fabric &amp; materials</h2>
          <dl className="grid gap-px bg-ink/10 sm:grid-cols-3">
            <div className="bg-bone p-6">
              <dt className="eyebrow">Material</dt>
              <dd className="mt-3 text-sm leading-relaxed">{client.fabric.name}</dd>
            </div>
            <div className="bg-bone p-6">
              <dt className="eyebrow">Sourcing from</dt>
              <dd className="mt-3 text-sm">{client.fabric.sourcingLocation}</dd>
            </div>
            <div className="bg-bone p-6">
              <dt className="eyebrow">Status</dt>
              <dd className="mt-3 text-sm capitalize">
                {client.fabric.sourcingStatus.replace("_", " ")}
              </dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed text-ink/55">
            Custom gowns often require specialty sourcing to bring your vision to life. Kenya
            sources from Atlanta, New York, other U.S. markets and international suppliers
            depending on what your design needs.
          </p>
        </section>
      ) : null}

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl">Your measurements</h2>
        <dl className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {client.measurements.map((measurement) => (
            <div key={measurement.label} className="bg-bone p-6">
              <dt className="eyebrow">{measurement.label}</dt>
              <dd className="mt-3 font-display text-xl">{measurement.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <MockNotice>
        Phase 1 prototype — design imagery is a placeholder. Kenya&rsquo;s sketches and fabric
        photography are uploaded from Kenya B. Studio in a later phase.
      </MockNotice>
    </div>
  );
}
