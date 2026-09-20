/**
 * KENYA BUCHANAN — domain model.
 *
 * These types describe the platform's business objects independently of where
 * the data comes from. Phase 1 fulfils them from `src/data/*` (mock records);
 * a later phase will fulfil the exact same shapes from a database + API without
 * touching the UI layer.
 *
 * Architectural rule: Prom is ONE `Experience` with seasonal features, never the
 * foundation of the application. Bridal, Custom and future experience types use
 * the same journey / approval / appointment / contract primitives.
 */

/* ------------------------------------------------------------------ */
/* Experiences                                                         */
/* ------------------------------------------------------------------ */

export type ExperienceSlug = "prom" | "bridal" | "custom" | "maternity";

export interface Experience {
  slug: ExperienceSlug;
  name: string;
  /** Short editorial line used on cards and hero blocks. */
  tagline: string;
  description: string;
  /** Seasonal experiences run in capped enrolment seasons (Prom today). */
  seasonal: boolean;
  /** Owner-configurable in a later phase via Kenya B. Studio. */
  config: ExperienceConfig;
  journeyTemplate: JourneyStageTemplate[];
  /** Partner categories surfaced for this experience. */
  partnerCategories: PartnerCategoryKey[];
  contractTemplateId: string;
  heroMedia: MediaSlot;
  status: ConfigurableStatus;
}

/**
 * Every value here is intended to become owner-editable from Kenya B. Studio.
 * Nothing about these rules should be hard-coded into components.
 */
export interface ExperienceConfig {
  depositLabel: string;
  depositAmountCents: number | null;
  inspirationUploadsMin: number;
  inspirationUploadsMax: number;
  minimumAppointments: number;
  clientReschedulingEnabled: boolean;
  aiAssistantEnabled: boolean;
  interestListEnabled: boolean;
  waitlistEnabled: boolean;
  /** Approval types Kenya may switch on per client. */
  availableApprovals: ApprovalKind[];
}

export type ConfigurableStatus = "active" | "hidden" | "archived";

/* ------------------------------------------------------------------ */
/* Seasons (Prom today, any seasonal experience later)                 */
/* ------------------------------------------------------------------ */

export type SeasonState =
  | "pre_open" // books have not opened; interest list only
  | "open" // enrolment open, capacity remaining
  | "full" // initial capacity reached; waitlist
  | "closed"; // season closed by owner

export interface Season {
  id: string;
  experience: ExperienceSlug;
  /** Display label, e.g. "Prom 2027". */
  name: string;
  year: number;
  state: SeasonState;
  /** ISO timestamp the books open. */
  opensAt: string;
  initialCapacity: number;
  spotsClaimed: number;
  depositCents: number;
  waitlistCount: number;
  /** Season-level overrides of the experience defaults. */
  config: ExperienceConfig;
}

export interface WaitlistEntry {
  id: string;
  position: number;
  name: string;
  city: string;
  joinedAt: string;
  status: "waiting" | "offered" | "claimed" | "expired" | "released";
  /** Present while an exclusive offer hold is running. */
  offerExpiresAt?: string;
}

export interface WaitlistActivityEvent {
  id: string;
  at: string;
  label: string;
  detail?: string;
}

/* ------------------------------------------------------------------ */
/* Accounts & clients                                                  */
/* ------------------------------------------------------------------ */

export type AccountStatus =
  | "active"
  | "completed"
  | "cancelled"
  | "on_hold"
  | "owner_review"
  | "declined"
  | "archived";

export type StaffRole = "owner" | "manager" | "assistant" | "staff";
export type Role = StaffRole | "client";

export interface Guardian {
  name: string;
  relationship: string;
  email: string;
  mobile: string;
}

export interface ClientSummary {
  id: string;
  firstName: string;
  lastName: string;
  experience: ExperienceSlug;
  seasonId?: string;
  accountStatus: AccountStatus;
  /** Prom date, wedding date or event date depending on experience. */
  eventDate?: string;
  eventLabel: string;
  city: string;
  state: string;
  stageKey: JourneyStageKey;
  productionColumn: ProductionColumn;
  balanceDueCents: number;
  nextAppointmentAt?: string;
}

