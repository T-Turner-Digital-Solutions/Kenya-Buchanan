import Image from "next/image";
import Link from "next/link";
import { ExperienceBand } from "@/components/site/ExperienceBand";
import { ExperienceSelector } from "@/components/site/ExperienceSelector";
import { GownCarousel } from "@/components/site/GownCarousel";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { LiveFeature } from "@/components/site/LiveFeature";
import { LookbookGallery } from "@/components/site/LookbookGallery";
import { PartnersRail } from "@/components/site/PartnersRail";
import { PortalPreview } from "@/components/site/PortalPreview";
import { SeasonPanel } from "@/components/site/SeasonPanel";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { mediaAspect, resolveMedia } from "@/config/media";
import { brand } from "@/config/site";
import {
  bridalFeature,
  customFeature,
  heroSlides,
  lookbook,
  promGowns,
} from "@/data/gallery";
import {
  currentPromSeason,
  experiences,
  getDemoPortalClient,
  liveSessions,
  partnersByCategory,
} from "@/lib/services";

/**
 * HOME — a visual sequence, not a document.
 *
 * Hero → the band → experiences → prom gowns → the season → bridal → custom →
 * My Kenya B. → live → Kenya → partners → close. Every section earns its
 * height, and the gowns carry the page.
 */
