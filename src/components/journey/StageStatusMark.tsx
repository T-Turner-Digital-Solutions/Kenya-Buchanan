import { cx } from "@/lib/format";
import type { StageStatus } from "@/lib/types";

export const stageStatusLabel: Record<StageStatus, string> = {
  complete: "Complete",
  current: "In Progress",
  upcoming: "Upcoming",
  blocked: "Waiting",
  waiting_on_client: "Needs You",
};

/** Small status marker used down the left rail of the journey timeline. */
export function StageStatusMark({ status }: { status: StageStatus }) {
  return (
    <span
      aria-hidden
      className={cx(
        "relative z-10 mt-1 flex h-3 w-3 shrink-0 items-center justify-center border",
        status === "complete" && "border-ink bg-ink",
        status === "current" && "border-champagne-deep bg-champagne",
        status === "waiting_on_client" && "border-champagne-deep bg-bone",
        status === "blocked" && "border-ink/30 bg-bone",
        status === "upcoming" && "border-ink/20 bg-transparent",
      )}
    >
      {status === "complete" ? (
        <svg viewBox="0 0 12 12" className="h-2 w-2 text-bone" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 6.5 4.5 9 10 3.5" />
        </svg>
      ) : null}
    </span>
  );
}
