import type { ClientRecord, ClientSummary, JourneyStage } from "@/lib/types";
import { getExperience } from "./experiences";

/**
 * MOCK CLIENT RECORDS — fictional people, fictional details.
 *
 * `ownerNotes` and anything marked owner-only must only ever be imported by
 * Kenya B. Studio screens. Client portal screens read from `getPortalClient()`,
 * which strips them.
 */

const promTemplate = getExperience("prom")!.journeyTemplate;

const karlieJourney: JourneyStage[] = promTemplate.map((stage) => {
  const base: JourneyStage = { ...stage, status: "upcoming", checklist: [] };

  switch (stage.key) {
    case "welcome":
      return {
        ...base,
        status: "complete",
        completedAt: "2026-08-16T18:40:00.000Z",
        videoId: "vid-welcome",
        checklist: [
          { id: "c-w1", label: "Watch Kenya's welcome message", done: true, clientAction: true },
          { id: "c-w2", label: "Confirm contact details", done: true, clientAction: true },
          { id: "c-w3", label: "Agreement signed", done: true },
        ],
      };
    case "inspiration":
      return {
        ...base,
        status: "complete",
        completedAt: "2026-08-21T14:12:00.000Z",
        checklist: [{ id: "c-i1", label: "Upload 1–3 inspiration images", done: true, clientAction: true }],
        uploadPrompt: {
          title: "Upload Your Inspiration",
          helpText:
            "These images help Kenya understand your vision. Your final Kenya B. gown will be developed through Kenya's creative process specifically for you.",
          min: 1,
          max: 3,
          required: true,
        },
      };
    case "measurement":
      return {
        ...base,
        status: "complete",
        completedAt: "2026-08-29T16:30:00.000Z",
        videoId: "vid-measurements-complete",
        appointmentId: "apt-karlie-1",
        checklist: [
          { id: "c-m1", label: "Watch the preparation video", done: true, clientAction: true },
          { id: "c-m2", label: "Measurements taken", done: true },
          { id: "c-m3", label: "Design conversation complete", done: true },
        ],
      };
    case "design":
      return {
        ...base,
        status: "complete",
        completedAt: "2026-09-08T19:05:00.000Z",
        approvalId: "apr-karlie-sketch",
        checklist: [
          { id: "c-d1", label: "Design direction developed", done: true },
          { id: "c-d2", label: "Sketch approved by you", done: true, clientAction: true },
        ],
      };
    case "sourcing":
      return {
        ...base,
        status: "current",
        statusNote: "Currently sourcing",
        videoId: "vid-sourcing",
        approvalId: "apr-karlie-fabric",
        checklist: [
          { id: "c-s1", label: "Primary fabric identified", done: true },
          { id: "c-s2", label: "Approve your fabric selection", done: false, clientAction: true },
          { id: "c-s3", label: "Materials secured and in studio", done: false },
        ],
      };
    case "construction":
      return {
        ...base,
        status: "blocked",
        statusNote: "Begins once fabric is approved and the 50% milestone is met",
        videoId: "vid-construction",
        checklist: [
          { id: "c-c1", label: "Pattern drafted to your measurements", done: false },
          { id: "c-c2", label: "Gown construction", done: false },
        ],
      };
    case "fitting_two":
      return {
        ...base,
        appointmentId: "apt-karlie-2",
        videoId: "vid-fitting-two",
        checklist: [
          { id: "c-f1", label: "Watch the fitting preparation video", done: false, clientAction: true },
          { id: "c-f2", label: "Bring your shoes and undergarments", done: false, clientAction: true },
        ],
      };
    case "final_fitting":
      return { ...base, appointmentId: "apt-karlie-3", videoId: "vid-final-fitting", checklist: [] };
    case "release":
      return {
        ...base,
        videoId: "vid-gown-ready",
        checklist: [{ id: "c-r1", label: "Final balance settled", done: false, clientAction: true }],
      };
    default:
      return base;
  }
});

