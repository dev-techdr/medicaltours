import type { Metadata } from "next";
import { getDomesticHreflangAlternates } from "@/lib/india-domestic";
import { canonicalUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function buildDomesticMetadata({
  title,
  description,
  path,
  keywords,
  hreflangSlug,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  hreflangSlug: string;
}): Metadata {
  const url = canonicalUrl(path);
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
      languages: getDomesticHreflangAlternates(hreflangSlug),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: path.startsWith("/te") ? "te_IN" : "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}
