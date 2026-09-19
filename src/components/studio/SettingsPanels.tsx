"use client";

import { useState } from "react";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { Toggle } from "@/components/ui/Toggle";

/**
 * SETTINGS.
 *
 * Staff roles and the configuration surfaces Kenya will own. Roles are
 * OWNER / MANAGER / ASSISTANT / STAFF / CLIENT; the owner controls staff
 * permissions. Phase 2 enforces all of this server-side.
 */
const staff = [
  ["Kenya Buchanan", "Owner", "Full access"],
  ["Studio Manager", "Manager", "Clients, calendar, production, payments"],
  ["Studio Assistant", "Assistant", "Clients, calendar, production"],
  ["Seamstress", "Staff", "Production board only"],
];

const configurable = [
  "Experiences",
  "Services",
  "Appointment types",
  "Availability",
  "Prom seasons",
  "Capacity",
  "Waitlists",
  "Journey stages",
  "Videos",
  "Instructions",
  "Sessions",
  "FAQs",
  "Partner categories",
  "Approvals",
  "Payment milestones",
  "Website announcements",
];

export function SettingsPanels() {
  const [flags, setFlags] = useState({
    rescheduling: true,
    assistant: true,
    interest: true,
    waitlist: true,
    notifications: false,
  });

  const set = (key: keyof typeof flags, value: boolean) =>
    setFlags((current) => ({ ...current, [key]: value }));

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Staff & permissions" note="The owner controls what staff can see and do" action={<Button variant="light" size="sm">Invite Staff</Button>}>
        <div className="flex flex-col">
          {staff.map(([name, role, access]) => (
            <Row key={name}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{name}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">{access}</span>
              </span>
              <StatusPill tone={role === "Owner" ? "attention" : "dark"}>{role}</StatusPill>
            </Row>
          ))}
        </div>
      </Panel>

      <Panel title="Platform settings">
        <div className="[&_span.text-ink]:text-bone [&_span.text-ink\\/50]:text-bone/45 [&_button]:border-bone/30">
          <Toggle
            label="Client rescheduling"
            description="Let clients move their own appointments inside My Kenya B."
            checked={flags.rescheduling}
            onChange={(value) => set("rescheduling", value)}
          />
          <Toggle
            label="Ask Kenya B. assistant"
            description="Client guidance from Kenya-approved content only"
            checked={flags.assistant}
            onChange={(value) => set("assistant", value)}
          />
          <Toggle
            label="Interest lists"
            description="Collect names before a season's books open"
            checked={flags.interest}
            onChange={(value) => set("interest", value)}
          />
          <Toggle
            label="Waitlists"
            description="Accept waitlist entries once initial capacity is reached"
            checked={flags.waitlist}
            onChange={(value) => set("waitlist", value)}
          />
          <Toggle
            label="Email & SMS notifications"
            description="Not available until the notification service is connected"
            checked={flags.notifications}
            onChange={(value) => set("notifications", value)}
            disabled
          />
        </div>
      </Panel>

      <Panel title="Owner-configurable" note="Editable without developer assistance in Phase 2">
        <div className="flex flex-wrap gap-2">
          {configurable.map((item) => (
            <span
              key={item}
              className="border border-bone/15 px-4 py-2 text-[0.6rem] uppercase tracking-wide2 text-bone/55"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-bone/55">
          Where historical records exist, items are hidden or archived rather than deleted — a
          past season, a retired appointment type or a former partner stays attached to the clients
          who used it.
        </p>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — no authentication, roles or permissions are enforced. Role-based access
        must be enforced server-side before any real client data exists.
      </StudioNotice>
    </div>
  );
}
