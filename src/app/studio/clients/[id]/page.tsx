import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OwnerOnly, Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatCurrency, formatDate, formatDateTime, formatTime } from "@/lib/format";
import { clientRoster, getClientRecord, getSignedContract } from "@/lib/services";

export const metadata: Metadata = { title: "Client Record" };

export function generateStaticParams() {
  return clientRoster.map((client) => ({ id: client.id }));
}

/**
 * CLIENT RECORD — owner view.
 *
 * One complete record. Client-visible information and owner-only information
 * are separated on screen and in the data: `ownerNotes` is stripped from the
 * portal's view of the same client by `getPortalClient()`.
 */
export default async function StudioClientRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = getClientRecord(id);

  if (!record) {
    const summary = clientRoster.find((client) => client.id === id);
    if (!summary) notFound();

    return (
      <div className="flex flex-col gap-8">
        <Panel title={`${summary.firstName} ${summary.lastName}`} note={summary.eventLabel}>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-bone/60">
              This demonstration client has roster-level data only. Karlie McDowell carries the full
              record in Phase 1.
            </p>
            <Link
              href="/studio/clients/cl-karlie-mcdowell"
              className="text-[0.6rem] uppercase tracking-wide2 text-champagne"
            >
              Open a complete client record →
            </Link>
          </div>
        </Panel>
      </div>
    );
  }

  const contract = getSignedContract(record.contractIds[0]);
  const balance = record.payments.totalInvestmentCents - record.payments.paidCents;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <Panel>
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl text-bone">
                {record.firstName} {record.lastName}
              </h2>
              <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/40">
                {record.eventLabel} · {record.city}, {record.state}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="dark">{record.accountStatus}</StatusPill>
              <StatusPill tone="attention">{record.productionColumn.replace("_", " ")}</StatusPill>
            </div>
          </div>

          <dl className="grid gap-6 border-t border-bone/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Experience", record.experience],
              ["Event date", record.eventDate ? formatDate(record.eventDate) : "—"],
              ["School", record.school ?? "—"],
              ["Graduation", record.graduationYear ? String(record.graduationYear) : "—"],
              ["Email", record.email],
              ["Mobile", record.mobile],
              ["Joined", formatDate(record.joinedAt)],
              ["Balance", formatCurrency(balance)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">{label}</dt>
                <dd className="mt-2 text-sm capitalize text-bone/85">{value}</dd>
              </div>
            ))}
          </dl>

          {record.guardian ? (
            <dl className="grid gap-6 border-t border-bone/10 pt-6 sm:grid-cols-4">
              <div className="sm:col-span-4">
                <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
                  Parent / guardian
                </p>
              </div>
              {[
                ["Name", record.guardian.name],
                ["Relationship", record.guardian.relationship],
                ["Email", record.guardian.email],
                ["Mobile", record.guardian.mobile],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">{label}</dt>
                  <dd className="mt-2 text-sm text-bone/85">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Panel>

      <p className="text-[0.55rem] uppercase tracking-luxe text-bone/35">
        — Client-visible information —
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <Panel title="Journey" note={`Stage: ${record.stageKey.replace("_", " ")}`}>
          <ol className="flex flex-col">
            {record.journey.map((stage, index) => (
              <li
                key={stage.key}
                className="flex items-center justify-between gap-4 border-b border-bone/10 py-3 last:border-b-0"
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
                <StatusPill tone={stage.status === "current" ? "attention" : "dark"}>
                  {stage.status.replace("_", " ")}
                </StatusPill>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Measurements" note={`Taken ${formatDate(record.measurements[0]?.takenAt ?? record.joinedAt)}`}>
          <dl className="grid gap-5 sm:grid-cols-2">
            {record.measurements.map((measurement) => (
              <div key={measurement.label}>
                <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                  {measurement.label}
                </dt>
                <dd className="mt-2 font-display text-xl text-bone">{measurement.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="Appointments" note={`${record.appointments.length} total`}>
          <div className="flex flex-col">
            {record.appointments.map((appointment) => (
              <Row key={appointment.id}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{appointment.title}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {formatDate(appointment.startsAt)} · {formatTime(appointment.startsAt)}
                  </span>
                </span>
                <StatusPill tone="dark">{appointment.status}</StatusPill>
              </Row>
            ))}
          </div>
          {record.rescheduleHistory.length > 0 ? (
            <div className="mt-5 border-t border-bone/10 pt-5">
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">
                Reschedule history
              </p>
              {record.rescheduleHistory.map((event) => (
                <p key={event.id} className="mt-3 text-xs text-bone/50">
                  {formatDate(event.fromStartsAt)} → {formatDate(event.toStartsAt)} · by {event.by}{" "}
                  on {formatDate(event.at)}
                </p>
              ))}
            </div>
          ) : null}
        </Panel>

        <Panel title="Payments" note={`${formatCurrency(record.payments.paidCents)} of ${formatCurrency(record.payments.totalInvestmentCents)} paid`}>
          <div className="flex flex-col">
            {record.payments.milestones.map((milestone) => (
              <Row key={milestone.id}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{milestone.label}</span>
                  {milestone.gateNote ? (
                    <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                      {milestone.gateNote}
                    </span>
                  ) : null}
                </span>
                <span className="flex items-center gap-4">
                  <span className="font-display text-lg text-bone">
                    {formatCurrency(milestone.amountCents)}
                  </span>
                  <StatusPill tone={milestone.status === "paid" ? "dark" : "attention"}>
                    {milestone.status}
                  </StatusPill>
                </span>
              </Row>
            ))}
          </div>
        </Panel>

        <Panel title="Design & fabric">
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-bone/70">{record.designNotes}</p>
            {record.fabric ? (
              <dl className="grid gap-5 border-t border-bone/10 pt-5 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Material</dt>
                  <dd className="mt-2 text-sm text-bone/85">{record.fabric.name}</dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Sourcing</dt>
                  <dd className="mt-2 text-sm capitalize text-bone/85">
                    {record.fabric.sourcingLocation} · {record.fabric.sourcingStatus.replace("_", " ")}
                  </dd>
                </div>
              </dl>
            ) : null}
          </div>
        </Panel>

        <Panel title="Approvals">
          <div className="flex flex-col">
            {record.approvals.map((approval) => (
              <Row key={approval.id}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{approval.title}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {approval.kind.replace("_", " ")}
                    {approval.approvedAt ? ` · approved ${formatDate(approval.approvedAt)}` : ""}
                  </span>
                </span>
                <StatusPill tone={approval.status === "approved" ? "dark" : "attention"}>
                  {approval.status.replace("_", " ")}
                </StatusPill>
              </Row>
            ))}
          </div>
        </Panel>

        <Panel title="Inspiration & uploads" note={`${record.inspiration.length + record.uploads.length} files`}>
          <div className="grid grid-cols-3 gap-3">
            {[...record.inspiration, ...record.uploads].map((upload) => (
              <figure key={upload.id} className="flex flex-col gap-2">
                <MediaFrame
                  slot={{ id: upload.id, alt: upload.label, ratio: "portrait", tone: "dark" }}
                  bare
                  className="border border-bone/10"
                  sizes="120px"
                />
                <figcaption className="text-[0.5rem] uppercase tracking-wide2 text-bone/30">
                  {upload.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Panel>

        <Panel title="Contract & documents">
          <div className="flex flex-col">
            {contract ? (
              <Row href="/studio/contracts">
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">Prom Client Agreement</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    v{contract.templateVersion} · signed{" "}
                    {contract.signedAt ? formatDateTime(contract.signedAt) : "—"}
                  </span>
                </span>
                <StatusPill tone="dark">{contract.status}</StatusPill>
              </Row>
            ) : null}
            {record.documents.map((document) => (
              <Row key={document.id}>
                <span className="text-sm text-bone/85">{document.title}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {formatDate(document.issuedAt)}
                </span>
              </Row>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Activity history" note="Who did what, and when">
        <ul className="flex flex-col">
          {[...record.activity].reverse().map((event) => (
            <li
              key={event.id}
              className="flex flex-col gap-1.5 border-b border-bone/10 py-3.5 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-sm text-bone/85">{event.action}</span>
                <span className="text-[0.55rem] uppercase tracking-wide2 text-bone/30">
                  {formatDateTime(event.at)}
                </span>
              </div>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                {event.actor} · {event.actorRole}
                {event.detail ? ` · ${event.detail}` : ""}
                {event.previousValue ? ` · ${event.previousValue} → ${event.newValue}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
        — Owner-only private information —
      </p>

      <OwnerOnly>
        {record.ownerNotes.map((note) => (
          <p key={note.id}>
            <span className="mr-3 text-[0.55rem] uppercase tracking-wide2 text-bone/35">
              {formatDate(note.at)} · {note.author}
            </span>
            {note.body}
          </p>
        ))}
      </OwnerOnly>

      <StudioNotice>
        Phase 1 prototype — this client is fictional. Owner-only notes are excluded from the client
        portal at the data layer, and will additionally be enforced by server-side authorisation in
        production.
      </StudioNotice>
    </div>
  );
}