export interface ClientRecord extends ClientSummary {
  email: string;
  mobile: string;
  guardian?: Guardian;
  school?: string;
  graduationYear?: number;
  joinedAt: string;
  measurements: Measurement[];
  inspiration: UploadItem[];
  uploads: UploadItem[];
  designNotes: string;
  fabric: FabricSelection | null;
  approvals: ApprovalRequest[];
  appointments: Appointment[];
  rescheduleHistory: RescheduleEvent[];
  payments: PaymentLedger;
  contractIds: string[];
  documents: ClientDocument[];
  messages: MessageThread[];
  journey: JourneyStage[];
  videos: VideoAsset[];
  activity: ActivityEvent[];
  /**
   * OWNER-ONLY. Must never be rendered by anything under the client portal.
   * Enforced in Phase 2 by server-side authorisation; in Phase 1 this data is
   * only imported by `src/app/studio/**`.
   */
  ownerNotes: OwnerNote[];
}

export interface Measurement {
  label: string;
  value: string;
  takenAt?: string;
}

export interface OwnerNote {
  id: string;
  at: string;
  author: string;
  body: string;
}

/* ------------------------------------------------------------------ */
/* Journey engine                                                      */
/* ------------------------------------------------------------------ */

export type JourneyStageKey =
  | "welcome"
  | "inspiration"
  | "measurement"
  | "design"
  | "design_approval"
  | "sourcing"
  | "construction"
  | "fitting_one"
  | "fitting_two"
  | "adjustments"
  | "final_fitting"
  | "release"
  | "event_day"
  | "consultation"
  | "fabric_selection";

export type StageStatus = "complete" | "current" | "upcoming" | "blocked" | "waiting_on_client";

export interface JourneyStageTemplate {
  key: JourneyStageKey;
  title: string;
  /** Client-facing summary. Never contains internal notes. */
  description: string;
  whatToExpect: string[];
  clientActions?: string[];
  optional?: boolean;
}

export interface JourneyStage extends JourneyStageTemplate {
  status: StageStatus;
  completedAt?: string;
  /** Optional Kenya video attached to this stage. */
  videoId?: string;
  checklist: ChecklistItem[];
  /** Linked records surfaced inside the stage card. */
  appointmentId?: string;
  approvalId?: string;
  uploadPrompt?: UploadPrompt;
  statusNote?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  /** true when the client is the one who must act. */
  clientAction?: boolean;
}

/* ------------------------------------------------------------------ */
/* Uploads                                                             */
/* ------------------------------------------------------------------ */

export interface UploadPrompt {
  title: string;
  helpText: string;
  min: number;
  max: number;
  required: boolean;
}

export interface UploadItem {
  id: string;
  label: string;
  kind: "image" | "document" | "video";
  uploadedAt: string;
  uploadedBy: "client" | "studio";
}

/* ------------------------------------------------------------------ */
/* Approvals                                                           */
/* ------------------------------------------------------------------ */

export type ApprovalKind =
  | "design_sketch"
  | "color"
  | "fabric"
  | "embellishment"
  | "major_change";

export type ApprovalStatus = "not_required" | "pending" | "question_raised" | "approved";

export interface ApprovalRequest {
  id: string;
  kind: ApprovalKind;
  title: string;
  status: ApprovalStatus;
  /** Kenya's note to the client. */
  note?: string;
  media: MediaSlot[];
  videoId?: string;
  requestedAt?: string;
  approvedAt?: string;
  /** Shown where colour/texture reproduction matters. */
  showColorDisclaimer?: boolean;
}

export interface FabricSelection {
  id: string;
  name: string;
  /** Deliberately vague — vendors, costs and suppliers are never exposed. */
  descriptor: string;
  sourcingLocation: string;
  sourcingStatus: "planned" | "sourcing" | "secured" | "in_studio";
  approvalId?: string;
}

/* ------------------------------------------------------------------ */
/* Appointments                                                        */
/* ------------------------------------------------------------------ */

export type AppointmentType =
  | "measurement_design"
  | "fitting_two"
  | "final_fitting"
  | "consultation"
  | "pickup";

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "needs_scheduling";

