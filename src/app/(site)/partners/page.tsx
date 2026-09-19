import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { PartnerCard } from "@/components/site/PartnerCard";
import { Section } from "@/components/site/Section";
import { MockNotice } from "@/components/ui/MockNotice";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/site";
import { experiences, partnersByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Preferred Partners",
  description: "Kenya B. Preferred — the people Kenya trusts with the rest of your night.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow={brand.preferred}
        media={{ id: "partners-hero", alt: "Evening arrival, car and gown", ratio: "landscape" }}
        title="Complete Your Experience"
        subtitle="The gown is ours. Kenya keeps a short list for everything else."
        size="mid"
      />

      {experiences.map((experience, experienceIndex) => {
        const groups = partnersByCategory(experience.partnerCategories);
        // Client-facing groupings ("Your Ride", "Your Beauty") are collapsed by label.
        const grouped = groups.reduce<Record<string, typeof groups>>((acc, group) => {
          const key = group.category.clientLabel;
          acc[key] = acc[key] ? [...acc[key], group] : [group];
          return acc;
        }, {});

        return (
          <Section
            key={experience.slug}
            tone={experienceIndex % 2 === 0 ? "bone" : "deep"}
            size="lg"
          >
            <Reveal>
              <SectionHeading
                eyebrow={`${experience.name} · Kenya B. Preferred`}
                title={experience.slug === "prom" ? "Your gown. Your ride. Your photos. Your beauty." : `For ${experience.name.toLowerCase()} clients.`}
                lede="Kenya enables partner categories per experience — a bride and a prom client see different lists."
              />
            </Reveal>

            <div className="mt-14 flex flex-col gap-16 lg:mt-20">
              {Object.entries(grouped).map(([clientLabel, entries]) => {
                const list = entries.flatMap((entry) => entry.partners);
                if (list.length === 0) return null;
                return (
                  <div key={clientLabel} className="flex flex-col gap-8">
                    <div className="flex items-baseline gap-4 border-t border-ink/10 pt-6">
                      <h3 className="font-display text-2xl">{clientLabel}</h3>
                      <span className="text-[0.55rem] uppercase tracking-luxe text-ink/35">
                        {entries.map((entry) => entry.category.label).join(" · ")}
                      </span>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((partner, index) => (
                        <Reveal key={partner.id} delay={index * 80}>
                          <PartnerCard partner={partner} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        );
      })}

      <Section size="sm">
        <MockNotice>
          Phase 1 prototype — partners shown are fictional placeholders. Partner booking, referrals
          and contact are not implemented in this phase.
        </MockNotice>
      </Section>
    </>
  );
}
