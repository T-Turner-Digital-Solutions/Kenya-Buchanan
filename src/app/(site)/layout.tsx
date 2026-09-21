import { AskKenyaFloat } from "@/components/site/AskKenyaFloat";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Public website shell. Portals (My Kenya B. / Kenya B. Studio) use their own. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tone="dark" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <AskKenyaFloat />
    </div>
  );
}
