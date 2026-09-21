"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ContractReview } from "@/components/enroll/ContractReview";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { getVideo } from "@/lib/services";
import { cx, formatCurrency, formatDate } from "@/lib/format";
import type { ContractTemplate, Experience, Season } from "@/lib/types";

type Step = "details" | "design" | "submitted" | "agreement" | "deposit" | "welcome";

const steps: Array<{ key: Step; label: string }> = [
  { key: "details", label: "Your Details" },
  { key: "design", label: "Your Design" },
  { key: "submitted", label: "Kenya Reviews" },
  { key: "agreement", label: "Agreement" },
  { key: "deposit", label: "Deposit" },
  { key: "welcome", label: "Welcome" },
];

/**
 * BOOKING / ENROLLMENT — Phase 1 demonstration flow.
 *
 * One continuous path: your details → your design → Kenya reviews it → the
 * agreement → the deposit → meet Kenya. The welcome video is part of the flow,
 * not a link the client has to go and find.
 *
 * The order matters and is not cosmetic. Kenya sees the design request and the
 * date BEFORE any money is asked for: she accepts the commission first, and
 * only then is a deposit required to begin. A client is never charged for work
 * Kenya has not agreed to take.
 *
 * Nothing here is real: no record is created, no agreement is executed, no
 * payment is processed and no account is provisioned. Production will run each
 * step server-side (validation → contract execution → payment intent →
 * account activation email with a secure link the client uses to set their own
 * password — a password is never generated or displayed).
 */
