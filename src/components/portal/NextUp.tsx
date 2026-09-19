import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * The five questions the dashboard must answer at a glance:
 * where am I, what happens next, when do I come in, what does Kenya need,
 * and what do I owe.
 */
export function AnswerCard({
  question,
  answer,
  detail,
  href,
  action,
  emphasis,
}: {
  question: string;
  answer: string;
  detail?: string;
  href?: string;
  action?: string;
  emphasis?: boolean;
}) {
  const body = (
    <>
      <p className="eyebrow">{question}</p>
      <p
        className={cx(
          "mt-3 font-display leading-snug",
          emphasis ? "text-2xl text-ink" : "text-xl text-ink",
        )}
      >
        {answer}
      </p>
      {detail ? <p className="mt-2 text-sm leading-relaxed text-ink/55">{detail}</p> : null}
      {action ? (
        <p className="mt-5 text-[0.6rem] uppercase tracking-wide2 text-champagne-deep">{action} →</p>
      ) : null}
    </>
  );

  const classes = cx(
    "flex flex-col border p-7 transition-colors duration-500",
    emphasis ? "border-champagne-deep/40 bg-champagne/10" : "border-ink/10 bg-white",
    href && "hover:border-ink/30",
  );

  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
