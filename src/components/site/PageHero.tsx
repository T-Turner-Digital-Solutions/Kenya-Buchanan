import Image from "next/image";
import type { ReactNode } from "react";
import { mediaAspect, resolveMedia } from "@/config/media";
import { cx } from "@/lib/format";
import type { MediaSlot } from "@/lib/types";

/**
 * Editorial hero used across the public site.
 *
 * The photograph is NOT stretched across the full width and it is NOT set in a
 * frame. It runs large down the right of the section at its own proportions and
 * dissolves into the page on its left, top and bottom — so the whole gown is
 * there, hem and train included, and the picture and the page read as one
 * surface. The same photograph, blurred behind the type, supplies the room.
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
  // The picture's own shape. The fade has to be applied to a box that hugs
  // the photograph — masking a wider container fades empty space and leaves
  // the picture with a hard vertical edge.
  const aspect = mediaAspect(media.id) ?? 2 / 3;

  return (
    <section
      className={cx(
        "relative isolate flex w-full items-center overflow-hidden bg-ink",
        size === "full" && "sm:min-h-[88svh]",
        size === "tall" && "sm:min-h-[82svh]",
        size === "mid" && "sm:min-h-[74svh]",
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
            className="scale-125 object-cover object-center opacity-30 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        </div>
      ) : null}

      {/*
       * The gown, whole, dissolving into the page.
       *
       * Shifted down clear of the navigation, and the same amount past the
       * bottom edge — the frame keeps its full height, so the gown is no
       * smaller, but her face sits below the bar instead of under it. Only
       * floor is lost off the bottom.
       *
       * From `sm` up only. On a phone there is no room beside the type, so the
       * picture would sit behind it and have to be dimmed to keep the words
       * readable — which is no picture at all. The phone gets the stacked
       * version below instead.
       */}
      {src ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-0 top-20 hidden justify-end sm:flex lg:-bottom-28 lg:top-28"
        >
          <div style={{ aspectRatio: String(aspect) }} className="h-full max-w-[92vw]">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              priority
              className="fade-into-panel object-cover object-center"
            />
          </div>
        </div>
      ) : null}

      {/* Keeps the navigation readable where the photograph runs bright. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/90 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-editorial px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-32">
        {/*
         * Phone only. Full strength and unmasked — a fade across a face at
         * this size hides the person rather than softening an edge.
         */}
        {src ? (
          <div
            style={{ aspectRatio: String(aspect) }}
            className="relative mx-auto mb-10 w-[92%] max-w-[22rem] sm:hidden"
          >
            <Image
              src={src}
              alt={media.alt}
              fill
              sizes="92vw"
              priority
              className="object-cover object-center"
            />
          </div>
        ) : null}

        <div
          className={cx(
            "flex max-w-xl flex-col gap-6",
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
      </div>
    </section>
  );
}
