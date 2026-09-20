import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import type { PortalClient } from "@/data/clients";

/** Right-hand capability list. */
const capabilities = [
  { label: "Journey Tracking", icon: "M12 2v20M2 12h20M5 5l14 14M19 5 5 19" },
  { label: "Appointments", icon: "M4 6h16v14H4zM4 10h16M8 3v4m8-4v4" },
  { label: "Payments", icon: "M3 7h18v10H3zM3 11h18M6 15h3" },
  { label: "Design Approvals", icon: "M5 12l4.5 4.5L19 7" },
  { label: "Messages", icon: "M4 5h16v11H9l-5 4z" },
  { label: "Upload Files", icon: "M12 16V6m-4 4 4-4 4 4M5 18h14" },
  { label: "Ask Kenya B.", icon: "M12 19a7 7 0 1 0-7-7c0 1.4.4 2.7 1.1 3.8L5 19l3.2-1.1A7 7 0 0 0 12 19z" },
];

/** Tab bar glyphs. */
const tabs = [
  { label: "Home", icon: "M4 11l8-7 8 7v9H4z" },
  { label: "Journey", icon: "M5 19V5m14 14V5M5 12h14" },
  { label: "Appointments", icon: "M4 6h16v14H4zM8 3v4m8-4v4" },
  { label: "Messages", icon: "M4 5h16v11H9l-5 4z" },
  { label: "More", icon: "M6 12h.01M12 12h.01M18 12h.01" },
];

/**
 * Homepage preview of My Kenya B.
 *
 * The device renders the client's own journey, appointment, approval and
 * balance data — the product, shown rather than described. A bridal frame
 * dissolves into the surface on the right so the section reads as a campaign
 * rather than a feature list.
 */
