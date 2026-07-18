import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getIndiaDomesticPageMeta,
  getIndiaDomesticSubSlugs,
  getTeluguPageSlugs,
  INDIA_DOMESTIC_CITY,
} from "@/lib/india-domestic";
import type { IndiaDomesticPage } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "india");

type IndiaDomesticFrontmatter = {
  title: string;
  primaryKeyword: string;
  shortAnswer: string;
  tier?: string;
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
  costInrMin?: number;
  costInrMax?: number;
};

function contentDir(locale: "en" | "te") {
  return locale === "te"
    ? path.join(CONTENT_DIR, "te", INDIA_DOMESTIC_CITY)
    : path.join(CONTENT_DIR, INDIA_DOMESTIC_CITY);
}

function fileNameForSlug(slug: string) {
  return slug ? `${slug}.mdx` : "_index.mdx";
}

function readPage(
  slug: string,
  locale: "en" | "te"
): IndiaDomesticPage | null {
  const filePath = path.join(contentDir(locale), fileNameForSlug(slug));
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as IndiaDomesticFrontmatter;
  const meta = getIndiaDomesticPageMeta(slug);

  return {
    slug,
    title: fm.title ?? meta?.title ?? slug,
    primaryKeyword: fm.primaryKeyword ?? meta?.primaryKeyword ?? "",
    shortAnswer: fm.shortAnswer ?? "",
    tier: fm.tier ?? meta?.tier ?? "tier1",
    highlights: fm.highlights ?? [],
    faqs: fm.faqs ?? [],
    costInrMin: fm.costInrMin,
    costInrMax: fm.costInrMax,
    locale,
    content: content.trim(),
  };
}

export function getIndiaDomesticHub(locale: "en" | "te" = "en") {
  return readPage("", locale);
}

export function getIndiaDomesticPage(
  slug: string,
  locale: "en" | "te" = "en"
) {
  return readPage(slug, locale);
}

export function getAllIndiaDomesticSlugs(locale: "en" | "te" = "en") {
  return locale === "te" ? getTeluguPageSlugs().filter(Boolean) : getIndiaDomesticSubSlugs();
}

export function getAllIndiaDomesticRoutes(locale: "en" | "te" = "en") {
  const slugs =
    locale === "te"
      ? (["", ...getTeluguPageSlugs().filter(Boolean)] as string[])
      : (["", ...getIndiaDomesticSubSlugs()] as string[]);
  return slugs;
}
