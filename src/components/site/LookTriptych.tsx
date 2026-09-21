import Image from "next/image";
import { mediaAspect, resolveMedia } from "@/config/media";
import type { MediaSlot } from "@/lib/types";

/**
 * Three photographs shown side by side, each at its own proportions.
 *
 * Used for sets that arrive already titled — the number and the name are set
 * into the photograph itself, so nothing is layered on top and nothing is
 * cropped away. On a narrow screen the three stack rather than shrink.
 */
export function LookTriptych({ looks }: { looks: MediaSlot[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">
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
            className="group flex h-[26rem] items-end justify-center sm:h-[22rem] lg:h-[30rem]"
          >
            <div
              style={{ aspectRatio: String(mediaAspect(look.id) ?? 2 / 3) }}
              className="relative h-full max-w-full overflow-hidden bg-ink-soft ring-1 ring-bone/10"
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
