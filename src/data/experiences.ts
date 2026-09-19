import type { Experience, ExperienceConfig, JourneyStageTemplate } from "@/lib/types";

/**
 * EXPERIENCES — the reusable spine of the platform.
 *
 * Prom is one experience that happens to run in capped seasons. Bridal and
 * Custom use the same primitives, and a future experience type is a new record
 * here (eventually created by Kenya from Kenya B. Studio, not by a developer).
 */

const baseConfig: ExperienceConfig = {
  depositLabel: "Deposit",
  depositAmountCents: null,
  inspirationUploadsMin: 1,
  inspirationUploadsMax: 3,
  minimumAppointments: 3,
  clientReschedulingEnabled: true,
  aiAssistantEnabled: true,
  interestListEnabled: false,
  waitlistEnabled: false,
  availableApprovals: ["design_sketch", "color", "fabric", "embellishment", "major_change"],
};

const promJourney: JourneyStageTemplate[] = [
  {
    key: "welcome",
    title: "Welcome & Enrollment",
    description:
      "Your Prom spot is secured and your Kenya B. account is active. Everything for your gown now lives in one place.",
    whatToExpect: [
      "Watch Kenya's welcome message",
      "Review your agreement and receipt in Documents",
      "Meet your journey — every stage from today to reveal",
    ],
    clientActions: ["Watch the welcome video", "Confirm your contact details"],
  },
  {
    key: "inspiration",
    title: "Inspiration",
    description:
      "Share what you are drawn to. These images help Kenya understand your vision before you meet.",
    whatToExpect: [
      "Upload one to three inspiration images",
      "Add a note about the feeling you want",
      "Kenya reviews before your first appointment",
    ],
    clientActions: ["Upload 1–3 inspiration images"],
  },
  {
    key: "measurement",
    title: "Measurement & Design Appointment",
    description:
      "Your first studio visit. Kenya takes your measurements and the design conversation begins.",
    whatToExpect: [
      "Professional measurements taken",
      "Discuss silhouette, neckline and details",
      "Talk through your event and how you want to move",
    ],
    clientActions: ["Watch the preparation video", "Confirm you understand how to prepare"],
  },
  {
    key: "design",
    title: "Design Development",
    description:
      "Kenya develops your gown concept — the part of the process where your vision becomes a Kenya B. design.",
    whatToExpect: [
      "Kenya works through silhouette and proportion",
      "Design direction is finalised for your gown",
      "You may be asked to approve a sketch or colour direction",
    ],
  },
  {
    key: "sourcing",
    title: "Fabric & Material Sourcing",
    description:
      "Custom gowns often require specialty materials. Kenya sources from Atlanta, New York, other U.S. markets and international suppliers to bring your vision to life.",
    whatToExpect: [
      "Materials are selected for your specific design",
      "Specialty pieces may take additional time to secure",
      "You will be notified when your materials are in studio",
    ],
  },
  {
    key: "construction",
    title: "Construction",
    description: "Your gown is cut and built by hand in the Kenya B. studio.",
    whatToExpect: [
      "Pattern drafted to your measurements",
      "Gown constructed in stages",
      "Progress updates shared here",
    ],
  },
  {
    key: "fitting_two",
    title: "Fitting #2",
    description:
      "Your gown on your body for the first time. This is the designated moment to raise questions, concerns and requested adjustments.",
    whatToExpect: [
      "See and feel the gown in progress",
      "Discuss fit and any adjustments",
      "Confirm the direction before finishing work begins",
    ],
    clientActions: ["Bring your shoes and undergarments", "Come prepared with any questions"],
  },
  {
    key: "adjustments",
    title: "Adjustments",
    description: "Kenya refines the gown based on your fitting.",
    whatToExpect: [
      "Fit refinements completed",
      "Agreed adjustments applied",
      "Finishing and embellishment work begins",
    ],
  },
  {
    key: "final_fitting",
    title: "Final Fitting",
    description: "The last studio visit before your gown is released to you.",
    whatToExpect: [
      "Final fit confirmed",
      "Styling and movement check",
      "Care and handling guidance",
    ],
  },
  {
    key: "release",
    title: "Gown Release & Reveal",
    description: "Your Kenya B. gown comes home.",
    whatToExpect: [
      "Final balance settled before release",
      "Gown packaged for transport",
      "Care guide provided",
    ],
  },
];

