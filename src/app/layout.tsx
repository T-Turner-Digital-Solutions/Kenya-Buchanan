import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { brand } from "@/config/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.motto}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Kenya Buchanan is a luxury custom fashion designer. Prom, bridal and custom gowns built by hand for the person who will wear them.",
  robots: {
    // Phase 1 prototype — the live site remains kenyabuchanan.com.
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.65rem] focus:uppercase focus:tracking-wide2 focus:text-bone"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