export default function HomePage() {
  const client = getDemoPortalClient();
  const partnerGroups = partnersByCategory([
    "photographers",
    "luxury_cars",
    "hair",
    "makeup",
    "florists",
  ]);
  const bridalSrc = resolveMedia(bridalFeature.id);

  return (
    <>
      <HeroCarousel
        slides={heroSlides}
        eyebrow="A vision. A fit. A moment."
        title="Kenya Buchanan"
        tagline={brand.motto}
      />

      {/* Three doors, black and edge-to-edge, carrying straight on from the hero */}
      <ExperienceBand />

      {/* Experience selector */}
      <section className="surface-sparkle pb-12 pt-32 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:mb-10">
            <div className="flex flex-col gap-2">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
                The Experiences
              </p>
              <h2 className="display-caps text-2xl text-ink sm:text-3xl">
                Choose how you are dressed.
              </h2>
            </div>
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
            >
              Begin Your Experience
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <ExperienceSelector experiences={experiences} />
          </Reveal>
        </div>
      </section>

      {/* Prom gown carousel */}
      <section className="bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
            <div className="flex flex-col gap-3">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
                Kenya B. Prom
              </p>
              <h2 className="display-caps text-4xl text-ink sm:text-5xl lg:text-6xl">
                Made for the entrance.
              </h2>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
            >
              View Full Gallery
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <GownCarousel items={promGowns} ctaHref="/prom" ctaLabel="View Prom Experience" />
          </Reveal>
        </div>
      </section>

      {/* Bridal feature */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* The room: the same photograph, blurred, so the gown itself is not cropped. */}
        {bridalSrc ? (
          <div aria-hidden className="absolute inset-0">
            <Image
              src={bridalSrc}
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="scale-125 object-cover object-center opacity-40 blur-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/70" />
          </div>
        ) : null}

        <div className="relative mx-auto grid max-w-editorial items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-14 lg:px-12 lg:py-20">
          <Reveal className="flex max-w-lg flex-col gap-6">
            <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">Kenya B. Bridal</p>
            <h2 className="display-caps text-4xl text-bone sm:text-5xl lg:text-6xl">
              For the moment
              <br />
              that becomes
              <br />
              the memory.
            </h2>
            <Link
              href="/bridal"
              className="group mt-2 inline-flex w-fit items-center gap-3 border border-bone/40 px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-bone transition-all duration-500 ease-silk hover:bg-bone hover:text-ink"
            >
              Explore Bridal
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          {/* The gown, whole — the skirt is the picture. */}
          {bridalSrc ? (
            <Reveal delay={120} className="order-first mx-auto lg:order-2 lg:mx-0">
              {/*
               * Sized by height, so the frame keeps the photograph's shape, and
               * unframed — it dissolves into the section on every edge rather
               * than stopping at a rule.
               */}
              <figure
                style={{ aspectRatio: String(mediaAspect(bridalFeature.id) ?? 1) }}
                className="relative h-[20rem] max-w-full sm:h-[25rem] lg:h-[32rem] xl:h-[36rem]"
              >
                <Image
                  src={bridalSrc}
                  alt={bridalFeature.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 70vw, 36rem"
                  className="object-cover object-center sm:fade-into-page"
                />
              </figure>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Custom feature — asymmetric */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
              <MediaFrame
                slot={customFeature[0]}
                focal="face"
                className="aspect-[3/4]"
                sizes="(max-width: 1024px) 45vw, 26vw"
              />
              <MediaFrame
                slot={customFeature[1]}
                focal="face"
                className="mt-10 aspect-[3/4]"
                sizes="(max-width: 1024px) 45vw, 26vw"
              />
            </Reveal>

            <Reveal delay={120} className="order-1 flex flex-col gap-6 lg:order-2">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
                Kenya B. Custom
              </p>
              <h2 className="display-caps text-4xl text-ink sm:text-5xl lg:text-6xl">
                One night.
                <br />
                One design.
                <br />
                Yours.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-ink/60">
                Galas, pageants, milestones and red carpets — drafted, sourced and finished for one
                body and one occasion.
              </p>
              <Link
                href="/custom"
                className="group inline-flex w-fit items-center gap-3 bg-ink px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-bone transition-all duration-500 ease-silk hover:bg-champagne hover:text-ink"
              >
                Explore Custom
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prom season band */}
      <Reveal>
        <SeasonPanel season={currentPromSeason} />
      </Reveal>

      {/* My Kenya B. */}
      <section className="overflow-hidden bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal>
            <PortalPreview client={client} />
          </Reveal>
        </div>
      </section>

      {/* Kenya B. Live */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
                {brand.live}
              </p>
              <h2 className="display-caps text-3xl text-ink sm:text-4xl">Kenya, live.</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <LiveFeature sessions={liveSessions} />
          </Reveal>
        </div>
      </section>

      {/* Collections lookbook */}
      <section className="bg-ink py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
                {brand.collection}
              </p>
              <h2 className="display-caps text-3xl text-bone sm:text-4xl">The lookbook.</h2>
            </div>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-wide2 text-bone/70 transition-colors hover:text-bone"
            >
              All Collections
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100} className="[&_.text-ink]:text-bone">
            <LookbookGallery items={lookbook} />
          </Reveal>
        </div>
      </section>

      {/* Meet Kenya */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal className="flex justify-center lg:justify-start">
              <MediaFrame
                slot={{ id: "kenya-meet-hero", alt: "Kenya Buchanan", ratio: "portrait" }}
                className="w-full max-w-[19rem]"
                sizes="(max-width: 1024px) 70vw, 300px"
              />
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-6">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">Meet Kenya</p>
              <blockquote className="font-display text-3xl leading-[1.15] text-ink text-balance sm:text-4xl lg:text-5xl">
                &ldquo;I am not making you a dress. I am making the way you walk into the room.&rdquo;
              </blockquote>
              <p className="max-w-lg text-sm leading-relaxed text-ink/60">
                Kenya Buchanan builds gowns by hand for the person who will wear them — measured,
                drafted, sourced and finished for one body and one night.
              </p>
              <p className="font-display text-xl italic text-champagne-deep">{brand.motto}</p>
              <Link
                href="/meet-kenya"
                className="group inline-flex w-fit items-center gap-3 border border-ink/25 px-8 py-4 text-[0.66rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:border-ink hover:bg-ink hover:text-bone"
              >
                Her Story
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Preferred partners */}
      <section className="bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
                {brand.preferred}
              </p>
              <h2 className="display-caps text-3xl text-ink sm:text-4xl">Complete your night.</h2>
            </div>
            <Link
              href="/partners"
              className="group inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
            >
              All Partners
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <PartnersRail groups={partnerGroups} />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-ink py-20 lg:py-28">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={resolveMedia(heroSlides[0].id) ?? ""}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />

        <Reveal className="relative mx-auto flex max-w-editorial flex-col items-center gap-8 px-5 text-center sm:px-8 lg:px-12">
          <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">Begin</p>
          <h2 className="display-caps max-w-3xl text-4xl text-bone text-balance sm:text-5xl lg:text-6xl">
            It starts with one conversation.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-champagne px-9 py-4 text-[0.68rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
            >
              Begin Your Experience
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/portal/login"
              className="inline-flex items-center justify-center border border-bone/35 px-9 py-4 text-[0.68rem] uppercase tracking-wide2 text-bone transition-all duration-500 hover:border-bone hover:bg-bone/10"
            >
              My Kenya B. Login
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
