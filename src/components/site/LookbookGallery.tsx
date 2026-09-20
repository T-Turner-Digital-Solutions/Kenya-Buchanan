"use client";

import Image from "next/image";
import { resolveMedia } from "@/config/media";
import { useCarousel } from "@/lib/useCarousel";
import { cx } from "@/lib/format";
import type { GalleryItem } from "@/data/gallery";
import { CarouselArrow, CarouselCounter } from "@/components/ui/CarouselControls";

/**
 * Collections lookbook.
 *
 * Deliberately a different interaction from the Prom carousel: one large active
 * frame with the following frame beside it, and a thumbnail strip underneath
 * that doubles as the progress indicator.
 */
export function LookbookGallery({ items }: { items: GalleryItem[] }) {
  const { index, goTo, next, previous, engage, handlers } = useCarousel({
    count: items.length,
    interval: 0,
  });

  const active = items[index];
  const upcoming = items[(index + 1) % items.length];

  return (
    <div className="flex flex-col gap-6">
      <div
        aria-roledescription="carousel"
        aria-label="Collections lookbook"
        tabIndex={0}
        {...handlers}
        className="grid touch-pan-y select-none gap-4 focus:outline-none lg:grid-cols-[1.55fr_1fr]"
      >
        {/* Active frame */}
        <figure className="relative aspect-[4/5] overflow-hidden bg-ink lg:aspect-[5/6]">
          {items.map((item, position) => {
            const src = resolveMedia(item.id);
            const isActive = position === index;
            return (
              <div
                key={item.id}
                aria-hidden={!isActive}
                className={cx(
                  "absolute inset-0 transition-all duration-[1000ms] ease-silk",
                  isActive ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                )}
              >
                {src ? (
                  <Image
                    src={src}
                    alt={isActive ? item.alt : ""}
                    draggable={false}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-[50%_18%]"
                  />
                ) : null}
              </div>
            );
          })}
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent p-6">
            <span>
              <span className="block text-[0.55rem] uppercase tracking-luxe text-champagne">
                {active?.label}
              </span>
              <span className="mt-1 block font-display text-xl text-bone">{active?.alt}</span>
            </span>
            <CarouselCounter index={index} count={items.length} tone="dark" className="shrink-0" />
          </figcaption>
        </figure>

        {/* Next frame, as a preview */}
        <button
          type="button"
          onClick={() => {
            engage();
            next();
          }}
          className="group relative hidden aspect-[4/5] overflow-hidden bg-ink lg:block lg:aspect-auto"
        >
          {resolveMedia(upcoming.id) ? (
            <Image draggable={false}
              src={resolveMedia(upcoming.id)!}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 0px, 35vw"
              className="object-cover object-[50%_18%] opacity-70 transition-all duration-700 ease-silk group-hover:scale-[1.03] group-hover:opacity-100"
            />
          ) : null}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-left">
            <span className="block text-[0.55rem] uppercase tracking-luxe text-bone/60">Next</span>
            <span className="mt-1 block font-display text-lg text-bone">{upcoming.label}</span>
          </span>
        </button>
      </div>

      {/* Thumbnails double as progress */}
      <div className="flex items-center gap-4">
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <CarouselArrow
            direction="previous"
            onClick={() => {
              engage();
              previous();
            }}
          />
          <CarouselArrow
            direction="next"
            onClick={() => {
              engage();
              next();
            }}
          />
        </div>

        <div className="rail min-w-0 flex-1 gap-2">
          {items.map((item, position) => {
            const src = resolveMedia(item.id);
            const isActive = position === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`View ${item.alt}`}
                aria-current={isActive}
                onClick={() => {
                  engage();
                  goTo(position);
                }}
                className={cx(
                  "relative h-20 w-16 shrink-0 overflow-hidden bg-ink transition-all duration-500 ease-silk",
                  isActive ? "opacity-100 ring-1 ring-ink" : "opacity-40 hover:opacity-80",
                )}
              >
                {src ? (
                  <Image draggable={false} src={src} alt="" fill loading="lazy" sizes="64px" className="object-cover object-[50%_18%]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
