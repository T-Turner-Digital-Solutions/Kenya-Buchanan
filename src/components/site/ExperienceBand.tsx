import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { experienceBand } from "@/data/experienceBand";

/**
 * THREE DOORS UNDER THE HERO.
 *
 * Deliberately black and edge-to-edge: it sits directly beneath the opening
 * image so the two read as one cinematic block, and the gowns carry all the
 * colour on the screen. Content comes from `src/data/experienceBand.ts` —
 * rewriting a line is a data change, not a component change.
 */
export function ExperienceBand() {
  return (
    <section aria-label="Experiences" className="bg-ink">
      {/* The hairline grid gap is the only rule on the band — no borders. */}
      <div className="grid gap-px bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
        {experienceBand.map((panel) => {
          const src = resolveMedia(panel.photo);
          return (
            <Link
              key={panel.slug}
              href={`/${panel.slug}`}
              className="group relative flex min-h-[19rem] bg-ink lg:min-h-[23rem]"
            >
              <div className="relative w-[40%] shrink-0 overflow-hidden">
                {src ? (
                  <Image
                    src={src}
                    alt={panel.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                    className="object-cover object-[50%_25%] transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.05]"
                  />
                ) : null}
                {/* Photograph dissolves into the panel rather than stopping at an edge. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-ink/10 via-ink/40 to-ink"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-10 lg:px-8">
                <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
                  {panel.eyebrow}
                </p>
                <h3 className="display-caps text-[1.35rem] text-bone sm:text-2xl lg:text-[1.5rem] xl:text-[1.7rem]">
                  {panel.headline}
                </h3>
                <p className="text-[0.78rem] leading-relaxed text-bone/55">
                  {panel.lines[0]}
                  <br />
                  {panel.lines[1]}
                </p>
                <span className="mt-2 inline-flex w-fit items-center border border-bone/35 px-6 py-3 text-[0.58rem] uppercase tracking-wide2 text-bone transition-colors duration-500 group-hover:border-champagne group-hover:text-champagne">
                  Explore
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
