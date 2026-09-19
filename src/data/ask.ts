/**
 * ASK KENYA B. — Phase 1 prototype knowledge.
 *
 * There is no AI here. These are fixed, Kenya-approved sample answers used to
 * demonstrate the interface. The production assistant will answer ONLY from
 * Kenya-approved processes, policies, FAQs, journey information, appointment
 * preparation and the signed-in client's own visible account data — and will
 * escalate anything else rather than inventing an answer.
 */

export interface AskEntry {
  id: string;
  question: string;
  /** null => the prototype escalates instead of answering. */
  answer: string | null;
  source: string;
}

export const askSuggestions: AskEntry[] = [
  {
    id: "ask-1",
    question: "What should I bring to measurements?",
    answer:
      "Bring the undergarments you plan to wear under your gown and shoes at the height you intend to wear. Come with your hair away from your neckline so Kenya can see the line of your shoulders. Your full preparation list is on your appointment.",
    source: "Appointment preparation · Measurement & Design",
  },
  {
    id: "ask-2",
    question: "What happens next?",
    answer:
      "You are in Fabric & Material Sourcing. Kenya has posted your fabric selection for approval — approving it is the next thing on your list. Construction begins once your fabric is approved and your 50% milestone is met.",
    source: "Your journey · Sourcing",
  },
  {
    id: "ask-3",
    question: "When is my next appointment?",
    answer:
      "Fitting #2 — Saturday, November 14, 2026 at 4:00 PM at Kenya B. Studio. You can reschedule it from Appointments.",
    source: "Your account · Appointments",
  },
  {
    id: "ask-4",
    question: "What should I wear to my fitting?",
    answer:
      "Wear or bring the undergarments and shoes you plan to wear with the gown. Fit is judged against what you will actually have on that night.",
    source: "Appointment preparation · Fitting #2",
  },
  {
    id: "ask-5",
    question: "Can I change my neckline?",
    answer: null,
    source: "Escalation — design change request",
  },
  {
    id: "ask-6",
    question: "Can I get my deposit back?",
    answer: null,
    source: "Escalation — policy and refunds",
  },
];

export const escalationMessage =
  "This one needs Kenya. Design changes and anything touching your agreement are hers to answer — I will not guess.";
