import Link from "next/link";
import { ExperiencePanel } from "@/components/site/ExperiencePanel";
import { LiveCard } from "@/components/site/LiveCard";
import { PageHero } from "@/components/site/PageHero";
import { PartnerCard } from "@/components/site/PartnerCard";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/site";
import { currentPromSeason, experiences, liveSessions, partners } from "@/lib/services";

const featured = [
  { id: "featured-1", alt: "Beaded column gown, full length", ratio: "tall" as const, caption: "Prom 2026 · Reveal Night" },
  { id: "featured-2", alt: "Bridal gown, back detail", ratio: "portrait" as const, caption: "Bridal · Hand-finished" },
  { id: "featured-3", alt: "Structured bodice detail", ratio: "portrait" as const, caption: "Custom · Gala" },
  { id: "featured-4", alt: "Full skirt in motion", ratio: "tall" as const, caption: "Kenya B. Collection" },
];

const clientPromises = [
  { title: "Where am I in the process?", body: "Your journey, stage by stage, always current." },
  { title: "What happens next?", body: "The next step is never a guess — it is on your dashboard." },
  { title: "When do I come in?", body: "Every appointment, with preparation and the option to reschedule yourself." },
  { title: "What does Kenya need from me?", body: "Uploads, approvals and acknowledgements in one place." },
];

