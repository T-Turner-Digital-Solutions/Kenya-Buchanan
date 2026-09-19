"use client";

import { cx } from "@/lib/format";

/**
 * Owner configuration switch. Phase 1 toggles local prototype state only —
 * production will persist these to the season / experience configuration.
 */
export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="flex flex-col gap-1">
        <span className="text-[0.7rem] uppercase tracking-wide2 text-ink">{label}</span>
        {description ? (
          <span className="text-xs leading-relaxed text-ink/50">{description}</span>
        ) : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          "relative mt-1 h-5 w-11 shrink-0 border transition-colors duration-500 ease-silk",
          checked ? "border-ink bg-ink" : "border-ink/25 bg-transparent",
          disabled && "opacity-40",
        )}
      >
        <span
          className={cx(
            "absolute top-1/2 h-3 w-3 -translate-y-1/2 transition-all duration-500 ease-silk",
            checked ? "left-[calc(100%-0.875rem)] bg-champagne" : "left-1 bg-ink/40",
          )}
        />
      </button>
    </div>
  );
}
