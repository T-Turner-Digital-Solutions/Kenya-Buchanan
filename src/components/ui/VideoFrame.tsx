import { cx } from "@/lib/format";
import type { VideoAsset } from "@/lib/types";
import { MediaFrame } from "./MediaFrame";

/**
 * Premium placeholder for a Kenya Buchanan video message.
 * Phase 1 renders the poster + play affordance only — no player is wired up.
 */
export function VideoFrame({
  video,
  className,
  label,
  size = "md",
}: {
  video: VideoAsset;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={cx("group relative overflow-hidden bg-ink", className)}>
      <MediaFrame slot={video.poster} className="opacity-70" bare />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/80 px-6 text-center">
        <span className="text-[0.55rem] uppercase tracking-luxe text-champagne-light">
          {label ?? video.label}
        </span>
        <span
          aria-hidden
          className={cx(
            "flex items-center justify-center rounded-full border border-bone/50 text-bone transition-all duration-700 ease-silk group-hover:border-champagne group-hover:text-champagne",
            size === "lg" ? "h-20 w-20" : size === "sm" ? "h-11 w-11" : "h-14 w-14",
          )}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-4 w-4">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p
          className={cx(
            "font-display leading-snug text-bone",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {video.title}
        </p>
        <p className="max-w-md text-xs leading-relaxed text-bone/60">{video.description}</p>
        <p className="text-[0.55rem] uppercase tracking-wide2 text-bone/40">
          {video.durationLabel} · Video to be recorded by Kenya
        </p>
      </div>
    </div>
  );
}
