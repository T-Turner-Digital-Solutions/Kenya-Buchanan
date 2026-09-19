import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/Field";
import { MockNotice } from "@/components/ui/MockNotice";
import { StatusPill } from "@/components/ui/StatusPill";
import { cx, formatDateTime } from "@/lib/format";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "Messages" };

export default function PortalMessagesPage() {
  const client = getDemoPortalClient();

  return (
    <div className="flex flex-col gap-12">
      {client.messages.map((thread) => (
        <section key={thread.id} className="flex flex-col gap-6 border border-ink/15 bg-white p-7 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="font-display text-2xl leading-tight">{thread.subject}</h2>
            {thread.unread ? <StatusPill tone="attention">New</StatusPill> : null}
          </div>

          <ul className="flex flex-col gap-6">
            {thread.messages.map((message) => (
              <li
                key={message.id}
                className={cx(
                  "flex flex-col gap-2 border-l-2 pl-5",
                  message.from === "studio" ? "border-champagne" : "border-ink/20",
                )}
              >
                <p className="text-[0.55rem] uppercase tracking-luxe text-ink/40">
                  {message.authorName} · {formatDateTime(message.at)}
                </p>
                <p className="text-sm leading-relaxed text-ink/75">{message.body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6">
            <TextAreaField id={`reply-${thread.id}`} label="Reply" placeholder="Write to Kenya…" rows={3} />
            <Button className="self-start">Send</Button>
          </div>
        </section>
      ))}

      <MockNotice>
        Phase 1 prototype — messages are mock data. Nothing is sent, and no notifications are
        delivered.
      </MockNotice>
    </div>
  );
}
