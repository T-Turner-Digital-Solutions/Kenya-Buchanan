import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import { clientRoster } from "@/lib/services";

export const metadata: Metadata = { title: "Calendar" };

export default function StudioCalendarPage() {
  const scheduled = clientRoster
    .filter((client) => client.nextAppointmentAt)
    .sort((a, b) => (a.nextAppointmentAt! < b.nextAppointmentAt! ? -1 : 1));

  const byDay = scheduled.reduce<Record<string, typeof scheduled>>((acc, client) => {
    const day = client.nextAppointmentAt!.slice(0, 10);
    acc[day] = acc[day] ? [...acc[day], client] : [client];
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Upcoming appointments"
        note={`${scheduled.length} scheduled`}
        action={<Button variant="light" size="sm">Edit Availability</Button>}
      >
        <div className="flex flex-col gap-8">
          {Object.entries(byDay).map(([day, clients]) => (
            <div key={day} className="flex flex-col gap-2">
              <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
                {formatWeekday(`${day}T12:00:00.000Z`)} · {formatDate(`${day}T12:00:00.000Z`)}
              </p>
              {clients.map((client) => (
                <Row key={client.id} href={`/studio/clients/${client.id}`}>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-sm text-bone/85">
                      {client.firstName} {client.lastName}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                      {client.eventLabel} · {client.productionColumn.replace("_", " ")}
                    </span>
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/50">
                    {formatTime(client.nextAppointmentAt!)}
                  </span>
                </Row>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — a month/week calendar, Kenya-controlled availability windows,
        rescheduling cutoffs and admin override are built on top of this data in a later phase.
      </StudioNotice>
    </div>
  );
}
