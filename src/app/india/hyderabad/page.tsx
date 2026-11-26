import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DomesticPageTemplate } from "@/components/india/DomesticPageTemplate";
import { getIndiaDomesticHub } from "@/data/indiaDomestic";
import { buildDomesticMetadata } from "@/lib/domestic-seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIndiaDomesticHub("en");
  if (!page) return {};
  return buildDomesticMetadata({
    title: page.title,
    description: page.shortAnswer,
    path: "/india/hyderabad",
    keywords: [page.primaryKeyword, "hyderabad surgery indian patients"],
    hreflangSlug: "",
  });
}

export default function HyderabadHubPage() {
  const page = getIndiaDomesticHub("en");
  if (!page) notFound();
  return <DomesticPageTemplate page={page} isHub />;
}
