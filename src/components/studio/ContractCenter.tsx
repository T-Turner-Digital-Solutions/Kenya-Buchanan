"use client";

import { useState } from "react";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDateTime } from "@/lib/format";
import type { ContractTemplate, SignedContract } from "@/lib/types";

/**
 * CONTRACT CENTER.
 *
 * Immutability is the rule that matters: a signed contract stores its own
 * section snapshot and version, so editing a template never alters an executed
 * agreement. "Resend signed contract" resends the existing agreement;
 * "Issue new agreement" is a separate, deliberate action.
 */
export function ContractCenter({
  contracts,
  templates,
}: {
  contracts: SignedContract[];
  templates: ContractTemplate[];
}) {
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState<SignedContract | null>(null);
  const [resent, setResent] = useState<string | null>(null);

  const filtered = contracts.filter((contract) =>
    `${contract.clientName} ${contract.experience} ${contract.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-8">
      <Panel
        title="Signed contracts"
        note={`${contracts.length} on record`}
        action={
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search contracts"
            aria-label="Search contracts"
            className="w-48 border border-bone/25 bg-transparent px-4 py-2 text-xs text-bone placeholder:text-bone/30 focus:border-champagne focus:outline-none"
          />
        }
      >
        <div className="flex flex-col">
          {filtered.map((contract) => (
            <Row key={contract.id}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{contract.clientName}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {contract.experience} · v{contract.templateVersion}
                  {contract.signedAt ? ` · signed ${formatDateTime(contract.signedAt)}` : ""}
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-3">
                <StatusPill tone={contract.status === "signed" ? "dark" : "muted"}>
                  {contract.status.replace("_", " ")}
                </StatusPill>
                <button
                  type="button"
                  onClick={() => setViewing(contract)}
                  className="text-[0.6rem] uppercase tracking-wide2 text-champagne hover:text-bone"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => setResent(contract.id)}
                  className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone"
                >
                  Resend signed
                </button>
              </span>
            </Row>
          ))}
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-bone/35">No contracts match that search.</p>
          ) : null}
        </div>
      </Panel>

      <Panel title="Agreement templates" note="Editing a template never changes an executed agreement">
        <div className="flex flex-col">
          {templates.map((template) => (
            <Row key={template.id}>
              <span className="flex flex-col gap-1.5">
                <span className="text-sm text-bone/85">{template.name}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                  {template.experience} · v{template.version} ·{" "}
                  {template.requiresGuardian ? "guardian signature required" : "client signature"}
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-3">
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-bone/40 hover:text-bone">
                  Edit template
                </button>
                <button type="button" className="text-[0.6rem] uppercase tracking-wide2 text-champagne hover:text-bone">
                  Issue new agreement
                </button>
              </span>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — contract text is sample language pending Kenya and legal review. Resend,
        download, print and issuing a new agreement are not wired to a document or email service.
      </StudioNotice>

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        eyebrow={viewing ? `Version ${viewing.templateVersion} · as signed` : ""}
        title={viewing?.clientName ?? ""}
        size="lg"
      >
        {viewing ? (
          <div className="flex flex-col gap-6">
            <dl className="grid gap-4 border-b border-ink/10 pb-5 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Signature</dt>
                <dd className="mt-2 text-sm">{viewing.signatureName ?? "—"}</dd>
              </div>
              {viewing.guardianSignatureName ? (
                <div>
                  <dt className="eyebrow">Guardian signature</dt>
                  <dd className="mt-2 text-sm">{viewing.guardianSignatureName}</dd>
                </div>
              ) : null}
              <div>
                <dt className="eyebrow">Signed at</dt>
                <dd className="mt-2 text-sm">
                  {viewing.signedAt ? formatDateTime(viewing.signedAt) : "Not signed"}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Status</dt>
                <dd className="mt-2 text-sm capitalize">{viewing.status.replace("_", " ")}</dd>
              </div>
            </dl>

            {viewing.acknowledgements.length > 0 ? (
              <div className="flex flex-col gap-3">
                <p className="eyebrow">Acknowledgements as signed</p>
                <ul className="flex flex-col gap-2">
                  {viewing.acknowledgements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink/70">
                      <span aria-hidden className="text-champagne-deep">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-5">
              {viewing.sections.map((section) => (
                <section key={section.heading} className="flex flex-col gap-2">
                  <h4 className="text-[0.6rem] uppercase tracking-wide2 text-ink/50">
                    {section.heading}
                  </h4>
                  <p className="text-sm leading-relaxed text-ink/70">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-ink/10 pt-5">
              <Button variant="outline" size="sm">
                Download
              </Button>
              <Button variant="outline" size="sm">
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={() => setResent(viewing.id)}>
                Resend Signed Contract
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(resent)}
        onClose={() => setResent(null)}
        eyebrow="Resend"
        title="Signed contract resent"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-ink/70">
            The existing signed agreement would be resent to the client — the same version they
            signed, unchanged. Issuing a new agreement is a separate action.
          </p>
          <p className="text-[0.6rem] uppercase tracking-wide2 text-champagne-deep">
            Recorded in the activity log · Phase 1 prototype, nothing sent
          </p>
        </div>
      </Modal>
    </div>
  );
}
