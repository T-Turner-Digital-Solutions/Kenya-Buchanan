import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatCurrency, formatDate } from "@/lib/format";
import { clientRoster } from "@/lib/services";
import type { AccountStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Clients" };

const statusTone: Record<AccountStatus, "positive" | "attention" | "muted" | "dark"> = {
  active: "dark",
  completed: "muted",
  cancelled: "muted",
  on_hold: "attention",
  owner_review: "attention",
  declined: "muted",
  archived: "muted",
};

export default function StudioClientsPage() {
  const grouped = ["active", "owner_review", "on_hold", "completed"] as AccountStatus[];

  return (
    <div className="flex flex-col gap-8">
      {grouped.map((status) => {
        const clients = clientRoster.filter((client) => client.accountStatus === status);
        if (clients.length === 0) return null;

        return (
          <Panel
            key={status}
            title={status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            note={`${clients.length} ${clients.length === 1 ? "client" : "clients"}`}
          >
            <div className="flex flex-col">
              {clients.map((client) => (
                <Row key={client.id} href={`/studio/clients/${client.id}`}>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-display text-lg text-bone">
                      {client.firstName} {client.lastName}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                      {client.eventLabel} · {client.city}, {client.state}
                      {client.eventDate ? ` · ${formatDate(client.eventDate)}` : ""}
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center gap-4">
                    <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/45">
                      {client.productionColumn.replace("_", " ")}
                    </span>
                    {client.balanceDueCents > 0 ? (
                      <span className="font-display text-lg text-champagne">
                        {formatCurrency(client.balanceDueCents)}
                      </span>
                    ) : null}
                    <StatusPill tone={statusTone[client.accountStatus]}>
                      {client.accountStatus.replace("_", " ")}
                    </StatusPill>
                  </span>
                </Row>
              ))}
            </div>
          </Panel>
        );
      })}

      <StudioNotice>
        Phase 1 prototype — all clients are fictional. Only Karlie McDowell has a full record in
        this build; the rest demonstrate roster, board and calendar behaviour.
      </StudioNotice>
    </div>
  );
}
