import type { StoryPage } from "@/lib/types";

/**
 * MEET KENYA — page content.
 *
 * ⚠️ Biography drawn from publicly available information about Kenya Buchanan.
 * It is written to be reviewed and corrected by Kenya, and every field here is
 * intended to become editable from Kenya B. Studio → Website Content →
 * Meet Kenya. Nothing about this page is hard-coded into components: sections
 * can be rewritten, reordered, hidden, and have photography swapped in.
 *
 * No direct quotation beyond the one Kenya has given publicly is included, and
 * no personal history beyond the above is invented.
 */
export const meetKenya: StoryPage = {
  hero: {
    eyebrow: "Meet Kenya",
    title: "Meet Kenya.",
    roles: ["Dreamer.", "Designer.", "Entrepreneur.", "Faithwalker."],
    lede: [
      "Before there was Kenya B.,",
      "there was a woman brave enough",
      "to choose the life that made her smile.",
    ],
    portrait: { slot: "kenya-meet-hero", alt: "Kenya Buchanan" },
    backdrop: { slot: "kenya-meet-hero", alt: "" },
  },

  sections: [
    {
      id: "before-the-gowns",
      type: "narrative",
      tone: "light",
      layout: "image-right",
      eyebrow: "Section One",
      headline: ["The dream didn't", "start with a gown."],
      body: [
        "Kenya Buchanan didn't follow a straight line into fashion.",
        "Born and raised in Fairfield, Alabama, Kenya spent years trying to answer the question so many of us face: what am I supposed to do with my life?",
        "Her path moved through different possibilities — from an early interest in mortuary science, to accounting, to management, and ultimately into corporate America.",
        "She built a career. She worked. She provided. She did what life told her she was supposed to do.",
        "But somewhere underneath the career and the security was a creative woman who knew there had to be something more.",
      ],
      media: [
        {
          slot: "archival-early-years",
          alt: "Archival photograph from Kenya's early years",
          awaitingUpload: true,
          caption: "Fairfield, Alabama",
        },
      ],
    },

    {
      id: "turning-point",
      type: "narrative",
      tone: "dark",
      layout: "centered",
      eyebrow: "The Turning Point",
      statement: ["Success can pay the bills", "and still not feel", "like purpose."],
      body: [
        "After more than a decade in corporate America, Kenya faced a decision that would change the direction of her life.",
        "She could continue choosing what was safe. Or she could finally choose what made her feel alive.",
        "Fashion had always been there. Colour. Texture. Individuality. The freedom to create something that had never existed before.",
        "Eventually the question became impossible to ignore: what if the life she kept imagining was the life she was actually supposed to build?",
        "In 2013, Kenya chose herself. She stepped away from corporate America and returned to school to pursue fashion design.",
      ],
      quote: {
        text: "I never wanted to reach a point in my life and say, 'I wish I would have.'",
        attribution: "Kenya Buchanan",
      },
    },

    {
      id: "back-to-school",
      type: "milestones",
      tone: "ivory",
      layout: "image-left",
      eyebrow: "The Craft",
      headline: ["She didn't start over.", "She started", "where she belonged."],
      body: [
        "Kenya enrolled in The University of Alabama's Apparel Design program. This wasn't simply learning how to sew — it was where creativity became craft.",
        "Sketching. Draping. Flat-pattern design. Trend forecasting. Construction. Textiles. The discipline behind turning an idea into something another person could actually wear.",
        "From 2013 through 2016, Kenya developed the technical foundation that would transform her creativity into a design career.",
      ],
      milestones: [
        {
          id: "ms-2013",
          marker: "2013",
          title: "The Leap",
          detail: "Entered Apparel Design at The University of Alabama",
        },
        {
          id: "ms-2016",
          marker: "2016",
          title: "The Degree",
          detail: "Graduated Magna Cum Laude, Apparel Design",
        },
      ],
      media: [
        {
          slot: "archival-university",
          alt: "Archival photograph from Kenya's design school years",
          awaitingUpload: true,
          caption: "The University of Alabama · 2013–2016",
        },
      ],
    },

    {
      id: "the-runway",
      type: "milestones",
      tone: "dark",
      layout: "image-right",
      eyebrow: "The Confirmation",
      headline: ["Then the runway", "answered the question."],
      body: [
        "In 2017, Kenya Buchanan entered the emerging designer competition at Magic City Fashion Week. She won.",
        "For Kenya, the recognition meant more than an award. It was confirmation.",
        "The career she had walked away from. The security she had surrendered. The years spent returning to school. The hours spent learning the craft. They had led somewhere.",
        "She wasn't simply someone who loved fashion. She was a designer.",
      ],
      milestones: [
        {
          id: "ms-2017",
          marker: "2017",
          title: "Emerging Designer",
          detail: "Magic City Fashion Week",
        },
      ],
      media: [
        {
          slot: "photo/custom-black-feather-collar",
          alt: "Kenya Buchanan in one of her own designs",
          caption: "Kenya in her own design",
        },
      ],
    },

    {
      id: "alabama-to-new-york",
      type: "gallery",
      tone: "light",
      layout: "full",
      eyebrow: "The Expansion",
      headline: ["Fairfield.", "Tuscaloosa.", "Birmingham.", "New York."],
      body: [
        "What began as a decision to pursue happiness grew into a design house.",
        "Kenya's work moved onto runways throughout the South and eventually to a showcase during New York Fashion Week.",
        "Her signature became unmistakable: bold colour, intricate details, dramatic silhouettes, cultural inspiration, and gowns designed to make a woman feel impossible to overlook.",
      ],
      milestones: [
        {
          id: "ms-nyfw",
          marker: "New York",
          title: "Kenya B.",
          detail: "Showcases during New York Fashion Week",
        },
      ],
      media: [
        { slot: "photo/prom-blush-ruffle-brick", alt: "Blush ruffled gown with a beaded bodice" },
        { slot: "photo/prom-burgundy-velvet", alt: "Burgundy velvet gown with a long train" },
        { slot: "photo/prom-emerald-gold-doors", alt: "Emerald sequin gown before gold doors" },
      ],
    },

    {
      id: "the-gown",
      type: "narrative",
      tone: "ivory",
      layout: "image-left",
      eyebrow: "The Work",
      headline: ["Because some days", "only happen once."],
      body: [
        "A prom entrance. A walk down the aisle. A celebration you've imagined long before the date ever appeared on a calendar.",
        "Kenya doesn't see those moments as simply another dress to make. She sees the story attached to them.",
        "The nerves before the doors open. The photographs that will live in someone's home for decades. The mother seeing her daughter dressed for the moment. The bride seeing herself and realising: this is really happening.",
        "That's why Kenya B. isn't built around simply selling gowns. It is built around designing for moments people remember for the rest of their lives.",
      ],
      statement: ["The moment may last a day.", "The memory doesn't."],
      media: [
        {
          slot: "photo/bridal-ivory-cathedral-veil",
          alt: "Bride in a Kenya B. gown with a cathedral veil",
        },
      ],
    },

    {
      id: "more-than-a-gown",
      type: "narrative",
      tone: "dark",
      layout: "image-right",
      eyebrow: "Kenya Dolls",
      headline: ["It's more than", "a gown."],
      body: [
        "For Kenya, those words became more than a tagline.",
        "Her Prom clients became her Kenya Dolls. The relationship didn't necessarily end when the gown was picked up.",
        "Kenya has used her platform to mentor young women, encourage them beyond high school, teach sewing and fashion to Birmingham youth, and create opportunities for young people to experience design firsthand.",
        "Because sometimes the most important thing a designer gives a young woman isn't what she wears. It's helping her see what's possible for her own life.",
      ],
      media: [
        {
          slot: "photo/prom-royal-blue-tulle-arrival",
          alt: "Kenya B. client arriving in a royal blue tulle gown",
        },
      ],
      cta: { label: "Kenya B. In The Community", href: "/live" },
    },

    {
      id: "full-circle",
      type: "narrative",
      tone: "light",
      layout: "image-left",
      eyebrow: "Full Circle",
      headline: ["She left one career", "to create a life", "that felt like hers."],
      body: [
        "The woman who once wondered which career she was supposed to choose eventually created one of her own.",
        "Designer. Entrepreneur. Mentor. Teacher. Creative.",
        "Kenya Buchanan didn't simply find her place in fashion. She built it.",
        "And today, every sketch, every fitting, every piece of fabric and every Kenya B. client carries a little piece of the decision she made years ago: choose the life that makes you smile.",
      ],
      media: [
        {
          slot: "kenya-with-bride",
          alt: "Kenya Buchanan with a bride on her wedding day",
          caption: "With a client on her wedding day",
        },
        {
          slot: "archival-studio",
          alt: "Kenya at work in her studio — sketches, fabric and the machine",
          caption: "In the studio",
        },
      ],
    },

    {
      id: "closing",
      type: "closing",
      tone: "dark",
      layout: "full",
      headline: ["Kenya Buchanan"],
      statement: ["It's more than a gown."],
      body: [
        "It's the dream. The journey. The woman wearing it. And the moment she'll never forget.",
      ],
      media: [
        { slot: "photo/prom-silver-pearl-cape", alt: "Kenya B. gown with a pearl cape" },
      ],
    },
  ],

  timeline: {
    eyebrow: "The Journey",
    headline: "One decision, followed all the way through.",
    entries: [
      { id: "tl-fairfield", marker: "Fairfield", title: "The Beginning", detail: "Born and raised in Fairfield, Alabama" },
      { id: "tl-corporate", marker: "Corporate America", title: "The Career", detail: "More than a decade building a career that paid the bills" },
      { id: "tl-2013", marker: "2013", title: "The Leap", detail: "Left corporate America and returned to school for fashion design" },
      { id: "tl-2016", marker: "2016", title: "Magna Cum Laude", detail: "Apparel Design, The University of Alabama" },
      { id: "tl-2017", marker: "2017", title: "Emerging Designer", detail: "Magic City Fashion Week" },
      { id: "tl-nyfw", marker: "New York", title: "NYFW Showcase", detail: "Kenya B. showcases during New York Fashion Week" },
      { id: "tl-today", marker: "Today", title: "Kenya B.", detail: "Southern luxury designer — prom, bridal and custom" },
    ],
  },
};
