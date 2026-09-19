import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/**
 * Phase 1 marker. Any screen that stands in for a future backend service
 * (payments, auth, notifications, AI, storage) must carry one of these so the
 * prototype is never mistaken for live functionality.
 */
export function MockNotice({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cx(
        "flex items-start gap-3 border-l-2 px-4 py-3 text-[0.65rem] uppercase leading-relaxed tracking-wide2",
        tone === "dark"
          ? "border-champagne bg-bone/5 text-bone/70"
          : "border-champagne bg-champagne/10 text-ink/70",
        className,
      )}
    >
      <span aria-hidden className="font-display text-sm leading-none text-champagne-deep">
        ◆
      </span>
      <span>{children}</span>
    </p>
  );
}