export const karlieMcDowell: ClientRecord = {
  id: "cl-karlie-mcdowell",
  firstName: "Karlie",
  lastName: "McDowell",
  experience: "prom",
  seasonId: "season-prom-2027",
  accountStatus: "active",
  eventDate: "2027-04-24T00:00:00.000Z",
  eventLabel: "Prom 2027",
  city: "Douglasville",
  state: "GA",
  stageKey: "sourcing",
  productionColumn: "sourcing",
  balanceDueCents: 265_000,
  nextAppointmentAt: "2026-10-14T14:30:00.000Z",
  email: "karlie.mcdowell@example.com",
  mobile: "(555) 0134",
  guardian: {
    name: "Renée McDowell",
    relationship: "Mother",
    email: "renee.mcdowell@example.com",
    mobile: "(555) 0135",
  },
  school: "Chapel Hill High School",
  graduationYear: 2027,
  joinedAt: "2026-08-16T18:22:00.000Z",
  measurements: [
    { label: "Bust", value: "34 in", takenAt: "2026-08-29T16:00:00.000Z" },
    { label: "Waist", value: "26 in", takenAt: "2026-08-29T16:00:00.000Z" },
    { label: "Hip", value: "37 in", takenAt: "2026-08-29T16:00:00.000Z" },
    { label: "Hollow to hem", value: "58 in", takenAt: "2026-08-29T16:00:00.000Z" },
    { label: "Shoulder to waist", value: "16 in", takenAt: "2026-08-29T16:00:00.000Z" },
  ],
  inspiration: [
    { id: "up-1", label: "Inspiration 01", kind: "image", uploadedAt: "2026-08-21T14:02:00.000Z", uploadedBy: "client" },
    { id: "up-2", label: "Inspiration 02", kind: "image", uploadedAt: "2026-08-21T14:06:00.000Z", uploadedBy: "client" },
    { id: "up-3", label: "Inspiration 03", kind: "image", uploadedAt: "2026-08-21T14:12:00.000Z", uploadedBy: "client" },
  ],
  uploads: [
    { id: "up-4", label: "Shoe height reference", kind: "image", uploadedAt: "2026-09-02T11:20:00.000Z", uploadedBy: "client" },
  ],
  designNotes:
    "Structured bodice, deep V neckline, full skirt with movement. Karlie wants drama at the entrance and the ability to dance.",
  fabric: {
    id: "fab-karlie",
    name: "Champagne silk mikado with beaded tulle overlay",
    descriptor: "Heavy-weight silk with a soft sheen, paired with a hand-beaded overlay",
    sourcingLocation: "New York",
    sourcingStatus: "sourcing",
    approvalId: "apr-karlie-fabric",
  },
  approvals: [
    {
      id: "apr-karlie-sketch",
      kind: "design_sketch",
      title: "Your Design",
      status: "approved",
      note: "Here is where your gown landed. The bodice line is what we talked through at your appointment.",
      media: [{ id: "karlie-sketch", alt: "Design sketch — structured bodice, full skirt", ratio: "portrait" }],
      requestedAt: "2026-09-05T15:00:00.000Z",
      approvedAt: "2026-09-08T19:05:00.000Z",
    },
    {
      id: "apr-karlie-fabric",
      kind: "fabric",
      title: "Your Fabric Selection",
      status: "pending",
      note: "This is the silk I want for your gown, with the beaded overlay for the skirt. Look at how the light moves across it.",
      media: [
        { id: "karlie-fabric-1", alt: "Champagne silk mikado", ratio: "square" },
        { id: "karlie-fabric-2", alt: "Beaded tulle overlay detail", ratio: "square" },
      ],
      videoId: "vid-sourcing",
      requestedAt: "2026-09-16T13:30:00.000Z",
      showColorDisclaimer: true,
    },
  ],
  appointments: [
    {
      id: "apt-karlie-1",
      type: "measurement_design",
      title: "Measurement & Design Appointment",
      startsAt: "2026-08-29T15:00:00.000Z",
      durationMinutes: 75,
      location: "Kenya B. Studio",
      status: "completed",
      rescheduleable: false,
      rescheduleCount: 0,
      preparation: {
        headline: "Before Your Measurement Appointment",
        videoId: "vid-measurements-prep",
        instructions: [
          "Wear or bring fitted undergarments similar to what you plan to wear under your gown.",
          "Bring shoes at the height you intend to wear, or the closest you have.",
          "Come with your hair away from your neckline so we can see the line of your shoulders.",
        ],
        checklist: [
          { id: "p1-1", label: "Watch Kenya's preparation video", done: true, clientAction: true },
          { id: "p1-2", label: "Review instructions", done: true, clientAction: true },
          { id: "p1-3", label: "Upload inspiration", done: true, clientAction: true },
          { id: "p1-4", label: "Confirm you understand", done: true, clientAction: true },
        ],
        acknowledgementRequired: true,
        acknowledgedAt: "2026-08-27T22:14:00.000Z",
      },
    },
    {
      id: "apt-karlie-2",
      type: "fitting_two",
      title: "Fitting #2",
      startsAt: "2026-10-14T14:30:00.000Z",
      durationMinutes: 60,
      location: "Kenya B. Studio",
      status: "scheduled",
      rescheduleable: true,
      rescheduleCount: 1,
      isChangeCheckpoint: true,
      preparation: {
        headline: "Before Your Fitting",
        videoId: "vid-fitting-two",
        instructions: [
          "Bring the shoes you will wear to prom.",
          "Bring the undergarments you plan to wear with the gown.",
          "Come with any questions written down — this is the appointment for them.",
        ],
        checklist: [
          { id: "p2-1", label: "Watch the fitting preparation video", done: false, clientAction: true },
          { id: "p2-2", label: "Bring shoes and undergarments", done: false, clientAction: true },
          { id: "p2-3", label: "Write down your questions", done: false, clientAction: true },
        ],
        acknowledgementRequired: true,
      },
    },
    {
      id: "apt-karlie-3",
      type: "final_fitting",
      title: "Final Fitting & Release",
      startsAt: "2027-03-27T15:00:00.000Z",
      durationMinutes: 60,
      location: "Kenya B. Studio",
      status: "scheduled",
      rescheduleable: true,
      rescheduleCount: 0,
      preparation: {
        headline: "Before Your Final Fitting",
        videoId: "vid-final-fitting",
        instructions: [
          "Bring everything you will wear on the night — shoes, undergarments, accessories.",
          "Plan for a full hour; we will check how the gown moves.",
        ],
        checklist: [{ id: "p3-1", label: "Final balance settled before release", done: false, clientAction: true }],
        acknowledgementRequired: false,
      },
    },
  ],
  rescheduleHistory: [
    {
      id: "rs-1",
      appointmentId: "apt-karlie-2",
      at: "2026-09-12T20:10:00.000Z",
      fromStartsAt: "2026-10-07T14:30:00.000Z",
      toStartsAt: "2026-10-14T14:30:00.000Z",
      by: "client",
    },
  ],
  payments: {
    totalInvestmentCents: 400_000,
    paidCents: 135_000,
    milestones: [
      { id: "ms-1", label: "Prom Spot Deposit", amountCents: 15_000, status: "paid" },
      { id: "ms-2", label: "Design & sourcing payment", amountCents: 120_000, status: "paid" },
      {
        id: "ms-3",
        label: "50% milestone",
        amountCents: 200_000,
        dueOn: "2026-10-15T00:00:00.000Z",
        status: "due",
        gateNote: "Required before construction begins",
      },
      {
        id: "ms-4",
        label: "Final balance",
        amountCents: 200_000,
        dueOn: "2027-03-20T00:00:00.000Z",
        status: "scheduled",
        gateNote: "Required before gown release",
      },
    ],
    history: [
      {
        id: "pay-1",
        at: "2026-08-16T18:22:00.000Z",
        label: "Prom Spot Deposit",
        amountCents: 15_000,
        method: "Card ending 4242",
        receiptId: "RCPT-2027-0416",
      },
      {
        id: "pay-2",
        at: "2026-09-01T15:44:00.000Z",
        label: "Design & sourcing payment",
        amountCents: 120_000,
        method: "Card ending 4242",
        receiptId: "RCPT-2027-0488",
      },
    ],
  },
  contractIds: ["sc-karlie-prom"],
  documents: [
    { id: "doc-1", title: "Prom 2027 Client Agreement", kind: "contract", issuedAt: "2026-08-16T18:20:00.000Z", contractId: "sc-karlie-prom" },
    { id: "doc-2", title: "Receipt — Prom Spot Deposit", kind: "receipt", issuedAt: "2026-08-16T18:22:00.000Z" },
    { id: "doc-3", title: "Receipt — Design & Sourcing Payment", kind: "receipt", issuedAt: "2026-09-01T15:44:00.000Z" },
  ],
  messages: [
    {
      id: "th-1",
      subject: "Your fabric is in front of me",
      updatedAt: "2026-09-16T13:32:00.000Z",
      unread: true,
      messages: [
        {
          id: "m-1",
          from: "studio",
          authorName: "Kenya",
          at: "2026-09-16T13:32:00.000Z",
          body: "I am in New York and I found it. I posted it under Approvals — take a look when you can and tell me what you think.",
        },
      ],
    },
    {
      id: "th-2",
      subject: "Moving my fitting",
      updatedAt: "2026-09-12T20:11:00.000Z",
      unread: false,
      messages: [
        {
          id: "m-2",
          from: "client",
          authorName: "Karlie",
          at: "2026-09-12T20:09:00.000Z",
          body: "I have a track meet that Saturday — I moved my fitting a week out. Is that still okay for the timeline?",
        },
        {
          id: "m-3",
          from: "studio",
          authorName: "Kenya",
          at: "2026-09-12T20:11:00.000Z",
          body: "That works. The new date is confirmed on your appointments.",
        },
      ],
    },
  ],
  journey: karlieJourney,
  videos: [],
  activity: [
    { id: "ac-1", at: "2026-08-16T18:20:00.000Z", actor: "Karlie McDowell", actorRole: "client", action: "Agreement signed", detail: "Prom 2027 Client Agreement v3.0", clientVisible: true },
    { id: "ac-2", at: "2026-08-16T18:22:00.000Z", actor: "Karlie McDowell", actorRole: "client", action: "Deposit paid", detail: "$150.00 — Prom Spot secured", clientVisible: true },
    { id: "ac-3", at: "2026-08-16T18:23:00.000Z", actor: "System", actorRole: "system", action: "Account activated", detail: "My Kenya B. activation link sent", clientVisible: true },
    { id: "ac-4", at: "2026-08-29T16:30:00.000Z", actor: "Kenya Buchanan", actorRole: "owner", action: "Measurements recorded", clientVisible: true },
    { id: "ac-5", at: "2026-09-08T19:05:00.000Z", actor: "Karlie McDowell", actorRole: "client", action: "Design approved", detail: "Approval recorded with timestamp", clientVisible: true },
    { id: "ac-6", at: "2026-09-12T20:10:00.000Z", actor: "Karlie McDowell", actorRole: "client", action: "Appointment rescheduled", previousValue: "Oct 7, 2026 · 2:30 PM", newValue: "Oct 14, 2026 · 2:30 PM", clientVisible: true },
    { id: "ac-7", at: "2026-09-16T13:30:00.000Z", actor: "Kenya Buchanan", actorRole: "owner", action: "Fabric approval requested", clientVisible: true },
  ],
  ownerNotes: [
    { id: "on-1", at: "2026-08-29T17:10:00.000Z", author: "Kenya", body: "Owner-only: shoulders are narrow — draft the bodice a half size down through the armhole." },
    { id: "on-2", at: "2026-09-16T13:35:00.000Z", author: "Kenya", body: "Owner-only: second supplier has the overlay if the first cannot deliver by the 10th." },
  ],
};

