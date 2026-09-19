import { MediaFrame } from "@/components/ui/MediaFrame";
import type { Partner } from "@/lib/types";

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="flex flex-col gap-4">
      <MediaFrame
        slot={{ ...partner.media, ratio: "landscape" }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="flex flex-col gap-2">
        {partner.preferred ? (
          <span className="text-[0.55rem] uppercase tracking-luxe text-champagne-deep">
            Kenya B. Preferred
          </span>
        ) : null}
        <h3 className="font-display text-xl leading-tight">{partner.name}</h3>
        <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">{partner.city}</p>
        <p className="text-sm leading-relaxed text-ink/60">{partner.blurb}</p>
      </div>
    </article>
  );
}
