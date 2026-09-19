import type { Metadata } from "next";
import { Metric, Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatCurrency, formatDate } from "@/lib/format";
import { clientRoster, getClientRecord } from "@/lib/services";

export const metadata: Metadata = { title: "Payments" };

export default function StudioPaymentsPage() {
  const outstanding = clientRoster
    .filter((client) => client.balanceDueCents > 0)
    .sort((a, b) => b.balanceDueCents - a.balanceDueCents);
  const total = outstanding.reduce((sum, client) => sum + client.balanceDueCents, 0);
  const karlie = getClientRecord("cl-karlie-mcdowell");

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-px bg-bone/10 sm:grid-cols-3">
        <Metric label="Outstanding balances" value={formatCurrency(total)} detail="Across active clients" emphasis />
        <Metric label="Clients with a balance" value={String(outstanding.length)} />
        <Metric label="Due next 30 days" value="$14,250" detail="Mock aggregate" />
      </div>

      <Panel title="Outstanding balances" note="Highest first">
        <div className="flex flex-col">
          {outstanding.map((client) => (
            <Row key={client.id} href={`/studio/clients/${client.id}`}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">
                  {client.firstName} {client.lastName}
                </span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {client.eventLabel} · {client.productionColumn.replace("_", " ")}
                </span>
              </span>
              <span className="font-display text-xl text-champagne">
                {formatCurrency(client.balanceDueCents)}
              </span>
            </Row>
          ))}
        </div>
      </Panel>

      {karlie ? (
        <Panel
          title={`${karlie.firstName} ${karlie.lastName} — milestones`}
          note="Milestone amounts and production gates are configurable per client"
        >
          <div className="flex flex-col">
            {karlie.payments.milestones.map((milestone) => (
              <Row key={milestone.id}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{milestone.label}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {milestone.gateNote ?? "No production gate"}
                    {milestone.dueOn ? ` · due ${formatDate(milestone.dueOn)}` : ""}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="font-display text-lg text-bone">
                    {formatCurrency(milestone.amountCents)}
                  </span>
                  <StatusPill tone={milestone.status === "paid" ? "dark" : "attention"}>
                    {milestone.status}
                  </StatusPill>
                  <button
                    type="button"
                    className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone"
                  >
                    Override
                  </button>
                </span>
              </Row>
            ))}
          </div>
        </Panel>
      ) : null}

      <StudioNotice>
        Phase 1 prototype — no payment processing, refunds or payouts are implemented. Milestone
        overrides are recorded to the audit trail in production.
      </StudioNotice>
    </div>
  );
}
