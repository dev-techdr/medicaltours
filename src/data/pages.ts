import { getMdxBySlug } from "@/lib/mdx";
import type { ContentPage } from "@/lib/types";

type PageFrontmatter = {
  title: string;
  description: string;
};

export function getContentPage(slug: string): ContentPage | undefined {
  const doc = getMdxBySlug<PageFrontmatter>("pages", slug);
  if (!doc) return undefined;
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    content: doc.content,
  };
}
