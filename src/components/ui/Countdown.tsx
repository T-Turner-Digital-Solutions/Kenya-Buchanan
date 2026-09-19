"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/format";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function remainingFrom(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial countdown. Renders nothing time-sensitive on the server so the
 * markup stays hydration-safe.
 */
export function Countdown({
  target,
  unitStyle = "words",
  tone = "light",
  showSeconds = true,
  className,
  onExpire,
}: {
  target: string;
  unitStyle?: "words" | "clock";
  tone?: "light" | "dark";
  showSeconds?: boolean;
  className?: string;
  onExpire?: () => void;
}) {
  const targetMs = new Date(target).getTime();
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(remainingFrom(targetMs));
    const id = window.setInterval(() => {
      const next = remainingFrom(targetMs);
      setTime(next);
      if (next.expired) {
        window.clearInterval(id);
        onExpire?.();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs, onExpire]);

  const textTone = tone === "dark" ? "text-bone" : "text-ink";
  const mutedTone = tone === "dark" ? "text-bone/45" : "text-ink/40";

  if (unitStyle === "clock") {
    const label = time
      ? `${pad(time.hours + time.days * 24)}:${pad(time.minutes)}:${pad(time.seconds)}`
      : "--:--:--";
    return (
      <p className={cx("font-display tabular-nums", textTone, className)} aria-live="polite">
        {label}
      </p>
    );
  }

  const units: Array<[number, string]> = [
    [time?.days ?? 0, "Days"],
    [time?.hours ?? 0, "Hours"],
    [time?.minutes ?? 0, "Minutes"],
  ];
  if (showSeconds) units.push([time?.seconds ?? 0, "Seconds"]);

  return (
    <div className={cx("flex flex-wrap items-end gap-x-6 gap-y-4 sm:gap-x-10", className)} aria-live="polite">
      {units.map(([value, label], index) => (
        <div key={label} className="flex items-end gap-x-6 sm:gap-x-10">
          <div className="flex flex-col gap-2">
            <span className={cx("font-display text-4xl tabular-nums leading-none sm:text-6xl", textTone)}>
              {time ? pad(value) : "--"}
            </span>
            <span className={cx("text-[0.55rem] uppercase tracking-luxe", mutedTone)}>{label}</span>
          </div>
          {index < units.length - 1 ? (
            <span aria-hidden className={cx("pb-6 font-display text-2xl sm:text-4xl", mutedTone)}>
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
