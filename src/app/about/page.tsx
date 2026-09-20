import { permanentRedirect } from "next/navigation";

/**
 * The About page is now Meet Kenya. Kept as a redirect so any existing link,
 * bookmark or search result continues to resolve.
 */
export default function AboutPage(): never {
  permanentRedirect("/meet-kenya");
}
