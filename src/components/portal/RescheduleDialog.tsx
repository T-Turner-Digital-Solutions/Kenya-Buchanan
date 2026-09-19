"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MockNotice } from "@/components/ui/MockNotice";
import { Modal } from "@/components/ui/Modal";
import { mockAvailability } from "@/lib/services";
import { cx, formatDate, formatTime, formatWeekday } from "@/lib/format";
import type { Appointment } from "@/lib/types";

/**
 * CLIENT SELF-RESCHEDULING — a core requirement.
 *
 * Phase 1 shows the availability interface and confirmation state only.
 * Production rules to enforce server-side: Kenya-controlled availability,
 * rescheduling cutoffs, reschedule limits, optional rescheduling fees,
 * automatic notifications, deposits/payments staying attached to the
 * appointment, releasing the old slot, and admin override.
 */
export function RescheduleDialog({
  appointment,
  open,
  onClose,
}: {
  appointment: Appointment;
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const slots = useMemo(() => mockAvailability(appointment.startsAt), [appointment.startsAt]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof slots>();
    slots.forEach((slot) => {
      const day = slot.startsAt.slice(0, 10);
      map.set(day, [...(map.get(day) ?? []), slot]);
    });
    return [...map.entries()];
  }, [slots]);

  const close = () => {
    onClose();
    // Reset for the next demonstration run.
    window.setTimeout(() => {
      setSelected(null);
      setConfirmed(false);
    }, 400);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      eyebrow="Reschedule"
      title={appointment.title}
      size="lg"
      footer={
        confirmed ? (
          <Button onClick={close} className="w-full sm:w-auto">
            Done
          </Button>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button disabled={!selected} onClick={() => setConfirmed(true)}>
                Confirm New Time
              </Button>
              <Button variant="ghost" onClick={close}>
                Keep Current Time
              </Button>
            </div>
            <MockNotice>
              Phase 1 prototype — availability is sample data and nothing is rescheduled.
            </MockNotice>
          </div>
        )
      }
    >
      {confirmed && selected ? (
        <div className="flex flex-col gap-5">
          <p className="eyebrow">Rescheduled</p>
          <p className="font-display text-2xl leading-snug">
            {formatWeekday(selected)}, {formatDate(selected)} at {formatTime(selected)}
          </p>
          <p className="text-sm leading-relaxed text-ink/60">
            Your previous time has been released. Kenya has been notified and your appointment
            preparation moves with you — nothing about your payments or your place in the season
            changes.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-relaxed text-ink/60">
              Currently {formatWeekday(appointment.startsAt)}, {formatDate(appointment.startsAt)} at{" "}
              {formatTime(appointment.startsAt)}.
            </p>
            <p className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
              Rescheduled {appointment.rescheduleCount}{" "}
              {appointment.rescheduleCount === 1 ? "time" : "times"} · Kenya sets the available
              windows
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {grouped.map(([day, daySlots]) => (
              <div key={day} className="flex flex-col gap-3">
                <p className="eyebrow">
                  {formatWeekday(`${day}T12:00:00.000Z`)} · {formatDate(`${day}T12:00:00.000Z`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelected(slot.startsAt)}
                      aria-pressed={selected === slot.startsAt}
                      className={cx(
                        "border px-5 py-2.5 text-[0.62rem] uppercase tracking-wide2 transition-all duration-300",
                        !slot.available && "cursor-not-allowed border-ink/10 text-ink/20 line-through",
                        slot.available && selected === slot.startsAt && "border-ink bg-ink text-bone",
                        slot.available && selected !== slot.startsAt && "border-ink/20 hover:border-ink",
                      )}
                    >
                      {formatTime(slot.startsAt)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
