import type { Metadata } from "next";
import { AppointmentCard } from "@/components/portal/AppointmentCard";
import { MockNotice } from "@/components/ui/MockNotice";
import { formatDate, formatTime } from "@/lib/format";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "Appointments" };

export default function PortalAppointmentsPage() {
  const client = getDemoPortalClient();
  const upcoming = client.appointments.filter((appointment) => appointment.status === "scheduled");
  const past = client.appointments.filter((appointment) => appointment.status === "completed");

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl">Upcoming</h2>
          <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
            {upcoming.length} scheduled
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {upcoming.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </section>

      {past.length > 0 ? (
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl">Completed</h2>
          <div className="flex flex-col gap-6">
            {past.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </section>
      ) : null}

      {client.rescheduleHistory.length > 0 ? (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-2xl">Reschedule history</h2>
          <ul className="flex flex-col">
            {client.rescheduleHistory.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-1 border-b border-ink/10 py-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="text-sm text-ink/70">
                  Moved from {formatDate(event.fromStartsAt)} at {formatTime(event.fromStartsAt)} to{" "}
                  {formatDate(event.toStartsAt)} at {formatTime(event.toStartsAt)}
                </span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  By {event.by} · {formatDate(event.at)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <MockNotice>
        Phase 1 prototype — rescheduling shows the interface and confirmation state only. Kenya
        controlled availability, cutoffs, limits, fees, notifications and admin override are
        enforced server-side in a later phase.
      </MockNotice>
    </div>
  );
}
