"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { useCarousel } from "@/lib/useCarousel";
import { cx } from "@/lib/format";
import type { GalleryItem } from "@/data/gallery";
import { CarouselArrow, CarouselCounter } from "@/components/ui/CarouselControls";

/**
 * Centre-dominant gown carousel.
 *
 * Desktop places the active gown large in the middle with the previous and next
 * gowns peeking either side. Mobile becomes a swipe rail where the next gown
 * stays partly visible, which is what tells a thumb it can swipe.
 *
 * The desktop track is transform-driven so nothing reflows between slides.
 */
export function GownCarousel({
  items,
  ctaHref,
  ctaLabel,
}: {
  items: GalleryItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const { index, goTo, next, previous, engage, handlers, isDragging } = useCarousel({
    count: items.length,
    interval: 7000,
  });

  const active = items[index];

  return (
    <div className="flex flex-col gap-8">
      {/* Desktop stage — five gowns across, the centre one dominant */}
      <div
        aria-roledescription="carousel"
        aria-label="Prom gowns"
        tabIndex={0}
        {...handlers}
        className="relative hidden h-[30rem] touch-pan-y select-none overflow-hidden drag-grab focus:outline-none lg:block xl:h-[33rem]"
      >
        {items.map((item, position) => {
          const src = resolveMedia(item.id);
          // Shortest signed distance on the ring, so the fan wraps smoothly.
          let offset = position - index;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const distance = Math.abs(offset);
          const visible = distance <= 2;
          const isActive = offset === 0;

          // Each step out sits closer, smaller and quieter than the last.
          const step = [0, 13.5, 25][distance] ?? 25;
          const scale = [1, 0.8, 0.62][distance] ?? 0.62;
          const opacity = [1, 0.75, 0.5][distance] ?? 0;

          return (
            <button
              key={item.id}
              type="button"
              aria-hidden={!visible}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                if (isDragging()) return;
                engage();
                goTo(position);
              }}
              style={{
                transform: `translate3d(calc(-50% + ${Math.sign(offset) * step}rem), -50%, 0) scale(${scale})`,
                zIndex: 10 - distance,
                opacity: visible ? opacity : 0,
              }}
              className={cx(
                "absolute left-1/2 top-1/2 h-full w-[17rem] overflow-hidden bg-ink transition-all duration-[900ms] ease-silk xl:w-[19rem]",
                visible ? "pointer-events-auto" : "pointer-events-none",
                !isActive && "hover:!opacity-90",
              )}
            >
              {src ? (
                <Image
                  draggable={false}
                  src={src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 0px, 19rem"
                  className="object-cover object-[50%_14%]"
                />
              ) : null}
              {/* A light veil keeps focus centre without greying the neighbours out. */}
              {!isActive ? <span className="absolute inset-0 bg-ink/15" /> : null}
            </button>
          );
        })}
      </div>

      {/* Mobile rail — next gown peeks in */}
      <div className="rail -mx-5 gap-3 px-5 lg:hidden">
        {items.map((item, position) => {
          const src = resolveMedia(item.id);
          return (
            <figure
              key={item.id}
              className="relative aspect-[3/4] w-[85vw] max-w-sm overflow-hidden bg-ink"
              onFocus={() => goTo(position)}
            >
              {src ? (
                <Image
                  src={src}
                  alt={item.alt}
                  draggable={false}
                  fill
                  loading="lazy"
                  sizes="85vw"
                  className="object-cover object-[50%_18%]"
                />
              ) : null}
              {item.label ? (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5">
                  <span className="text-[0.55rem] uppercase tracking-luxe text-champagne">
                    {item.label}
                  </span>
                  {item.note ? (
                    <span className="mt-1 block font-display text-lg text-bone">{item.note}</span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>

      {/* Caption + controls */}
      <div className="flex flex-col gap-5">
        <div className="hidden flex-col items-center gap-1.5 text-center lg:flex">
          {active?.label ? (
            <p className="text-[0.55rem] uppercase tracking-luxe text-champagne-deep">
              {active.label}
            </p>
          ) : null}
          {active?.note ? (
            <p className="font-display text-xl text-ink">{active.note}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="hidden items-center gap-3 lg:flex">
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

          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors duration-500 hover:text-champagne-deep"
            >
              {ctaLabel}
              <span
                aria-hidden
                className="transition-transform duration-500 ease-silk group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ) : (
            <span />
          )}

          <CarouselCounter index={index} count={items.length} className="hidden lg:block" />
          <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/35 lg:hidden">Swipe →</p>
        </div>

        {/* Thin progress bar mirrors position */}
        <div className="hidden h-px w-full bg-ink/10 lg:block">
          <div
            className="h-px bg-ink transition-all duration-700 ease-silk"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
