import type { Metadata } from "next";
import { ContractCenter } from "@/components/studio/ContractCenter";
import { contractTemplates, signedContracts } from "@/lib/services";

export const metadata: Metadata = { title: "Contracts" };

export default function StudioContractsPage() {
  return <ContractCenter contracts={signedContracts} templates={contractTemplates} />;
}
