import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { City } from "@/lib/types";

type CityFrontmatter = {
  name: string;
  primaryKeyword: string;
  shortAnswer: string;
  highlights?: string[];
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<CityFrontmatter>>>
): City {
  return {
    slug: doc.slug,
    name: doc.name,
    primaryKeyword: doc.primaryKeyword,
    shortAnswer: doc.shortAnswer,
    highlights: doc.highlights ?? [],
    content: doc.content,
  };
}

export function getAllCities(): City[] {
  return getAllMdx<CityFrontmatter>("cities").map(normalize);
}

export function getCityBySlug(slug: string): City | undefined {
  const doc = getMdxBySlug<CityFrontmatter>("cities", slug);
  return doc ? normalize(doc) : undefined;
}

export function getAllCitySlugs(): string[] {
  return getMdxSlugs("cities");
}
