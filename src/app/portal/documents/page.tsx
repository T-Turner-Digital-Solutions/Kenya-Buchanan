import type { Metadata } from "next";
import { ContractReview } from "@/components/enroll/ContractReview";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDateTime } from "@/lib/format";
import { getDemoPortalClient, getSignedContract } from "@/lib/services";

export const metadata: Metadata = { title: "Documents" };

export default function PortalDocumentsPage() {
  const client = getDemoPortalClient();
  const contract = getSignedContract(client.contractIds[0]);

  return (
    <div className="flex flex-col gap-14">
      {contract ? (
        <section className="flex flex-col gap-7 border border-ink/15 bg-white p-7 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Your agreement</p>
              <h2 className="font-display text-2xl leading-tight">Prom 2027 Client Agreement</h2>
            </div>
            <StatusPill tone="positive">Signed</StatusPill>
          </div>

          <dl className="grid gap-6 border-y border-ink/10 py-6 sm:grid-cols-3">
            <div>
              <dt className="eyebrow">Signed by</dt>
              <dd className="mt-2 text-sm">{contract.signatureName}</dd>
            </div>
            {contract.guardianSignatureName ? (
              <div>
                <dt className="eyebrow">Parent / guardian</dt>
                <dd className="mt-2 text-sm">{contract.guardianSignatureName}</dd>
              </div>
            ) : null}
            <div>
              <dt className="eyebrow">Signed</dt>
              <dd className="mt-2 text-sm">
                {contract.signedAt ? formatDateTime(contract.signedAt) : "—"}
              </dd>
            </div>
          </dl>

          <ContractReview
            sections={contract.sections}
            version={contract.templateVersion}
            name="Prom Client Agreement"
            updatedLabel="Version as signed"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">Download</Button>
            <Button variant="outline">Print</Button>
          </div>

          <p className="text-xs leading-relaxed text-ink/50">
            This is the exact version you signed. If Kenya updates the agreement template later,
            your signed copy does not change.
          </p>
        </section>
      ) : null}

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl">All documents</h2>
        <ul className="flex flex-col">
          {client.documents.map((document) => (
            <li
              key={document.id}
              className="flex flex-col gap-2 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-ink/80">{document.title}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  {document.kind} · {formatDateTime(document.issuedAt)}
                </span>
              </span>
              <a href="#" className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep hover:text-ink">
                View
              </a>
            </li>
          ))}
        </ul>
      </section>

      <MockNotice>
        Phase 1 prototype — contract language is sample text requiring Kenya and legal review.
        Download, print and resend are not wired to a document service yet.
      </MockNotice>
    </div>
  );
}
