import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";

/** Dark-surface building blocks shared across Kenya B. Studio. */

export function Panel({
  children,
  className,
  title,
  action,
  note,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
  note?: string;
}) {
  return (
    <section className={cx("border border-bone/10 bg-bone/[0.03]", className)}>
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/10 px-6 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-xl leading-none text-bone">{title}</h2>
            {note ? <p className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">{note}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

export function Metric({
  label,
  value,
  detail,
  href,
  emphasis,
}: {
  label: string;
  value: string;
  detail?: string;
  href?: string;
  emphasis?: boolean;
}) {
  const body = (
    <>
      <p className="text-[0.55rem] uppercase tracking-luxe text-bone/40">{label}</p>
      <p
        className={cx(
          "mt-3 font-display text-3xl leading-none",
          emphasis ? "text-champagne" : "text-bone",
        )}
      >
        {value}
      </p>
      {detail ? <p className="mt-2 text-[0.6rem] uppercase tracking-wide2 text-bone/30">{detail}</p> : null}
    </>
  );

  const classes = cx(
    "flex flex-col border border-bone/10 bg-ink p-6 transition-colors duration-500",
    href && "hover:border-bone/30",
  );

  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

export function Row({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = cx(
    "flex flex-col gap-3 border-b border-bone/10 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
    href && "transition-colors duration-300 hover:bg-bone/[0.04]",
    className,
  );
  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <div className={classes}>{children}</div>
  );
}

export function OwnerOnly({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-wine bg-wine/10 px-5 py-4">
      <p className="text-[0.55rem] uppercase tracking-luxe text-champagne-light">
        Owner only · never visible to the client
      </p>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-bone/70">{children}</div>
    </div>
  );
}

export function StudioNotice({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-champagne bg-bone/5 px-5 py-4 text-[0.62rem] uppercase leading-relaxed tracking-wide2 text-bone/55">
      {children}
    </p>
  );
}
