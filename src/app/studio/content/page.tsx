import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";

export const metadata: Metadata = { title: "Website Content" };

const editable = [
  ["Homepage hero", "KENYA BUCHANAN · It's More Than a Gown.", "Published"],
  ["Site announcement", "None active", "Hidden"],
  ["Prom page copy", "Prom 2027 season", "Published"],
  ["Bridal page copy", "The Bridal Experience", "Published"],
  ["Custom page copy", "The Custom Experience", "Published"],
  ["About / Kenya's story", "The Designer", "Published"],
  ["Collections", "Prom 2026, Bridal, Custom", "Published"],
  ["Preferred partners", "Enabled per experience", "Published"],
  ["Photography", "34 files mapped", "Published"],
];

export default function StudioContentPage() {
  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Website content"
        note="Public site copy, imagery and announcements"
        action={<Button variant="light" size="sm">New Announcement</Button>}
      >
        <div className="flex flex-col">
          {editable.map(([label, detail, status]) => (
            <Row key={label}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{label}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">{detail}</span>
              </span>
              <span className="flex items-center gap-3">
                <StatusPill tone={status === "Published" ? "dark" : "muted"}>{status}</StatusPill>
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-champagne hover:text-bone">
                  Edit
                </button>
              </span>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — site copy and imagery live in the codebase for this build. Photography
        is swapped by mapping a file in the media manifest; owner editing arrives with the content
        layer in a later phase.
      </StudioNotice>
    </div>
  );
}
