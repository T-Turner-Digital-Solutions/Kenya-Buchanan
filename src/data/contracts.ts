import type { ContractTemplate, SignedContract } from "@/lib/types";

/**
 * CONTRACTS — placeholder language only.
 *
 * ⚠️ Nothing in this file is final legal wording. Every section below is sample
 * text written to demonstrate structure and MUST be replaced by language Kenya
 * supplies and counsel reviews before any real client signs.
 *
 * Immutability rule: a `SignedContract` stores its own `sections` and
 * `templateVersion`. Editing a template creates a new version; previously
 * signed contracts keep the exact text they were signed against.
 */

export const LEGAL_PLACEHOLDER_NOTICE =
  "Sample language for layout purposes only. Final terms will be supplied by Kenya Buchanan and reviewed by counsel before use.";

export const contractTemplates: ContractTemplate[] = [
  {
    id: "tpl-prom-v3",
    experience: "prom",
    name: "Prom Client Agreement",
    version: "3.0",
    updatedAt: "2026-07-28T00:00:00.000Z",
    requiresGuardian: true,
    sections: [
      { heading: "The Prom Spot", body: "[SAMPLE] A Prom Spot represents acceptance into the Prom season. It is not an appointment. Appointments are scheduled separately once enrollment is complete." },
      { heading: "Deposit", body: "[SAMPLE] A deposit secures the Prom Spot. Deposit terms, including whether and under what conditions it is refundable, will be stated here in the final agreement." },
      { heading: "Payment Schedule & Production Milestones", body: "[SAMPLE] Payment milestones and the production stages they precede will be stated here. Certain stages may not begin until the associated milestone is satisfied." },
      { heading: "Appointments, Rescheduling & Attendance", body: "[SAMPLE] Terms covering appointment scheduling, client rescheduling, rescheduling cutoffs, no-shows and lateness will be stated here." },
      { heading: "Measurements & Fittings", body: "[SAMPLE] Terms covering measurement accuracy, required fittings and client responsibilities will be stated here." },
      { heading: "Design, Fabric & Change Requests", body: "[SAMPLE] Terms covering design direction, approvals, sourcing and the designated period for requested changes will be stated here." },
      { heading: "Gown Release", body: "[SAMPLE] Terms covering final balance, pickup, release and storage will be stated here." },
      { heading: "Cancellation", body: "[SAMPLE] Cancellation and refund terms will be stated here." },
    ],
    acknowledgements: [
      "I understand a Prom Spot is acceptance into the Prom season, not an appointment.",
      "I understand my gown is developed through Kenya's creative process specifically for me.",
      "I understand Fitting #2 is the designated time to raise questions and requested adjustments.",
      "I have read the agreement in full.",
    ],
  },
  {
    id: "tpl-bridal-v2",
    experience: "bridal",
    name: "Bridal Client Agreement",
    version: "2.1",
    updatedAt: "2026-06-11T00:00:00.000Z",
    requiresGuardian: false,
    sections: [
      { heading: "The Bridal Experience", body: "[SAMPLE] Scope of the bridal commission, timeline expectations and fitting cadence will be stated here." },
      { heading: "Deposit & Payment Schedule", body: "[SAMPLE] Bridal deposit and milestone terms will be stated here." },
      { heading: "Approvals", body: "[SAMPLE] Design, colour and fabric approval terms will be stated here." },
      { heading: "Fittings & Alterations", body: "[SAMPLE] Fitting schedule and alteration terms will be stated here." },
      { heading: "Release & Preservation", body: "[SAMPLE] Release, transport and preservation terms will be stated here." },
    ],
    acknowledgements: [
      "I understand the bridal timeline requires my availability for scheduled fittings.",
      "I have read the agreement in full.",
    ],
  },
  {
    id: "tpl-maternity-v1",
    experience: "maternity",
    name: "Maternity Design Agreement",
    version: "1.0",
    updatedAt: "2026-09-20T00:00:00.000Z",
    requiresGuardian: false,
    sections: [
      { heading: "The Commission", body: "[SAMPLE] Scope of the maternity commission will be stated here." },
      { heading: "Deposit & Payment", body: "[SAMPLE] Deposit and payment terms will be stated here." },
      { heading: "Timeline & Your Date", body: "[SAMPLE] Terms covering the shoot or event date, and how fittings are scheduled around it, will be stated here." },
      { heading: "Fittings & Fit Changes", body: "[SAMPLE] Terms covering fittings scheduled close to the date, and how fit changes through pregnancy are accommodated, will be stated here." },
      { heading: "Release", body: "[SAMPLE] Release and pickup terms will be stated here." },
    ],
    acknowledgements: [
      "I understand my fittings are scheduled close to my date so the gown fits on the day.",
      "I have read the agreement in full.",
    ],
  },
  {
    id: "tpl-custom-v1",
    experience: "custom",
    name: "Custom Design Agreement",
    version: "1.4",
    updatedAt: "2026-05-02T00:00:00.000Z",
    requiresGuardian: false,
    sections: [
      { heading: "The Commission", body: "[SAMPLE] Scope of the custom commission will be stated here." },
      { heading: "Deposit & Payment", body: "[SAMPLE] Deposit and payment terms will be stated here." },
      { heading: "Timeline", body: "[SAMPLE] Delivery timeline and event-date terms will be stated here." },
      { heading: "Changes", body: "[SAMPLE] Change-request terms will be stated here." },
    ],
    acknowledgements: ["I have read the agreement in full."],
  },
];

