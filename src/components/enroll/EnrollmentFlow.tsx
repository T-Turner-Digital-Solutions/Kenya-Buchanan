"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ContractReview } from "@/components/enroll/ContractReview";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cx, formatCurrency, formatDate } from "@/lib/format";
import type { ContractTemplate, Season } from "@/lib/types";

type Step = "details" | "agreement" | "payment" | "confirmed";

const steps: Array<{ key: Step; label: string }> = [
  { key: "details", label: "Your Details" },
  { key: "agreement", label: "Agreement" },
  { key: "payment", label: "Deposit" },
  { key: "confirmed", label: "Confirmed" },
];

/**
 * PROM ENROLLMENT — Phase 1 demonstration flow.
 *
 * Nothing here is real: no record is created, no agreement is executed, no
 * payment is processed and no account is provisioned. Production will run each
 * step server-side (validation → contract execution → payment intent →
 * account activation email with a secure link the client uses to set their own
 * password — a password is never generated or displayed).
 */
export function EnrollmentFlow({
  season,
  template,
}: {
  season: Season;
  template: ContractTemplate;
}) {
  const [step, setStep] = useState<Step>("details");
  const [clientName, setClientName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [isMinor, setIsMinor] = useState(true);
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [signature, setSignature] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");

  const stepIndex = steps.findIndex((entry) => entry.key === step);
  const allAcknowledged = acknowledged.length === template.acknowledgements.length;
  const signatureValid =
    signature.trim().length > 1 && (!isMinor || guardianSignature.trim().length > 1);

  const toggleAck = (value: string) =>
    setAcknowledged((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep("agreement");
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
        <ProgressBar value={stepIndex + 1} max={steps.length} label="Enrollment progress" />
      </div>

      {step === "details" ? (
        <form onSubmit={submitDetails} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Your details</h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              This is how Kenya reaches you and how your {season.name} record is created.
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
            <TextField id="enroll-school" label="School" required placeholder="Where you attend" />
            <TextField id="enroll-prom-date" label="Prom date" type="date" hint="If known" />
            <SelectField id="enroll-grad" label="Graduation year" required defaultValue="2027">
              {[2027, 2028, 2029, 2030].map((year) => (
                <option key={year}>{year}</option>
              ))}
            </SelectField>
            <TextField id="enroll-city" label="City" required autoComplete="address-level2" />
            <TextField id="enroll-state" label="State" required autoComplete="address-level1" />
          </div>

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
              Continue to Agreement
            </Button>
            <MockNotice>
              Phase 1 prototype — entered information is held in the browser for this demonstration
              only. Nothing is transmitted or stored.
            </MockNotice>
          </div>
        </form>
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
                onClick={() => setStep("payment")}
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

      {step === "payment" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              {formatCurrency(season.depositCents)} deposit
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/60">
              Your deposit secures your spot in {season.name}. A Prom Spot is acceptance into the
              season — your appointments are scheduled afterward.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <dl className="flex flex-col gap-4 border border-ink/15 p-8">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Season</dt>
                <dd className="text-sm">{season.name}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="eyebrow">Agreement</dt>
                <dd className="text-sm">
                  {template.name} v{template.version}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-ink/10 pt-4">
                <dt className="eyebrow">Due today</dt>
                <dd className="font-display text-3xl">{formatCurrency(season.depositCents)}</dd>
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
                <Button size="lg" onClick={() => setStep("confirmed")}>
                  Pay {formatCurrency(season.depositCents)} (Demo)
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setStep("agreement")}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {step === "confirmed" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 border-y border-ink/10 py-12 text-center">
            <p className="eyebrow">{season.name}</p>
            <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Prom spot confirmed.
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-ink/60">
              {signature || "Your"} place in {season.name} is secured. Kenya has been notified.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">What happens next</p>
              <ol className="flex flex-col gap-4">
                {[
                  "You receive a secure activation link by email to create your own password — no password is ever generated or shown to you.",
                  "Your My Kenya B. account opens with a welcome message from Kenya.",
                  "You upload 1–3 inspiration images.",
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
                  <dd>{formatCurrency(season.depositCents)}</dd>
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
              <Button href="/portal/welcome" size="lg">
                Continue to My Kenya B.
              </Button>
              <Link
                href="/prom"
                className="text-center text-[0.6rem] uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
              >
                Back to Prom
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