export function EnrollmentFlow({
  experience,
  season,
  template,
}: {
  experience: Experience;
  /** Present for seasonal experiences (Prom today). */
  season?: Season;
  template: ContractTemplate;
}) {
  const [step, setStep] = useState<Step>("details");
  const [clientName, setClientName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [isMinor, setIsMinor] = useState(experience.slug === "prom");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [signature, setSignature] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");

  const welcome = getVideo("vid-welcome");
  const stepIndex = steps.findIndex((entry) => entry.key === step);
  const allAcknowledged = acknowledged.length === template.acknowledgements.length;
  const signatureValid =
    signature.trim().length > 1 && (!isMinor || guardianSignature.trim().length > 1);

  const depositCents = season?.depositCents ?? experience.config.depositAmountCents;
  const seasonName = season?.name ?? experience.name;

  const toggleAck = (value: string) =>
    setAcknowledged((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep("design");
  };

  const submitDesign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep("submitted");
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Progress */}
      <div className="flex flex-col gap-5">
        <ol className="flex flex-wrap gap-x-8 gap-y-3">
          {steps.map((entry, index) => (
            <li
              key={entry.key}
              className={cx(
                "flex items-center gap-2 text-[0.55rem] uppercase tracking-luxe",
                index === stepIndex ? "text-ink" : index < stepIndex ? "text-champagne-deep" : "text-ink/30",
              )}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {entry.label}
            </li>
          ))}
        </ol>
        <ProgressBar value={stepIndex + 1} max={steps.length} label="Booking progress" />
      </div>

      {step === "details" ? (
        <form onSubmit={submitDetails} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Your details</h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              This is how Kenya reaches you and how your {seasonName} record is created.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <TextField
              id="enroll-client"
              label="Client name"
              required
              autoComplete="name"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="The person wearing the gown"
            />
            <TextField id="enroll-email" label="Email" type="email" required autoComplete="email" />
            <TextField id="enroll-mobile" label="Mobile" type="tel" required autoComplete="tel" />

            {experience.slug === "prom" ? (
              <>
                <TextField id="enroll-school" label="School" required placeholder="Where you attend" />
                <TextField id="enroll-prom-date" label="Prom date" type="date" hint="If known" />
                <SelectField id="enroll-grad" label="Graduation year" required defaultValue="2027">
                  {[2027, 2028, 2029, 2030].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </SelectField>
              </>
            ) : (
              <TextField
                id="enroll-event-date"
                label={experience.slug === "bridal" ? "Wedding date" : "Event date"}
                type="date"
                hint="If known"
              />
            )}

            <TextField id="enroll-city" label="City" required autoComplete="address-level2" />
            <TextField id="enroll-state" label="State" required autoComplete="address-level1" />
          </div>

          {experience.slug !== "prom" ? (
            <TextAreaField
              id="enroll-vision"
              label="Tell Kenya about the occasion"
              hint="Optional"
              placeholder="The event, the feeling, anything you already know you want."
            />
          ) : null}

          <fieldset className="flex flex-col gap-4 border-t border-ink/10 pt-8">
            <legend className="eyebrow">Parent or guardian</legend>
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={isMinor}
                onChange={(event) => setIsMinor(event.target.checked)}
                className="mt-1 h-4 w-4 accent-ink"
              />
              The client is under 18 — a parent or guardian will co-sign the agreement.
            </label>

            {isMinor ? (
              <div className="grid gap-8 sm:grid-cols-2">
                <TextField
                  id="enroll-guardian"
                  label="Parent / guardian name"
                  required
                  value={guardianName}
                  onChange={(event) => setGuardianName(event.target.value)}
                />
                <TextField id="enroll-guardian-relationship" label="Relationship" required placeholder="Mother, father, guardian" />
                <TextField id="enroll-guardian-email" label="Parent / guardian email" type="email" required />
                <TextField id="enroll-guardian-mobile" label="Parent / guardian mobile" type="tel" required />
              </div>
            ) : null}
          </fieldset>

          <div className="flex flex-col gap-5">
            <Button type="submit" size="lg" className="self-start">
              Continue to Your Design
            </Button>
            <MockNotice>
              Phase 1 prototype — entered information is held in the browser for this demonstration
              only. Nothing is transmitted or stored.
            </MockNotice>
          </div>
        </form>
      ) : null}

      {step === "design" ? (
        <form onSubmit={submitDesign} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Your design</h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              This is what Kenya reads before she decides whether she can take your gown. Nothing
              is owed yet.
            </p>
          </div>

          {/* What she is agreeing to, before she is asked for anything. */}
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
            <div className="flex flex-col gap-3 bg-bone p-7">
              <p className="eyebrow">How long it takes</p>
              <p className="text-sm leading-relaxed text-ink/70">
                {experience.config.leadTimeNote}
              </p>
            </div>
            <div className="flex flex-col gap-3 bg-bone p-7">
              <p className="eyebrow">{season ? `During ${season.name}` : "How Kenya works"}</p>
              <p className="text-sm leading-relaxed text-ink/70">
                {season
                  ? `Prom runs as a capped season — ${season.initialCapacity} spots, and ${season.initialCapacity - season.spotsClaimed} left as this page loaded. Everyone is being built at once, so fittings are scheduled around the whole season rather than one gown, and the dates Kenya offers you are the dates she has. Once the spots are gone, enrolment moves to the waitlist, which is free to join.`
                  : `Kenya takes a limited number of commissions at a time so each one gets the attention it needs. She confirms your timeline once she has accepted your design.`}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">Your inspiration</p>
              <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-ink/25 px-6 py-14 text-center">
                <p className="text-sm text-ink/60">
                  Drop {experience.config.inspirationUploadsMin}–
                  {experience.config.inspirationUploadsMax} images here, or choose files
                </p>
                <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/35">
                  Phase 1 — no file is uploaded
                </p>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-ink/55">
                These tell Kenya the feeling you are after, not the dress she will copy. Your gown
                is developed through her creative process, specifically for you.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <TextField
                id="design-date"
                type="date"
                label={
                  experience.slug === "prom"
                    ? "The date you need it by"
                    : experience.slug === "bridal"
                      ? "Your wedding date"
                      : "The date you need it by"
                }
                hint="If your school or venue has not announced it, leave it blank and add it later from your account."
              />
              <TextField
                id="design-occasion"
                label="The occasion"
                placeholder={experience.slug === "prom" ? "Senior prom" : "Wedding, gala, pageant"}
              />
            </div>

            <TextAreaField
              id="design-vision"
              label="Tell Kenya what you want"
              rows={5}
              placeholder="Silhouette, colour, how you want to feel walking in, anything you already know you do not want."
            />
          </div>

          <div className="flex flex-col gap-5 border-t border-ink/10 pt-8">
            <p className="max-w-xl border-l-2 border-champagne pl-5 text-sm leading-relaxed text-ink/70">
              Kenya reads every request herself and comes back to you. If she takes your gown, you
              will be asked to sign the agreement and pay
              {depositCents ? ` the ${formatCurrency(depositCents)} deposit` : " your deposit"} —
              and that is when your gown begins. You are not charged to ask.
            </p>
            <Button type="submit" size="lg" className="self-start">
              Send My Request To Kenya
            </Button>
            <MockNotice>
              Phase 1 prototype — nothing is uploaded, sent or stored.
            </MockNotice>
          </div>
        </form>
      ) : null}

      {step === "submitted" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Sent</p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Kenya has your request.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              She reviews it herself. You will hear from her about whether she can take your gown,
              and nothing is owed until she does.
            </p>
          </div>

          <ol className="flex flex-col gap-5 border-y border-ink/10 py-8">
            {[
              "Kenya reads your request, your images and your date.",
              "She comes back to you — she may have questions first.",
              depositCents
                ? `If she takes your gown, you sign the agreement and pay the ${formatCurrency(depositCents)} deposit.`
                : "If she takes your gown, you sign the agreement and pay your deposit.",
              "Your deposit is what begins the work, and your account opens.",
            ].map((label, index) => (
              <li key={label} className="flex items-baseline gap-5 text-sm leading-relaxed text-ink/65">
                <span className="font-display text-base text-champagne-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-5">
            <p className="text-[0.6rem] uppercase tracking-luxe text-ink/40">
              Demonstration — continue as though Kenya has accepted
            </p>
            <Button onClick={() => setStep("agreement")} size="lg" className="self-start">
              Kenya Accepted — Continue
            </Button>
            <MockNotice>
              Phase 1 prototype — no request was sent and no one was notified. In production this
              screen waits on Kenya, and the agreement and deposit do not open until she accepts.
            </MockNotice>
          </div>
        </div>
      ) : null}

      {step === "agreement" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Agreement review</h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              Read the agreement in full, confirm each acknowledgement, then sign.
            </p>
          </div>

          <ContractReview
            sections={template.sections}
            version={template.version}
            name={template.name}
            updatedLabel={`Updated ${formatDate(template.updatedAt)}`}
          />

          <fieldset className="flex flex-col gap-4">
            <legend className="eyebrow">Acknowledgements</legend>
            {template.acknowledgements.map((item) => (
              <label key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
                <input
                  type="checkbox"
                  checked={acknowledged.includes(item)}
                  onChange={() => toggleAck(item)}
                  className="mt-1 h-4 w-4 shrink-0 accent-ink"
                />
                {item}
              </label>
            ))}
          </fieldset>

          <div className="grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
            <TextField
              id="enroll-signature"
              label="Client signature"
              hint="Type your full name"
              value={signature}
              onChange={(event) => setSignature(event.target.value)}
              placeholder={clientName || "Full name"}
              className="[&_input]:font-display [&_input]:text-lg"
            />
            {isMinor ? (
              <TextField
                id="enroll-guardian-signature"
                label="Parent / guardian signature"
                hint="Type full name"
                value={guardianSignature}
                onChange={(event) => setGuardianSignature(event.target.value)}
                placeholder={guardianName || "Full name"}
                className="[&_input]:font-display [&_input]:text-lg"
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                disabled={!allAcknowledged || !signatureValid}
                onClick={() => setStep("deposit")}
              >
                Sign &amp; Continue
              </Button>
              <Button variant="ghost" size="lg" onClick={() => setStep("details")}>
                Back
              </Button>
            </div>
            <MockNotice>
              Phase 1 prototype — no agreement is executed and no signed copy is generated. In
              production the signed version is stored immutably with a signature timestamp.
            </MockNotice>
          </div>
        </div>
      ) : null}

      {step === "deposit" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              {depositCents ? `${formatCurrency(depositCents)} deposit` : "Your deposit"}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              {season
                ? `Your deposit secures your spot in ${season.name}. A Prom Spot is acceptance into the season — your appointments are scheduled afterward.`
                : `Your deposit opens your ${experience.name} experience. Kenya confirms the full investment with you at your consultation.`}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <dl className="flex flex-col gap-4 border border-ink/15 p-8">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Experience</dt>
                <dd className="text-sm">{seasonName}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Agreement</dt>
                <dd className="text-sm">
                  {template.name} v{template.version}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-ink/10 pt-4">
                <dt className="eyebrow">Due today</dt>
                <dd className="font-display text-3xl">
                  {depositCents ? formatCurrency(depositCents) : "Quoted at consultation"}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-6 border border-ink/15 p-8">
              <p className="eyebrow">Payment</p>
              <div className="flex flex-col gap-6 opacity-60">
                <TextField id="pay-card" label="Card number" placeholder="Demonstration only" disabled />
                <div className="grid grid-cols-2 gap-6">
                  <TextField id="pay-exp" label="Expiry" placeholder="MM / YY" disabled />
                  <TextField id="pay-cvc" label="CVC" placeholder="•••" disabled />
                </div>
              </div>
              <MockNotice>
                Mock payment step — no card is collected and no payment is processed. A PCI-compliant
                processor is integrated in a later phase.
              </MockNotice>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => setStep("welcome")}>
                  {depositCents ? `Pay ${formatCurrency(depositCents)} (Demo)` : "Reserve My Place (Demo)"}
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setStep("agreement")}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {step === "welcome" ? (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5 border-y border-ink/10 py-12 text-center">
            <p className="eyebrow">{seasonName}</p>
            <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {season ? "Prom spot confirmed." : "You're in."}
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-ink/60">
              {signature ? `${signature.trim()}'s` : "Your"} place in {seasonName} is secured. Now
              meet the woman making your gown.
            </p>
          </div>

          {/* The welcome video is part of the flow — not a link to go and find. */}
          {welcome ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-center">
                <p className="eyebrow">A message from Kenya</p>
                <p className="font-display text-2xl leading-snug sm:text-3xl">
                  Welcome to your journey.
                </p>
              </div>
              <VideoFrame video={welcome} size="lg" label="A Message From Kenya" />
              <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-ink/55">
                Kenya walks you through the whole experience — what to expect, how you and she
                communicate, your appointments, inspiration, measurements, design, fabric sourcing,
                fittings, when to ask for changes, and the day your gown is released to you.
              </p>
            </div>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">What happens next</p>
              <ol className="flex flex-col gap-4">
                {[
                  "You receive a secure activation link by email to create your own password — no password is ever generated or shown to you.",
                  "Your My Kenya B. account opens with your journey laid out stage by stage.",
                  `You upload ${experience.config.inspirationUploadsMin}–${experience.config.inspirationUploadsMax} inspiration images.`,
                  "Kenya opens scheduling for your measurement and design appointment.",
                ].map((item, index) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed text-ink/65">
                    <span className="font-display text-lg text-champagne-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-5 border border-ink/15 p-8">
              <p className="eyebrow">Your receipt</p>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/50">Paid</dt>
                  <dd>{depositCents ? formatCurrency(depositCents) : "Quoted at consultation"}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/50">Agreement</dt>
                  <dd>
                    {template.name} v{template.version}
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink/50">Signed by</dt>
                  <dd>{signature || "—"}</dd>
                </div>
                {isMinor ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink/50">Guardian</dt>
                    <dd>{guardianSignature || "—"}</dd>
                  </div>
                ) : null}
              </dl>
              <MockNotice>
                Demonstration receipt — no payment was processed and no account was created.
              </MockNotice>
              <Button href="/portal" size="lg">
                Start My Journey
              </Button>
              <Link
                href={`/${experience.slug}`}
                className="text-center text-[0.6rem] uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
              >
                Back to {experience.name}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
