import { cx } from "@/lib/format";
import type { StoryMilestone, StoryTone } from "@/lib/types";

/** Milestones as an elegant marker sequence. Owner adds or removes entries. */
export function MilestoneRail({
  milestones,
  tone = "light",
}: {
  milestones: StoryMilestone[];
  tone?: StoryTone;
}) {
  const dark = tone === "dark";

  return (
    <ol className={cx("flex flex-col gap-0 sm:flex-row sm:gap-0", milestones.length > 1 && "sm:divide-x")}>
      {milestones.map((milestone, index) => (
        <li
          key={milestone.id}
          className={cx(
            "flex flex-1 flex-col gap-2 py-5 sm:px-7 sm:py-0 sm:first:pl-0 sm:last:pr-0",
            index > 0 && "border-t sm:border-t-0",
            dark ? "border-bone/15" : "border-ink/12",
          )}
        >
          <span
            className={cx(
              "font-display text-3xl leading-none sm:text-4xl",
              dark ? "text-champagne" : "text-champagne-deep",
            )}
          >
            {milestone.marker}
          </span>
          <span
            className={cx(
              "text-[0.58rem] uppercase tracking-luxe",
              dark ? "text-bone/70" : "text-ink/60",
            )}
          >
            {milestone.title}
          </span>
          <span className={cx("text-sm leading-relaxed", dark ? "text-bone/50" : "text-ink/55")}>
            {milestone.detail}
          </span>
        </li>
      ))}
    </ol>
  );
}
