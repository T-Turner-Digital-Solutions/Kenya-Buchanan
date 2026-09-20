import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MilestoneRail } from "@/components/story/MilestoneRail";
import { StoryImage } from "@/components/story/StoryImage";
import { StoryTimeline } from "@/components/story/StoryTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { resolveMedia } from "@/config/media";
import { meetKenya } from "@/data/meetKenya";
import { cx } from "@/lib/format";
import type { StorySection, StoryTone } from "@/lib/types";

export const metadata: Metadata = {
  title: "Meet Kenya",
  description:
    "Before there was Kenya B., there was a woman brave enough to choose the life that made her smile. The story behind Kenya Buchanan.",
};

const surface: Record<StoryTone, string> = {
  light: "bg-paper text-ink",
  ivory: "bg-ivory text-ink",
  dark: "bg-ink text-bone",
};

const heading: Record<StoryTone, string> = {
  light: "text-ink",
  ivory: "text-ink",
  dark: "text-bone",
};

const bodyText: Record<StoryTone, string> = {
  light: "text-ink/65",
  ivory: "text-ink/65",
  dark: "text-bone/72",
};

/**
 * MEET KENYA — a scrolling documentary.
 *
 * The page renders whatever `meetKenya` says: sections alternate image, story,
 * milestone, quote and statement, and any of them can be reordered, hidden or
 * rewritten from Kenya B. Studio without touching this file.
 */
