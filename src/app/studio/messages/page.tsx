import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDateTime } from "@/lib/format";
import { getClientRecord } from "@/lib/services";

export const metadata: Metadata = { title: "Messages" };

export default function StudioMessagesPage() {
  const karlie = getClientRecord("cl-karlie-mcdowell")!;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Client messages" note="Threads across active clients">
        <div className="flex flex-col">
          {karlie.messages.map((thread) => (
            <Row key={thread.id} href={`/studio/clients/${karlie.id}`}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">
                  {karlie.firstName} {karlie.lastName} — {thread.subject}
                </span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {thread.messages.length} message{thread.messages.length === 1 ? "" : "s"} ·
                  updated {formatDateTime(thread.updatedAt)}
                </span>
              </span>
              {thread.unread ? <StatusPill tone="attention">Unread</StatusPill> : null}
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — messaging is mock data. Sending, notifications and escalations from Ask
        Kenya B. arrive with the backend.
      </StudioNotice>
    </div>
  );
}
