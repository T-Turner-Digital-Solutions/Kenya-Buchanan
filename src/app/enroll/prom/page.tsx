import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnrollmentFlow } from "@/components/enroll/EnrollmentFlow";
import { currentPromSeason, getContractTemplate, getExperience } from "@/lib/services";

export const metadata: Metadata = {
  title: "Claim Your Prom Spot",
  description: "Kenya B. Prom enrollment.",
};

export default function EnrollPromPage() {
  const prom = getExperience("prom")!;
  const template = getContractTemplate(prom.contractTemplateId)!;

  return (
    <div className="min-h-screen bg-bone">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/media/brand/kenya-b-mark.png"
              alt=""
              width={157}
              height={285}
              className="h-9 w-auto"
            />
            <span className="font-display text-base tracking-[0.18em]">KENYA BUCHANAN</span>
          </Link>
          <Link
            href="/prom"
            className="text-[0.6rem] uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
          >
            Exit
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-12 flex flex-col gap-3">
          <p className="eyebrow">{currentPromSeason.name} · Enrollment</p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">Claim your Prom spot</h1>
        </div>

        <EnrollmentFlow season={currentPromSeason} template={template} />
      </main>
    </div>
  );
}
