import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { brand } from "@/config/site";

export const metadata: Metadata = {
  title: "Kenya B. Studio",
  description: "Owner and staff sign-in for Kenya B. Studio.",
  robots: { index: false, follow: false },
};

/**
 * OWNER / STAFF SIGN-IN.
 *
 * There is NO authentication here. The link below opens the studio directly so
 * the interface can be reviewed.
 *
 * Production requirements for this door, which are different from the client
 * one and stricter:
 *  - server-side sessions and role-based authorisation on every studio route,
 *    not only on this page;
 *  - second factor required for OWNER and MANAGER;
 *  - roles OWNER, MANAGER, ASSISTANT, STAFF, each seeing only what its role
 *    allows — owner notes and financials are not ASSISTANT or STAFF business;
 *  - every action written to the activity history against the person who took
 *    it, because "who moved this client's stage" has to be answerable;
 *  - no password is ever generated or shown by the platform: staff are invited
 *    and set their own.
 */
const roles = [
  ["Owner", "Kenya. Everything, including financials, owner notes and staff accounts."],
  ["Manager", "Clients, journeys, appointments, approvals and messages. No staff accounts."],
  ["Assistant", "Day-to-day client work. No financials and no owner notes."],
  ["Staff", "Only what they are assigned."],
];

export default function StudioLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-ink lg:block">
        <Image
          src="/media/editorial/kenya-studio-sewing.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="font-display text-3xl italic leading-snug text-bone">
            The studio side of {brand.motto.toLowerCase()}
          </p>
        </div>
      </div>

      <main id="main" className="flex items-center justify-center px-5 py-16 sm:px-10">
        <div className="flex w-full max-w-sm flex-col gap-10">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark variant="light" lockup className="h-20 shrink-0" />
            <span className="font-display text-base leading-tight tracking-[0.18em]">
              KENYA
              <br />
              BUCHANAN
            </span>
          </Link>

          <div className="flex flex-col gap-2">
            <p className="eyebrow">Kenya B. Studio</p>
            <h1 className="font-display text-4xl leading-tight">Staff sign-in.</h1>
            <p className="text-sm leading-relaxed text-ink/60">
              This is the owner side — client records, journeys, photographs and payments. It is
              not the client sign-in.
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <TextField
              id="studio-email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="kenya@example.com"
            />
            <TextField
              id="studio-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
            <Button href="/studio" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-8">
            <p className="eyebrow">Roles</p>
            <dl className="flex flex-col gap-3">
              {roles.map(([role, scope]) => (
                <div key={role} className="flex flex-col gap-1 border-b border-ink/10 pb-3">
                  <dt className="text-sm">{role}</dt>
                  <dd className="text-[0.7rem] leading-relaxed text-ink/50">{scope}</dd>
                </div>
              ))}
            </dl>
          </div>

          <MockNotice>
            No authentication is implemented in Phase 1 — the form is inert and the studio is open.
            Production locks every studio route behind a server-side session, requires a second
            factor for Owner and Manager, and records every action against the person who took it.
          </MockNotice>

          <div className="flex flex-col gap-2">
            <Link
              href="/portal/login"
              className="text-[0.6rem] uppercase tracking-wide2 text-ink/40 hover:text-ink"
            >
              Client sign-in instead
            </Link>
            <Link href="/" className="text-[0.6rem] uppercase tracking-wide2 text-ink/40 hover:text-ink">
              Back to the website
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
