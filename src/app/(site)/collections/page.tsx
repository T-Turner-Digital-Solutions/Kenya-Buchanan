import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/site";

export const metadata: Metadata = {
  title: "Collections",
  description: "The Kenya B. Collection — seasons, commissions and one-of-one pieces.",
};

const collections = [
  {
    name: "Prom 2026",
    note: "Reveal Night",
    pieces: [
      { id: "col-2026-1", alt: "Beaded column gown", ratio: "tall" as const },
      { id: "col-2026-2", alt: "Full tulle skirt in motion", ratio: "portrait" as const },
      { id: "col-2026-3", alt: "Structured mermaid silhouette", ratio: "portrait" as const },
      { id: "col-2026-4", alt: "Hand-beaded bodice detail", ratio: "portrait" as const },
    ],
  },
  {
    name: "Bridal",
    note: "Selected commissions",
    pieces: [
      { id: "col-bridal-1", alt: "Bridal gown with cathedral train", ratio: "portrait" as const },
      { id: "col-bridal-2", alt: "Hand-beaded bridal bodice", ratio: "tall" as const },
      { id: "col-bridal-3", alt: "Bridal gown on the staircase", ratio: "portrait" as const },
      { id: "col-bridal-4", alt: "Blush bridal gown with detachable overskirt", ratio: "portrait" as const },
    ],
  },
  {
    name: "Maternity",
    note: "Shoots, showers and reveals",
    pieces: [
      { id: "col-maternity-1", alt: "Maternity gown on the stone steps", ratio: "portrait" as const },
      { id: "col-maternity-2", alt: "Fuchsia maternity gown with puff sleeves", ratio: "portrait" as const },
      { id: "col-maternity-3", alt: "Maternity gown with a flowing skirt", ratio: "tall" as const },
      { id: "col-maternity-4", alt: "Maternity celebration in a fuchsia gown", ratio: "portrait" as const },
    ],
  },
  {
    name: "Custom",
    note: "Galas, pageants and press",
    pieces: [
      { id: "col-custom-1", alt: "Fuchsia beaded gown with an orange satin train", ratio: "portrait" as const },
      { id: "col-custom-2", alt: "Black beaded gown with a feather collar", ratio: "portrait" as const },
      { id: "col-custom-3", alt: "Fuchsia and orange gown on the marble steps", ratio: "tall" as const },
      { id: "col-custom-4", alt: "Fuchsia beaded gown by candlelight", ratio: "portrait" as const },
    ],
  },
];

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow={brand.collection}
        media={{ id: "collections-hero", alt: "Collection gowns on the studio rail", ratio: "landscape" }}
        title="Collections"
        subtitle="The work, season by season."
        size="mid"
      />

      {collections.map((collection, collectionIndex) => (
        <Section key={collection.name} tone={collectionIndex % 2 === 0 ? "bone" : "deep"} size="lg">
          <Reveal>
            <SectionHeading eyebrow={collection.note} title={collection.name} />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {collection.pieces.map((piece, index) => (
              <Reveal
                key={piece.id}
                delay={index * 90}
                className={index % 2 === 1 ? "lg:mt-14" : undefined}
              >
                <MediaFrame slot={piece} sizes="(max-width: 1024px) 50vw, 25vw" />
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl">
            The next one could be yours.
          </h2>
          <Button href="/book" variant="light" size="lg">
            Begin Your Experience
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
