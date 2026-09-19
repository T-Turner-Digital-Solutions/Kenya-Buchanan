import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnrollmentFlow } from "@/components/enroll/EnrollmentFlow";
import { BrandMark } from "@/components/site/BrandMark";
import { currentPromSeason, experiences, getContractTemplate, getExperience } from "@/lib/services";

export function generateStaticParams() {
  return experiences.map((experience) => ({ experience: experience.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ experience: string }>;
}): Promise<Metadata> {
  const { experience } = await params;
  const record = getExperience(experience);
  return {
    title: record ? `Book ${record.name}` : "Book",
    description: record?.tagline,
  };
}

/**
 * BOOKING — one continuous path per experience:
 * form → agreement → deposit → Kenya's welcome video → your account.
 */
export default async function EnrollPage({
  params,
}: {
  params: Promise<{ experience: string }>;
}) {
  const { experience: slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const template = getContractTemplate(experience.contractTemplateId);
  if (!template) notFound();

  const season = experience.seasonal ? currentPromSeason : undefined;
  const heading = season ? `Claim your ${season.name} spot` : `Book your ${experience.name} experience`;

  return (
    <div className="min-h-screen bg-bone">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark variant="light" className="h-10" />
            <span className="font-display text-base tracking-[0.18em]">KENYA BUCHANAN</span>
          </Link>
          <Link
            href="/book"
            className="text-[0.6rem] uppercase tracking-wide2 text-ink/45 transition-colors hover:text-ink"
          >
            Change experience
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mb-12 flex flex-col gap-3">
          <p className="eyebrow">
            {season ? `${season.name} · Enrollment` : `${experience.name} · Booking`}
          </p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">{heading}</h1>
        </div>

        <EnrollmentFlow experience={experience} season={season} template={template} />
      </main>
    </div>
  );
}