const bridalJourney: JourneyStageTemplate[] = [
  {
    key: "consultation",
    title: "Consultation",
    description: "An unhurried conversation about your wedding, your venue and the gown you imagine.",
    whatToExpect: ["Discuss your date and setting", "Talk through vision and budget", "Confirm the Bridal experience"],
  },
  {
    key: "inspiration",
    title: "Inspiration",
    description: "Share the references, textures and silhouettes that speak to you.",
    whatToExpect: ["Upload inspiration", "Share your wedding mood", "Kenya reviews before design"],
    clientActions: ["Upload inspiration images"],
  },
  {
    key: "measurement",
    title: "Measurements",
    description: "Complete measurements taken for a gown built entirely to your body.",
    whatToExpect: ["Full measurement session", "Foundation and support discussion", "Timeline confirmed"],
  },
  {
    key: "design",
    title: "Design",
    description: "Kenya develops your bridal design.",
    whatToExpect: ["Silhouette developed", "Detail and embellishment direction", "Sketch prepared"],
  },
  {
    key: "design_approval",
    title: "Design Approval",
    description: "You review and approve the design direction before construction begins.",
    whatToExpect: ["Review Kenya's sketch", "Ask any questions", "Approve to proceed"],
    clientActions: ["Approve the design"],
    optional: true,
  },
  {
    key: "fabric_selection",
    title: "Fabric Selection",
    description: "Materials are chosen for your gown.",
    whatToExpect: ["Fabric direction selected", "Lace and embellishment considered", "Specialty sourcing identified"],
  },
  {
    key: "sourcing",
    title: "Fabric & Material Sourcing",
    description: "Kenya secures your materials, travelling or sourcing internationally where the design calls for it.",
    whatToExpect: ["Materials secured", "Optional fabric approval if enabled", "Materials arrive in studio"],
    optional: true,
  },
  {
    key: "construction",
    title: "Construction",
    description: "Your bridal gown is built by hand.",
    whatToExpect: ["Pattern drafted", "Gown constructed", "Progress shared here"],
  },
  {
    key: "fitting_one",
    title: "Fitting #1",
    description: "First fitting of the gown in progress.",
    whatToExpect: ["Fit assessed", "Structure confirmed", "Early adjustments noted"],
  },
  {
    key: "adjustments",
    title: "Adjustments",
    description: "Refinements from your first fitting.",
    whatToExpect: ["Fit refined", "Detail work continues"],
  },
  {
    key: "fitting_two",
    title: "Fitting #2",
    description:
      "The designated moment to raise questions, concerns and requested adjustments while the gown is still progressing.",
    whatToExpect: ["Refined fit reviewed", "Adjustment requests discussed", "Finishing direction confirmed"],
  },
  {
    key: "final_fitting",
    title: "Final Fitting",
    description: "Final fit, styling and movement check.",
    whatToExpect: ["Final fit confirmed", "Veil and accessories considered", "Care guidance"],
  },
  {
    key: "release",
    title: "Gown Release",
    description: "Your gown is released to you.",
    whatToExpect: ["Balance settled", "Gown packaged", "Preservation guidance"],
  },
  {
    key: "event_day",
    title: "Wedding Day",
    description: "The day the gown was made for.",
    whatToExpect: ["Wear it", "We would love to see photographs"],
  },
];

