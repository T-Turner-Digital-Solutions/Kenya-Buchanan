import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { meetKenya } from "@/data/meetKenya";

export const metadata: Metadata = { title: "Website Content" };

const editable = [
  ["Homepage hero", "KENYA BUCHANAN · It's More Than a Gown.", "Published"],
  ["Site announcement", "None active", "Hidden"],
  ["Prom page copy", "Prom 2027 season", "Published"],
  ["Bridal page copy", "The Bridal Experience", "Published"],
  ["Custom page copy", "The Custom Experience", "Published"],
  ["Meet Kenya", `${meetKenya.sections.length} sections · ${meetKenya.timeline.entries.length} timeline moments`, "Published"],
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

      <Panel
        title="Meet Kenya"
        note="Kenya's story — every section is a record, not layout"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="light" size="sm">Add Section</Button>
            <Button variant="light" size="sm">Add Milestone</Button>
          </div>
        }
      >
        <div className="flex flex-col">
          {meetKenya.sections.map((section, index) => (
            <Row key={section.id}>
              <span className="flex items-center gap-4">
                <span className="font-display text-sm text-bone/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">
                    {section.headline?.join(" ") ?? section.statement?.join(" ") ?? section.id}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {section.type} · {section.tone}
                    {section.milestones ? ` · ${section.milestones.length} milestones` : ""}
                    {section.media ? ` · ${section.media.length} images` : ""}
                    {section.media?.some((item) => item.awaitingUpload)
                      ? " · awaiting photography"
                      : ""}
                  </span>
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-3">
                <StatusPill tone={section.hidden ? "muted" : "dark"}>
                  {section.hidden ? "Hidden" : "Visible"}
                </StatusPill>
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone">
                  Reorder
                </button>
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone">
                  {section.hidden ? "Show" : "Hide"}
                </button>
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-champagne hover:text-bone">
                  Edit
                </button>
              </span>
            </Row>
          ))}
        </div>

        <div className="mt-6 border-t border-bone/10 pt-6">
          <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">Journey timeline</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {meetKenya.timeline.entries.map((entry) => (
              <span
                key={entry.id}
                className="border border-bone/15 px-3 py-2 text-[0.58rem] uppercase tracking-wide2 text-bone/60"
              >
                {entry.marker} · {entry.title}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — controls are not wired to a store yet. Meet Kenya is already
        structured as editable content (src/data/meetKenya.ts): sections, headings, narrative,
        milestones, timeline moments and photography are records, so adding Kenya&rsquo;s own
        biography, awards, press, shows and community work is a content change rather than a
        developer change.
      </StudioNotice>
    </div>
  );
}
