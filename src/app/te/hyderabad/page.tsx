import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DomesticPageTemplate } from "@/components/india/DomesticPageTemplate";
import { getIndiaDomesticHub } from "@/data/indiaDomestic";
import { buildDomesticMetadata } from "@/lib/domestic-seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIndiaDomesticHub("te");
  if (!page) return {};
  return buildDomesticMetadata({
    title: page.title,
    description: page.shortAnswer,
    path: "/te/hyderabad",
    keywords: [page.primaryKeyword],
    hreflangSlug: "",
  });
}

export default function TeluguHyderabadHubPage() {
  const page = getIndiaDomesticHub("te");
  if (!page) notFound();
  return <DomesticPageTemplate page={page} isHub />;
}
