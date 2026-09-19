import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/** Consistent editorial section rhythm — generous, quiet, mobile-first. */
export function Section({
  children,
  className,
  tone = "bone",
  id,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  tone?: "bone" | "white" | "ink" | "deep";
  id?: string;
  size?: "sm" | "md" | "lg";
}) {
  const tones = {
    bone: "bg-bone text-ink",
    white: "bg-white text-ink",
    deep: "bg-bone-deep text-ink",
    ink: "bg-ink text-bone",
  } as const;

  const sizes = {
    sm: "py-14 lg:py-20",
    md: "py-20 lg:py-28",
    lg: "py-24 lg:py-36",
  } as const;

  return (
    <section id={id} className={cx(tones[tone], sizes[size], className)}>
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}
