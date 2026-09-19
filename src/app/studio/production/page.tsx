import type { Metadata } from "next";
import Link from "next/link";
import { StudioNotice } from "@/components/studio/StudioPrimitives";
import { formatDate } from "@/lib/format";
import { clientRoster, productionColumns } from "@/lib/services";

export const metadata: Metadata = { title: "Production" };

/**
 * PRODUCTION BOARD.
 *
 * Columns come from `productionColumns` and cards from each client's
 * `productionColumn`. Moving a card is a single field change — the structure is
 * ready for drag and drop once a persistence layer exists.
 */
export default function StudioProductionPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex min-w-max gap-4">
          {productionColumns.map((column) => {
            const cards = clientRoster.filter((client) => client.productionColumn === column.key);
            return (
              <section key={column.key} className="flex w-56 shrink-0 flex-col gap-3">
                <header className="flex items-baseline justify-between gap-3 border-b border-bone/15 pb-3">
                  <h2 className="text-[0.6rem] uppercase tracking-wide2 text-bone/70">
                    {column.label}
                  </h2>
                  <span className="text-[0.6rem] text-bone/30">{cards.length}</span>
                </header>

                <div className="flex flex-col gap-2">
                  {cards.map((client) => (
                    <Link
                      key={client.id}
                      href={`/studio/clients/${client.id}`}
                      className="flex flex-col gap-2 border border-bone/10 bg-bone/[0.03] p-4 transition-colors duration-300 hover:border-bone/30"
                    >
                      <span className="font-display text-base leading-tight text-bone">
                        {client.firstName} {client.lastName}
                      </span>
                      <span className="text-[0.55rem] uppercase tracking-wide2 text-bone/35">
                        {client.eventLabel}
                      </span>
                      {client.eventDate ? (
                        <span className="text-[0.55rem] uppercase tracking-wide2 text-champagne/70">
                          {formatDate(client.eventDate)}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                  {cards.length === 0 ? (
                    <p className="border border-dashed border-bone/10 px-4 py-6 text-center text-[0.55rem] uppercase tracking-wide2 text-bone/20">
                      Empty
                    </p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <StudioNotice>
        Phase 1 prototype — the board is read-only. Drag and drop, stage automation and client
        notifications are added once production stages are persisted.
      </StudioNotice>
    </div>
  );
}
