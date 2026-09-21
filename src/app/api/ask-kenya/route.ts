import { NextResponse } from "next/server";
import { ASK_ESCALATION, ASK_MAX_QUESTION_LENGTH, askKenya } from "@/lib/askKenya";

/**
 * ASK KENYA B. — the only way the browser reaches the model.
 *
 * The API key lives in the server environment and is never sent to the client.
 * With no key configured the route still answers, with the escalation, so the
 * widget behaves correctly in the prototype rather than erroring.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A crude per-instance throttle. It is not a substitute for a real rate limiter
 * — serverless instances do not share it — but it costs nothing and stops one
 * browser from hammering the endpoint.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { answer: "One moment — too many questions at once. Try again shortly.", escalated: false },
      { status: 429 },
    );
  }

  let question: unknown;
  try {
    question = (await request.json())?.question;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "Ask a question." }, { status: 400 });
  }
  if (question.length > ASK_MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Keep it under ${ASK_MAX_QUESTION_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const result = await askKenya(question.trim());
    return NextResponse.json(result);
  } catch (error) {
    // The upstream failure itself is not the visitor's business; log it and
    // fall back to handing the question to Kenya.
    console.error("ask-kenya failed", error);
    return NextResponse.json({ answer: ASK_ESCALATION, escalated: true, offline: false });
  }
}
