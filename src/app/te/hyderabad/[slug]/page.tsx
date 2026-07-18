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
  return getAllIndiaDomesticSlugs("te").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndiaDomesticPage(slug, "te");
  if (!page) return {};
  return buildDomesticMetadata({
    title: page.title,
    description: page.shortAnswer,
    path: `/te/hyderabad/${slug}`,
    keywords: [page.primaryKeyword],
    hreflangSlug: slug,
  });
}

export default async function TeluguDomesticSubPage({ params }: Props) {
  const { slug } = await params;
  const page = getIndiaDomesticPage(slug, "te");
  if (!page) notFound();
  return <DomesticPageTemplate page={page} />;
}
