"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { cx } from "@/lib/format";
import { askSuggestions, escalationMessage } from "@/lib/services";

interface Turn {
  id: string;
  from: "client" | "assistant";
  body: string;
  source?: string;
  escalated?: boolean;
}

/**
 * ASK KENYA B. — Phase 1 visual prototype. There is NO AI here.
 *
 * Answers come from a fixed set of Kenya-approved sample responses. Anything
 * without an approved answer escalates rather than guessing.
 *
 * The production assistant must answer ONLY from Kenya-approved processes,
 * policies, FAQs, journey information, appointment preparation and the
 * signed-in client's own visible account data. It must never invent Kenya's
 * policies, expose another client's information, expose owner notes, make
 * design decisions, or promise timelines or refunds.
 */
export function AskKenya() {
  const [turns, setTurns] = useState<Turn[]>([
    {
      id: "intro",
      from: "assistant",
      body:
        "Ask me anything about your gown, your appointments or what happens next. I only answer from what Kenya has approved and what is on your own account — if it is not mine to answer, I will send it to her.",
    },
  ]);
  const [escalated, setEscalated] = useState(false);

  const ask = (question: string) => {
    const entry = askSuggestions.find((item) => item.question === question);
    const answer = entry?.answer;

    setTurns((current) => [
      ...current,
      { id: `q-${current.length}`, from: "client", body: question },
      {
        id: `a-${current.length + 1}`,
        from: "assistant",
        body: answer ?? escalationMessage,
        source: entry?.source,
        escalated: !answer,
      },
    ]);
    if (!answer) setEscalated(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 border border-ink/15 bg-white p-6 sm:p-8">
        {turns.map((turn) => (
          <div
            key={turn.id}
            className={cx(
              "flex flex-col gap-2",
              turn.from === "client" ? "items-end text-right" : "items-start",
            )}
          >
            <span className="text-[0.55rem] uppercase tracking-luxe text-ink/35">
              {turn.from === "client" ? "You" : "Ask Kenya B."}
            </span>
            <p
              className={cx(
                "max-w-xl px-5 py-4 text-sm leading-relaxed",
                turn.from === "client"
                  ? "bg-ink text-bone"
                  : turn.escalated
                    ? "border-l-2 border-champagne bg-champagne/10 text-ink/80"
                    : "bg-bone-deep/60 text-ink/80",
              )}
            >
              {turn.body}
            </p>
            {turn.source ? (
              <span className="text-[0.55rem] uppercase tracking-wide2 text-ink/30">
                Source: {turn.source}
              </span>
            ) : null}
          </div>
        ))}

        {escalated ? (
          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
            <p className="font-display text-2xl leading-tight text-ink">This one needs Kenya.</p>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              Design changes, policy and anything touching your agreement go to Kenya directly.
            </p>
            <Button className="self-start">Send Question To Kenya</Button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <p className="eyebrow">Try asking</p>
        <div className="flex flex-wrap gap-2">
          {askSuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => ask(item.question)}
              className="border border-ink/20 px-5 py-2.5 text-left text-xs transition-colors duration-300 hover:border-ink"
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      <MockNotice>
        Phase 1 prototype — this is the interface only. No AI is running; answers are fixed sample
        text. The production assistant will answer strictly from Kenya-approved content and your
        own account, and will escalate anything else.
      </MockNotice>
    </div>
  );
}
