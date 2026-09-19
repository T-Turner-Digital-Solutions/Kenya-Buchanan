import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatCurrency, formatDate } from "@/lib/format";
import { getDemoPortalClient } from "@/lib/services";
import type { PaymentStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Payments" };

const statusTone: Record<PaymentStatus, "positive" | "attention" | "muted" | "neutral"> = {
  paid: "positive",
  due: "attention",
  overdue: "attention",
  scheduled: "muted",
};

export default function PortalPaymentsPage() {
  const client = getDemoPortalClient();
  const { payments } = client;
  const balance = payments.totalInvestmentCents - payments.paidCents;
  const next = payments.milestones.find((m) => m.status === "due" || m.status === "overdue");
  const stillNeeded = next ? Math.max(0, next.amountCents - (payments.paidCents - 135_000)) : 0;

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-8 border border-ink/15 bg-white p-7 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Total investment</p>
            <p className="mt-3 font-display text-3xl">
              {formatCurrency(payments.totalInvestmentCents)}
            </p>
          </div>
          <div>
            <p className="eyebrow">Paid to date</p>
            <p className="mt-3 font-display text-3xl">{formatCurrency(payments.paidCents)}</p>
          </div>
          <div>
            <p className="eyebrow">Remaining balance</p>
            <p className="mt-3 font-display text-3xl text-champagne-deep">
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
        <ProgressBar
          value={payments.paidCents}
          max={payments.totalInvestmentCents}
          label="Amount paid"
        />
      </section>

      {next ? (
        <section className="flex flex-col gap-5 border border-champagne-deep/40 bg-champagne/10 p-7 sm:p-10">
          <p className="eyebrow">Next payment</p>
          <p className="font-display text-3xl leading-tight">
            {formatCurrency(next.amountCents)} — {next.label}
          </p>
          {next.dueOn ? (
            <p className="text-sm text-ink/65">Due {formatDate(next.dueOn)}</p>
          ) : null}
          {next.gateNote ? (
            <p className="text-sm leading-relaxed text-ink/65">
              {next.gateNote}. {stillNeeded > 0 ? `${formatCurrency(stillNeeded)} still required.` : ""}
            </p>
          ) : null}
          <Button className="self-start">Make A Payment</Button>
        </section>
      ) : null}

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl">Payment milestones</h2>
        <ul className="flex flex-col">
          {payments.milestones.map((milestone) => (
            <li
              key={milestone.id}
              className="flex flex-col gap-2 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-ink/80">{milestone.label}</span>
                {milestone.gateNote ? (
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                    {milestone.gateNote}
                  </span>
                ) : null}
              </span>
              <span className="flex items-center gap-5">
                {milestone.dueOn ? (
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                    {formatDate(milestone.dueOn)}
                  </span>
                ) : null}
                <span
                  className={cx(
                    "font-display text-xl",
                    milestone.status === "paid" ? "text-ink/40" : "text-ink",
                  )}
                >
                  {formatCurrency(milestone.amountCents)}
                </span>
                <StatusPill tone={statusTone[milestone.status]}>{milestone.status}</StatusPill>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl">Payment history</h2>
        <ul className="flex flex-col">
          {payments.history.map((record) => (
            <li
              key={record.id}
              className="flex flex-col gap-2 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-ink/80">{record.label}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  {formatDate(record.at)} · {record.method} · Receipt {record.receiptId}
                </span>
              </span>
              <span className="flex items-center gap-5">
                <span className="font-display text-xl">{formatCurrency(record.amountCents)}</span>
                <a
                  href="#"
                  className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep hover:text-ink"
                >
                  Receipt
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <MockNotice>
        Phase 1 prototype — amounts, milestones and receipts are mock data. No payment processing
        is implemented and no card details are collected anywhere in this application. Payment
        rules and milestone amounts become configurable from Kenya B. Studio.
      </MockNotice>
    </div>
  );
}
