import type { Metadata } from "next";
import { AskKenyaAdmin } from "@/components/studio/AskKenyaAdmin";
import { askQuestions } from "@/data/askKenyaQuestions";

export const metadata: Metadata = { title: "Ask Kenya B." };

export default function StudioAskKenyaPage() {
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-2xl text-sm leading-relaxed text-bone/60">
        The questions people actually ask, and what the assistant on the website is allowed to say
        back. Answer one and it starts answering it. Leave it blank and it refuses and sends the
        question to you — which is what you want for pricing, refunds and anything that belongs in
        your agreement.
      </p>
      <AskKenyaAdmin questions={askQuestions} />
    </div>
  );
}
