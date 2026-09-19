/**
 * SERVICE LAYER — the seam between the UI and the data source.
 *
 * Phase 1: every function below returns mock records from `src/data/*`.
 * Phase 2: the same function signatures are re-implemented against the real
 * API/database, authentication and storage. UI components import from here and
 * from nowhere else, so nothing in `src/app` or `src/components` has to change.
 *
 * Functions are async-shaped where a real implementation will need to be, so
 * call sites are already written for it.
 */

import { askSuggestions, escalationMessage } from "@/data/ask";
import { clientRoster, demoClientId, getClientRecord, getPortalClient } from "@/data/clients";
import { contractTemplates, getContractTemplate, getSignedContract, signedContracts } from "@/data/contracts";
import { experiences, getExperience } from "@/data/experiences";
import { liveSessions } from "@/data/live";
import { partners, partnerCategories, partnersByCategory } from "@/data/partners";
import {
  currentPromSeason,
  getSeason,
  promSeason2027,
  promSeason2027Full,
  promSeason2028,
  seasons,
  waitlist,
  waitlistActivity,
} from "@/data/seasons";
import { mockAvailability, ownerReviewCases, productionColumns, studioActivity, studioMetrics } from "@/data/studio";
import { getVideo, videos } from "@/data/videos";

export {
  askSuggestions,
  clientRoster,
  contractTemplates,
  currentPromSeason,
  demoClientId,
  escalationMessage,
  experiences,
  getClientRecord,
  getContractTemplate,
  getExperience,
  getPortalClient,
  getSeason,
  getSignedContract,
  getVideo,
  liveSessions,
  mockAvailability,
  ownerReviewCases,
  partnerCategories,
  partners,
  partnersByCategory,
  productionColumns,
  promSeason2027,
  promSeason2027Full,
  promSeason2028,
  seasons,
  signedContracts,
  studioActivity,
  studioMetrics,
  videos,
  waitlist,
  waitlistActivity,
};

/**
 * Phase 1 client session. There is NO authentication in this prototype — the
 * demo simply reads a fixed client record. Production will resolve the signed-in
 * client server-side from a session and authorise every field it returns.
 */
export function getDemoPortalClient() {
  const client = getPortalClient(demoClientId);
  if (!client) throw new Error("Demo client record is missing.");
  return client;
}
