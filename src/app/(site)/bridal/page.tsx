import type { Metadata } from "next";
import { JourneyPreview } from "@/components/journey/JourneyPreview";
import { PageHero } from "@/components/site/PageHero";
import { PartnerCard } from "@/components/site/PartnerCard";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperience, partners } from "@/lib/services";

export const metadata: Metadata = {
  title: "Bridal",
  description: "The Kenya B. Bridal experience — a gown built by hand for one day and one person.",
};

const bridal = getExperience("bridal")!;

export default function BridalPage() {
  const bridalPartners = partners.filter((partner) => bridal.partnerCategories.includes(partner.category));

  return (
    <>
      <PageHero
        eyebrow="The Bridal Experience"
        media={{ id: "bridal-hero", alt: "Bride on the staircase in an ivory lace gown with a cathedral train", ratio: "tall" }}
        title="Bridal"
        subtitle="The gown you will be remembered in."
        size="tall"
        actions={
          <>
            <Button href="/book" variant="light" size="lg">
              Request a Consultation
            </Button>
          </>
        }
      />

      <Section size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Unhurried by design"
              title="Bridal runs on its own clock."
              lede={bridal.description}
            />
            <dl className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {[
                ["Timeline", "9–14 months preferred"],
                ["Fittings", `${bridal.config.minimumAppointments} minimum`],
                ["Approvals", "Design, colour and fabric — optional per bride"],
                ["Inspiration", `${bridal.config.inspirationUploadsMin}–${bridal.config.inspirationUploadsMax} images`],
              ].map(([label, value]) => (
                <div key={label} className="bg-bone p-6">
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-3 font-display text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4 lg:gap-6">
            <MediaFrame slot={{ id: "bridal-1", alt: "Bridal bodice, hand-beaded detail", ratio: "portrait" }} sizes="30vw" />
            <MediaFrame slot={{ id: "bridal-2", alt: "Bridal train on the studio floor", ratio: "portrait" }} className="mt-12" sizes="30vw" />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="The Bridal Journey"
            title="From the first conversation to the aisle."
            lede="The same journey engine that runs Prom, configured for a bride — with the stages, approvals and fittings bridal actually needs."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <JourneyPreview stages={bridal.journeyTemplate} />
        </Reveal>
      </Section>

      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal delay={100} className="flex flex-col gap-8 lg:order-2">
            <SectionHeading
              tone="light"
              eyebrow="Sourcing"
              title="Some materials are worth the trip."
              lede="Bridal frequently calls for specialty lace, silk and beading. Kenya sources from Atlanta, New York, other U.S. markets and international suppliers when the design asks for it."
            />
          </Reveal>
          <Reveal className="lg:order-1">
            <MediaFrame
              slot={{
                id: "bridal-sourcing",
                alt: "Kenya's sourcing markets — the New York garment district, Atlanta textile houses and international suppliers",
                ratio: "landscape",
                tone: "dark",
              }}
              natural
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Kenya B. Preferred"
            title="For the rest of the day."
            action={
              <Button href="/partners" variant="outline">
                All Partners
              </Button>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {bridalPartners.slice(0, 3).map((partner, index) => (
            <Reveal key={partner.id} delay={index * 100}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl">
            Tell Kenya about your day.
          </h2>
          <Button href="/book" variant="light" size="lg">
            Request a Consultation
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
