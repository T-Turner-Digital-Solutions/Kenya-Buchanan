"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { resolveMedia } from "@/config/media";
import { experienceFeature } from "@/data/gallery";
import { cx } from "@/lib/format";
import type { Experience } from "@/lib/types";

/**
 * Interactive experience selector.
 *
 * Desktop: the three names sit as a list; hovering or focusing one enlarges it
 * and swaps the featured image behind. Mobile: full-bleed swipeable cards.
 * Adding a fourth experience adds a row — nothing here is Prom-specific.
 */
export function ExperienceSelector({ experiences }: { experiences: Experience[] }) {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <div className="flex flex-col gap-8">
      {/* Desktop */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[1.05fr_0.8fr] lg:items-stretch">
        <ul className="flex flex-col justify-center">
          {experiences.map((experience, index) => {
            const selected = index === active;
            return (
              <li key={experience.slug} className="border-b border-ink/10">
                <Link
                  href={`/${experience.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group flex flex-col gap-2 py-5 transition-colors duration-500"
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span
                      className={cx(
                        "display-caps transition-all duration-700 ease-silk",
                        selected
                          ? "text-[2.4rem] text-ink xl:text-[2.8rem]"
                          : "text-[1.7rem] text-ink/30 xl:text-[2rem]",
                      )}
                    >
                      {experience.name}
                    </span>
                    <span
                      className={cx(
                        "shrink-0 text-[0.6rem] uppercase tracking-wide2 transition-all duration-500",
                        selected ? "text-champagne-deep opacity-100" : "opacity-0",
                      )}
                    >
                      Explore →
                    </span>
                  </span>

                  <span
                    className={cx(
                      "grid transition-all duration-700 ease-silk",
                      selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-md pt-1 text-sm leading-relaxed text-ink/60">
                        {experience.tagline}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/*
         * Featured image swaps with the selection. No frame and no dark box —
         * it dissolves into the page, so the caption sits beneath it in dark
         * type rather than on a gradient that would rebuild the box.
         */}
        <div className="relative flex flex-col gap-3">
          <div className="relative min-h-[22rem] flex-1">
            {experiences.map((experience, index) => {
              const item = experienceFeature[experience.slug];
              const src = item ? resolveMedia(item.id) : undefined;
              const selected = index === active;
              return (
                <div
                  key={experience.slug}
                  aria-hidden={!selected}
                  className={cx(
                    "absolute inset-0 transition-all duration-[1100ms] ease-silk",
                    selected ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                  )}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={selected ? item.alt : ""}
                      draggable={false}
                      fill
                      sizes="(max-width: 1024px) 0px, 34vw"
                      className="fade-into-page object-cover object-[50%_20%]"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 pl-1">
            <p className="text-[0.55rem] uppercase tracking-luxe text-champagne-deep">
              Kenya B. {current.name}
            </p>
            <p className="font-display text-xl text-ink">{current.name}</p>
          </div>
        </div>
      </div>

      {/* Mobile: swipeable cards, next card peeking */}
      <div className="rail -mx-5 gap-4 px-5 lg:hidden">
        {experiences.map((experience) => {
          const item = experienceFeature[experience.slug];
          const src = item ? resolveMedia(item.id) : undefined;
          return (
            <Link
              key={experience.slug}
              href={`/${experience.slug}`}
              className="relative aspect-[3/4] w-[68vw] max-w-xs overflow-hidden bg-ink"
            >
              {src ? (
                <Image
                  src={src}
                  alt={item.alt}
                  draggable={false}
                  fill
                  sizes="68vw"
                  className="object-cover object-[50%_18%]"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                <p className="display-caps text-3xl text-bone">{experience.name}</p>
                <p className="text-xs leading-relaxed text-bone/70">{experience.tagline}</p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-wide2 text-champagne">
                  Explore →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
