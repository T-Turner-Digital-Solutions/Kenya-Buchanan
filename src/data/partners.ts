import type { Partner, PartnerCategory, PartnerCategoryKey } from "@/lib/types";

/** Partner categories. Kenya enables/disables these per experience in Studio. */
export const partnerCategories: PartnerCategory[] = [
  { key: "photographers", label: "Photographers", clientLabel: "Your Photos", status: "active" },
  { key: "videographers", label: "Videographers", clientLabel: "Your Film", status: "active" },
  { key: "luxury_cars", label: "Luxury & Exotic Car Rentals", clientLabel: "Your Ride", status: "active" },
  { key: "transportation", label: "Limo & Transportation", clientLabel: "Your Ride", status: "active" },
  { key: "hair", label: "Hair", clientLabel: "Your Beauty", status: "active" },
  { key: "makeup", label: "Makeup", clientLabel: "Your Beauty", status: "active" },
  { key: "nails", label: "Nails", clientLabel: "Your Beauty", status: "active" },
  { key: "florists", label: "Florists", clientLabel: "Your Flowers", status: "active" },
  { key: "jewelry", label: "Jewelry & Accessories", clientLabel: "Your Details", status: "active" },
  { key: "event_planners", label: "Event Planners", clientLabel: "Your Day", status: "active" },
  { key: "venues", label: "Venues", clientLabel: "Your Setting", status: "active" },
];

export const partners: Partner[] = [
  { id: "pt-1", name: "Marguerite Hale Studio", category: "photographers", city: "Birmingham, AL", blurb: "Editorial portraiture with a film sensibility.", preferred: true, status: "active", media: { id: "partner-1", alt: "Photographer's studio light", ratio: "landscape" } },
  { id: "pt-2", name: "Fourth & Ivory Films", category: "videographers", city: "Atlanta, GA", blurb: "Cinematic short films for milestone nights.", preferred: true, status: "active", media: { id: "partner-2", alt: "Cinema camera on a set", ratio: "landscape" } },
  { id: "pt-3", name: "Marque Motorcars", category: "luxury_cars", city: "Atlanta, GA", blurb: "Curated exotic and classic arrivals.", preferred: true, status: "active", media: { id: "partner-3", alt: "Luxury car detail at dusk", ratio: "landscape" } },
  { id: "pt-4", name: "Peachtree Executive Transport", category: "transportation", city: "Atlanta, GA", blurb: "Chauffeured transportation for the full evening.", preferred: true, status: "active", media: { id: "partner-4", alt: "Chauffeured car interior", ratio: "landscape" } },
  { id: "pt-5", name: "The Chair by Danielle", category: "hair", city: "Douglasville, GA", blurb: "Special-occasion styling built to last the night.", preferred: true, status: "active", media: { id: "partner-5", alt: "Salon styling chair", ratio: "landscape" } },
  { id: "pt-6", name: "Beat by Simone", category: "makeup", city: "Atlanta, GA", blurb: "Camera-ready makeup artistry.", preferred: true, status: "active", media: { id: "partner-6", alt: "Makeup brushes and palette", ratio: "landscape" } },
  { id: "pt-7", name: "Lacquer Lounge", category: "nails", city: "Marietta, GA", blurb: "Hand and nail design to match your gown.", preferred: true, status: "active", media: { id: "partner-7", alt: "Manicured hands", ratio: "landscape" } },
  { id: "pt-8", name: "Ilex & Bloom", category: "florists", city: "Birmingham, AL", blurb: "Sculptural florals for weddings and events.", preferred: true, status: "active", media: { id: "partner-8", alt: "Floral arrangement in studio", ratio: "landscape" } },
  { id: "pt-9", name: "Vesper Fine Jewels", category: "jewelry", city: "Atlanta, GA", blurb: "Heirloom and rental pieces for the evening.", preferred: true, status: "active", media: { id: "partner-9", alt: "Jewelry on velvet", ratio: "landscape" } },
  { id: "pt-10", name: "Ardent Events Co.", category: "event_planners", city: "Atlanta, GA", blurb: "Full-service planning for weddings and galas.", preferred: true, status: "active", media: { id: "partner-10", alt: "Event table setting", ratio: "landscape" } },
  { id: "pt-11", name: "The Wren House", category: "venues", city: "Atlanta, GA", blurb: "Historic venue with garden ceremony space.", preferred: true, status: "active", media: { id: "partner-11", alt: "Historic venue interior", ratio: "landscape" } },
];

export function partnersByCategory(keys: PartnerCategoryKey[]): Array<{ category: PartnerCategory; partners: Partner[] }> {
  return keys
    .map((key) => {
      const category = partnerCategories.find((entry) => entry.key === key);
      if (!category || category.status !== "active") return null;
      return {
        category,
        partners: partners.filter((partner) => partner.category === key && partner.status === "active"),
      };
    })
    .filter((entry): entry is { category: PartnerCategory; partners: Partner[] } => entry !== null);
}
