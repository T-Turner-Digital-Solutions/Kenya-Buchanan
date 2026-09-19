import type { Metadata } from "next";
import { SettingsPanels } from "@/components/studio/SettingsPanels";

export const metadata: Metadata = { title: "Settings" };

export default function StudioSettingsPage() {
  return <SettingsPanels />;
}
