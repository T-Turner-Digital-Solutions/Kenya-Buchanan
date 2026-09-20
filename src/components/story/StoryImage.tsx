import Image from "next/image";
import { resolveMedia } from "@/config/media";
import { cx } from "@/lib/format";
import type { StoryMedia, StoryTone } from "@/lib/types";

/**
 * Photography for the story page.
 *
 * Archival imagery Kenya has not supplied yet renders as a deliberate frame —
 * a captioned, champagne-ruled plate — rather than an empty grey box, so the
 * page reads as complete while the slot waits for a real photograph.
 */
export function StoryImage({
  media,
  tone = "light",
  className,
  sizes = "(max-width: 1024px) 90vw, 45vw",
  priority,
}: {
  media: StoryMedia;
  tone?: StoryTone;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = media.awaitingUpload ? undefined : resolveMedia(media.slot);
  const dark = tone === "dark";

  return (
    <figure className={cx("flex flex-col gap-3", className)}>
      <div className={cx("relative overflow-hidden", src ? "bg-ink" : "")}>
        {src ? (
          <Image
            src={src}
            alt={media.alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            draggable={false}
            className="object-cover object-[50%_18%]"
          />
        ) : (
          <div
            role="img"
            aria-label={media.alt}
            className={cx(
              "absolute inset-0 flex flex-col items-center justify-center gap-4 border px-6 text-center",
              dark
                ? "border-bone/20 bg-bone/[0.03] text-bone/50"
                : "border-ink/15 bg-ivory-deep/40 text-ink/45",
            )}
          >
            <span aria-hidden className="h-px w-10 bg-champagne" />
            <span className="font-display text-base italic leading-snug sm:text-lg">
              {media.alt}
            </span>
            <span
              className={cx(
                "text-[0.5rem] uppercase tracking-luxe",
                dark ? "text-bone/35" : "text-ink/35",
              )}
            >
              Archival photograph to be added
            </span>
          </div>
        )}
      </div>

      {media.caption ? (
        <figcaption
          className={cx(
            "text-[0.55rem] uppercase tracking-wide2",
            dark ? "text-bone/40" : "text-ink/40",
          )}
        >
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
