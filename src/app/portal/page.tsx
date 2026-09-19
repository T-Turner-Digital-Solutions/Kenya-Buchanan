import type { Metadata } from "next";
import Link from "next/link";
import { AnswerCard } from "@/components/portal/NextUp";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { daysUntil, formatCurrency, formatDate, formatTime, formatWeekday } from "@/lib/format";
import { getDemoPortalClient, getVideo } from "@/lib/services";

export const metadata: Metadata = { title: "Overview" };

export default function PortalOverviewPage() {
  const client = getDemoPortalClient();
  const currentStage = client.journey.find((stage) => stage.status === "current");
  const nextStage = client.journey.find((stage) => stage.status === "upcoming" || stage.status === "blocked");
  const nextAppointment = client.appointments.find((appointment) => appointment.status === "scheduled");
  const pendingApproval = client.approvals.find((approval) => approval.status === "pending");
  const openTodos = client.journey
    .flatMap((stage) => stage.checklist.filter((item) => item.clientAction && !item.done))
    .slice(0, 4);
  const nextPayment = client.payments.milestones.find(
    (milestone) => milestone.status === "due" || milestone.status === "overdue",
  );
  const balance = client.payments.totalInvestmentCents - client.payments.paidCents;
  const completed = client.journey.filter((stage) => stage.status === "complete").length;
  const stageVideo = getVideo(currentStage?.videoId);

  return (
    <div className="flex flex-col gap-14">
      {/* Progress */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Your gown</p>
            <p className="font-display text-2xl leading-snug">
              Stage {completed + 1} of {client.journey.length} — {currentStage?.title}
            </p>
          </div>
          {client.eventDate ? (
            <p className="text-right">
              <span className="font-display text-4xl leading-none">{daysUntil(client.eventDate)}</span>
              <span className="mt-1 block text-[0.55rem] uppercase tracking-luxe text-ink/40">
                Days until prom
              </span>
            </p>
          ) : null}
        </div>
        <ProgressBar value={completed} max={client.journey.length} label="Journey progress" />
      </section>

      {/* The five questions */}
      <section className="grid gap-px bg-ink/10 sm:grid-cols-2">
        <AnswerCard
          question="Where am I in the process?"
          answer={currentStage?.title ?? "Getting started"}
          detail={currentStage?.description}
          href="/portal/journey"
          action="View my journey"
        />
        <AnswerCard
          question="What happens next?"
          answer={nextStage?.title ?? "Your gown is ready"}
          detail={nextStage?.statusNote ?? nextStage?.description}
          href="/portal/journey"
          action="See what to expect"
        />
        <AnswerCard
          question="When is my next appointment?"
          answer={
            nextAppointment
              ? `${formatWeekday(nextAppointment.startsAt)}, ${formatDate(nextAppointment.startsAt)}`
              : "Nothing scheduled"
          }
          detail={
            nextAppointment
              ? `${nextAppointment.title} · ${formatTime(nextAppointment.startsAt)} · ${nextAppointment.location}`
              : undefined
          }
          href="/portal/appointments"
          action="Appointments"
        />
        <AnswerCard
          question="What does Kenya need from me?"
          answer={pendingApproval ? pendingApproval.title : openTodos[0]?.label ?? "Nothing right now"}
          detail={
            pendingApproval
              ? "Kenya is waiting on your approval before sourcing can be completed."
              : undefined
          }
          href={pendingApproval ? "/portal/approvals" : "/portal/journey"}
          action={pendingApproval ? "Review and approve" : undefined}
          emphasis={Boolean(pendingApproval)}
        />
        <AnswerCard
          question="What do I owe?"
          answer={formatCurrency(balance)}
          detail={
            nextPayment
              ? `${nextPayment.label} — ${formatCurrency(nextPayment.amountCents)}${
                  nextPayment.dueOn ? ` due ${formatDate(nextPayment.dueOn)}` : ""
                }${nextPayment.gateNote ? `. ${nextPayment.gateNote}.` : ""}`
              : undefined
          }
          href="/portal/payments"
          action="Payments"
        />
        <AnswerCard
          question="Anything from Kenya?"
          answer={
            client.messages.find((thread) => thread.unread)?.subject ?? "No new messages"
          }
          href="/portal/messages"
          action="Messages"
        />
      </section>

      {/* Your list */}
      {openTodos.length > 0 ? (
        <section className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl">Your list</h2>
            <StatusPill tone="attention">{openTodos.length} open</StatusPill>
          </div>
          <ul className="flex flex-col">
            {openTodos.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-ink/10 py-4"
              >
                <span className="flex items-center gap-4 text-sm text-ink/75">
                  <span aria-hidden className="h-4 w-4 shrink-0 border border-ink/25" />
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Message from Kenya at this stage */}
      {stageVideo ? (
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl">From Kenya</h2>
          <VideoFrame video={stageVideo} size="md" />
        </section>
      ) : null}

      {/* Fabric approval call-out */}
      {pendingApproval ? (
        <section className="flex flex-col gap-6 border border-champagne-deep/40 bg-champagne/10 p-7 sm:p-10">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Waiting on you</p>
            <h2 className="font-display text-3xl leading-tight">{pendingApproval.title}</h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/65">{pendingApproval.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:max-w-md">
            {pendingApproval.media.map((slot) => (
              <MediaFrame key={slot.id} slot={slot} sizes="(max-width: 640px) 45vw, 220px" />
            ))}
          </div>
          <Button href="/portal/approvals" className="self-start">
            Review &amp; Approve
          </Button>
        </section>
      ) : null}

      <section className="flex flex-wrap gap-3 border-t border-ink/10 pt-10">
        <Link
          href="/portal/ask"
          className="border border-ink/20 px-6 py-3 text-[0.62rem] uppercase tracking-wide2 transition-colors hover:border-ink"
        >
          Ask Kenya B.
        </Link>
        <Link
          href="/portal/documents"
          className="border border-ink/20 px-6 py-3 text-[0.62rem] uppercase tracking-wide2 transition-colors hover:border-ink"
        >
          My Documents
        </Link>
        <Link
          href="/portal/uploads"
          className="border border-ink/20 px-6 py-3 text-[0.62rem] uppercase tracking-wide2 transition-colors hover:border-ink"
        >
          My Uploads
        </Link>
      </section>
    </div>
  );
}
