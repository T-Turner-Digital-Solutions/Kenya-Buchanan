/** Display formatting helpers — no business rules live here. */

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
    ...opts,
  }).format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return formatDate(iso, { month: "short", day: "numeric", year: undefined });
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} · ${formatTime(iso)}`;
}

export function formatWeekday(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(
    new Date(iso),
  );
}

/** Whole days between two ISO dates, floored at zero. */
export function daysUntil(iso: string, from: Date = new Date()): number {
  const ms = new Date(iso).getTime() - from.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function initials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function cx(...values: unknown[]): string {
  return values.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
}
