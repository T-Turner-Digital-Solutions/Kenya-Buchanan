import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import { liveSessions } from "@/lib/services";

export const metadata: Metadata = { title: "Sessions" };

export default function StudioSessionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Kenya B. Live"
        note="Scheduled and past sessions"
        action={<Button variant="light" size="sm">Schedule Session</Button>}
      >
        <div className="flex flex-col">
          {liveSessions.map((session) => (
            <Row key={session.id}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{session.title}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {formatWeekday(session.startsAt)} · {formatDate(session.startsAt)} ·{" "}
                  {formatTime(session.startsAt)} · {session.platform}
                </span>
              </span>
              <StatusPill tone={session.state === "upcoming" ? "attention" : "dark"}>
                {session.state}
              </StatusPill>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — session scheduling, live status and Facebook Live embeds are mock
        content wired in a later phase.
      </StudioNotice>
    </div>
  );
}
