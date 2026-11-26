import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { FAQItem, Treatment, TreatmentSummary } from "@/lib/types";

type TreatmentFrontmatter = {
  name: string;
  primaryKeyword: string;
  shortAnswer: string;
  category: string;
  costMinUsd: number;
  costMaxUsd: number;
  costUsaMinUsd: number;
  costUsaMaxUsd: number;
  recoveryDays: string;
  successRate?: string;
  faqs?: FAQItem[];
  relatedSlugs?: string[];
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<TreatmentFrontmatter>>>
): Treatment {
  return {
    slug: doc.slug,
    name: doc.name,
    primaryKeyword: doc.primaryKeyword,
    shortAnswer: doc.shortAnswer,
    category: doc.category,
    costMinUsd: Number(doc.costMinUsd),
    costMaxUsd: Number(doc.costMaxUsd),
    costUsaMinUsd: Number(doc.costUsaMinUsd),
    costUsaMaxUsd: Number(doc.costUsaMaxUsd),
    recoveryDays: doc.recoveryDays,
    successRate: doc.successRate,
    faqs: doc.faqs ?? [],
    relatedSlugs: doc.relatedSlugs ?? [],
    content: doc.content,
  };
}

export function getAllTreatments(): Treatment[] {
  return getAllMdx<TreatmentFrontmatter>("treatments").map(normalize);
}

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  const doc = getMdxBySlug<TreatmentFrontmatter>("treatments", slug);
  return doc ? normalize(doc) : undefined;
}

export function getAllTreatmentSlugs(): string[] {
  return getMdxSlugs("treatments");
}

export function getTreatmentSummaries(): TreatmentSummary[] {
  return getAllTreatments().map(
    ({ slug, name, category, costMinUsd, costMaxUsd, costUsaMinUsd, costUsaMaxUsd }) => ({
      slug,
      name,
      category,
      costMinUsd,
      costMaxUsd,
      costUsaMinUsd,
      costUsaMaxUsd,
    })
  );
}
