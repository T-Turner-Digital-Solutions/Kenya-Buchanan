import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/site/BrandMark";
import { resolveMedia } from "@/config/media";
import { liveFeature } from "@/data/gallery";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import type { LiveSession } from "@/lib/types";

/**
 * Kenya B. Live — one featured session at scale, the rest as a rail.
 * Built to take a Facebook Live embed in place of the poster later.
 */
export function LiveFeature({ sessions }: { sessions: LiveSession[] }) {
  const featured = sessions.find((session) => session.state === "live") ?? sessions[0];
  const rest = sessions.filter((session) => session.id !== featured.id).slice(0, 3);
  const src = resolveMedia(liveFeature.id);
  const isLive = featured.state === "live";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Featured */}
      <article className="group relative aspect-[16/10] overflow-hidden bg-ink lg:aspect-auto lg:min-h-[26rem]">
        {src ? (
          <Image
            src={src}
            alt={liveFeature.alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-[50%_20%] transition-transform duration-[1600ms] ease-silk group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
          <span className="inline-flex items-center gap-2 bg-ink/70 px-3 py-1.5 text-[0.55rem] uppercase tracking-wide2 text-bone backdrop-blur-sm">
            {isLive ? (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" aria-hidden />
                Live now
              </>
            ) : (
              "Upcoming"
            )}
          </span>
          <span className="text-[0.55rem] uppercase tracking-luxe text-bone/60">
            {featured.platform}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8">
          <span
            aria-hidden
            className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/50 text-bone transition-all duration-700 ease-silk group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
              {formatWeekday(featured.startsAt)} · {formatDate(featured.startsAt)} ·{" "}
              {formatTime(featured.startsAt)}
            </p>
            <h3 className="font-display text-3xl leading-tight text-bone sm:text-4xl">
              {featured.title}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-bone/65">{featured.description}</p>
          </div>
          <Link
            href="/live"
            className="mt-1 inline-flex w-fit items-center gap-3 bg-bone px-7 py-3.5 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors duration-500 hover:bg-champagne"
          >
            {isLive ? "Watch Now" : "Remind Me"}
          </Link>
        </div>
      </article>

      {/* Rail of upcoming sessions */}
      <div className="flex flex-col gap-3">
        {rest.map((session) => (
          <Link
            key={session.id}
            href="/live"
            className="group flex items-center gap-4 border border-ink/10 bg-paper p-4 transition-colors duration-500 hover:border-ink/30"
          >
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-bone"
            >
              <BrandMark variant="dark" className="h-8" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.55rem] uppercase tracking-luxe text-champagne-deep">
                {session.state === "past" ? "Replay" : "Upcoming"} · {session.platform}
              </span>
              <span className="mt-1 block truncate font-display text-lg text-ink">
                {session.title}
              </span>
              <span className="block text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                {formatDate(session.startsAt)} · {formatTime(session.startsAt)}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 text-ink/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne-deep"
            >
              →
            </span>
          </Link>
        ))}

        <Link
          href="/live"
          className="mt-auto inline-flex items-center justify-between border border-ink/15 px-5 py-4 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors duration-500 hover:border-ink"
        >
          All Sessions
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
