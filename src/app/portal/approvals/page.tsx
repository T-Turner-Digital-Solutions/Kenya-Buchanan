import type { Metadata } from "next";
import { ApprovalCard } from "@/components/portal/ApprovalCard";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "Approvals" };

export default function PortalApprovalsPage() {
  const client = getDemoPortalClient();
  const pending = client.approvals.filter((approval) => approval.status !== "approved");
  const done = client.approvals.filter((approval) => approval.status === "approved");

  return (
    <div className="flex flex-col gap-14">
      {pending.length > 0 ? (
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl">Waiting on you</h2>
          {pending.map((approval) => (
            <ApprovalCard key={approval.id} approval={approval} />
          ))}
        </section>
      ) : null}

      {done.length > 0 ? (
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-2xl">Already approved</h2>
          {done.map((approval) => (
            <ApprovalCard key={approval.id} approval={approval} />
          ))}
        </section>
      ) : null}

      <p className="border-t border-ink/10 pt-8 text-sm leading-relaxed text-ink/55">
        Approvals are optional and set per client. Kenya decides which ones your gown needs —
        design, colour, fabric, embellishment or a major change — so you will only ever see the
        ones that apply to you.
      </p>
    </div>
  );
}