const customJourney: JourneyStageTemplate[] = [
  {
    key: "consultation",
    title: "Consultation",
    description: "Tell Kenya about the occasion and the piece you have in mind.",
    whatToExpect: ["Discuss the event", "Scope and timeline", "Confirm the Custom experience"],
  },
  {
    key: "inspiration",
    title: "Inspiration",
    description: "Share your references.",
    whatToExpect: ["Upload inspiration", "Share context", "Kenya reviews"],
    clientActions: ["Upload inspiration images"],
  },
  {
    key: "measurement",
    title: "Measurement & Design Appointment",
    description: "Measurements taken and design direction established.",
    whatToExpect: ["Measurements", "Design conversation", "Timeline confirmed"],
  },
  {
    key: "design",
    title: "Design Development",
    description: "Kenya develops the piece.",
    whatToExpect: ["Concept developed", "Optional approvals", "Direction finalised"],
  },
  {
    key: "sourcing",
    title: "Fabric & Material Sourcing",
    description: "Materials secured for your piece.",
    whatToExpect: ["Materials sourced", "Specialty pieces may take time", "Arrival confirmed"],
  },
  {
    key: "construction",
    title: "Construction",
    description: "The piece is built.",
    whatToExpect: ["Pattern drafted", "Construction in stages", "Progress shared"],
  },
  {
    key: "fitting_two",
    title: "Fitting",
    description: "Fitting and adjustment conversation.",
    whatToExpect: ["Fit reviewed", "Adjustments discussed", "Finishing confirmed"],
  },
  {
    key: "final_fitting",
    title: "Final Fitting",
    description: "Final fit confirmed.",
    whatToExpect: ["Final fit", "Styling check", "Care guidance"],
  },
  {
    key: "release",
    title: "Release",
    description: "Your piece is released to you.",
    whatToExpect: ["Balance settled", "Packaged", "Care guide"],
  },
];

export const experiences: Experience[] = [
  {
    slug: "prom",
    name: "Prom",
    tagline: "One season. A limited number of gowns.",
    description:
      "The Kenya B. Prom experience runs as a capped season. A Prom Spot is acceptance into the season — not an appointment — and it is held for you from the moment your deposit is received.",
    seasonal: true,
    config: {
      ...baseConfig,
      depositLabel: "Prom Spot Deposit",
      depositAmountCents: 15_000,
      interestListEnabled: true,
      waitlistEnabled: true,
    },
    journeyTemplate: promJourney,
    partnerCategories: ["photographers", "luxury_cars", "hair", "makeup", "nails", "videographers"],
    contractTemplateId: "tpl-prom-v3",
    heroMedia: { id: "prom-hero", alt: "Prom gown, full-length editorial portrait", ratio: "landscape", tone: "dark" },
    status: "active",
  },
  {
    slug: "bridal",
    name: "Bridal",
    tagline: "The gown you will be remembered in.",
    description:
      "A longer, quieter process built around one day. Bridal runs year-round with extended fittings and optional design and fabric approvals.",
    seasonal: false,
    config: {
      ...baseConfig,
      depositLabel: "Bridal Consultation Deposit",
      depositAmountCents: null,
      inspirationUploadsMin: 1,
      inspirationUploadsMax: 3,
      minimumAppointments: 4,
    },
    journeyTemplate: bridalJourney,
    partnerCategories: [
      "photographers",
      "videographers",
      "florists",
      "hair",
      "makeup",
      "jewelry",
      "event_planners",
      "venues",
      "transportation",
    ],
    contractTemplateId: "tpl-bridal-v2",
    heroMedia: { id: "bridal-hero", alt: "Bridal gown detail, hand-finished bodice", ratio: "landscape", tone: "dark" },
    status: "active",
  },
  {
    slug: "custom",
    name: "Custom",
    tagline: "For the occasions that deserve their own design.",
    description:
      "Galas, pageants, milestone birthdays, red carpets and moments that have no category. Custom is the experience Kenya shapes around the occasion.",
    seasonal: false,
    config: {
      ...baseConfig,
      depositLabel: "Custom Design Deposit",
      depositAmountCents: null,
      minimumAppointments: 3,
    },
    journeyTemplate: customJourney,
    partnerCategories: ["photographers", "hair", "makeup", "luxury_cars", "event_planners"],
    contractTemplateId: "tpl-custom-v1",
    heroMedia: { id: "custom-hero", alt: "Custom evening gown on the studio form", ratio: "landscape", tone: "dark" },
    status: "active",
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((experience) => experience.slug === slug);
}
