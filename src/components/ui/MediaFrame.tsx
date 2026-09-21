import Image from "next/image";
import { mediaAspect, resolveMedia } from "@/config/media";
import { cx } from "@/lib/format";
import type { MediaSlot } from "@/lib/types";

const ratios: Record<NonNullable<MediaSlot["ratio"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

/**
 * Renders real photography when the slot is mapped in `src/config/media.ts`,
 * otherwise a tasteful editorial placeholder carrying the slot's label.
 */
export function MediaFrame({
  slot,
  className,
  caption,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  bare = false,
  focal = "center",
  natural = false,
}: {
  slot: MediaSlot;
  className?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  /** Suppress the placeholder's label — used when content is layered on top. */
  bare?: boolean;
  /**
   * Where to anchor the crop. Full-bleed heroes use "face": tall portraits
   * cropped to a wide frame otherwise lose the subject's head.
   */
  focal?: "center" | "face" | "top";
  /**
   * Take the shape of the photograph instead of the `ratio` above. Use it for
   * artwork that carries its own titles or composition — cropping those to a
   * layout's preferred rectangle cuts the picture in half.
   */
  natural?: boolean;
}) {
  const focalClass =
    focal === "face" ? "object-[50%_18%]" : focal === "top" ? "object-top" : "object-center";
  const src = resolveMedia(slot.id);
  const tone = slot.tone ?? "light";
  // `natural` only applies once there is a file to measure; an unmapped slot
  // still falls back to the declared ratio so the placeholder keeps its shape.
  const aspect = natural ? mediaAspect(slot.id) : undefined;

  return (
    <figure
      style={aspect ? { aspectRatio: String(aspect) } : undefined}
      className={cx(
        "group relative overflow-hidden",
        !aspect && ratios[slot.ratio ?? "portrait"],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cx(
            "object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.04]",
            focalClass,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={slot.alt}
          className={cx(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.03]",
            tone === "dark"
              ? "placeholder-surface-dark bg-ink text-bone/55"
              : "placeholder-surface bg-bone-deep text-ink/45",
          )}
        >
          {bare ? null : (
            <>
              <span className="text-[0.55rem] uppercase tracking-luxe">Kenya Buchanan</span>
              <span className="font-display text-base leading-snug sm:text-lg">{slot.alt}</span>
              <span className="text-[0.5rem] uppercase tracking-wide2 opacity-70">
                Photography to be placed
              </span>
            </>
          )}
        </div>
      )}
      {caption ? (
        <figcaption
          className={cx(
            "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 text-[0.6rem] uppercase tracking-wide2",
            "text-bone",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
