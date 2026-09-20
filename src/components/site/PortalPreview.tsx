import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import type { PortalClient } from "@/data/clients";

const capabilities = [
  { label: "Journey Tracking", icon: "M12 3v18M5 10l7-7 7 7" },
  { label: "Appointments", icon: "M4 6h16M4 6v14h16V6M8 3v5m8-5v5" },
  { label: "Payments", icon: "M3 7h18v10H3zM3 11h18" },
  { label: "Design Approvals", icon: "M4 12l5 5L20 6" },
  { label: "Messages", icon: "M4 5h16v11H9l-5 4z" },
  { label: "Upload Files", icon: "M12 17V5m-5 5 5-5 5 5M5 19h14" },
  { label: "Ask Kenya B.", icon: "M12 19a7 7 0 1 0-7-7c0 1.4.4 2.7 1.1 3.8L5 19l3.2-1.1A7 7 0 0 0 12 19z" },
];

/**
 * Homepage preview of My Kenya B.
 *
 * A real rendering of the client's own dashboard data inside a device frame —
 * the point is to show that there is a product behind the service, not to
 * describe one in four boxes.
 */
export function PortalPreview({ client }: { client: PortalClient }) {
  const stages = client.journey;
  const complete = stages.filter((stage) => stage.status === "complete").length;
  const percent = Math.round((complete / stages.length) * 100);
  const current = stages.find((stage) => stage.status === "current");
  const appointment = client.appointments.find((entry) => entry.status === "scheduled");
  const pending = client.approvals.find((entry) => entry.status === "pending");
  const balance = client.payments.totalInvestmentCents - client.payments.paidCents;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_0.85fr] lg:gap-10">
      {/* Copy */}
      <div className="flex flex-col gap-6">
        <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">My Kenya B.</p>
        <h2 className="display-caps text-4xl text-ink sm:text-5xl">
          Your dress.
          <br />
          Your journey.
          <br />
          One place.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-ink/60">
          Appointments, approvals, payments, messages and every stage of your gown — all in your
          personal Kenya B. account.
        </p>
        <Link
          href="/portal/login"
          className="group inline-flex w-fit items-center gap-3 bg-ink px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-bone transition-all duration-500 ease-silk hover:bg-champagne hover:text-ink"
        >
          Enter My Kenya B.
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Device */}
      <div className="mx-auto w-full max-w-[19rem]">
        <div className="relative rounded-[2.4rem] border border-ink/15 bg-ink p-2.5 shadow-[0_40px_80px_-40px_rgba(10,10,11,0.6)]">
          <div className="relative overflow-hidden rounded-[1.9rem] bg-charcoal">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.5rem] uppercase tracking-wide2 text-bone/40">
              <span>9:41</span>
              <span className="h-4 w-20 rounded-full bg-ink/80" aria-hidden />
              <span>􀛨</span>
            </div>

            <div className="flex flex-col gap-4 px-5 pb-6 pt-2">
              <div className="flex items-center justify-between">
                <BrandMark variant="dark" className="h-7" />
                <span aria-hidden className="flex flex-col gap-[3px]">
                  <span className="h-px w-4 bg-bone/50" />
                  <span className="h-px w-4 bg-bone/50" />
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="font-display text-lg text-bone">Hello, {client.firstName}.</p>
                <p className="text-[0.5rem] uppercase tracking-luxe text-champagne">
                  {client.eventLabel}
                </p>
              </div>

              {/* Journey ring */}
              <div className="flex items-center gap-4 border border-bone/10 bg-bone/[0.04] p-3.5">
                <div className="relative h-14 w-14 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(247,244,239,0.14)" strokeWidth="2.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#C1A16B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={`${(percent / 100) * 97.4} 97.4`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-sm text-bone">
                    {percent}%
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[0.5rem] uppercase tracking-luxe text-bone/40">Your journey</p>
                  <p className="mt-1 truncate text-xs text-bone">{current?.title}</p>
                </div>
              </div>

              {/* Next appointment */}
              {appointment ? (
                <div className="flex items-center justify-between gap-3 border border-bone/10 bg-bone/[0.04] p-3.5">
                  <div className="min-w-0">
                    <p className="text-[0.5rem] uppercase tracking-luxe text-bone/40">
                      Next appointment
                    </p>
                    <p className="mt-1 truncate font-display text-sm text-bone">
                      {formatDate(appointment.startsAt, { month: "long", day: "numeric", year: undefined })}
                    </p>
                    <p className="text-[0.55rem] text-bone/50">{formatTime(appointment.startsAt)}</p>
                  </div>
                  <span className="shrink-0 text-[0.5rem] uppercase tracking-wide2 text-champagne">
                    Details →
                  </span>
                </div>
              ) : null}

              {/* Next action */}
              {pending ? (
                <div className="border-l-2 border-champagne bg-champagne/10 px-3.5 py-3">
                  <p className="text-[0.5rem] uppercase tracking-luxe text-champagne">Next action</p>
                  <p className="mt-1 text-xs leading-snug text-bone/85">Fabric approval requested</p>
                </div>
              ) : null}

              {/* Balance */}
              <div className="flex items-end justify-between gap-3 border border-bone/10 bg-bone/[0.04] p-3.5">
                <div>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-bone/40">Balance</p>
                  <p className="mt-1 font-display text-xl text-bone">{formatCurrency(balance)}</p>
                </div>
                <span className="bg-champagne px-3 py-1.5 text-[0.5rem] uppercase tracking-wide2 text-ink">
                  Make a Payment
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <span className="border border-bone/20 px-3 py-2 text-center text-[0.5rem] uppercase tracking-wide2 text-bone">
                  View Journey
                </span>
                <span className="border border-bone/20 px-3 py-2 text-center text-[0.5rem] uppercase tracking-wide2 text-bone">
                  Reschedule
                </span>
              </div>

              {/* Tab bar */}
              <div className="mt-1 flex items-center justify-between border-t border-bone/10 pt-3 text-[0.45rem] uppercase tracking-wide2 text-bone/35">
                {["Home", "Journey", "Appts", "Messages", "More"].map((tab, position) => (
                  <span key={tab} className={position === 0 ? "text-champagne" : undefined}>
                    {tab}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capability list */}
      <ul className="flex flex-col gap-3.5">
        {capabilities.map((item) => (
          <li key={item.label} className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-4 w-4">
                <path d={item.icon} />
              </svg>
            </span>
            <span className="text-sm text-ink/75">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
