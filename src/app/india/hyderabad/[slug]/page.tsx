import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DomesticPageTemplate } from "@/components/india/DomesticPageTemplate";
import {
  getAllIndiaDomesticSlugs,
  getIndiaDomesticPage,
} from "@/data/indiaDomestic";
import { buildDomesticMetadata } from "@/lib/domestic-seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllIndiaDomesticSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndiaDomesticPage(slug, "en");
  if (!page) return {};
  return buildDomesticMetadata({
    title: page.title,
    description: page.shortAnswer,
    path: `/india/hyderabad/${slug}`,
    keywords: [page.primaryKeyword, "hyderabad surgery indian patients"],
    hreflangSlug: slug,
  });
}

export default async function IndiaDomesticSubPage({ params }: Props) {
  const { slug } = await params;
  const page = getIndiaDomesticPage(slug, "en");
  if (!page) notFound();
  return <DomesticPageTemplate page={page} />;
}
