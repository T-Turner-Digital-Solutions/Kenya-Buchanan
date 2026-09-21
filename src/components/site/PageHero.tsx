import Image from "next/image";
import type { ReactNode } from "react";
import { mediaAspect, resolveMedia } from "@/config/media";
import { cx } from "@/lib/format";
import type { MediaSlot } from "@/lib/types";

/**
 * Editorial hero used across the public site.
 *
 * The photography is portrait (roughly 2:3) and the gown is the point, so the
 * picture is NOT stretched across a wide frame — cropping a 2:3 portrait to a
 * 3:1 band throws away three quarters of the dress and leaves a bodice. Instead
 * the same photograph does two jobs: blurred and dimmed it becomes the dark
 * atmosphere behind the type, and at its own proportions it sits beside the
 * headline where the whole gown, hem and train included, is visible.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  media,
  actions,
  align = "left",
  size = "full",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  media: MediaSlot;
  actions?: ReactNode;
  align?: "left" | "center";
  size?: "full" | "tall" | "mid";
  children?: ReactNode;
}) {
  const src = resolveMedia(media.id);
  // The frame takes the photograph's own proportions, so nothing is cropped.
  // 2:3 is the house portrait shape and covers any slot still awaiting a file.
  const aspect = mediaAspect(media.id) ?? 2 / 3;
  // A wide frame would run past the text column, so the landscape ones are
  // held to the same height the portraits get rather than the same width.
  const wide = aspect > 1;

  return (
    <section
      className={cx(
        "relative isolate flex w-full items-center overflow-hidden bg-ink",
        size === "full" && "min-h-[70svh]",
        size === "tall" && "min-h-[60svh]",
        size === "mid" && "min-h-[48svh]",
      )}
    >
      {src ? (
        <div aria-hidden className="absolute inset-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority
            className="scale-125 object-cover object-center opacity-40 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/75" />
        </div>
      ) : null}

      <div
        className={cx(
          "relative mx-auto grid w-full max-w-editorial items-center gap-10 px-5 pb-14 pt-28 sm:px-8 lg:gap-14 lg:px-12 lg:pb-16 lg:pt-32",
          "lg:grid-cols-[1fr_auto]",
        )}
      >
        <div
          className={cx(
            "flex max-w-2xl flex-col gap-6",
            align === "center" && "mx-auto items-center text-center",
          )}
        >
          {eyebrow ? (
            <p className="animate-fade text-[0.6rem] uppercase tracking-luxe text-champagne">{eyebrow}</p>
          ) : null}
          <h1 className="animate-rise font-display text-[2.6rem] font-light leading-[1.02] text-bone text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle ? (
            <div className="animate-rise font-display text-xl italic leading-snug text-bone/75 sm:text-2xl lg:text-3xl">
              {subtitle}
            </div>
          ) : null}
          {children}
          {actions ? (
            <div
              className={cx(
                "mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
                align === "center" && "sm:justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>

        {/* The gown, whole. Sized so the frame is read, not filled. */}
        {src ? (
          <figure
            className={cx(
              "relative mx-auto w-full lg:mx-0",
              wide
                ? "max-w-[19rem] sm:max-w-[22rem] lg:w-[22rem] xl:w-[25rem]"
                : "max-w-[13rem] sm:max-w-[15rem]",
              !wide &&
                (size === "mid" ? "lg:w-[14rem] xl:w-[15rem]" : "lg:w-[16rem] xl:w-[17.5rem]"),
            )}
          >
            <div
              style={{ aspectRatio: String(aspect) }}
              className="relative overflow-hidden bg-ink-soft ring-1 ring-bone/15"
            >
              <Image
                src={src}
                alt={media.alt}
                fill
                sizes="(max-width: 1024px) 60vw, 25rem"
                priority
                className="object-cover object-center"
              />
            </div>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
