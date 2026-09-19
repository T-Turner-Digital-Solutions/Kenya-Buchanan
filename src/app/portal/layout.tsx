import { PortalShell } from "@/components/shell/PortalShell";
import { portalNav } from "@/config/portal";
import { getDemoPortalClient } from "@/lib/services";
import { daysUntil } from "@/lib/format";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const client = getDemoPortalClient();
  const days = client.eventDate ? daysUntil(client.eventDate) : null;

  return (
    <PortalShell
      nav={portalNav}
      tone="client"
      title={`${client.firstName} ${client.lastName}`}
      subtitle={
        days !== null
          ? `${client.eventLabel} · ${days} days until prom`
          : client.eventLabel
      }
      exitHref="/portal/login"
    >
      {children}
    </PortalShell>
  );
}
