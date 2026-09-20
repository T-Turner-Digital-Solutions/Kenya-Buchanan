"use client";

import { cx } from "@/lib/format";

/** Circular previous/next control. */
export function CarouselArrow({
  direction,
  onClick,
  tone = "light",
  className,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "next" ? "Next" : "Previous"}
      className={cx(
        "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ease-silk",
        tone === "dark"
          ? "border-bone/30 text-bone hover:border-champagne hover:bg-champagne hover:text-ink"
          : "border-ink/20 bg-ink text-bone hover:bg-champagne hover:text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4">
        {direction === "next" ? <path d="M5 12h14m-6-6 6 6-6 6" /> : <path d="M19 12H5m6 6-6-6 6-6" />}
      </svg>
    </button>
  );
}

/** Progress dots. Wide bar marks the active slide. */
export function CarouselDots({
  count,
  index,
  onSelect,
  tone = "light",
  className,
}: {
  count: number;
  index: number;
  onSelect: (next: number) => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cx("flex items-center gap-2", className)} role="tablist" aria-label="Slides">
      {Array.from({ length: count }).map((_, position) => {
        const active = position === index;
        return (
          <button
            key={position}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Go to slide ${position + 1}`}
            onClick={() => onSelect(position)}
            className={cx(
              "h-[3px] transition-all duration-500 ease-silk",
              active ? "w-8" : "w-3 opacity-40 hover:opacity-70",
              tone === "dark" ? "bg-bone" : "bg-ink",
            )}
          />
        );
      })}
    </div>
  );
}

/** 01 / 05 counter. */
export function CarouselCounter({
  index,
  count,
  tone = "light",
  className,
}: {
  index: number;
  count: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "font-sans text-[0.6rem] uppercase tracking-luxe tabular-nums",
        tone === "dark" ? "text-bone/70" : "text-ink/50",
        className,
      )}
    >
      <span className={tone === "dark" ? "text-bone" : "text-ink"}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="mx-2 opacity-40">/</span>
      {String(count).padStart(2, "0")}
    </p>
  );
}
