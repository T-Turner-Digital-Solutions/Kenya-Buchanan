"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";

/**
 * Interest list / waitlist signup.
 * Phase 1: nothing is transmitted or stored. Production will post to the
 * season's interest list and send confirmation by email/SMS.
 */
export function InterestForm({
  variant,
  seasonName,
}: {
  variant: "interest" | "waitlist";
  seasonName: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-5 border border-bone/20 p-8">
        <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
          {variant === "interest" ? "You are on the list" : "You are on the waitlist"}
        </p>
        <p className="font-display text-2xl leading-snug text-bone sm:text-3xl">
          {variant === "interest"
            ? `We will reach out the moment ${seasonName} books open.`
            : `You hold a place in line for ${seasonName}.`}
        </p>
        <p className="text-sm leading-relaxed text-bone/55">
          {variant === "interest"
            ? "Nothing is owed and nothing is reserved yet — this is a heads-up, not a spot."
            : "Joining costs nothing. When Kenya releases an opening, it is offered to one person at a time, in order — you will have an exclusive 60-minute window to claim it, and the deposit is only paid if you accept."}
        </p>
        <MockNotice tone="dark">
          Demonstration only — no message was sent and no information was stored in Phase 1.
        </MockNotice>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 border border-bone/20 p-8">
      <div className="flex flex-col gap-1">
        <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">
          {variant === "interest" ? "Remind me when books open" : "Join the waitlist"}
        </p>
        <p className="font-display text-2xl text-bone">{seasonName}</p>
        {variant === "waitlist" ? (
          <p className="mt-3 text-sm leading-relaxed text-bone/55">
            Free to join. You only pay if Kenya offers you a spot and you claim it.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 [&_input]:border-bone/25 [&_input]:text-bone [&_label]:text-bone/50 [&_input]:placeholder:text-bone/25">
        <TextField id="interest-name" label="Name" required autoComplete="name" placeholder="First and last" />
        <TextField id="interest-email" label="Email" type="email" required autoComplete="email" placeholder="you@example.com" />
        <TextField id="interest-mobile" label="Mobile" type="tel" required autoComplete="tel" placeholder="(555) 000-0000" />
      </div>

      <Button type="submit" variant="light" size="lg" className="w-full">
        {variant === "interest" ? "Remind Me" : "Join The Waitlist"}
      </Button>

      <MockNotice tone="dark">
        Phase 1 prototype — this form does not send or store anything yet.
      </MockNotice>
    </form>
  );
}
