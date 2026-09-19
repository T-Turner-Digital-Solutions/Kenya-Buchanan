import type { Metadata } from "next";
import { MockNotice } from "@/components/ui/MockNotice";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import { liveSessions, videos } from "@/lib/services";

export const metadata: Metadata = { title: "Sessions" };

export default function PortalSessionsPage() {
  const upcoming = liveSessions.filter((session) => session.state === "upcoming");

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl">Live sessions with Kenya</h2>
        <ul className="flex flex-col">
          {upcoming.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-2 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="flex flex-col gap-1.5">
                <span className="font-display text-xl">{session.title}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  {formatWeekday(session.startsAt)} · {formatDate(session.startsAt)} ·{" "}
                  {formatTime(session.startsAt)} · {session.platform}
                </span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep">
                Remind me
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl">Your videos from Kenya</h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink/60">
            Messages Kenya records for you along the way — what to expect, how to prepare, and
            where your gown is.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {videos.slice(0, 6).map((video) => (
            <VideoFrame key={video.id} video={video} size="sm" />
          ))}
        </div>
      </section>

      <MockNotice>
        Phase 1 prototype — videos are premium placeholders and live sessions are mock content.
        Recording, hosting and Facebook Live embeds come in a later phase.
      </MockNotice>
    </div>
  );
}