export function getContractTemplate(id: string): ContractTemplate | undefined {
  return contractTemplates.find((template) => template.id === id);
}

const promTemplate = contractTemplates[0];

export const signedContracts: SignedContract[] = [
  {
    id: "sc-karlie-prom",
    templateId: "tpl-prom-v3",
    templateVersion: "3.0",
    clientId: "cl-karlie-mcdowell",
    clientName: "Karlie McDowell",
    experience: "prom",
    status: "signed",
    signedAt: "2026-08-16T18:20:00.000Z",
    signatureName: "Karlie McDowell",
    guardianSignatureName: "Renée McDowell",
    acknowledgements: promTemplate.acknowledgements,
    sections: promTemplate.sections,
    relatedPaymentIds: ["pay-1", "pay-2"],
  },
  {
    id: "sc-amaya-prom",
    templateId: "tpl-prom-v3",
    templateVersion: "3.0",
    clientId: "cl-2",
    clientName: "Amaya Ellison",
    experience: "prom",
    status: "signed",
    signedAt: "2026-08-15T14:02:00.000Z",
    signatureName: "Amaya Ellison",
    guardianSignatureName: "Denise Ellison",
    acknowledgements: promTemplate.acknowledgements,
    sections: promTemplate.sections,
    relatedPaymentIds: [],
  },
  {
    id: "sc-teagan-prom",
    templateId: "tpl-prom-v3",
    templateVersion: "2.4",
    clientId: "cl-3",
    clientName: "Teagan Brooks",
    experience: "prom",
    status: "superseded",
    signedAt: "2026-06-02T19:40:00.000Z",
    signatureName: "Teagan Brooks",
    acknowledgements: ["I have read the agreement in full."],
    sections: [
      { heading: "The Prom Spot", body: "[SAMPLE — v2.4 as signed] Retained exactly as signed. Template edits never alter an executed agreement." },
    ],
    relatedPaymentIds: [],
  },
  {
    id: "sc-simone-bridal",
    templateId: "tpl-bridal-v2",
    templateVersion: "2.1",
    clientId: "cl-4",
    clientName: "Simone Cartier",
    experience: "bridal",
    status: "signed",
    signedAt: "2026-07-19T16:15:00.000Z",
    signatureName: "Simone Cartier",
    acknowledgements: contractTemplates[1].acknowledgements,
    sections: contractTemplates[1].sections,
    relatedPaymentIds: [],
  },
  {
    id: "sc-noor-bridal",
    templateId: "tpl-bridal-v2",
    templateVersion: "2.1",
    clientId: "cl-5",
    clientName: "Noor Haddad",
    experience: "bridal",
    status: "awaiting_signature",
    acknowledgements: contractTemplates[1].acknowledgements,
    sections: contractTemplates[1].sections,
    relatedPaymentIds: [],
  },
  {
    id: "sc-elise-bridal",
    templateId: "tpl-bridal-v2",
    templateVersion: "2.1",
    clientId: "cl-12",
    clientName: "Elise Kwan",
    experience: "bridal",
    status: "on_hold",
    signedAt: "2026-08-30T13:05:00.000Z",
    signatureName: "Elise Kwan",
    acknowledgements: contractTemplates[1].acknowledgements,
    sections: contractTemplates[1].sections,
    relatedPaymentIds: [],
  },
  {
    id: "sc-jordyn-prom",
    templateId: "tpl-prom-v3",
    templateVersion: "2.4",
    clientId: "cl-11",
    clientName: "Jordyn Alston",
    experience: "prom",
    status: "cancelled",
    signedAt: "2025-09-08T15:20:00.000Z",
    signatureName: "Jordyn Alston",
    guardianSignatureName: "Michelle Alston",
    acknowledgements: ["I have read the agreement in full."],
    sections: [{ heading: "The Prom Spot", body: "[SAMPLE — v2.4 as signed] Retained exactly as signed." }],
    relatedPaymentIds: [],
  },
  {
    id: "sc-marisol-prom",
    templateId: "tpl-prom-v3",
    templateVersion: "2.4",
    clientId: "cl-10",
    clientName: "Marisol Vega",
    experience: "prom",
    status: "completed",
    signedAt: "2025-08-21T17:30:00.000Z",
    signatureName: "Marisol Vega",
    acknowledgements: ["I have read the agreement in full."],
    sections: [{ heading: "The Prom Spot", body: "[SAMPLE — v2.4 as signed] Retained exactly as signed." }],
    relatedPaymentIds: [],
  },
];

export function getSignedContract(id: string): SignedContract | undefined {
  return signedContracts.find((contract) => contract.id === id);
}
