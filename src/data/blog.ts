import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { BlogPost } from "@/lib/types";

type BlogFrontmatter = {
  title: string;
  primaryKeyword: string;
  excerpt: string;
  date: string;
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<BlogFrontmatter>>>
): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    primaryKeyword: doc.primaryKeyword,
    excerpt: doc.excerpt,
    date: doc.date,
    content: doc.content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllMdx<BlogFrontmatter>("blog")
    .map(normalize)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const doc = getMdxBySlug<BlogFrontmatter>("blog", slug);
  return doc ? normalize(doc) : undefined;
}

export function getAllPostSlugs(): string[] {
  return getMdxSlugs("blog");
}
