import type { Metadata } from "next";
import { SeasonManager } from "@/components/studio/SeasonManager";
import { seasons } from "@/lib/services";

export const metadata: Metadata = { title: "Prom Seasons" };

export default function StudioPromSeasonsPage() {
  return <SeasonManager seasons={seasons} />;
}
