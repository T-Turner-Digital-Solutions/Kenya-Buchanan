"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { cx } from "@/lib/format";
import type { NavItem } from "@/config/site";

/**
 * Shared chrome for the two signed-in surfaces.
 *
 * `tone="client"` is My Kenya B. (warm, editorial — never a SaaS dashboard).
 * `tone="owner"` is Kenya B. Studio (dark, dense, built for work).
 */
export function PortalShell({
  nav,
  title,
  subtitle,
  tone,
  children,
  exitHref = "/",
  exitLabel = "Sign out",
  banner,
}: {
  nav: NavItem[];
  title: string;
  subtitle?: string;
  tone: "client" | "owner";
  children: ReactNode;
  exitHref?: string;
  exitLabel?: string;
  banner?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const owner = tone === "owner";

  const isActive = (href: string) =>
    href === nav[0]?.href ? pathname === href : pathname.startsWith(href);

  return (
    <div className={cx("min-h-screen", owner ? "bg-ink text-bone" : "bg-bone text-ink")}>
      {/* Phase 1 marker — this is a prototype, not a live account. */}
      <p
        className={cx(
          "px-5 py-2 text-center text-[0.55rem] uppercase tracking-luxe sm:px-8",
          owner ? "bg-champagne/15 text-champagne-light" : "bg-ink text-champagne-light",
        )}
      >
        Phase 1 prototype · demonstration account with fictional data
      </p>

      <div className="lg:flex">
        {/* Sidebar (desktop) */}
        <aside
          className={cx(
            "hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-r",
            owner ? "lg:border-bone/10" : "lg:border-ink/10",
          )}
        >
          <div className={cx("flex flex-col gap-1 px-7 py-8", owner ? "" : "")}>
            <Link href="/" className="flex items-center gap-3">
              <BrandMark variant={owner ? "dark" : "light"} className="h-11" />
              <span className="font-display text-base leading-tight tracking-[0.16em]">
                {owner ? "KENYA B." : "MY KENYA B."}
              </span>
            </Link>
          </div>

          <nav aria-label={title} className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 pb-8">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "border-l-2 px-4 py-2.5 text-[0.62rem] uppercase tracking-wide2 transition-all duration-300",
                    active
                      ? owner
                        ? "border-champagne bg-bone/5 text-bone"
                        : "border-ink bg-ink/5 text-ink"
                      : owner
                        ? "border-transparent text-bone/45 hover:border-bone/30 hover:text-bone"
                        : "border-transparent text-ink/45 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={cx("border-t px-7 py-6", owner ? "border-bone/10" : "border-ink/10")}>
            <Link
              href={exitHref}
              className={cx(
                "text-[0.6rem] uppercase tracking-wide2 transition-colors",
                owner ? "text-bone/40 hover:text-bone" : "text-ink/40 hover:text-ink",
              )}
            >
              {exitLabel}
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile bar */}
          <div
            className={cx(
              "sticky top-0 z-40 flex items-center justify-between gap-4 border-b px-5 py-4 backdrop-blur-md lg:hidden",
              owner ? "border-bone/10 bg-ink/95" : "border-ink/10 bg-bone/95",
            )}
          >
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark variant={owner ? "dark" : "light"} className="h-9" />
              <span className="font-display text-sm tracking-[0.16em]">
                {owner ? "KENYA B." : "MY KENYA B."}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="text-[0.6rem] uppercase tracking-wide2"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          {open ? (
            <nav
              aria-label={`${title} mobile`}
              className={cx(
                "grid grid-cols-2 gap-px border-b lg:hidden",
                owner ? "border-bone/10 bg-bone/10" : "border-ink/10 bg-ink/10",
              )}
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cx(
                    "px-5 py-4 text-[0.6rem] uppercase tracking-wide2",
                    owner ? "bg-ink" : "bg-bone",
                    isActive(item.href)
                      ? owner
                        ? "text-champagne"
                        : "text-ink"
                      : owner
                        ? "text-bone/50"
                        : "text-ink/50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={exitHref}
                className={cx(
                  "px-5 py-4 text-[0.6rem] uppercase tracking-wide2",
                  owner ? "bg-ink text-bone/40" : "bg-bone text-ink/40",
                )}
              >
                {exitLabel}
              </Link>
            </nav>
          ) : null}

          {banner}

          <main id="main" className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-5xl">
              <header className="mb-10 flex flex-col gap-2 lg:mb-14">
                <h1 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
                {subtitle ? (
                  <p className={cx("text-sm", owner ? "text-bone/50" : "text-ink/55")}>{subtitle}</p>
                ) : null}
              </header>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
