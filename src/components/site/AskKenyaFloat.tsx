"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { cx } from "@/lib/format";

/**
 * ASK KENYA B. — the floating assistant on the public site.
 *
 * Kenya's mark is the button. Opening it reveals a panel that posts to
 * /api/ask-kenya; the model, the key and the brief all live on the server, so
 * nothing about the integration is exposed here.
 *
 * The assistant answers only from what Kenya has published. Anything it is not
 * sure of it hands back to her rather than inventing an answer — pricing,
 * policy and availability are hers to give.
 */

const OPENERS = [
  "How does a Prom Spot work?",
  "What happens at the first appointment?",
  "Do you make bridal gowns?",
  "Is there a charge to join the waitlist?",
];

interface Turn {
  id: number;
  from: "visitor" | "kenya";
  body: string;
  escalated?: boolean;
}

const GREETING: Turn = {
  id: 0,
  from: "kenya",
  body:
    "Ask me anything about Kenya's gowns, the experiences or how booking works. I answer from what Kenya has published — anything else I will pass to her.",
};

export function AskKenyaFloat() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Escape closes the panel, wherever focus happens to be.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [turns, pending]);

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || pending) return;

    setDraft("");
    setPending(true);
    setTurns((current) => [...current, { id: current.length, from: "visitor", body: text }]);

    try {
      const response = await fetch("/api/ask-kenya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = (await response.json()) as {
        answer?: string;
        error?: string;
        escalated?: boolean;
      };
      setTurns((current) => [
        ...current,
        {
          id: current.length,
          from: "kenya",
          body:
            data.answer ??
            data.error ??
            "Something went wrong reaching me. Try again in a moment.",
          escalated: data.escalated,
        },
      ]);
    } catch {
      setTurns((current) => [
        ...current,
        {
          id: current.length,
          from: "kenya",
          body: "I could not reach the studio just now. Try again in a moment.",
          escalated: true,
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(draft);
  };

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Ask Kenya B."
        aria-modal={false}
        className={cx(
          "fixed bottom-24 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden bg-ink shadow-2xl ring-1 ring-bone/15 transition-all duration-500 ease-silk sm:right-6",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-bone/10 px-5 py-4">
          <BrandMark variant="dark" className="h-8" />
          <div className="flex flex-1 flex-col">
            <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">Ask Kenya B.</p>
            <p className="font-display text-lg leading-tight text-bone">Come with questions.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close Ask Kenya B."
            className="text-bone/50 transition-colors hover:text-bone"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-5 w-5">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex max-h-[24rem] min-h-[14rem] flex-col gap-4 overflow-y-auto px-5 py-5">
          {turns.map((turn) => (
            <div
              key={turn.id}
              className={cx(
                "flex flex-col gap-1.5",
                turn.from === "visitor" ? "items-end text-right" : "items-start",
              )}
            >
              <span className="text-[0.5rem] uppercase tracking-luxe text-bone/30">
                {turn.from === "visitor" ? "You" : "Ask Kenya B."}
              </span>
              <p
                className={cx(
                  "max-w-[17rem] px-4 py-3 text-[0.82rem] leading-relaxed",
                  turn.from === "visitor"
                    ? "bg-bone text-ink"
                    : turn.escalated
                      ? "border-l-2 border-champagne bg-champagne/10 text-bone/85"
                      : "bg-charcoal text-bone/85",
                )}
              >
                {turn.body}
              </p>
            </div>
          ))}

          {pending ? (
            <p className="text-[0.6rem] uppercase tracking-luxe text-bone/35">Thinking…</p>
          ) : null}

          {turns.length === 1 ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {OPENERS.map((opener) => (
                <button
                  key={opener}
                  type="button"
                  onClick={() => void send(opener)}
                  className="border border-bone/25 px-3 py-2 text-left text-[0.7rem] text-bone/70 transition-colors duration-300 hover:border-bone hover:text-bone"
                >
                  {opener}
                </button>
              ))}
            </div>
          ) : null}

          <div ref={endRef} />
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-bone/10 p-3">
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={500}
            placeholder="Ask a question"
            aria-label="Your question"
            className="flex-1 bg-transparent px-2 py-2 text-sm text-bone placeholder:text-bone/30 focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending || draft.trim().length === 0}
            className="bg-champagne px-4 py-2.5 text-[0.6rem] uppercase tracking-wide2 text-ink transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ask
          </button>
        </form>

        <p className="border-t border-bone/10 px-5 py-3 text-[0.55rem] leading-relaxed text-bone/35">
          Kenya&apos;s assistant, not Kenya. Pricing, policy and availability come from her.
        </p>
      </div>

      {/* The mark is the button. */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close Ask Kenya B." : "Ask Kenya B."}
        className="group fixed bottom-5 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-ink shadow-xl ring-1 ring-bone/20 transition-all duration-500 ease-silk hover:ring-champagne sm:right-6"
      >
        <BrandMark variant="dark" className="h-9 transition-transform duration-500 ease-silk group-hover:scale-105" />
        <span className="absolute -top-1 right-0 h-2.5 w-2.5 rounded-full bg-champagne" aria-hidden />
      </button>
    </>
  );
}
