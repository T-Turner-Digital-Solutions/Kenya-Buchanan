import type { Metadata } from "next";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { brand } from "@/config/site";
import { getDemoPortalClient, getVideo } from "@/lib/services";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Welcome to Kenya B.",
};

/**
 * FIRST-LOGIN EXPERIENCE.
 *
 * Shown once, before the dashboard. The video is the point: Kenya welcomes the
 * client personally and sets expectations for the whole experience.
 */
export default function WelcomePage() {
  const client = getDemoPortalClient();
  const welcome = getVideo("vid-welcome")!;

  const covered = [
    "The Kenya B. experience",
    "What to expect",
    "Trusting the process",
    "How we communicate",
    "Appointments",
    "Inspiration",
    "Measurements",
    "Design",
    "Fabric sourcing",
    "Fittings",
    "When to request changes",
    "Final gown release",
  ];

  return (
    <div className="min-h-screen bg-ink text-bone">
      <main id="main" className="mx-auto flex max-w-5xl flex-col gap-14 px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <BrandMark variant="dark" lockup className="h-24" />
          <div className="flex flex-col gap-4">
            <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
              {client.eventLabel} · Your account is active
            </p>
            <h1 className="font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl lg:text-6xl">
              Welcome to Kenya B., {client.firstName}.
            </h1>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-bone/60">
              Before anything else, Kenya has a message for you.
            </p>
          </div>
        </div>

        <VideoFrame video={welcome} size="lg" label="A Message From Kenya" />

        <div className="grid gap-10 border-t border-bone/10 pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">In this message</p>
            <p className="font-display text-2xl leading-snug text-bone">
              Kenya walks you through the whole experience, start to finish.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {covered.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-sm text-bone/60">
                <span aria-hidden className="h-px w-4 shrink-0 bg-champagne/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-bone/10 pt-12">
          <Button href="/portal" variant="light" size="lg">
            Start My Journey
          </Button>
          <MockNotice tone="dark" className="max-w-2xl">
            Phase 1 prototype — the video is a placeholder for Kenya&rsquo;s recording. Account
            activation in production is a secure emailed link the client uses to create their own
            password; {brand.short} never generates or displays a password.
          </MockNotice>
        </div>
      </main>
    </div>
  );
}
