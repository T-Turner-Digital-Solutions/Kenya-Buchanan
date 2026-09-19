import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/** Flat editorial panel — the house does not do rounded corners or drop shadows. */
export function Surface({
  children,
  className,
  tone = "bone",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "bone" | "white" | "ink" | "outline";
  as?: "div" | "section" | "article" | "li";
}) {
  const tones = {
    bone: "bg-bone-deep/60 border border-ink/5",
    white: "bg-white border border-ink/10",
    ink: "bg-ink text-bone border border-bone/10",
    outline: "border border-ink/15",
  } as const;

  return <Tag className={cx(tones[tone], className)}>{children}</Tag>;
}
