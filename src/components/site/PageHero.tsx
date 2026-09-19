import type { ReactNode } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cx } from "@/lib/format";
import type { MediaSlot } from "@/lib/types";

/**
 * Full-bleed editorial hero used across the public site.
 * Height is generous on desktop and restrained on mobile so the type never
 * fights the image.
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
  return (
    <section
      className={cx(
        "relative flex w-full items-end overflow-hidden bg-ink",
        size === "full" && "min-h-[88svh] lg:min-h-screen",
        size === "tall" && "min-h-[72svh]",
        size === "mid" && "min-h-[58svh]",
      )}
    >
      <div className="absolute inset-0">
        <MediaFrame
          slot={{ ...media, tone: "dark" }}
          className="h-full w-full !aspect-auto"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
      </div>

      <div
        className={cx(
          "relative mx-auto w-full max-w-editorial px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24",
          align === "center" && "text-center",
        )}
      >
        <div className={cx("flex max-w-3xl flex-col gap-6", align === "center" && "mx-auto items-center")}>
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
