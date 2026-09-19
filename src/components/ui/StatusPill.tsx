import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type Tone = "neutral" | "positive" | "attention" | "progress" | "muted" | "dark";

const tones: Record<Tone, string> = {
  neutral: "border-ink/20 text-ink/70",
  positive: "border-emerald-700/30 bg-emerald-700/10 text-emerald-900",
  attention: "border-champagne-deep/40 bg-champagne/15 text-champagne-deep",
  progress: "border-ink/25 bg-ink/5 text-ink",
  muted: "border-ink/10 text-ink/40",
  dark: "border-bone/25 bg-bone/10 text-bone",
};

export function StatusPill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 border px-3 py-1 text-[0.55rem] uppercase tracking-wide2",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
