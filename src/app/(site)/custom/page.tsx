import type { Metadata } from "next";
import { JourneyPreview } from "@/components/journey/JourneyPreview";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperience } from "@/lib/services";

export const metadata: Metadata = {
  title: "Custom",
  description: "Custom design by Kenya Buchanan — for galas, pageants, milestones and red carpets.",
};

const custom = getExperience("custom")!;

const occasions = [
  { title: "Galas & Benefits", body: "Entrances that photograph and hold a room." },
  { title: "Pageants", body: "Built for stage, lighting and movement." },
  { title: "Milestone Birthdays", body: "The number deserves a gown." },
  { title: "Red Carpet & Press", body: "One of one, for the moment it is made for." },
  { title: "Mother of the Bride", body: "Considered, not an afterthought." },
  { title: "Something Else Entirely", body: "If it has no category, it is Custom." },
];

export default function CustomPage() {
  return (
    <>
      <PageHero
        eyebrow="The Custom Experience"
        media={{ id: "custom-hero", alt: "Custom evening gown, editorial portrait", ratio: "landscape" }}
        title="Custom"
        subtitle="For the occasions that deserve their own design."
        size="tall"
        actions={
          <Button href="/book" variant="light" size="lg">
            Start a Custom Design
          </Button>
        }
      />

      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="What Custom Covers"
            title="One of one, for one night."
            lede={custom.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {occasions.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="bg-bone p-8">
              <p className="font-display text-xl leading-snug">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <MediaFrame
              slot={{ id: "custom-editorial", alt: "Custom gown under studio light", ratio: "portrait", tone: "dark" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-8">
            <SectionHeading
              tone="light"
              eyebrow="How it works"
              title="Kenya shapes the process around the occasion."
              lede="Custom experiences are templates. A pageant client and a gala client move through different stages, different approvals and different timelines — Kenya decides which, per client."
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="A Custom Journey"
            title="The shape of a commission."
            lede="A starting template. Stages, approvals and appointments are configured per client in Kenya B. Studio."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <JourneyPreview stages={custom.journeyTemplate} />
        </Reveal>
      </Section>

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl">
            Tell Kenya what the occasion is.
          </h2>
          <Button href="/book" variant="light" size="lg">
            Begin Your Experience
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
