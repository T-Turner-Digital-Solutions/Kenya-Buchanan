import { PortalShell } from "@/components/shell/PortalShell";
import { studioNav } from "@/config/portal";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={studioNav}
      tone="owner"
      title="Kenya B. Studio"
      subtitle="Owner control centre"
      exitHref="/"
      exitLabel="Exit studio"
    >
      {children}
    </PortalShell>
  );
}
