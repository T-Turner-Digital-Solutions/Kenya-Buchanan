import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { brand } from "@/config/site";

export const metadata: Metadata = { title: "Account Review" };

/**
 * OWNER REVIEW — client-facing state.
 *
 * A returning client whose previous account was cancelled during an active
 * contract is never auto-accepted or auto-rejected. Their request goes to
 * Kenya. This screen shows exactly what the client sees: status and next steps,
 * and nothing about why.
 *
 * Internal reasons and owner notes live only in Kenya B. Studio.
 */
export default function AccountReviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <p className="bg-ink px-5 py-2 text-center text-[0.55rem] uppercase tracking-luxe text-champagne-light">
        Phase 1 prototype · demonstration account with fictional data
      </p>

      <main id="main" className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <div className="flex w-full max-w-xl flex-col gap-9">
          <Image
            src="/media/brand/kenya-b-mark.png"
            alt=""
            width={157}
            height={285}
            className="h-14 w-auto"
          />

          <div className="flex flex-col gap-5">
            <StatusPill tone="attention">Account on hold</StatusPill>
            <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl">
              Your account is under review.
            </h1>
            <p className="text-sm leading-relaxed text-ink/70">
              Your Kenya B. account is currently on hold for owner review. Your request has been
              received. Booking and payment options will become available after your account has
              been reviewed. You will be notified once a decision has been made.
            </p>
          </div>

          <dl className="flex flex-col gap-4 border-y border-ink/10 py-7">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="eyebrow">Account</dt>
              <dd className="text-sm">Jordyn Alston</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="eyebrow">Requested</dt>
              <dd className="text-sm">Prom 2028</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="eyebrow">Status</dt>
              <dd className="text-sm">Owner review</dd>
            </div>
          </dl>

          <p className="text-sm leading-relaxed text-ink/55">
            You can still reach the studio with questions. Booking, scheduling and payment stay
            closed until your review is complete.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portal/login"
              className="border border-ink/20 px-6 py-3 text-[0.62rem] uppercase tracking-wide2 transition-colors hover:border-ink"
            >
              Back to sign in
            </Link>
            <Link
              href="/"
              className="border border-ink/20 px-6 py-3 text-[0.62rem] uppercase tracking-wide2 transition-colors hover:border-ink"
            >
              {brand.name}
            </Link>
          </div>

          <MockNotice>
            Phase 1 prototype — this demonstrates the client-facing hold state. Internal review
            reasons and owner notes are never shown here; they live only in {brand.ownerPortal}.
          </MockNotice>
        </div>
      </main>
    </div>
  );
}
