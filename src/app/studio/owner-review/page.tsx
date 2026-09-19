import type { Metadata } from "next";
import { OwnerReviewPanel } from "@/components/studio/OwnerReviewPanel";
import { ownerReviewCases } from "@/lib/services";

export const metadata: Metadata = { title: "Owner Review" };

export default function StudioOwnerReviewPage() {
  return <OwnerReviewPanel cases={ownerReviewCases} />;
}
