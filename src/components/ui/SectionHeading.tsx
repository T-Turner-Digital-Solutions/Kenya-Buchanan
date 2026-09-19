import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cx("flex flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow ? (
          <Eyebrow className={tone === "light" ? "text-champagne-light" : undefined}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          className={cx(
            "font-display text-3xl leading-[1.08] text-balance sm:text-4xl lg:text-5xl",
            tone === "light" ? "text-bone" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lede ? (
          <div
            className={cx(
              "max-w-xl text-sm leading-relaxed",
              align === "center" && "mx-auto",
              tone === "light" ? "text-bone/70" : "text-ink/65",
            )}
          >
            {lede}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
