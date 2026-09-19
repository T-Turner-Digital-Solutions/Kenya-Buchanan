import type { Metadata } from "next";
import Link from "next/link";
import { Metric, Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatCurrency, formatDate, formatDateTime, formatTime } from "@/lib/format";
import {
  clientRoster,
  currentPromSeason,
  ownerReviewCases,
  studioActivity,
  studioMetrics,
} from "@/lib/services";

export const metadata: Metadata = { title: "Dashboard" };

export default function StudioDashboardPage() {
  const upcoming = clientRoster
    .filter((client) => client.nextAppointmentAt)
    .sort((a, b) => (a.nextAppointmentAt! < b.nextAppointmentAt! ? -1 : 1))
    .slice(0, 5);
  const pendingReviews = ownerReviewCases.filter((entry) => entry.decision === "pending");

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl text-bone">{currentPromSeason.name}</h2>
          <StatusPill tone="dark">Books open</StatusPill>
        </div>
        <div className="grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {studioMetrics.map((metric) => (
            <Metric key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {pendingReviews.length > 0 ? (
        <Panel
          title="Needs your decision"
          note="Nothing is accepted or declined automatically"
          action={
            <Link href="/studio/owner-review" className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
              Owner review →
            </Link>
          }
        >
          <div className="flex flex-col">
            {pendingReviews.map((entry) => (
              <Row key={entry.id} href="/studio/owner-review">
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-lg text-bone">{entry.clientName}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    Previous: {entry.previousExperience} · {entry.previousStatus}
                  </span>
                </span>
                <StatusPill tone="attention">Review required</StatusPill>
              </Row>
            ))}
          </div>
        </Panel>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <Panel
          title="This week"
          note="Next appointments"
          action={
            <Link href="/studio/calendar" className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
              Calendar →
            </Link>
          }
        >
          <div className="flex flex-col">
            {upcoming.map((client) => (
              <Row key={client.id} href={`/studio/clients/${client.id}`}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">
                    {client.firstName} {client.lastName}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {client.eventLabel}
                  </span>
                </span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/50">
                  {formatDate(client.nextAppointmentAt!)} · {formatTime(client.nextAppointmentAt!)}
                </span>
              </Row>
            ))}
          </div>
        </Panel>

        <Panel
          title="Outstanding balances"
          note="Across active clients"
          action={
            <Link href="/studio/payments" className="text-[0.6rem] uppercase tracking-wide2 text-champagne">
              Payments →
            </Link>
          }
        >
          <div className="flex flex-col">
            {clientRoster
              .filter((client) => client.balanceDueCents > 0)
              .sort((a, b) => b.balanceDueCents - a.balanceDueCents)
              .slice(0, 5)
              .map((client) => (
                <Row key={client.id} href={`/studio/clients/${client.id}`}>
                  <span className="text-sm text-bone/85">
                    {client.firstName} {client.lastName}
                  </span>
                  <span className="font-display text-lg text-champagne">
                    {formatCurrency(client.balanceDueCents)}
                  </span>
                </Row>
              ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent activity" note="Every important action is recorded">
        <ul className="flex flex-col">
          {studioActivity.map((event) => (
            <li key={event.id} className="flex flex-col gap-2 border-b border-bone/10 py-4 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-sm text-bone/85">{event.action}</span>
                <span className="text-[0.55rem] uppercase tracking-wide2 text-bone/30">
                  {formatDateTime(event.at)}
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/40">
                  {event.actor} · {event.actorRole}
                </span>
                {event.detail ? (
                  <span className="text-xs text-bone/45">{event.detail}</span>
                ) : null}
                {event.previousValue ? (
                  <span className="text-xs text-bone/35">
                    <span className={cx("line-through")}>{event.previousValue}</span> →{" "}
                    <span className="text-bone/60">{event.newValue}</span>
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — all metrics, clients and activity are fictional mock data. Controls
        change this screen only; nothing is persisted.
      </StudioNotice>
    </div>
  );
}
