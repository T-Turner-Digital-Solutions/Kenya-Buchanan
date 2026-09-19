import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { videos } from "@/lib/services";

export const metadata: Metadata = { title: "Videos" };

export default function StudioVideosPage() {
  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Video library"
        note="Messages from Kenya attached to journey stages and appointments"
        action={<Button variant="light" size="sm">Upload Video</Button>}
      >
        <div className="flex flex-col">
          {videos.map((video) => (
            <Row key={video.id}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{video.title}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {video.label} · {video.durationLabel}
                </span>
              </span>
              <StatusPill tone="attention">Not yet recorded</StatusPill>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — every video is a premium placeholder. Recording, uploading, hosting and
        attaching videos to stages is a later phase.
      </StudioNotice>
    </div>
  );
}