export default function MeetKenyaPage() {
  const { hero, sections, timeline } = meetKenya;
  const portraitSrc = resolveMedia(hero.portrait.slot);
  const backdropSrc = resolveMedia(hero.backdrop.slot);
  const visible = sections.filter((section) => !section.hidden);

  return (
    <>
      {/* Hero — Kenya, not a gown model */}
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink lg:min-h-screen">
        {backdropSrc ? (
          <Image
            src={backdropSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%] opacity-25 animate-kenburns"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/92 to-ink/70" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink to-transparent" />

        <div className="relative mx-auto grid w-full max-w-editorial items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1fr_20rem] lg:gap-20 lg:px-12">
          <div className="flex flex-col gap-8">
            <p className="animate-fade text-[0.6rem] uppercase tracking-luxe text-champagne">
              {hero.eyebrow}
            </p>

            <h1 className="display-caps animate-rise text-[2.9rem] text-bone sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>

            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {hero.roles.map((role, index) => (
                <li
                  key={role}
                  style={{ animationDelay: `${180 + index * 90}ms` }}
                  className="animate-rise font-display text-xl italic text-champagne-light sm:text-2xl"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1 border-l-2 border-champagne/50 pl-6">
              {hero.lede.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-bone/70 sm:text-base">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Portrait shown at its true size so it stays sharp */}
          {portraitSrc ? (
            <div className="relative mx-auto w-[15rem] sm:w-[17rem] lg:mx-0 lg:w-full">
              <span
                aria-hidden
                className="absolute -inset-3 border border-champagne/30"
              />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={portraitSrc}
                  alt={hero.portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 304px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {visible.map((section, index) => (
        <StorySectionBlock key={section.id} section={section} index={index} />
      ))}

      {/* Journey timeline */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal>
            <StoryTimeline
              entries={timeline.entries}
              eyebrow={timeline.eyebrow}
              headline={timeline.headline}
            />
          </Reveal>
        </div>
      </section>

      {/* Close */}
      <section className="bg-ink pb-20 lg:pb-28">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-col items-center gap-8 border-t border-bone/10 pt-16 text-center">
            <div className="flex flex-col gap-3">
              <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
                Kenya Buchanan
              </p>
              <p className="display-caps text-4xl text-bone sm:text-5xl">
                It&rsquo;s more than a gown.
              </p>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-bone/60">
              It&rsquo;s the dream. The journey. The woman wearing it. And the moment she&rsquo;ll
              never forget.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/collections"
                className="group inline-flex items-center justify-center gap-3 bg-champagne px-9 py-4 text-[0.68rem] uppercase tracking-wide2 text-ink transition-all duration-500 ease-silk hover:bg-bone"
              >
                Explore Her Work
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center border border-bone/35 px-9 py-4 text-[0.68rem] uppercase tracking-wide2 text-bone transition-all duration-500 hover:border-bone hover:bg-bone/10"
              >
                Begin Your Experience
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Renders one story section according to its type and layout. */
function StorySectionBlock({ section, index }: { section: StorySection; index: number }) {
  const tone = section.tone;
  const media = section.media ?? [];
  const imageFirst = section.layout === "image-left";

  /* Full-bleed gallery section */
  if (section.layout === "full" && section.type === "gallery") {
    return (
      <section className={cx(surface[tone], "py-16 lg:py-24")}>
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              {section.eyebrow ? <Eyebrow tone={tone}>{section.eyebrow}</Eyebrow> : null}
              <Headline tone={tone} lines={section.headline} className="text-4xl sm:text-5xl" />
            </div>
            <Body tone={tone} paragraphs={section.body} />
          </Reveal>

          <Reveal delay={120} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {media.map((item, position) => (
              <StoryImage
                key={item.slot}
                media={item}
                tone={tone}
                sizes="(max-width: 1024px) 45vw, 30vw"
                className={cx(
                  "[&>div]:aspect-[3/4]",
                  position === 1 && "lg:mt-12",
                  position === 2 && "col-span-2 lg:col-span-1 [&>div]:aspect-[4/3] lg:[&>div]:aspect-[3/4]",
                )}
              />
            ))}
          </Reveal>

          {section.milestones ? (
            <Reveal delay={180} className="mt-14 border-t border-current/10 pt-10">
              <MilestoneRail milestones={section.milestones} tone={tone} />
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  /* Closing plate */
  if (section.type === "closing") {
    const src = media[0] ? resolveMedia(media[0].slot) : undefined;
    return (
      <section className="relative isolate overflow-hidden bg-ink py-24 lg:py-32">
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[50%_18%] opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />
        <Reveal className="relative mx-auto flex max-w-editorial flex-col items-center gap-6 px-5 text-center sm:px-8 lg:px-12">
          <Headline tone="dark" lines={section.headline} className="text-3xl sm:text-4xl" />
          {section.statement ? (
            <p className="display-caps text-4xl text-champagne sm:text-5xl lg:text-6xl">
              {section.statement.join(" ")}
            </p>
          ) : null}
          <Body tone="dark" paragraphs={section.body} className="max-w-xl text-center" />
        </Reveal>
      </section>
    );
  }

  /* Centred dramatic section (the turning point) */
  if (section.layout === "centered") {
    return (
      <section className={cx(surface[tone], "py-20 lg:py-28")}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-5 text-center sm:px-8">
          {section.eyebrow ? (
            <Reveal>
              <Eyebrow tone={tone}>{section.eyebrow}</Eyebrow>
            </Reveal>
          ) : null}

          {section.statement ? (
            <Reveal delay={80}>
              <p className="display-caps text-3xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
                {section.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={140}>
            <Body tone={tone} paragraphs={section.body} className="max-w-2xl text-center" />
          </Reveal>

          {section.quote ? (
            <Reveal delay={200} className="mt-4 flex flex-col items-center gap-5 border-t border-bone/15 pt-10">
              <span aria-hidden className="font-display text-4xl leading-none text-champagne">
                &ldquo;
              </span>
              <blockquote className="max-w-3xl font-display text-2xl italic leading-snug text-bone sm:text-3xl lg:text-4xl">
                {section.quote.text}
              </blockquote>
              <p className="text-[0.58rem] uppercase tracking-luxe text-champagne">
                {section.quote.attribution}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  /* Alternating image / story sections */
  return (
    <section className={cx(surface[tone], "py-16 lg:py-24")}>
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div
          className={cx(
            "grid items-center gap-10 lg:gap-16",
            media.length > 1 ? "lg:grid-cols-[1.05fr_1fr]" : "lg:grid-cols-2",
          )}
        >
          <Reveal
            className={cx(
              "flex flex-col gap-4",
              imageFirst ? "lg:order-1" : "lg:order-2",
              media.length > 1 && "grid grid-cols-2 gap-4",
            )}
          >
            {media.map((item, position) => (
              <StoryImage
                key={item.slot}
                media={item}
                tone={tone}
                priority={index === 0}
                sizes={media.length > 1 ? "(max-width: 1024px) 45vw, 26vw" : "(max-width: 1024px) 90vw, 45vw"}
                className={cx(
                  "[&>div]:aspect-[3/4]",
                  media.length > 1 && position === 1 && "mt-8",
                )}
              />
            ))}
          </Reveal>

          <Reveal
            delay={120}
            className={cx("flex flex-col gap-6", imageFirst ? "lg:order-2" : "lg:order-1")}
          >
            {section.eyebrow ? <Eyebrow tone={tone}>{section.eyebrow}</Eyebrow> : null}
            <Headline tone={tone} lines={section.headline} className="text-3xl sm:text-4xl lg:text-5xl" />
            <Body tone={tone} paragraphs={section.body} />

            {section.statement ? (
              <p
                className={cx(
                  "display-caps mt-2 border-t pt-6 text-2xl sm:text-3xl",
                  tone === "dark" ? "border-bone/15 text-champagne" : "border-ink/10 text-champagne-deep",
                )}
              >
                {section.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : null}

            {section.milestones ? (
              <div className={cx("mt-2 border-t pt-7", tone === "dark" ? "border-bone/15" : "border-ink/10")}>
                <MilestoneRail milestones={section.milestones} tone={tone} />
              </div>
            ) : null}

            {section.cta ? (
              <Link
                href={section.cta.href}
                className={cx(
                  "group mt-2 inline-flex w-fit items-center gap-3 border px-8 py-4 text-[0.66rem] uppercase tracking-wide2 transition-all duration-500 ease-silk",
                  tone === "dark"
                    ? "border-bone/35 text-bone hover:bg-bone hover:text-ink"
                    : "border-ink/25 text-ink hover:bg-ink hover:text-bone",
                )}
              >
                {section.cta.label}
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children, tone }: { children: string; tone: StoryTone }) {
  return (
    <p
      className={cx(
        "text-[0.6rem] uppercase tracking-luxe",
        tone === "dark" ? "text-champagne" : "text-champagne-deep",
      )}
    >
      {children}
    </p>
  );
}

function Headline({
  lines,
  tone,
  className,
}: {
  lines?: string[];
  tone: StoryTone;
  className?: string;
}) {
  if (!lines?.length) return null;
  return (
    <h2 className={cx("display-caps", heading[tone], className)}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  );
}

function Body({
  paragraphs,
  tone,
  className,
}: {
  paragraphs?: string[];
  tone: StoryTone;
  className?: string;
}) {
  if (!paragraphs?.length) return null;
  return (
    <div className={cx("flex max-w-xl flex-col gap-4", className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className={cx("text-sm leading-relaxed sm:text-[0.95rem]", bodyText[tone])}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
