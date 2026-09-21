import Image from "next/image";
import { mediaAspect, resolveMedia } from "@/config/media";
import { cx } from "@/lib/format";
import type { MediaSlot } from "@/lib/types";

/**
 * Photographs shown side by side, each at its own proportions.
 *
 * Used for sets that arrive already titled — the number and the name are set
 * into the photograph itself, so nothing is layered on top and nothing is
 * cropped away. On a narrow screen they stack rather than shrink.
 */
export function LookTriptych({
  looks,
  perRow = 3,
}: {
  looks: MediaSlot[];
  /** Columns from the `sm` breakpoint up. */
  perRow?: 3 | 4;
}) {
  return (
    <ul
      className={cx(
        "grid gap-8 sm:gap-5 lg:gap-8",
        perRow === 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
      )}
    >
      {looks.map((look) => {
        const src = resolveMedia(look.id);
        if (!src) return null;
        return (
          /*
           * The set is sized by height, not width: these frames are not all the
           * same shape, and matching their widths would leave the row with a
           * ragged baseline. Each photograph keeps its proportions and the row
           * lines up.
           */
          <li
            key={look.id}
            className="group flex items-end justify-center sm:h-[22rem] lg:h-[30rem]"
          >
            {/*
             * Width-driven on a phone, height-driven from `sm` up. Fixing the
             * height on a narrow screen makes a landscape frame wider than the
             * viewport — aspect-ratio wins over max-width once a height is
             * set — and the page scrolls sideways.
             */}
            <div
              style={{ aspectRatio: String(mediaAspect(look.id) ?? 2 / 3) }}
              className="relative w-full overflow-hidden bg-ink-soft ring-1 ring-bone/10 sm:h-full sm:w-auto sm:max-w-full"
            >
              <Image
                src={src}
                alt={look.alt}
                fill
                sizes="(max-width: 640px) 80vw, 30vw"
                className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.04]"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