export function PortalPreview({ client }: { client: PortalClient }) {
  const stages = client.journey;
  const complete = stages.filter((stage) => stage.status === "complete").length;
  const percent = Math.round((complete / stages.length) * 100);
  const current = stages.find((stage) => stage.status === "current");
  const appointment = client.appointments.find((entry) => entry.status === "scheduled");
  const balance = client.payments.totalInvestmentCents - client.payments.paidCents;

  const avatar = resolveMedia("photo/detail-beaded-bodice-roses");
  const backdrop = resolveMedia("photo/bridal-silver-lace-veil");

  // Circumference of the progress ring (r = 15.5).
  const ring = 2 * Math.PI * 15.5;

  return (
    <div className="relative isolate">
      {/* Faded bridal frame dissolving into the surface */}
      {backdrop ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 top-1/2 hidden h-[128%] w-[27%] -translate-y-1/2 sm:-right-8 lg:-right-12 lg:block xl:-right-20"
        >
          <div className="fade-into-panel relative h-full w-full opacity-35">
            <Image
              src={backdrop}
              alt=""
              fill
              loading="lazy"
              sizes="34vw"
              className="object-cover object-[60%_20%] saturate-[0.35]"
            />
          </div>
        </div>
      ) : null}

      <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
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
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Appointments, approvals, payments, messages and more — all in your personal Kenya B.
            portal.
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
        <div className="mx-auto w-full max-w-[17.5rem]">
          <div className="relative rounded-[2.6rem] bg-ink p-[3px] shadow-[0_50px_90px_-40px_rgba(10,10,11,0.55)]">
            <div className="relative overflow-hidden rounded-[2.45rem] border-[6px] border-ink bg-[#0D0D0F]">
              {/* Status bar + dynamic island */}
              <div className="relative flex items-center justify-between px-6 pb-2 pt-3">
                <span className="text-[0.55rem] font-medium text-bone">5:41</span>
                <span
                  aria-hidden
                  className="absolute left-1/2 top-2 h-5 w-[5.2rem] -translate-x-1/2 rounded-full bg-ink"
                />
                <span aria-hidden className="flex items-center gap-1 text-bone">
                  <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="currentColor">
                    <rect x="0" y="8" width="3" height="4" rx="0.5" />
                    <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
                    <rect x="9" y="3.5" width="3" height="8.5" rx="0.5" />
                    <rect x="13.5" y="1" width="3" height="11" rx="0.5" />
                  </svg>
                  <svg viewBox="0 0 16 12" className="h-2.5 w-3" fill="currentColor">
                    <path d="M8 10.5 5.8 8.3a3.1 3.1 0 0 1 4.4 0zM8 6.2a5.9 5.9 0 0 0-4.2 1.7L2.4 6.5a7.9 7.9 0 0 1 11.2 0l-1.4 1.4A5.9 5.9 0 0 0 8 6.2z" />
                  </svg>
                  <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="3" opacity="0.5" />
                    <rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor" stroke="none" />
                    <path d="M23.5 4.2v3.6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </div>

              <div className="flex flex-col gap-3.5 px-4 pb-4 pt-3">
                {/* App header */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base leading-none text-champagne">KB</span>
                    <span className="flex flex-col leading-none">
                      <span className="font-display text-[0.62rem] tracking-[0.18em] text-bone">
                        KENYA BUCHANAN
                      </span>
                      <span className="mt-0.5 text-[0.33rem] uppercase tracking-luxe text-champagne/70">
                        It&rsquo;s More Than a Gown.
                      </span>
                    </span>
                  </span>
                  <span aria-hidden className="flex flex-col gap-[3px]">
                    <span className="h-px w-3.5 bg-bone/70" />
                    <span className="h-px w-3.5 bg-bone/70" />
                    <span className="h-px w-3.5 bg-bone/70" />
                  </span>
                </div>

                {/* Greeting */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-champagne/40">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="48px"
                        className="object-cover object-[50%_20%]"
                      />
                    ) : null}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-base leading-tight text-bone">
                      Hello, {client.firstName}
                    </span>
                    <span className="text-[0.55rem] text-bone/45">{client.eventLabel}</span>
                  </span>
                </div>

                {/* Journey ring */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="relative h-[4.6rem] w-[4.6rem] shrink-0">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(247,244,239,0.12)" strokeWidth="2.2" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#C1A16B"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeDasharray={`${(percent / 100) * ring} ${ring}`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-bone">
                      {percent}%
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.62rem] text-bone/85">Your Journey</p>
                    <p className="mt-1 text-[0.58rem] leading-snug text-champagne/80">
                      {current?.title}
                    </p>
                  </div>
                </div>

                {/* Next appointment */}
                {appointment ? (
                  <div className="flex items-center justify-between gap-3 border-t border-bone/10 pt-3">
                    <div className="min-w-0">
                      <p className="text-[0.55rem] text-bone/45">Next Appointment</p>
                      <p className="mt-1 font-display text-[0.92rem] leading-tight text-bone">
                        {formatDate(appointment.startsAt)}
                      </p>
                      <p className="text-[0.58rem] text-bone/60">
                        {formatTime(appointment.startsAt)}
                      </p>
                    </div>
                    <span className="shrink-0 text-[0.52rem] text-bone/50">View Details &rsaquo;</span>
                  </div>
                ) : null}

                {/* Balance */}
                <div className="flex items-end justify-between gap-3 border-t border-bone/10 pt-3">
                  <div>
                    <p className="text-[0.55rem] text-bone/45">Balance</p>
                    <p className="mt-1 font-display text-xl leading-none text-bone">
                      {formatCurrency(balance)}
                    </p>
                  </div>
                  <span className="border border-champagne/50 bg-champagne/15 px-3 py-2 text-[0.5rem] uppercase tracking-wide2 text-champagne">
                    Make a Payment
                  </span>
                </div>

                {/* Tab bar */}
                <div className="mt-1 flex items-start justify-between border-t border-bone/10 pt-3">
                  {tabs.map((tab, position) => (
                    <span
                      key={tab.label}
                      className={
                        position === 0
                          ? "flex flex-col items-center gap-1 text-champagne"
                          : "flex flex-col items-center gap-1 text-bone/35"
                      }
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d={tab.icon} />
                      </svg>
                      <span className="text-[0.4rem] tracking-wide">{tab.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities + signature */}
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {capabilities.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/65"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    className="h-4 w-4"
                  >
                    <path d={item.icon} />
                  </svg>
                </span>
                <span className="text-sm text-ink/80">{item.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-2 font-script text-3xl leading-tight text-champagne-deep/80 sm:text-4xl">
            More
            <br />
            Than a Gown <span aria-hidden>♥</span>
          </p>
        </div>
      </div>
    </div>
  );
}
