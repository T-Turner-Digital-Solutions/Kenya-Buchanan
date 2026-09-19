import { LEGAL_PLACEHOLDER_NOTICE } from "@/data/contracts";
import { MockNotice } from "@/components/ui/MockNotice";
import type { ContractSection } from "@/lib/types";

/**
 * Renders contract text exactly as supplied. For a signed contract the caller
 * passes the stored snapshot, never the live template — that is what keeps an
 * executed agreement immutable when a template is later edited.
 */
export function ContractReview({
  sections,
  version,
  name,
  updatedLabel,
}: {
  sections: ContractSection[];
  version: string;
  name: string;
  updatedLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/10 pb-4">
        <p className="font-display text-xl">{name}</p>
        <p className="text-[0.55rem] uppercase tracking-luxe text-ink/40">
          Version {version}
          {updatedLabel ? ` · ${updatedLabel}` : ""}
        </p>
      </div>

      <MockNotice>{LEGAL_PLACEHOLDER_NOTICE}</MockNotice>

      <div className="flex max-h-[22rem] flex-col gap-6 overflow-y-auto border border-ink/10 p-6">
        {sections.map((section, index) => (
          <section key={section.heading} className="flex flex-col gap-2">
            <h4 className="text-[0.6rem] uppercase tracking-wide2 text-ink/50">
              {String(index + 1).padStart(2, "0")} · {section.heading}
            </h4>
            <p className="text-sm leading-relaxed text-ink/70">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
