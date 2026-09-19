"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { actionNav, brand, primaryNav } from "@/config/site";
import { cx } from "@/lib/format";

export function SiteHeader({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Read the initial position after paint — a refresh can land mid-page.
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

  // Over a dark hero the header starts light, then inverts once the page scrolls.
  const overDark = tone === "dark" && !scrolled;
  const textClass = overDark ? "text-bone" : "text-ink";

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk",
        scrolled ? "bg-bone/95 backdrop-blur-md" : "bg-transparent",
        scrolled && "border-b border-ink/10",
      )}
    >
      <div className="mx-auto flex max-w-editorial items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className={cx(
            "font-display text-lg leading-none tracking-[0.2em] transition-colors duration-500 sm:text-xl",
            textClass,
          )}
          aria-label={`${brand.name} — home`}
        >
          KENYA BUCHANAN
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "relative py-1 text-[0.6rem] uppercase tracking-wide2 transition-colors duration-500",
                  textClass,
                  active ? "opacity-100" : "opacity-60 hover:opacity-100",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className={cx(
                      "absolute -bottom-0.5 left-0 h-px w-full",
                      overDark ? "bg-champagne" : "bg-ink",
                    )}
                  />
                ) : null}
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
                "border px-5 py-2.5 text-[0.6rem] uppercase tracking-wide2 transition-all duration-500 ease-silk",
                item.emphasis === "book"
                  ? overDark
                    ? "border-bone bg-bone text-ink hover:bg-champagne hover:border-champagne"
                    : "border-ink bg-ink text-bone hover:bg-champagne hover:border-champagne hover:text-ink"
                  : overDark
                    ? "border-bone/40 text-bone hover:border-bone"
                    : "border-ink/25 text-ink hover:border-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cx("flex items-center gap-3 lg:hidden", textClass)}
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

      {/* Mobile navigation */}
      <div
        className={cx(
          "fixed inset-0 z-50 bg-ink transition-all duration-700 ease-silk lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <span className="flex items-center gap-3">
              <Image
                src="/media/brand/kenya-b-mark.png"
                alt=""
                width={157}
                height={285}
                className="h-9 w-auto invert"
              />
              <span className="font-display text-lg tracking-[0.2em] text-bone">KENYA BUCHANAN</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[0.6rem] uppercase tracking-wide2 text-bone/70"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
            {primaryNav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
                className={cx(
                  "border-b border-bone/10 py-4 font-display text-3xl text-bone transition-all duration-700 ease-silk sm:text-4xl",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-3 px-5 pb-10 sm:px-8">
            {actionNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "border px-5 py-4 text-center text-[0.6rem] uppercase tracking-wide2",
                  item.emphasis === "book"
                    ? "border-bone bg-bone text-ink"
                    : "border-bone/40 text-bone",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
