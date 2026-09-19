import { cx } from "@/lib/format";
import type { JourneyStageTemplate } from "@/lib/types";

/**
 * Public-site preview of an experience's journey template.
 * Same source of truth the client portal renders — one journey definition,
 * two presentations.
 */
export function JourneyPreview({
  stages,
  tone = "dark",
}: {
  stages: JourneyStageTemplate[];
  tone?: "dark" | "light";
}) {
  return (
    <ol className="grid gap-px bg-current/10 sm:grid-cols-2 lg:grid-cols-3">
      {stages.map((stage, index) => (
        <li
          key={`${stage.key}-${index}`}
          className={cx(
            "flex flex-col gap-3 p-6 lg:p-8",
            tone === "dark" ? "bg-bone" : "bg-ink",
          )}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span
              className={cx(
                "font-display text-2xl",
                tone === "dark" ? "text-champagne-deep" : "text-champagne",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {stage.optional ? (
              <span
                className={cx(
                  "text-[0.5rem] uppercase tracking-luxe",
                  tone === "dark" ? "text-ink/35" : "text-bone/35",
                )}
              >
                Optional
              </span>
            ) : null}
          </div>
          <h3
            className={cx(
              "font-display text-xl leading-tight",
              tone === "dark" ? "text-ink" : "text-bone",
            )}
          >
            {stage.title}
          </h3>
          <p
            className={cx(
              "text-sm leading-relaxed",
              tone === "dark" ? "text-ink/55" : "text-bone/50",
            )}
          >
            {stage.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
