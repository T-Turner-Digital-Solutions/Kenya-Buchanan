/**
 * ASK KENYA B. — the question bank.
 *
 * This is the assistant's source of truth for the public site, and Kenya's
 * working list in Kenya B. Studio. Every question below is one a real visitor
 * asks; the answer beside it is either Kenya-approved or it is `null`.
 *
 * `null` is deliberate and load-bearing. An unanswered question is NOT a gap
 * the assistant fills in with something reasonable — it is a question the
 * assistant refuses and hands to Kenya. The only answers written here are ones
 * the site itself already states. Pricing beyond the published deposit,
 * refunds, rush work, travel, alterations to gowns Kenya did not make and
 * anything about a specific client's account are Kenya's to give, and are left
 * blank until she gives them.
 *
 * In production this list is edited from Kenya B. Studio and stored; the API
 * route builds the assistant's brief from the answered entries.
 */

export type AskTopic =
  | "getting_started"
  | "prom_season"
  | "appointments"
  | "design"
  | "payments"
  | "timing"
  | "after";

export const askTopicLabels: Record<AskTopic, string> = {
  getting_started: "Getting started",
  prom_season: "Prom season",
  appointments: "Appointments & fittings",
  design: "Design & fabric",
  payments: "Payments",
  timing: "Timing",
  after: "After the gown",
};

export interface AskQuestion {
  id: string;
  topic: AskTopic;
  question: string;
  /** null => Kenya has not answered it yet, so the assistant escalates. */
  answer: string | null;
  /** Why it is still unanswered, for Kenya's list. */
  note?: string;
}