export default function HomePage() {
  const upcomingLive = liveSessions.filter((session) => session.state !== "past").slice(0, 2);
  const partnerPreview = partners.slice(0, 3);
  const spotsRemaining = currentPromSeason.initialCapacity - currentPromSeason.spotsClaimed;

  return (
    <>
      <PageHero
        media={{ id: "home-hero", alt: "Kenya B. gown, full-length editorial portrait", ratio: "landscape" }}
        title="KENYA BUCHANAN"
        subtitle={brand.motto}
        actions={
          <>
            <Button href="/book" variant="light" size="lg">
              Begin Your Experience
            </Button>
            <Button href="/prom" variant="ghost" size="lg" className="!text-bone/70 hover:!text-bone">
              Explore Prom
            </Button>
            <Button href="/bridal" variant="ghost" size="lg" className="!text-bone/70 hover:!text-bone">
              Bridal
            </Button>
            <Button href="/custom" variant="ghost" size="lg" className="!text-bone/70 hover:!text-bone">
              Custom
            </Button>
          </>
        }
      />

      {/* Featured work — the gowns are the artwork. */}
      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title={<>The gown is the point.<br />Everything else serves it.</>}
            action={
              <Button href="/collections" variant="outline">
                View Collections
              </Button>
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={index * 90} className={index % 2 === 1 ? "lg:mt-16" : undefined}>
              <MediaFrame
                slot={{ id: item.id, alt: item.alt, ratio: item.ratio }}
                caption={item.caption}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experiences */}
      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="The Experiences"
            title="Choose how you want to be dressed."
            lede="Every Kenya B. client enters through an experience. Each one has its own journey, its own agreement and its own rhythm."
          />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug} delay={index * 110}>
              <ExperiencePanel experience={experience} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Prom season teaser */}
      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <MediaFrame
              slot={{ id: "prom-teaser", alt: "Prom gown on the studio floor", ratio: "portrait", tone: "dark" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-8">
            <SectionHeading
              tone="light"
              eyebrow={`${currentPromSeason.name} · Books Open`}
              title="A season, not a storefront."
              lede={
                <>
                  A Prom Spot is acceptance into the season — not an appointment. Spots are limited,
                  claimed with a deposit, and held for one person at a time.
                </>
              }
            />
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-bone/15 pt-8">
              <div>
                <p className="font-display text-5xl leading-none text-bone">
                  {currentPromSeason.spotsClaimed}
                  <span className="text-2xl text-bone/40"> / {currentPromSeason.initialCapacity}</span>
                </p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-luxe text-bone/40">Spots claimed</p>
              </div>
              <div>
                <p className="font-display text-5xl leading-none text-champagne">{spotsRemaining}</p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-luxe text-bone/40">Remaining</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/prom" variant="light">
                Explore Prom
              </Button>
              <Button href="/book" variant="ghost" className="!text-bone/70 hover:!text-bone">
                Begin Your Experience
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Kenya B. Collection */}
      <Section size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={brand.collection}
              title="Pieces that live beyond one night."
              lede="A growing collection of Kenya B. designs — some one of one, some reimagined for the next woman who needs them."
            />
            <Button href="/collections" variant="outline" className="self-start">
              View the Collection
            </Button>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4 lg:gap-6">
            <MediaFrame slot={{ id: "collection-1", alt: "Collection piece, column silhouette", ratio: "portrait" }} sizes="25vw" />
            <MediaFrame slot={{ id: "collection-2", alt: "Collection piece, draped detail", ratio: "portrait" }} className="mt-10" sizes="25vw" />
          </Reveal>
        </div>
      </Section>

      {/* Kenya's story */}
      <Section tone="deep" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <MediaFrame
              slot={{ id: "story-gown", alt: "Kenya B. gown, champagne silk with satin overskirt", ratio: "portrait" }}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-8">
            <Eyebrow>The Designer</Eyebrow>
            <blockquote className="font-display text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
              &ldquo;I am not making you a dress. I am making the way you walk into the room.&rdquo;
            </blockquote>
            <p className="max-w-lg text-sm leading-relaxed text-ink/65">
              Kenya Buchanan builds gowns by hand for the person who will wear them — measured,
              drafted, sourced and finished for one body and one night. The process is personal, and
              it is meant to be.
            </p>
            <div className="flex items-center gap-5 border-t border-ink/10 pt-8">
              <MediaFrame
                slot={{ id: "kenya-portrait", alt: "Kenya Buchanan", ratio: "portrait" }}
                className="w-20 shrink-0"
                sizes="80px"
              />
              <div className="flex flex-col gap-1">
                <p className="font-display text-lg leading-none">Kenya Buchanan</p>
                <p className="text-[0.55rem] uppercase tracking-luxe text-ink/40">Designer &amp; Founder</p>
              </div>
            </div>
            <Button href="/about" variant="outline" className="self-start">
              About Kenya
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Client experience */}
      <Section tone="ink" size="lg">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow={brand.clientPortal}
            title="Your gown has an address."
            lede="Every Kenya B. client receives a private account: your journey, your appointments, your approvals, your payments and a direct line to the studio."
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {clientPromises.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="bg-ink p-8">
              <p className="font-display text-xl leading-snug text-bone">{item.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-bone/55">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/portal/login" variant="light">
            Log In To My Kenya B.
          </Button>
        </Reveal>
      </Section>

      {/* Kenya B. Live */}
      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow={brand.live}
            title="Kenya, live."
            lede="Q&As, sourcing diaries and reveal nights. Come with questions."
            action={
              <Button href="/live" variant="outline">
                All Sessions
              </Button>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          {upcomingLive.map((session, index) => (
            <Reveal key={session.id} delay={index * 110}>
              <LiveCard session={session} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Preferred partners */}
      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading
            eyebrow={brand.preferred}
            title="Complete your experience."
            lede="The gown is ours. For everything else around it, Kenya keeps a short list."
            action={
              <Button href="/partners" variant="outline">
                Preferred Partners
              </Button>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {partnerPreview.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 100}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing call */}
      <Section tone="ink" size="lg">
        <Reveal className="flex flex-col items-center gap-10 text-center">
          <Eyebrow className="!text-champagne">Begin</Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl lg:text-6xl">
            It starts with one conversation.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/book" variant="light" size="lg">
              Begin Your Experience
            </Button>
            <Link
              href="/about"
              className="px-9 py-4 text-[0.7rem] uppercase tracking-wide2 text-bone/60 transition-colors duration-500 hover:text-bone"
            >
              Meet Kenya
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
