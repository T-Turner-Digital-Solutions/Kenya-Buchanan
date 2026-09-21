import { StatusPill } from "@/components/ui/StatusPill";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import type { LiveSession } from "@/lib/types";

export function LiveCard({ session }: { session: LiveSession }) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
        <MediaFrame slot={{ ...session.poster, ratio: "video" }} sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute left-4 top-4">
          {session.state === "live" ? (
            <StatusPill tone="dark">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" aria-hidden />
              Live Now
            </StatusPill>
          ) : (
            <StatusPill tone="dark">{session.state === "upcoming" ? "Upcoming" : "Replay"}</StatusPill>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
          {formatWeekday(session.startsAt)} · {formatDate(session.startsAt)} · {formatTime(session.startsAt)}
        </p>
        <h3 className="font-display text-2xl leading-tight">{session.title}</h3>
        <p className="text-sm leading-relaxed text-ink/60">{session.description}</p>
        <p className="text-[0.55rem] uppercase tracking-luxe text-champagne-deep">{session.platform}</p>
      </div>
    </article>
  );
}
