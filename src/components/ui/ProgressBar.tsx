import { cx } from "@/lib/format";

export function ProgressBar({
  value,
  max = 100,
  tone = "ink",
  className,
  label,
}: {
  value: number;
  max?: number;
  tone?: "ink" | "champagne" | "light";
  className?: string;
  label?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const bars = {
    ink: "bg-ink",
    champagne: "bg-champagne",
    light: "bg-bone",
  } as const;

  return (
    <div
      className={cx("h-px w-full bg-ink/15", tone === "light" && "bg-bone/25", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <div
        className={cx("h-px transition-all duration-1000 ease-silk", bars[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
