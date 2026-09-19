import Image from "next/image";
import { cx } from "@/lib/format";

/**
 * KENYA B. brand mark.
 *
 * The artwork is black-and-red line art. Two prepared variants exist — the
 * original colours for light surfaces and a bone monochrome "reversed" version
 * for dark ones. Never reverse it with a CSS filter: inverting this artwork
 * produces a photographic negative.
 *
 * `variant="auto"` stacks both and cross-fades, for the site header sitting
 * over a dark hero that turns light on scroll.
 */
export function BrandMark({
  variant = "dark",
  lockup = false,
  className,
  priority,
  onLight,
}: {
  /** Which surface the mark sits on: "dark" surface, "light" surface, or both. */
  variant?: "dark" | "light" | "auto";
  /** Include the "KENYA B." wordmark beneath the figure. */
  lockup?: boolean;
  className?: string;
  priority?: boolean;
  /** For variant="auto": true once the surface behind it has turned light. */
  onLight?: boolean;
}) {
  const base = lockup ? "kenya-b-lockup" : "kenya-b-mark";
  const height = lockup ? 285 : 255;
  const shared = "h-full w-auto object-contain";

  if (variant === "auto") {
    return (
      <span className={cx("relative block", className)}>
        <Image
          src={`/media/brand/${base}-reversed.png`}
          alt=""
          width={157}
          height={height}
          priority={priority}
          className={cx(shared, "transition-opacity duration-500 ease-silk", onLight ? "opacity-0" : "opacity-100")}
        />
        <Image
          src={`/media/brand/${base}.png`}
          alt=""
          width={157}
          height={height}
          priority={priority}
          className={cx(
            shared,
            "absolute inset-0 transition-opacity duration-500 ease-silk",
            onLight ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
    );
  }

  return (
    <Image
      src={`/media/brand/${base}${variant === "dark" ? "-reversed" : ""}.png`}
      alt=""
      width={157}
      height={height}
      priority={priority}
      className={cx("w-auto object-contain", className)}
    />
  );
}
