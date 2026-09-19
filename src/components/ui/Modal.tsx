"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/format";

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fade"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "relative max-h-[92vh] w-full overflow-y-auto bg-bone animate-rise focus:outline-none",
          size === "lg" ? "sm:max-w-3xl" : "sm:max-w-xl",
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 py-5 sm:px-10">
          <div className="flex flex-col gap-2">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-[0.6rem] uppercase tracking-wide2 text-ink/50 transition-colors hover:text-ink"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-7 sm:px-10">{children}</div>
        {footer ? (
          <div className="border-t border-ink/10 px-6 py-5 sm:px-10">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
