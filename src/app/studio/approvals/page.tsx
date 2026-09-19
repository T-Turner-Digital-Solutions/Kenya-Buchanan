import type { Metadata } from "next";
import { Panel, Row, StudioNotice } from "@/components/studio/StudioPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatDate } from "@/lib/format";
import { getClientRecord, getExperience } from "@/lib/services";

export const metadata: Metadata = { title: "Approvals" };

const approvalLabels: Record<string, string> = {
  design_sketch: "Design / sketch approval",
  color: "Colour approval",
  fabric: "Fabric approval",
  embellishment: "Embellishment approval",
  major_change: "Major change approval",
};

export default function StudioApprovalsPage() {
  const karlie = getClientRecord("cl-karlie-mcdowell")!;
  const available = getExperience("prom")!.config.availableApprovals;

  return (
    <div className="flex flex-col gap-8">
      <Panel title="Awaiting client action" note="Requested and not yet approved">
        <div className="flex flex-col">
          {karlie.approvals
            .filter((approval) => approval.status !== "approved")
            .map((approval) => (
              <Row key={approval.id} href={`/studio/clients/${karlie.id}`}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">
                    {karlie.firstName} {karlie.lastName} — {approval.title}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    {approvalLabels[approval.kind]}
                    {approval.requestedAt ? ` · requested ${formatDate(approval.requestedAt)}` : ""}
                  </span>
                </span>
                <StatusPill tone="attention">{approval.status.replace("_", " ")}</StatusPill>
              </Row>
            ))}
        </div>
      </Panel>

      <Panel title="Recently approved">
        <div className="flex flex-col">
          {karlie.approvals
            .filter((approval) => approval.status === "approved")
            .map((approval) => (
              <Row key={approval.id} href={`/studio/clients/${karlie.id}`}>
                <span className="flex flex-col gap-1.5">
                  <span className="text-sm text-bone/85">
                    {karlie.firstName} {karlie.lastName} — {approval.title}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                    Approved {approval.approvedAt ? formatDate(approval.approvedAt) : "—"} · kept on
                    the permanent record
                  </span>
                </span>
                <StatusPill tone="dark">Approved</StatusPill>
              </Row>
            ))}
        </div>
      </Panel>

      <Panel
        title="Approval types"
        note="Kenya decides which approvals apply to each client"
        action={<Button variant="light" size="sm">Request An Approval</Button>}
      >
        <div className="flex flex-col">
          {available.map((kind) => (
            <Row key={kind}>
              <span className="text-sm text-bone/85">{approvalLabels[kind]}</span>
              <span className="text-[0.6rem] uppercase tracking-wide2 text-bone/35">
                Optional per client
              </span>
            </Row>
          ))}
        </div>
      </Panel>

      <StudioNotice>
        Phase 1 prototype — requesting an approval, uploading imagery and notifying the client are
        not implemented. Approvals and their timestamps become part of the permanent client record.
      </StudioNotice>
    </div>
  );
}
