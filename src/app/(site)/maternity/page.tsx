import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JourneyPreview } from "@/components/journey/JourneyPreview";
import { LookTriptych } from "@/components/site/LookTriptych";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveMedia } from "@/config/media";
import { getExperience } from "@/lib/services";

export const metadata: Metadata = {
  title: "Maternity",
  description:
    "The Kenya B. Maternity experience — a gown designed for the body you have now, built to drape, move and photograph.",
};

const maternity = getExperience("maternity")!;

export default function MaternityPage() {
  const heroSrc = resolveMedia("maternity-hero");

  return (
    <>
      {/*
       * Maternity opens warm rather than black. The photograph is not put in a
       * frame — it bleeds in from the right and dissolves into the page, so the
       * gown and the paper are one surface rather than a picture sitting on a
       * background.
       */}
      <section className="relative isolate overflow-hidden bg-ivory">
        <div className="relative mx-auto grid w-full max-w-editorial items-center gap-8 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-14 lg:px-12 lg:pb-20 lg:pt-32">
          <div className="flex max-w-xl flex-col gap-6">
            <p className="animate-fade text-[0.6rem] uppercase tracking-luxe text-champagne-deep">
              The Maternity Experience
            </p>
            <h1 className="display-caps animate-rise text-[2.9rem] text-ink sm:text-6xl lg:text-7xl">
              Maternity
            </h1>
            <p className="animate-rise font-display text-xl italic leading-snug text-ink/70 sm:text-2xl">
              {maternity.tagline}
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-ink/60">{maternity.description}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/enroll/maternity" size="lg">
                Book Maternity
              </Button>
              <Button href="/book" variant="outline" size="lg">
                Other Experiences
              </Button>
            </div>
          </div>

          {/*
           * No frame and no crop: the whole gown is there, and the picture
           * dissolves into the page on its left and along its top and bottom.
           */}
          {heroSrc ? (
            <div className="relative order-first mx-auto h-[19rem] w-[19rem] max-w-full sm:h-[22rem] sm:w-[22rem] lg:order-2 lg:mx-0 lg:h-[26rem] lg:w-[26rem]">
              <Image
                src={heroSrc}
                alt="Chocolate tulle maternity gown with a ruffled train"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 26rem"
                className="fade-into-page object-contain object-center"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Editorial pair */}
      <Section size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal className="grid grid-cols-2 gap-4">
            <MediaFrame
              slot={{ id: "maternity-1", alt: "Fuchsia maternity gown with puff sleeves", ratio: "portrait" }}
              focal="face"
              sizes="(max-width: 1024px) 45vw, 26vw"
            />
            <MediaFrame
              slot={{ id: "maternity-2", alt: "Maternity gown in the garden", ratio: "portrait" }}
              focal="face"
              className="mt-10"
              sizes="(max-width: 1024px) 45vw, 26vw"
            />
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Designed for now"
              title={<>A gown for the body<br />you have today.</>}
              lede="Maternity is its own discipline. The silhouette celebrates the bump rather than hiding it, the fabric is chosen to drape and move, and the fittings are scheduled close to your date — because your body is still changing."
            />
            <dl className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {[
                ["Appointments", `${maternity.config.minimumAppointments} minimum`],
                ["Fittings", "Scheduled close to your date"],
                ["Inspiration", `${maternity.config.inspirationUploadsMin}–${maternity.config.inspirationUploadsMax} images`],
                ["Approvals", "Design, colour and fabric"],
              ].map(([label, value]) => (
                <div key={label} className="bg-bone p-6">
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-3 font-display text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Occasions */}
      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal delay={100} className="flex flex-col gap-8 lg:order-2">
            <SectionHeading
              tone="light"
              eyebrow="The occasions"
              title="Every moment worth photographing."
              lede="Maternity shoots, baby showers, gender reveals and the celebrations around them — dressed properly."
            />
            <ul className="grid gap-px bg-bone/10 sm:grid-cols-2">
              {[
                ["Maternity Shoots", "Built to move for the camera"],
                ["Baby Showers", "Dressed for the room"],
                ["Gender Reveals", "Colour with intention"],
                ["Announcements", "The photograph you keep"],
              ].map(([title, body]) => (
                <li key={title} className="bg-ink p-6">
                  <p className="font-display text-xl text-bone">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/55">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:order-1">
            <MediaFrame
              slot={{ id: "maternity-3", alt: "Maternity celebration in a fuchsia gown", ratio: "portrait", tone: "dark" }}
              focal="face"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* Journey */}
      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="The Maternity Journey"
            title="From consultation to the day itself."
            lede="The same journey engine that runs Prom and Bridal, configured for maternity — with fittings timed around your date."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <JourneyPreview stages={maternity.journeyTemplate} />
        </Reveal>
      </Section>

      {/* Maternity Ideas — the library, to bring to a consultation. */}
      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Maternity Ideas"
            title="Bring one of these, or bring your own."
            lede="Silhouettes, colours and fabrics Kenya has built before. Save the ones that speak to you — they are the starting point for your consultation, not a catalogue to order from."
            action={
              <Button href="/enroll/maternity" variant="outline">
                Book Maternity
              </Button>
            }
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          {/*
           * The five untitled frames. The numbered set keeps its own section at
           * the foot of the page, so nothing is shown twice.
           */}
          <LookTriptych
            looks={[
              { id: "maternity-idea-1", alt: "Blush maternity gown on the stone steps" },
              { id: "maternity-idea-2", alt: "Blush maternity gown with a flowing skirt" },
              { id: "maternity-idea-3", alt: "Fuchsia maternity gown with puff sleeves" },
              { id: "maternity-idea-4", alt: "Blush maternity gown in the garden" },
              { id: "maternity-idea-5", alt: "Fuchsia maternity celebration gown" },
            ]}
          />
        </Reveal>
      </Section>

      {/* The three looks — each frame carries its own title, so none is cropped. */}
      <Section tone="ink" size="lg">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="Three looks"
            title="One shoot. Three ways to be dressed."
            lede="Kenya builds a maternity look around how you want the photographs to feel — soft, luminous or unmistakably bold."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <LookTriptych
            looks={[
              { id: "maternity-look-1", alt: "One, Elegance — chocolate tulle maternity gown with a ruffled train", tone: "dark" },
              { id: "maternity-look-2", alt: "Two, Goddess Glow — ivory lace maternity gown with a sheer overskirt", tone: "dark" },
              { id: "maternity-look-3", alt: "Three, Bold Beauty — black one-shoulder maternity gown with a flowing train", tone: "dark" },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="display-caps max-w-2xl text-4xl text-bone text-balance sm:text-5xl">
            Tell Kenya when you are due.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/enroll/maternity" variant="light" size="lg">
              Book Maternity
            </Button>
            <Link
              href="/collections"
              className="px-9 py-4 text-[0.7rem] uppercase tracking-wide2 text-bone/60 transition-colors duration-500 hover:text-bone"
            >
              See the Work
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