/** Roster used by Studio (clients, production board, calendar). */
export const clientRoster: ClientSummary[] = [
  {
    id: karlieMcDowell.id,
    firstName: "Karlie",
    lastName: "McDowell",
    experience: "prom",
    seasonId: "season-prom-2027",
    accountStatus: "active",
    eventDate: "2027-04-24T00:00:00.000Z",
    eventLabel: "Prom 2027",
    city: "Douglasville",
    state: "GA",
    stageKey: "sourcing",
    productionColumn: "sourcing",
    balanceDueCents: 265_000,
    nextAppointmentAt: "2026-10-14T14:30:00.000Z",
  },
  { id: "cl-2", firstName: "Amaya", lastName: "Ellison", experience: "prom", seasonId: "season-prom-2027", accountStatus: "active", eventDate: "2027-04-17T00:00:00.000Z", eventLabel: "Prom 2027", city: "Atlanta", state: "GA", stageKey: "construction", productionColumn: "construction", balanceDueCents: 180_000, nextAppointmentAt: "2026-10-03T17:00:00.000Z" },
  { id: "cl-3", firstName: "Teagan", lastName: "Brooks", experience: "prom", seasonId: "season-prom-2027", accountStatus: "active", eventDate: "2027-05-01T00:00:00.000Z", eventLabel: "Prom 2027", city: "Marietta", state: "GA", stageKey: "measurement", productionColumn: "measured", balanceDueCents: 320_000, nextAppointmentAt: "2026-09-26T14:00:00.000Z" },
  { id: "cl-4", firstName: "Simone", lastName: "Cartier", experience: "bridal", accountStatus: "active", eventDate: "2027-06-12T00:00:00.000Z", eventLabel: "Wedding · June 2027", city: "Atlanta", state: "GA", stageKey: "design_approval", productionColumn: "design", balanceDueCents: 540_000, nextAppointmentAt: "2026-09-24T18:00:00.000Z" },
  { id: "cl-5", firstName: "Noor", lastName: "Haddad", experience: "bridal", accountStatus: "active", eventDate: "2027-09-04T00:00:00.000Z", eventLabel: "Wedding · September 2027", city: "Charlotte", state: "NC", stageKey: "consultation", productionColumn: "onboarding", balanceDueCents: 0, nextAppointmentAt: "2026-09-30T16:00:00.000Z" },
  { id: "cl-6", firstName: "Bianca", lastName: "Okoye", experience: "custom", accountStatus: "active", eventDate: "2026-12-05T00:00:00.000Z", eventLabel: "Gala · December 2026", city: "Birmingham", state: "AL", stageKey: "fitting_two", productionColumn: "fitting", balanceDueCents: 95_000, nextAppointmentAt: "2026-09-22T19:00:00.000Z" },
  { id: "cl-7", firstName: "Destiny", lastName: "Ferrell", experience: "prom", seasonId: "season-prom-2027", accountStatus: "active", eventDate: "2027-04-24T00:00:00.000Z", eventLabel: "Prom 2027", city: "Decatur", state: "GA", stageKey: "inspiration", productionColumn: "onboarding", balanceDueCents: 385_000 },
  { id: "cl-8", firstName: "Harper", lastName: "Liang", experience: "custom", accountStatus: "active", eventDate: "2026-11-21T00:00:00.000Z", eventLabel: "Pageant · November 2026", city: "Nashville", state: "TN", stageKey: "final_fitting", productionColumn: "final_fitting", balanceDueCents: 0, nextAppointmentAt: "2026-09-25T15:00:00.000Z" },
  { id: "cl-9", firstName: "Aniyah", lastName: "Prescott", experience: "prom", seasonId: "season-prom-2027", accountStatus: "active", eventDate: "2027-04-10T00:00:00.000Z", eventLabel: "Prom 2027", city: "Stonecrest", state: "GA", stageKey: "adjustments", productionColumn: "adjustments", balanceDueCents: 140_000, nextAppointmentAt: "2026-10-09T18:00:00.000Z" },
  { id: "cl-10", firstName: "Marisol", lastName: "Vega", experience: "prom", seasonId: "season-prom-2027", accountStatus: "completed", eventDate: "2026-04-18T00:00:00.000Z", eventLabel: "Prom 2026", city: "Columbus", state: "GA", stageKey: "release", productionColumn: "complete", balanceDueCents: 0 },
  { id: "cl-11", firstName: "Jordyn", lastName: "Alston", experience: "prom", accountStatus: "owner_review", eventDate: "2028-04-22T00:00:00.000Z", eventLabel: "Prom 2028 · requested", city: "Douglasville", state: "GA", stageKey: "welcome", productionColumn: "new", balanceDueCents: 0 },
  { id: "cl-12", firstName: "Elise", lastName: "Kwan", experience: "bridal", accountStatus: "on_hold", eventDate: "2027-10-16T00:00:00.000Z", eventLabel: "Wedding · October 2027", city: "Atlanta", state: "GA", stageKey: "inspiration", productionColumn: "onboarding", balanceDueCents: 250_000 },
];

export function getClientSummary(id: string): ClientSummary | undefined {
  return clientRoster.find((client) => client.id === id);
}

export function getClientRecord(id: string): ClientRecord | undefined {
  return id === karlieMcDowell.id ? karlieMcDowell : undefined;
}

/**
 * Client-portal view of a record. Owner-only fields are removed here so a
 * portal component cannot render them even by accident.
 */
export type PortalClient = Omit<ClientRecord, "ownerNotes"> & {
  activity: ClientRecord["activity"];
};

export function getPortalClient(id: string): PortalClient | undefined {
  const record = getClientRecord(id);
  if (!record) return undefined;

  // Owner-only fields are removed here, so a portal component cannot render
  // them even by accident. Phase 2 additionally enforces this server-side.
  const safe: Record<string, unknown> = { ...record };
  delete safe.ownerNotes;

  return {
    ...(safe as Omit<ClientRecord, "ownerNotes">),
    activity: record.activity.filter((event) => event.clientVisible),
  };
}

/** The account the Phase 1 client demo signs into. */
export const demoClientId = karlieMcDowell.id;
