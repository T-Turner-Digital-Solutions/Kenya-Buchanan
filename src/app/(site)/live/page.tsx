import type { Metadata } from "next";
import { LiveCard } from "@/components/site/LiveCard";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { brand } from "@/config/site";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";
import { liveSessions } from "@/lib/services";

export const metadata: Metadata = {
  title: "Live",
  description: "Kenya B. Live — Q&As, sourcing diaries and reveal nights with Kenya Buchanan.",
};

export default function LivePage() {
  const live = liveSessions.find((session) => session.state === "live");
  const upcoming = liveSessions.filter((session) => session.state === "upcoming");
  const past = liveSessions.filter((session) => session.state === "past");
  const next = upcoming[0];

  return (
    <>
      <PageHero
        eyebrow={brand.live}
        media={{ id: "live-hero", alt: "Kenya on camera in the studio", ratio: "landscape" }}
        title="Kenya B. Live"
        subtitle="Come with questions."
        size="mid"
      >
        <div className="mt-2">
          {live ? (
            <StatusPill tone="dark">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" aria-hidden />
              Live now — {live.title}
            </StatusPill>
          ) : next ? (
            <StatusPill tone="dark">
              Next · {formatWeekday(next.startsAt)} {formatDate(next.startsAt)} · {formatTime(next.startsAt)}
            </StatusPill>
          ) : null}
        </div>
      </PageHero>

      <Section size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Upcoming"
            title="What's next."
            lede="Sessions stream to Facebook Live and Instagram Live. Replays land here afterward."
          />
        </Reveal>
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          {upcoming.map((session, index) => (
            <Reveal key={session.id} delay={index * 110}>
              <LiveCard session={session} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-14">
          <MockNotice>
            Phase 1 prototype — live status, schedules and replays are mock content. Facebook Live
            embeds and permalinks are wired in a later phase.
          </MockNotice>
        </Reveal>
      </Section>

      <Section tone="deep" size="lg">
        <Reveal>
          <SectionHeading eyebrow="Replays" title="Watch it back." />
        </Reveal>
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          {past.map((session, index) => (
            <Reveal key={session.id} delay={index * 110}>
              <LiveCard session={session} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink" size="md">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-bone text-balance sm:text-5xl">
            Bring your questions to the next one.
          </h2>
          <Button href="/prom" variant="light" size="lg">
            Explore Prom
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
