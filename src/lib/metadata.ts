/**
 * Compatibility re-exports — prefer importing from `@/lib/seo` in new code.
 * Keeps treatment/hospital/story pages on the same metadata + OG/hreflang contract.
 */
export { absoluteUrl, buildMetadata, canonicalUrl } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function procedureMetadata({
  metaTitle,
  metaDescription,
  path,
  keywords,
}: {
  metaTitle: string;
  metaDescription: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return buildMetadata({
    title: metaTitle,
    description: metaDescription,
    path,
    keywords,
  });
}
