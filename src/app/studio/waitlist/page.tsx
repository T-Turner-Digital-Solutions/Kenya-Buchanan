import type { Metadata } from "next";
import { WaitlistAdmin } from "@/components/studio/WaitlistAdmin";
import { currentPromSeason, waitlist, waitlistActivity } from "@/lib/services";

export const metadata: Metadata = { title: "Waitlist" };

export default function StudioWaitlistPage() {
  return (
    <WaitlistAdmin
      entries={waitlist}
      activity={waitlistActivity}
      seasonName={currentPromSeason.name}
    />
  );
}
