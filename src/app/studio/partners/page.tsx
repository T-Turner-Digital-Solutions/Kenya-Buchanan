import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { experiences, partnerCategories, partners } from "@/lib/services";

export const metadata: Metadata = { title: "Partners" };

export default function StudioPartnersPage() {
  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Partner categories"
        note="Enable or disable per experience"
        action={<Button variant="light" size="sm">Add Category</Button>}
      >
        <div className="flex flex-col">
          {partnerCategories.map((category) => {
            const enabledFor = experiences
              .filter((experience) => experience.partnerCategories.includes(category.key))
              .map((experience) => experience.name);

            return (
              <Row key={category.key}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">{category.label}</span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    Shown to clients as &ldquo;{category.clientLabel}&rdquo;
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-champagne/70">
                    {enabledFor.length > 0 ? enabledFor.join(" · ") : "Not enabled"}
                  </span>
                  <StatusPill tone="dark">{category.status}</StatusPill>
                </span>
              </Row>
            );
          })}
        </div>
      </Panel>

      <Panel
        title="Preferred partners"
        note={`${partners.length} on the list`}
        action={<Button variant="light" size="sm">Add Partner</Button>}
      >
        <div className="flex flex-col">
          {partners.map((partner) => (
            <Row key={partner.id}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{partner.name}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {partner.category.replace("_", " ")} · {partner.city}
                </span>
              </span>
              <span className="flex items-center gap-3">
                {partner.preferred ? <StatusPill tone="attention">Kenya B. Preferred</StatusPill> : null}
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone">
                  Hide
                </button>
              </span>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — partners are fictional placeholders. Partner booking, referral tracking
        and contact are not implemented.
      </StudioNotice>
    </div>
  );
}
