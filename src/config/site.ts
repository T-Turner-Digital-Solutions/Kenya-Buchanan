/** Brand-level constants and navigation. Owner-editable from Studio later. */

export const brand = {
  name: "Kenya Buchanan",
  short: "Kenya B.",
  motto: "It's More Than a Gown.",
  collection: "Kenya B. Collection",
  community: "Kenya Dolls",
  clientPortal: "My Kenya B.",
  ownerPortal: "Kenya B. Studio",
  live: "Kenya B. Live",
  preferred: "Kenya B. Preferred",
} as const;

export interface NavItem {
  label: string;
  href: string;
  emphasis?: "portal" | "book";
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Prom", href: "/prom" },
  { label: "Bridal", href: "/bridal" },
  { label: "Custom", href: "/custom" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Live", href: "/live" },
];

export const actionNav: NavItem[] = [
  { label: "My Kenya B. Login", href: "/portal/login", emphasis: "portal" },
  { label: "Book", href: "/book", emphasis: "book" },
];

export const footerNav = [
  {
    heading: "Experiences",
    links: [
      { label: "Prom", href: "/prom" },
      { label: "Bridal", href: "/bridal" },
      { label: "Custom", href: "/custom" },
      { label: "Begin Your Experience", href: "/book" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "About Kenya", href: "/about" },
      { label: "Kenya B. Live", href: "/live" },
      { label: "Preferred Partners", href: "/partners" },
    ],
  },
  {
    heading: "Clients",
    links: [
      { label: "My Kenya B. Login", href: "/portal/login" },
      { label: "Appointments", href: "/portal/appointments" },
      { label: "Payments", href: "/portal/payments" },
      { label: "Ask Kenya B.", href: "/portal/ask" },
    ],
  },
];