export interface Appointment {
  id: string;
  type: AppointmentType;
  title: string;
  startsAt: string;
  durationMinutes: number;
  location: string;
  status: AppointmentStatus;
  /** Owner-controlled preparation block. */
  preparation: AppointmentPreparation;
  rescheduleable: boolean;
  rescheduleCount: number;
  /** Fitting #2 carries the change/communication checkpoint messaging. */
  isChangeCheckpoint?: boolean;
}

export interface AppointmentPreparation {
  headline: string;
  videoId?: string;
  instructions: string[];
  checklist: ChecklistItem[];
  requiredUploads?: UploadPrompt;
  acknowledgementRequired: boolean;
  acknowledgedAt?: string;
}

export interface RescheduleEvent {
  id: string;
  appointmentId: string;
  at: string;
  fromStartsAt: string;
  toStartsAt: string;
  by: "client" | "studio";
}

export interface AvailabilitySlot {
  id: string;
  startsAt: string;
  durationMinutes: number;
  available: boolean;
}

/* ------------------------------------------------------------------ */
/* Payments                                                            */
/* ------------------------------------------------------------------ */

export type PaymentStatus = "paid" | "due" | "scheduled" | "overdue";

export interface PaymentMilestone {
  id: string;
  label: string;
  amountCents: number;
  dueOn?: string;
  status: PaymentStatus;
  /** Description of the production gate this milestone protects. */
  gateNote?: string;
}

export interface PaymentRecord {
  id: string;
  at: string;
  label: string;
  amountCents: number;
  method: string;
  receiptId: string;
}

export interface PaymentLedger {
  totalInvestmentCents: number;
  paidCents: number;
  milestones: PaymentMilestone[];
  history: PaymentRecord[];
}

/* ------------------------------------------------------------------ */
/* Contracts                                                           */
/* ------------------------------------------------------------------ */

export type ContractStatus =
  | "signed"
  | "awaiting_signature"
  | "cancelled"
  | "completed"
  | "on_hold"
  | "superseded";

export interface ContractTemplate {
  id: string;
  experience: ExperienceSlug;
  name: string;
  version: string;
  updatedAt: string;
  /**
   * PLACEHOLDER LANGUAGE ONLY — requires Kenya / legal review before use.
   * No final legal wording is authored in this repository.
   */
  sections: ContractSection[];
  acknowledgements: string[];
  requiresGuardian: boolean;
}

export interface ContractSection {
  heading: string;
  body: string;
}

export interface SignedContract {
  id: string;
  templateId: string;
  /** Immutable snapshot of the template version actually signed. */
  templateVersion: string;
  clientId: string;
  clientName: string;
  experience: ExperienceSlug;
  status: ContractStatus;
  signedAt?: string;
  signatureName?: string;
  guardianSignatureName?: string;
  acknowledgements: string[];
  /** Snapshot of the sections as signed — never re-rendered from the template. */
  sections: ContractSection[];
  relatedPaymentIds: string[];
}

export interface ClientDocument {
  id: string;
  title: string;
  kind: "contract" | "receipt" | "care_guide" | "other";
  issuedAt: string;
  contractId?: string;
}

/* ------------------------------------------------------------------ */
/* Messages, videos, sessions                                          */
/* ------------------------------------------------------------------ */

export interface MessageThread {
  id: string;
  subject: string;
  updatedAt: string;
  unread: boolean;
  messages: Message[];
}

export interface Message {
  id: string;
  from: "client" | "studio";
  authorName: string;
  at: string;
  body: string;
}

export interface VideoAsset {
  id: string;
  title: string;
  label: string;
  durationLabel: string;
  description: string;
  /** Phase 1 renders a premium placeholder; Phase 2 supplies a real source. */
  source: null;
  poster: MediaSlot;
}

export interface LiveSession {
  id: string;
  title: string;
  startsAt: string;
  state: "live" | "upcoming" | "past";
  platform: "Facebook Live" | "Instagram Live" | "Kenya B. Studio";
  description: string;
  /** Embed/permalink wiring is left for a later phase. */
  externalUrl: string | null;
  poster: MediaSlot;
}

/* ------------------------------------------------------------------ */
/* Partners                                                            */
/* ------------------------------------------------------------------ */

export type PartnerCategoryKey =
  | "photographers"
  | "videographers"
  | "luxury_cars"
  | "transportation"
  | "hair"
  | "makeup"
  | "nails"
  | "florists"
  | "jewelry"
  | "event_planners"
  | "venues";

