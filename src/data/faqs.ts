import { getMdxBySlug } from "@/lib/mdx";
import type { FAQItem } from "@/lib/types";

type FaqFrontmatter = {
  title: string;
  faqs?: FAQItem[];
};

function loadFaqs(slug: string): FAQItem[] {
  const doc = getMdxBySlug<FaqFrontmatter>("faqs", slug);
  return doc?.faqs ?? [];
}

export function getGlobalFaqs(): FAQItem[] {
  return loadFaqs("global");
}

export function getVisaFaqs(): FAQItem[] {
  return loadFaqs("visa");
}
