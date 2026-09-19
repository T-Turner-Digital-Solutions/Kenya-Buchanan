import type { Metadata } from "next";
import { AskKenya } from "@/components/portal/AskKenya";

export const metadata: Metadata = { title: "Ask Kenya B." };

export default function PortalAskPage() {
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-2xl text-sm leading-relaxed text-ink/60">
        A guide for the questions that come up between appointments — what to bring, what happens
        next, when you come in. Anything Kenya needs to answer herself gets passed straight to her.
      </p>
      <AskKenya />
    </div>
  );
}