export const askQuestions: AskQuestion[] = [
  /* ---- Getting started ---------------------------------------------- */
  {
    id: "q-what-is-kenya-b",
    topic: "getting_started",
    question: "What exactly does Kenya do?",
    answer:
      "Kenya designs and builds custom gowns — prom, bridal, maternity and one-off commissions. Nothing is bought off a rack; each gown is drafted, sourced and finished for one person.",
  },
  {
    id: "q-how-do-i-start",
    topic: "getting_started",
    question: "How do I start?",
    answer:
      "Begin at /book. You choose the experience, fill in your details, sign the agreement and pay the deposit. Prom runs as a capped season; bridal, maternity and custom begin with a consultation.",
  },
  {
    id: "q-do-you-sell-off-the-rack",
    topic: "getting_started",
    question: "Can I just buy a dress I saw on the site?",
    answer:
      "No. The gowns on the site are past work, not stock. They show you what Kenya builds and what is possible — yours is designed for you from the start.",
  },
  {
    id: "q-how-far-do-you-travel",
    topic: "getting_started",
    question: "Do you work with clients outside Alabama?",
    answer: null,
    note: "Kenya to confirm: how far she takes clients, and whether fittings can be done remotely.",
  },
  {
    id: "q-age-limits",
    topic: "getting_started",
    question: "My daughter is under 18 — can she have her own account?",
    answer: null,
    note: "Kenya to confirm how guardians and minors are handled on an account.",
  },

  /* ---- Prom season --------------------------------------------------- */
  {
    id: "q-what-is-a-prom-spot",
    topic: "prom_season",
    question: "What is a Prom Spot?",
    answer:
      "A Prom Spot is acceptance into the season, not an appointment. The season is capped, and your spot is held for you from the moment your deposit is received. Appointments are scheduled afterwards.",
  },
  {
    id: "q-when-do-books-open",
    topic: "prom_season",
    question: "When do the books open?",
    answer:
      "The current season's opening date and the number of spaces left are on /prom, and they update as spots are claimed.",
  },
  {
    id: "q-season-open-close",
    topic: "prom_season",
    question: "When does prom open and when does it close?",
    answer:
      "The opening date for the current season is published on /prom, along with the number of spaces left. The season closes when the capped number of spots has been claimed — after that, enrolment moves to the waitlist.",
  },
  {
    id: "q-how-waitlist-works",
    topic: "prom_season",
    question: "How does the waitlist work?",
    answer:
      "Joining is free and takes your name, email and mobile. When Kenya releases an opening it goes to the next eligible person on the list, one at a time, and that person holds it exclusively for 60 minutes. It is only filled when the deposit is paid; if the window closes it passes on and you keep your place for the next one.",
  },
  {
    id: "q-waitlist-charge",
    topic: "prom_season",
    question: "Is there a charge to join the waitlist?",
    answer:
      "No. Joining the waitlist is free. Nothing is charged unless Kenya offers you a spot and you claim it — and an offer is held exclusively for you for 60 minutes.",
  },
  {
    id: "q-waitlist-order",
    topic: "prom_season",
    question: "How does the waitlist decide who gets the next spot?",
    answer:
      "When Kenya releases an opening it is offered to the next eligible person on the list, one at a time. If that window closes without a deposit, it passes to the next person and you keep your place.",
  },
  {
    id: "q-books-full",
    topic: "prom_season",
    question: "The books are full. Will Kenya add more spots?",
    answer: null,
    note: "Kenya to decide what she wants said here — capacity is hers to set.",
  },

  /* ---- Appointments & fittings --------------------------------------- */
  {
    id: "q-how-many-appointments",
    topic: "appointments",
    question: "How many appointments will I have?",
    answer:
      "Prom runs on at least three: measurements and design, Fitting #2, and your final fitting before release. Bridal and custom vary with the design.",
  },
  {
    id: "q-what-to-bring",
    topic: "appointments",
    question: "What should I bring to my measurement appointment?",
    answer:
      "The undergarments you plan to wear under your gown, and shoes at the height you intend to wear. Come with your hair away from your neckline so Kenya can see the line of your shoulders.",
  },
  {
    id: "q-can-i-reschedule",
    topic: "appointments",
    question: "Can I move an appointment?",
    answer:
      "Yes, from Appointments inside My Kenya B., where Kenya has enabled it for your experience. Your deposit and payments stay attached to the appointment when it moves.",
  },
  {
    id: "q-bring-someone",
    topic: "appointments",
    question: "Can I bring my mum or a friend to my fitting?",
    answer: null,
    note: "Kenya to confirm how many guests she is comfortable with in the studio.",
  },
  {
    id: "q-missed-appointment",
    topic: "appointments",
    question: "What happens if I miss a fitting?",
    answer: null,
    note: "Kenya to set the policy — this affects her schedule and her agreement.",
  },

  /* ---- Design & fabric ------------------------------------------------ */
  {
    id: "q-inspiration-images",
    topic: "design",
    question: "Do I need to know what I want before I come?",
    answer:
      "No. You upload one to three inspiration images and Kenya develops the design from there — they tell her the feeling you are after, not the dress she will copy.",
  },
  {
    id: "q-approve-design",
    topic: "design",
    question: "Do I get to see the design before it is made?",
    answer:
      "Yes. Your design and your fabric are posted to your account for you to approve, and Kenya does not move on until you have.",
  },
  {
    id: "q-where-fabric-from",
    topic: "design",
    question: "Where does the fabric come from?",
    answer:
      "Kenya sources from Atlanta, New York, other U.S. markets and international suppliers when the design asks for it. Bridal and custom frequently call for specialty lace, silk and beading.",
  },
  {
    id: "q-change-my-mind",
    topic: "design",
    question: "Can I change the design after I have approved it?",
    answer: null,
    note: "Kenya to set this — it depends how far into construction the gown is, and it belongs in the agreement.",
  },
  {
    id: "q-copy-a-dress",
    topic: "design",
    question: "Can you copy a dress I found online?",
    answer: null,
    note: "Kenya to answer in her own words.",
  },

  /* ---- Payments -------------------------------------------------------- */
  {
    id: "q-what-does-it-cost",
    topic: "payments",
    question: "How much does a gown cost?",
    answer: null,
    note: "Kenya quotes at consultation. The assistant must never estimate — leave this blank unless Kenya wants a published range.",
  },
  {
    id: "q-deposit-amount",
    topic: "payments",
    question: "What is the deposit?",
    answer:
      "The Prom Spot deposit is published on /prom and shown before you pay. Bridal, maternity and custom deposits are confirmed at consultation.",
  },
  {
    id: "q-payment-plan",
    topic: "payments",
    question: "Can I pay in instalments?",
    answer:
      "Your account carries payment milestones, and you can see what is paid and what is due in My Kenya B. at any time.",
  },
  {
    id: "q-last-payment",
    topic: "payments",
    question: "When is the last payment due?",
    answer:
      "Your final balance is settled before your gown is released to you — it is the last item on your journey, and you can see it at any time under Payments in My Kenya B. The dates of the milestones before it are set on your own account.",
  },
  {
    id: "q-refund",
    topic: "payments",
    question: "Can I get my deposit back?",
    answer: null,
    note: "Policy and refunds are Kenya's alone. The assistant escalates this one every time.",
  },

  /* ---- Timing ---------------------------------------------------------- */
  {
    id: "q-how-long",
    topic: "timing",
    question: "How long does a gown take?",
    answer: null,
    note: "Kenya to answer — it varies by experience and season, and a wrong number here becomes a promise.",
  },
  {
    id: "q-when-is-my-date",
    topic: "timing",
    question: "I do not know my prom date yet. Can I still enrol?",
    answer:
      "Yes. Most people enrol before their school announces it. You add your date in My Kenya B. the day you find out, and Kenya works your fittings back from it.",
  },
  {
    id: "q-last-change",
    topic: "timing",
    question: "When is the last time I can make changes to my dress?",
    answer: null,
    note: "Kenya to set the cut-off, and say it in her own words. It is different once fabric is cut, and different again after the final fitting — and whatever is written here becomes a promise, so it needs to be hers.",
  },
  {
    id: "q-rush",
    topic: "timing",
    question: "My event is soon. Can you rush it?",
    answer: null,
    note: "Kenya to decide whether she takes rush work at all, and on what terms.",
  },

  /* ---- After ----------------------------------------------------------- */
  {
    id: "q-alterations-after",
    topic: "after",
    question: "What if it does not fit on the night?",
    answer: null,
    note: "Kenya to set — final fitting is before release, but she should say what happens after.",
  },
  {
    id: "q-alter-someone-elses",
    topic: "after",
    question: "Will you alter a dress I bought somewhere else?",
    answer: null,
    note: "Kenya to answer.",
  },
  {
    id: "q-photos-of-my-gown",
    topic: "after",
    question: "Will my gown be posted on the website?",
    answer: null,
    note: "Kenya to set — this is a consent question and belongs in the agreement.",
  },
];

/** What the assistant is allowed to answer from. */
export const answeredQuestions = askQuestions.filter(
  (entry): entry is AskQuestion & { answer: string } => entry.answer !== null,
);

/** Kenya's to-do list in the Studio. */
export const unansweredQuestions = askQuestions.filter((entry) => entry.answer === null);
