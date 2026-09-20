import type { ActivityEvent, AvailabilitySlot, OwnerReviewCase, ProductionColumn } from "@/lib/types";

/** Kenya B. Studio dashboard metrics — mock aggregates. */
export interface StudioMetric {
  label: string;
  value: string;
  detail?: string;
  href?: string;
  emphasis?: boolean;
}

export const studioMetrics: StudioMetric[] = [
  { label: "Active Clients", value: "76", detail: "Prom 2027", href: "/studio/clients", emphasis: true },
  { label: "Initial Spaces Remaining", value: "4", detail: "of 80", href: "/studio/prom-seasons", emphasis: true },
  { label: "Waitlisted", value: "9", detail: "Prom 2027", href: "/studio/waitlist" },
  { label: "Appointments This Week", value: "12", detail: "3 fittings", href: "/studio/calendar" },
  { label: "Payments Due", value: "$14,250", detail: "Next 30 days", href: "/studio/payments" },
  { label: "Outstanding Balances", value: "$61,400", detail: "Across active clients", href: "/studio/payments" },
  { label: "Designs Awaiting Approval", value: "5", detail: "Client action pending", href: "/studio/approvals" },
  { label: "Fabric Approvals Pending", value: "3", detail: "Client action pending", href: "/studio/approvals" },
  { label: "Owner Reviews Pending", value: "2", detail: "Requires your decision", href: "/studio/owner-review", emphasis: true },
];

export const productionColumns: Array<{ key: ProductionColumn; label: string }> = [
  { key: "new", label: "New" },
  { key: "onboarding", label: "Onboarding" },
  { key: "measured", label: "Measured" },
  { key: "design", label: "Design" },
  { key: "sourcing", label: "Sourcing" },
  { key: "construction", label: "Construction" },
  { key: "fitting", label: "Fitting" },
  { key: "adjustments", label: "Adjustments" },
  { key: "final_fitting", label: "Final Fitting" },
  { key: "ready", label: "Ready" },
  { key: "complete", label: "Complete" },
];

export const ownerReviewCases: OwnerReviewCase[] = [
  {
    id: "or-1",
    clientId: "cl-11",
    clientName: "Jordyn Alston",
    requestedExperience: "prom",
    requestedAt: "2026-09-15T14:20:00.000Z",
    previousExperience: "Prom 2027",
    previousStatus: "Cancelled During Contract",
    ownerNotes: [
      { id: "orn-1", at: "2026-09-15T14:25:00.000Z", author: "System", body: "Owner-only: prior account cancelled during an active contract. Routed to review automatically — no acceptance or decline was made by the system." },
    ],
    contractId: "sc-jordyn-prom",
    decision: "pending",
  },
  {
    id: "or-2",
    clientId: "cl-12",
    clientName: "Elise Kwan",
    requestedExperience: "bridal",
    requestedAt: "2026-09-10T18:02:00.000Z",
    previousExperience: "Bridal 2026",
    previousStatus: "On Hold — Payment Schedule",
    ownerNotes: [
      { id: "orn-2", at: "2026-09-10T18:10:00.000Z", author: "Kenya", body: "Owner-only: account placed on hold pending a conversation about the payment schedule." },
    ],
    contractId: "sc-elise-bridal",
    decision: "hold",
  },
];

/** Mock availability offered in the client reschedule interface. */
export function mockAvailability(fromIso: string): AvailabilitySlot[] {
  const base = new Date(fromIso);
  const slots: AvailabilitySlot[] = [];
  const times = [15, 17, 19];

  for (let dayOffset = 3; dayOffset <= 17; dayOffset += 2) {
    times.forEach((hour, index) => {
      const date = new Date(base);
      date.setUTCDate(base.getUTCDate() + dayOffset);
      date.setUTCHours(hour, 0, 0, 0);
      slots.push({
        id: `slot-${dayOffset}-${hour}`,
        startsAt: date.toISOString(),
        durationMinutes: 60,
        // A realistic, partially-booked calendar.
        available: (dayOffset + index) % 4 !== 0,
      });
    });
  }

  return slots;
}

/** Studio-wide audit trail sample. */
export const studioActivity: ActivityEvent[] = [
  { id: "sa-1", at: "2026-09-18T16:31:00.000Z", actor: "System", actorRole: "system", action: "Waitlist opening filled", detail: "Prom 2027 · deposit received", previousValue: "75 of 80", newValue: "76 of 80", clientVisible: false },
  { id: "sa-2", at: "2026-09-18T16:02:00.000Z", actor: "System", actorRole: "system", action: "Waitlist offer expired", detail: "Waitlist #1 · 60-minute hold", clientVisible: false },
  { id: "sa-3", at: "2026-09-16T13:30:00.000Z", actor: "Kenya Buchanan", actorRole: "owner", action: "Fabric approval requested", detail: "Karlie McDowell", clientVisible: false },
  { id: "sa-4", at: "2026-09-15T14:20:00.000Z", actor: "System", actorRole: "system", action: "Account placed in owner review", detail: "Jordyn Alston", previousValue: "cancelled", newValue: "owner_review", clientVisible: false },
  { id: "sa-5", at: "2026-09-12T20:10:00.000Z", actor: "Karlie McDowell", actorRole: "client", action: "Appointment rescheduled", previousValue: "Oct 7, 2026 · 2:30 PM", newValue: "Oct 14, 2026 · 2:30 PM", clientVisible: true },
  { id: "sa-6", at: "2026-09-09T11:04:00.000Z", actor: "Kenya Buchanan", actorRole: "owner", action: "Signed contract resent", detail: "Amaya Ellison · v3.0", clientVisible: false },
  { id: "sa-7", at: "2026-09-04T09:48:00.000Z", actor: "Kenya Buchanan", actorRole: "owner", action: "Payment milestone overridden", detail: "Teagan Brooks", previousValue: "$2,000 due Sep 15", newValue: "$1,000 due Sep 15", clientVisible: false },
];
