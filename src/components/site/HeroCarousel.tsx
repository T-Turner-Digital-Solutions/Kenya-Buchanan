"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { useCarousel } from "@/lib/useCarousel";
import { cx } from "@/lib/format";
import type { GalleryItem } from "@/data/gallery";
import { CarouselCounter, CarouselDots } from "@/components/ui/CarouselControls";

/**
 * Full-viewport cinematic hero.
 *
 * Slides cross-fade with a slow Ken Burns drift on the active frame. Autoplay
 * yields permanently the moment the visitor takes control, and stops entirely
 * under prefers-reduced-motion.
 */
export function HeroCarousel({
  slides,
  eyebrow,
  title,
  tagline,
}: {
  slides: GalleryItem[];
  eyebrow: string;
  title: string;
  tagline: string;
}) {
  const { index, goTo, next, previous, engage, handlers, reducedMotion } = useCarousel({
    count: slides.length,
    interval: 6500,
  });

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Kenya Buchanan gowns"
      tabIndex={0}
      {...handlers}
      className="relative isolate flex min-h-[92svh] w-full touch-pan-y select-none items-end overflow-hidden bg-ink focus:outline-none lg:min-h-screen"
    >
      {/* Slides */}
      {slides.map((slide, position) => {
        const src = resolveMedia(slide.id);
        const active = position === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={cx(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-silk",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            {src ? (
              <Image
                src={src}
                alt={active ? slide.alt : ""}
                draggable={false}
                fill
                priority={position === 0}
                loading={position === 0 ? undefined : "lazy"}
                sizes="100vw"
                className={cx(
                  "object-cover object-[50%_18%]",
                  active && !reducedMotion && "animate-kenburns",
                )}
              />
            ) : (
              <div className="placeholder-surface-dark absolute inset-0 bg-ink" />
            )}
          </div>
        );
      })}

      {/* Readability scrims — only where type sits. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/80 to-transparent" />

      {/* Overlay */}
      <div className="relative mx-auto flex w-full max-w-editorial flex-col gap-10 px-5 pb-12 pt-32 sm:px-8 lg:px-12 lg:pb-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <p className="animate-fade text-[0.6rem] uppercase tracking-luxe text-champagne">{eyebrow}</p>
          <h1 className="display-caps animate-rise text-[2.9rem] text-bone sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="animate-rise font-display text-xl italic leading-snug text-bone/80 sm:text-2xl">
            {tagline}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-bone px-8 py-4 text-[0.68rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-champagne"
            >
              Begin Your Experience
              <span
                aria-hidden
                className="transition-transform duration-500 ease-silk group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/prom"
              className="inline-flex items-center justify-center border border-bone/35 px-8 py-4 text-[0.68rem] uppercase tracking-wide2 text-bone transition-all duration-500 ease-silk hover:border-bone hover:bg-bone/10"
            >
              Explore Prom
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-6 border-t border-bone/15 pt-6">
          <CarouselDots
            count={slides.length}
            index={index}
            tone="dark"
            onSelect={(position) => {
              engage();
              goTo(position);
            }}
          />

          <div className="flex items-center gap-5">
            <CarouselCounter index={index} count={slides.length} tone="dark" />
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Previous gown"
                onClick={() => {
                  engage();
                  previous();
                }}
                className="flex h-10 w-10 items-center justify-center border border-bone/25 text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-4 w-4">
                  <path d="M19 12H5m6 6-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next gown"
                onClick={() => {
                  engage();
                  next();
                }}
                className="flex h-10 w-10 items-center justify-center border border-bone/25 text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-4 w-4">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
