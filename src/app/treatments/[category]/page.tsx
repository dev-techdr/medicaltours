import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHubTemplate } from "@/components/CategoryHubTemplate";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryHubSections,
  getProceduresByCategory,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} in India for Foreigners | Costs & Hospitals`,
    description: `${category.description} Compare packages in Hyderabad, Delhi, Mumbai, Chennai, and Bangalore.`,
    path: `/treatments/${category.slug}`,
    keywords: [
      category.name.toLowerCase(),
      `${category.name.toLowerCase()} india cost`,
      `${category.name.toLowerCase()} for foreigners`,
      `${category.name.toLowerCase()} medical tourism india`,
      `${category.name.toLowerCase()} hyderabad`,
      `${category.name.toLowerCase()} delhi`,
      `${category.name.toLowerCase()} mumbai`,
    ],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const procedures = getProceduresByCategory(category.slug);
  const hubSections = getCategoryHubSections(category.slug);
  const priced = procedures.filter((p) => p.costIndia != null);
  const minCost = priced.length
    ? Math.min(...priced.map((p) => p.costIndia!.min))
    : null;
  const maxCost = priced.length
    ? Math.max(...priced.map((p) => p.costIndia!.max))
    : null;

  return (
    <CategoryHubTemplate
      category={category}
      procedures={procedures}
      hubSections={hubSections}
      minCost={minCost}
      maxCost={maxCost}
    />
  );
}
