"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { askTopicLabels, type AskQuestion, type AskTopic } from "@/data/askKenyaQuestions";

/**
 * KENYA'S ANSWERS — what the public assistant is allowed to say.
 *
 * An unanswered question is not a gap the assistant fills in. It refuses and
 * hands the question to Kenya. So this screen is the whole of the assistant's
 * voice: answer a question here and the assistant starts answering it; leave
 * it blank and the assistant keeps sending it to her.
 *
 * Phase 1 keeps edits in component state. Production stores them, versions
 * them, and records who changed an answer — this is the business speaking.
 */
export function AskKenyaAdmin({ questions }: { questions: AskQuestion[] }) {
  const [bank, setBank] = useState(questions);
  const [editing, setEditing] = useState<AskQuestion | null>(null);
  const [draft, setDraft] = useState("");

  const answered = bank.filter((entry) => entry.answer !== null).length;

  const open = (entry: AskQuestion) => {
    setEditing(entry);
    setDraft(entry.answer ?? "");
  };

  const save = () => {
    if (!editing) return;
    const next = draft.trim();
    setBank((current) =>
      current.map((entry) =>
        entry.id === editing.id ? { ...entry, answer: next.length > 0 ? next : null } : entry,
      ),
    );
    setEditing(null);
  };

  const topics = [...new Set(bank.map((entry) => entry.topic))] as AskTopic[];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-bone/10 pb-5">
        <p className="text-sm text-bone/60">
          <span className="font-display text-3xl text-bone">{answered}</span> of {bank.length}{" "}
          answered. The assistant answers these and escalates everything else.
        </p>
        <StatusPill tone={answered === bank.length ? "positive" : "attention"}>
          {bank.length - answered} waiting on you
        </StatusPill>
      </div>

      {topics.map((topic) => (
        <section key={topic} className="flex flex-col gap-4">
          <p className="text-[0.55rem] uppercase tracking-luxe text-champagne">
            {askTopicLabels[topic]}
          </p>
          <ul className="flex flex-col">
            {bank
              .filter((entry) => entry.topic === topic)
              .map((entry) => (
                <li key={entry.id} className="flex flex-col gap-2 border-b border-bone/10 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="max-w-2xl text-sm text-bone">{entry.question}</p>
                    <div className="flex shrink-0 items-center gap-3">
                      <StatusPill tone={entry.answer ? "dark" : "attention"}>
                        {entry.answer ? "Answered" : "Needs you"}
                      </StatusPill>
                      <button
                        type="button"
                        onClick={() => open(entry)}
                        className="border border-bone/25 px-3 py-1.5 text-[0.55rem] uppercase tracking-wide2 text-bone/70 transition-colors hover:border-bone hover:text-bone"
                      >
                        {entry.answer ? "Edit" : "Answer"}
                      </button>
                    </div>
                  </div>

                  {entry.answer ? (
                    <p className="max-w-2xl text-sm leading-relaxed text-bone/55">{entry.answer}</p>
                  ) : (
                    <p className="max-w-2xl border-l-2 border-champagne pl-4 text-sm leading-relaxed text-bone/50">
                      {entry.note ?? "Unanswered — the assistant sends this one to you."}
                    </p>
                  )}
                </li>
              ))}
          </ul>
        </section>
      ))}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        eyebrow="Your answer"
        title={editing?.question ?? ""}
        size="lg"
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={save}>Save Answer</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          <TextAreaField
            id="ask-answer"
            label="What the assistant should say"
            rows={6}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write it the way you would say it."
          />
          <p className="border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ink/70">
            Whatever you write here is said to the public, word for word, as often as the question
            is asked. Leave it blank and the assistant keeps sending the question to you instead —
            which is the right answer for pricing, refunds and anything that belongs in your
            agreement.
          </p>
          <MockNotice>Phase 1 prototype — edits are held on screen only.</MockNotice>
        </div>
      </Modal>
    </div>
  );
}
