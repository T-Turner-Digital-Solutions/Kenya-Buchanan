import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatCurrency } from "@/lib/format";
import { experiences } from "@/lib/services";

export const metadata: Metadata = { title: "Experiences" };

/**
 * EXPERIENCES.
 *
 * The architecture's centre of gravity. Adding "Quinceañera" or "Pageant" later
 * is a new experience record with its own journey template, contract template,
 * approvals and partner categories — not a new application.
 */
export default function StudioExperiencesPage() {
  return (
    <div className="flex flex-col gap-8">
      {experiences.map((experience) => (
        <Panel
          key={experience.slug}
          title={experience.name}
          note={experience.seasonal ? "Seasonal · capped enrolment" : "Year-round"}
          action={
            <div className="flex items-center gap-3">
              <StatusPill tone="dark">{experience.status}</StatusPill>
              <Button variant="light" size="sm">
                Edit
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-7">
            <p className="max-w-2xl text-sm leading-relaxed text-bone/65">
              {experience.description}
            </p>

            <dl className="grid gap-6 border-t border-bone/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [experience.config.depositLabel, experience.config.depositAmountCents
                  ? formatCurrency(experience.config.depositAmountCents)
                  : "At consultation"],
                ["Journey stages", String(experience.journeyTemplate.length)],
                ["Minimum appointments", String(experience.config.minimumAppointments)],
                ["Inspiration uploads", `${experience.config.inspirationUploadsMin}–${experience.config.inspirationUploadsMax}`],
                ["Client rescheduling", experience.config.clientReschedulingEnabled ? "On" : "Off"],
                ["Ask Kenya B.", experience.config.aiAssistantEnabled ? "On" : "Off"],
                ["Approvals available", String(experience.config.availableApprovals.length)],
                ["Partner categories", String(experience.partnerCategories.length)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.55rem] uppercase tracking-luxe text-bone/40">{label}</dt>
                  <dd className="mt-2 text-sm text-bone/85">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-2 border-t border-bone/10 pt-6">
              <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Journey template</p>
              <div className="flex flex-col">
                {experience.journeyTemplate.map((stage, index) => (
                  <Row key={`${stage.key}-${index}`}>
                    <span className="flex items-center gap-4">
                      <span className="font-display text-sm text-bone/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-bone/85">{stage.title}</span>
                    </span>
                    {stage.optional ? (
                      <StatusPill tone="muted">Optional</StatusPill>
                    ) : (
                      <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/25">
                        Required
                      </span>
                    )}
                  </Row>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      ))}

      <Panel title="Add an experience">
        <div className="flex flex-col gap-4">
          <p className="max-w-2xl text-sm leading-relaxed text-bone/65">
            A new experience type — quinceañera, pageant, mother of the bride, anything — is a new
            record with its own journey, agreement, approvals and partner categories. Nothing in
            the application is specific to Prom.
          </p>
          <Button variant="light" size="sm" className="self-start">
            New Experience
          </Button>
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — experiences are defined in code for this build. Owner creation and
        editing of experiences, journeys and approvals is the Phase 2 configuration layer.
      </StudioNotice>
    </div>
  );
}
