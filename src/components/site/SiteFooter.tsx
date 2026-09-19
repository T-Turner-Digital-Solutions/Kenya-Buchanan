import Image from "next/image";
import Link from "next/link";
import { brand, footerNav } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-6">
            <Image
              src="/media/brand/kenya-b-mark.png"
              alt=""
              width={157}
              height={285}
              className="h-24 w-auto invert"
            />
            <p className="font-display text-2xl leading-none tracking-[0.2em] sm:text-3xl">
              KENYA BUCHANAN
            </p>
            <p className="max-w-sm font-display text-xl italic text-champagne-light sm:text-2xl">
              {brand.motto}
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-bone/50">
              Luxury custom fashion. Prom, bridal and custom gowns built by hand for the person who
              will wear them.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <p className="text-[0.6rem] uppercase tracking-luxe text-champagne">{group.heading}</p>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-bone/60 transition-colors duration-300 hover:text-bone"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-8 text-[0.6rem] uppercase tracking-wide2 text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/studio" className="transition-colors hover:text-bone/70">
              {brand.ownerPortal}
            </Link>
            <Link href="/portal/login" className="transition-colors hover:text-bone/70">
              {brand.clientPortal}
            </Link>
            <span className="text-champagne/60">Phase 1 Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
