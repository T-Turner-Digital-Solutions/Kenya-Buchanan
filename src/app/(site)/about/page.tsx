import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "Kenya Buchanan — luxury custom fashion designer. It's More Than a Gown.",
};

const philosophy = [
  {
    title: "Measured for one person",
    body: "Nothing is pulled off a rack and altered. Your gown is drafted to your measurements from the beginning.",
  },
  {
    title: "The process is the product",
    body: "Inspiration, design, sourcing, construction, fittings. Each stage has a purpose, and you are walked through all of them.",
  },
  {
    title: "Sourced, not settled for",
    body: "When a design calls for a material Kenya cannot get locally, she goes and finds it.",
  },
  {
    title: "Say it at the fitting",
    body: "There is a designated moment to raise questions and requested changes — and Kenya would rather hear them then than after.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Designer"
        media={{ id: "about-hero", alt: "Kenya Buchanan portrait in the studio", ratio: "landscape" }}
        title="Kenya Buchanan"
        subtitle={brand.motto}
        size="tall"
      />

      <Section size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow>Her Work</Eyebrow>
            <p className="font-display text-3xl leading-[1.15] text-balance sm:text-4xl">
              Kenya Buchanan builds gowns by hand for the person who will wear them.
            </p>
            <div className="flex flex-col gap-5 text-sm leading-relaxed text-ink/65">
              <p>
                Every Kenya B. gown begins with a conversation and a set of measurements — not a
                sample size. From there the work is patterning, sourcing, construction and fitting,
                in that order, with the client brought along the whole way.
              </p>
              <p>
                Kenya works across prom, bridal and custom commissions. The occasions differ; the
                standard does not. The gown has to fit, it has to move, and it has to feel like the
                person wearing it decided something about herself.
              </p>
              <p>
                That is what &ldquo;{brand.motto}&rdquo; means. The gown is the object. What it does
                for the woman in it is the work.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <figure className="flex flex-col gap-4">
              <MediaFrame
                slot={{ id: "kenya-portrait", alt: "Kenya Buchanan", ratio: "portrait" }}
                className="w-full max-w-[18rem]"
                sizes="(max-width: 640px) 70vw, 288px"
              />
              <figcaption className="flex flex-col gap-1">
                <span className="font-display text-xl leading-none">Kenya Buchanan</span>
                <span className="text-[0.55rem] uppercase tracking-luxe text-ink/40">
                  Designer &amp; Founder
                </span>
              </figcaption>
            </figure>
            <MediaFrame
              slot={{ id: "about-detail", alt: "Hand-finished detail from the studio", ratio: "landscape" }}
              className="max-w-md"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" size="lg">
        <Reveal>
          <SectionHeading tone="light" eyebrow="Philosophy" title="How the house works." />
        </Reveal>
        <div className="mt-14 grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:mt-20">
          {philosophy.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="bg-ink p-8 lg:p-10">
              <p className="font-display text-2xl leading-snug text-bone">{item.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-bone/55">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep" size="lg">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>{brand.community}</Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] text-balance sm:text-5xl">
            Every season, a new group of women walk in wearing something made only for them.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/collections" variant="ink" size="lg">
              See the Work
            </Button>
            <Button href="/book" variant="outline" size="lg">
              Begin Your Experience
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
