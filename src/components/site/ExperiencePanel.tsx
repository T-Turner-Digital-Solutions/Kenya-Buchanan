import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { Experience } from "@/lib/types";

/** Public-site card for an Experience. Adding a new experience adds a card. */
export function ExperiencePanel({ experience, index }: { experience: Experience; index: number }) {
  return (
    <Link
      href={`/${experience.slug}`}
      className="group flex flex-col gap-6 border-t border-ink/10 pt-8 transition-opacity duration-500 hover:opacity-90"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40 transition-colors duration-500 group-hover:text-champagne-deep">
          Explore
        </span>
      </div>
      <MediaFrame
        slot={{
          id: `${experience.slug}-card`,
          alt: `${experience.name} — Kenya B.`,
          ratio: "portrait",
        }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-3xl leading-none">{experience.name}</h3>
        <p className="text-sm leading-relaxed text-ink/60">{experience.tagline}</p>
      </div>
    </Link>
  );
}
