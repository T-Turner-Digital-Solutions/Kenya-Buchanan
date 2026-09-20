import Image from "next/image";
import Link from "next/link";
import { resolveMedia } from "@/config/media";
import { partnerBackdrops } from "@/data/gallery";
import type { Partner, PartnerCategory } from "@/lib/types";

/**
 * Preferred partners — a compact rail, not an advertising block.
 * Each card is a category with a Kenya B. photograph behind it; partner
 * photography does not exist yet and inventing it would misrepresent them.
 */
export function PartnersRail({
  groups,
}: {
  groups: Array<{ category: PartnerCategory; partners: Partner[] }>;
}) {
  return (
    <div className="rail -mx-5 gap-4 px-5 lg:mx-0 lg:px-0">
      {groups.map(({ category, partners }) => {
        const backdrop = partnerBackdrops[category.key];
        const src = backdrop ? resolveMedia(backdrop) : undefined;
        const lead = partners[0];

        return (
          <Link
            key={category.key}
            href="/partners"
            className="group relative aspect-[3/4] w-[66vw] max-w-[17rem] shrink-0 overflow-hidden bg-ink sm:w-[42vw] lg:w-auto lg:flex-1"
          >
            {src ? (
              <Image
                src={src}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 640px) 66vw, (max-width: 1024px) 42vw, 20vw"
                className="object-cover object-[50%_18%] opacity-45 transition-all duration-[1200ms] ease-silk group-hover:scale-105 group-hover:opacity-65"
              />
            ) : null}
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />

            <span className="absolute inset-0 flex flex-col justify-end gap-2 p-6">
              <span className="text-[0.5rem] uppercase tracking-luxe text-champagne">
                Kenya B. Preferred
              </span>
              <span className="display-caps text-2xl text-bone">{category.clientLabel}</span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/50">
                {category.label}
              </span>
              {lead ? (
                <span className="mt-2 border-t border-bone/15 pt-3 text-xs text-bone/60">
                  {lead.name}
                </span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
