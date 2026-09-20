import type { Metadata } from "next";
import { JourneyPreview } from "@/components/journey/JourneyPreview";
import { PromSeasonStates } from "@/components/prom/PromSeasonStates";
import { PageHero } from "@/components/site/PageHero";
import { PartnerCard } from "@/components/site/PartnerCard";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrency } from "@/lib/format";
import {
  currentPromSeason,
  getExperience,
  partners,
  promSeason2027Full,
  promSeason2028,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Prom",
  description:
    "The Kenya B. Prom experience — a capped season of custom gowns. A Prom Spot is acceptance into the season.",
};

const prom = getExperience("prom")!;

const included = [
  { title: "A spot in the season", body: "Acceptance into the season, held for you from the moment your deposit is received." },
  { title: "A gown built for you", body: "Measured, drafted, sourced and finished for your body and your night." },
  { title: "At least three appointments", body: "Measurements and design, Fitting #2, and your final fitting before release." },
  { title: "My Kenya B.", body: "Your private account — journey, appointments, approvals, payments and messages." },
];

export default function PromPage() {
  const promPartners = partners.filter((partner) => prom.partnerCategories.includes(partner.category));

  return (
    <>
      <PageHero
        eyebrow={`Kenya B. ${currentPromSeason.name}`}
        media={{ id: "prom-hero", alt: "Red lace prom gown with a feather hem", ratio: "landscape" }}
        title="Prom"
        subtitle="One season. A limited number of gowns."
        size="tall"
      />

      <PromSeasonStates
        openSeason={currentPromSeason}
        fullSeason={promSeason2027Full}
        upcomingSeason={promSeason2028}
      />

      {/* What a Prom Spot is */}
      <Section id="what-a-spot-is" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="What a Prom Spot is"
            title={<>A spot is acceptance,<br />not an appointment.</>}
            lede={
              <>
                Kenya takes a limited number of prom clients each season so every gown gets the
                attention it needs. A {formatCurrency(currentPromSeason.depositCents)} deposit and a
                signed agreement secure your place in the season. Appointments come after.
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {included.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="bg-bone p-8">
              <p className="font-display text-xl leading-snug">{item.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="The Prom Journey"
            title="Ten stages, start to reveal."
            lede="Every stage lives in your account with what to expect, what Kenya needs from you and a message from Kenya where it helps."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <JourneyPreview stages={prom.journeyTemplate} />
        </Reveal>
      </Section>

      {/* Editorial break */}
      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <MediaFrame
              slot={{ id: "prom-editorial", alt: "Prom gown detail in movement", ratio: "portrait", tone: "dark" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-8">
            <SectionHeading
              tone="light"
              eyebrow="Kenya Dolls"
              title="You will know one when she walks in."
              lede="Every season Kenya dresses a group of young women who walk in knowing exactly what they are wearing and why. That is the point of the season."
            />
            <Button href="/collections" variant="light" className="self-start">
              See Past Seasons
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Partners */}
      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Kenya B. Preferred"
            title="Your gown. Your ride. Your photos. Your beauty."
            lede="Kenya keeps a short list of people she trusts with the rest of the night."
            action={
              <Button href="/partners" variant="outline">
                All Partners
              </Button>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {promPartners.slice(0, 3).map((partner, index) => (
            <Reveal key={partner.id} delay={index * 100}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl">
            Ready to claim your season?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/enroll/prom" variant="light" size="lg">
              Claim Your Prom Spot
            </Button>
            <Button href="/book" variant="ghost" size="lg" className="!text-bone/60 hover:!text-bone">
              Other Experiences
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
