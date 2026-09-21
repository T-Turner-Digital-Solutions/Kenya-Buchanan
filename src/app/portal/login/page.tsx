import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { brand } from "@/config/site";

export const metadata: Metadata = {
  title: "My Kenya B.",
  description: "Sign in to your Kenya B. client account.",
};

/**
 * Phase 1 sign-in.
 *
 * There is NO authentication here. The two links below open demonstration
 * accounts directly. Production will use server-side sessions, role-based
 * authorisation and an activation link the client uses to set their own
 * password — a password is never generated or displayed by the platform.
 */
export default function PortalLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-ink lg:block">
        <Image
          src="/media/editorial/prom-silver-pearl-cape.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="font-display text-3xl italic leading-snug text-bone">{brand.motto}</p>
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
            <p className="eyebrow">{brand.clientPortal}</p>
            <h1 className="font-display text-4xl leading-tight">Welcome back.</h1>
          </div>

          <form className="flex flex-col gap-6">
            <TextField id="login-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <TextField id="login-password" label="Password" type="password" autoComplete="current-password" placeholder="••••••••" />
            <Button href="/portal" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-8">
            <p className="eyebrow">Phase 1 demonstration accounts</p>
            <Link
              href="/portal/welcome"
              className="group flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm">Karlie McDowell</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  Prom 2027 · first login
                </span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep opacity-0 transition-opacity group-hover:opacity-100">
                Open
              </span>
            </Link>
            <Link
              href="/portal"
              className="group flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm">Karlie McDowell</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  Prom 2027 · returning client
                </span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep opacity-0 transition-opacity group-hover:opacity-100">
                Open
              </span>
            </Link>
            <Link
              href="/portal/account-review"
              className="group flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm">Jordyn Alston</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  Account under owner review
                </span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep opacity-0 transition-opacity group-hover:opacity-100">
                Open
              </span>
            </Link>
          </div>

          <MockNotice>
            No authentication is implemented in Phase 1. The sign-in form is inert — use the
            demonstration accounts above.
          </MockNotice>

          <Link href="/" className="text-[0.6rem] uppercase tracking-wide2 text-ink/40 hover:text-ink">
            Back to kenyabuchanan.com
          </Link>
        </div>
      </main>
    </div>
  );
}
