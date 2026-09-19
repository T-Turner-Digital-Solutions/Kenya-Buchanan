import type { Metadata } from "next";
import { BookSelector } from "@/components/book/BookSelector";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { currentPromSeason, experiences } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book",
  description: "Begin your Kenya B. experience — prom, bridal or custom.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Begin"
        media={{ id: "book-hero", alt: "Studio entrance with gowns on the rail", ratio: "landscape" }}
        title="Begin Your Experience"
        subtitle="Start by choosing how you want to be dressed."
        size="mid"
      />

      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Step One"
            title="Which experience?"
            lede="Prom runs as a capped season. Bridal and custom commissions begin with a consultation."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14 lg:mt-20">
          <BookSelector experiences={experiences} promSeason={currentPromSeason} />
        </Reveal>
      </Section>

      <Section tone="deep" size="md">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="eyebrow">Already a client?</p>
          <h2 className="max-w-xl font-display text-3xl leading-tight text-balance sm:text-4xl">
            Your account has everything.
          </h2>
          <Button href="/portal/login" variant="outline" size="lg">
            Log In To My Kenya B.
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
