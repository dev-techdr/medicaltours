import { extractBlogFaqs } from "@/lib/blog-faqs";
import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { BlogPost } from "@/lib/types";

type BlogFrontmatter = {
  title: string;
  metaTitle?: string;
  primaryKeyword: string;
  keywords?: string[];
  excerpt: string;
  date: string;
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<BlogFrontmatter>>>
): BlogPost {
  const { body, faqs, footer } = extractBlogFaqs(doc.content);
  return {
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.metaTitle,
    primaryKeyword: doc.primaryKeyword,
    keywords: doc.keywords,
    excerpt: doc.excerpt,
    date: doc.date,
    content: body,
    faqs,
    footer,
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
