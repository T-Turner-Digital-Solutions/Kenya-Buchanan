import type { Metadata } from "next";
import { UploadPanel } from "@/components/portal/UploadPanel";
import { formatDate } from "@/lib/format";
import { getDemoPortalClient } from "@/lib/services";

export const metadata: Metadata = { title: "Uploads" };

export default function PortalUploadsPage() {
  const client = getDemoPortalClient();
  const inspirationStage = client.journey.find((stage) => stage.key === "inspiration");
  const prompt = inspirationStage?.uploadPrompt ?? {
    title: "Upload Your Inspiration",
    helpText:
      "These images help Kenya understand your vision. Your final Kenya B. gown will be developed through Kenya's creative process specifically for you.",
    min: 1,
    max: 3,
    required: true,
  };

  return (
    <div className="flex flex-col gap-12">
      <UploadPanel prompt={prompt} existing={client.inspiration} />

      {client.uploads.length > 0 ? (
        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl">Other files you have shared</h2>
          <ul className="flex flex-col">
            {client.uploads.map((upload) => (
              <li
                key={upload.id}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4"
              >
                <span className="text-sm text-ink/70">{upload.label}</span>
                <span className="text-[0.6rem] uppercase tracking-wide2 text-ink/40">
                  {formatDate(upload.uploadedAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