export interface PartnerCategory {
  key: PartnerCategoryKey;
  label: string;
  /** Client-facing grouping headline, e.g. "Your Ride". */
  clientLabel: string;
  status: ConfigurableStatus;
}

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategoryKey;
  city: string;
  blurb: string;
  preferred: boolean;
  media: MediaSlot;
  status: ConfigurableStatus;
}

/* ------------------------------------------------------------------ */
/* Activity / audit                                                    */
/* ------------------------------------------------------------------ */

export interface ActivityEvent {
  id: string;
  at: string;
  /** Who performed the action — a person, not a system, wherever possible. */
  actor: string;
  actorRole: Role | "system";
  action: string;
  detail?: string;
  previousValue?: string;
  newValue?: string;
  clientVisible: boolean;
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

/**
 * A named slot that real Kenya Buchanan photography drops into later.
 * See `src/config/media.ts` — add a file path there and the placeholder is
 * replaced everywhere that slot is used.
 */
export interface MediaSlot {
  id: string;
  alt: string;
  /** Aspect hint used by the placeholder renderer. */
  ratio?: "portrait" | "landscape" | "square" | "tall";
  tone?: "light" | "dark";
}

/* ------------------------------------------------------------------ */
/* Production                                                          */
/* ------------------------------------------------------------------ */

export type ProductionColumn =
  | "new"
  | "onboarding"
  | "measured"
  | "design"
  | "sourcing"
  | "construction"
  | "fitting"
  | "adjustments"
  | "final_fitting"
  | "ready"
  | "complete";

/* ------------------------------------------------------------------ */
/* Owner review                                                        */
/* ------------------------------------------------------------------ */

export interface OwnerReviewCase {
  id: string;
  clientId: string;
  clientName: string;
  requestedExperience: ExperienceSlug;
  requestedAt: string;
  previousExperience: string;
  previousStatus: string;
  /** Owner-only. Never exposed on client-facing surfaces. */
  ownerNotes: OwnerNote[];
  contractId?: string;
  decision: "pending" | "accepted" | "declined" | "hold";
}

/* ------------------------------------------------------------------ */
/* Meet Kenya — editorial story content                                */
/* ------------------------------------------------------------------ */

/**
 * The Meet Kenya page is content, not layout. Every section below is a record
 * Kenya will edit from Kenya B. Studio → Website Content → Meet Kenya:
 * reorder, hide, rewrite, add milestones and swap photography — without a
 * developer. The page renders whatever this data says.
 *
 * Biography content is drawn from publicly available information and is
 * intended to be reviewed and corrected by Kenya.
 */

export type StorySectionType =
  | "narrative"
  | "statement"
  | "quote"
  | "milestones"
  | "gallery"
  | "closing";

export type StoryTone = "light" | "ivory" | "dark";

export type StoryLayout = "image-left" | "image-right" | "centered" | "full";

export interface StoryMedia {
  /** Media slot id, or `photo/<name>` for direct photography. */
  slot: string;
  alt: string;
  /** Archival imagery Kenya has not supplied yet renders as an intentional frame. */
  awaitingUpload?: boolean;
  caption?: string;
}

export interface StoryMilestone {
  id: string;
  marker: string;
  title: string;
  detail: string;
}

export interface StorySection {
  id: string;
  type: StorySectionType;
  tone: StoryTone;
  layout?: StoryLayout;
  /** Owner can hide a section without deleting its content. */
  hidden?: boolean;
  eyebrow?: string;
  /** Headline rendered one line per entry. */
  headline?: string[];
  body?: string[];
  /** Oversized editorial statement lines. */
  statement?: string[];
  quote?: { text: string; attribution: string };
  media?: StoryMedia[];
  milestones?: StoryMilestone[];
  cta?: { label: string; href: string };
}

export interface StoryTimelineEntry {
  id: string;
  marker: string;
  title: string;
  detail: string;
}

export interface StoryPage {
  hero: {
    eyebrow: string;
    title: string;
    roles: string[];
    lede: string[];
    portrait: StoryMedia;
    backdrop: StoryMedia;
  };
  sections: StorySection[];
  timeline: {
    eyebrow: string;
    headline: string;
    entries: StoryTimelineEntry[];
  };
}
