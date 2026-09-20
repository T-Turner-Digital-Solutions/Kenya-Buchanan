"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { actionNav, brand, primaryNav } from "@/config/site";
import { cx } from "@/lib/format";
import { BrandMark } from "./BrandMark";

/**
 * Site navigation.
 *
 * Over a dark hero the bar is transparent and light; once the page scrolls it
 * becomes a solid light sticky bar. Mobile opens a full-height drawer that
 * staggers its items in.
 */
export function SiteHeader({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overDark = tone === "dark" && !scrolled;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk",
          scrolled
            ? "border-b border-ink/10 bg-paper/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cx(
            "mx-auto flex max-w-editorial items-center justify-between gap-8 px-5 transition-all duration-700 ease-silk sm:px-8 lg:px-12",
            scrolled ? "py-3.5" : "py-5",
          )}
        >
          <Link href="/" className="flex items-center gap-3" aria-label={`${brand.name} — home`}>
            <BrandMark
              variant="auto"
              onLight={!overDark}
              priority
              className={cx("transition-all duration-700 ease-silk", scrolled ? "h-9" : "h-11")}
            />
            <span className="flex flex-col leading-none">
              <span
                className={cx(
                  "font-display tracking-[0.2em] transition-colors duration-500",
                  scrolled ? "text-base" : "text-lg",
                  overDark ? "text-bone" : "text-ink",
                )}
              >
                KENYA BUCHANAN
              </span>
              <span
                className={cx(
                  "mt-1 hidden text-[0.5rem] uppercase tracking-luxe transition-colors duration-500 sm:block",
                  overDark ? "text-bone/50" : "text-ink/40",
                )}
              >
                {brand.motto}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {primaryNav
              .filter((item) => item.href !== "/")
              .map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "relative py-1 text-[0.62rem] uppercase tracking-wide2 transition-colors duration-500",
                      overDark ? "text-bone" : "text-ink",
                      active ? "opacity-100" : "opacity-55 hover:opacity-100",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cx(
                        "absolute -bottom-0.5 left-0 h-px transition-all duration-500 ease-silk",
                        overDark ? "bg-champagne" : "bg-ink",
                        active ? "w-full" : "w-0",
                      )}
                    />
                  </Link>
                );
              })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {actionNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-5 py-2.5 text-[0.6rem] uppercase tracking-wide2 transition-all duration-500 ease-silk",
                  item.emphasis === "book"
                    ? "bg-champagne text-ink hover:bg-ink hover:text-bone"
                    : overDark
                      ? "border border-bone/35 text-bone hover:border-bone hover:bg-bone/10"
                      : "border border-ink/25 text-ink hover:border-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cx("flex items-center gap-3 lg:hidden", overDark ? "text-bone" : "text-ink")}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="text-[0.6rem] uppercase tracking-wide2">Menu</span>
            <span aria-hidden className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cx(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cx(
            "absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cx(
            "absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-ink transition-transform duration-[650ms] ease-silk",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-3">
              <BrandMark variant="dark" className="h-10" />
              <span className="font-display text-base tracking-[0.18em] text-bone">KENYA B.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[0.6rem] uppercase tracking-wide2 text-bone/60"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-6">
            {primaryNav
              .filter((item) => item.href !== "/")
              .map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${140 + index * 60}ms` : "0ms" }}
                  className={cx(
                    "border-b border-bone/10 py-4 font-display text-3xl text-bone transition-all duration-700 ease-silk",
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex flex-col gap-3 px-6 pb-10">
            {actionNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "px-5 py-4 text-center text-[0.62rem] uppercase tracking-wide2",
                  item.emphasis === "book"
                    ? "bg-champagne text-ink"
                    : "border border-bone/35 text-bone",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
