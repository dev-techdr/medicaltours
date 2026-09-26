import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MdxDocument<T> = T & {
  slug: string;
  content: string;
};

function collectionDir(collection: string) {
  return path.join(CONTENT_DIR, collection);
}

export function getMdxSlugs(collection: string): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

export function getMdxBySlug<T extends Record<string, unknown>>(
  collection: string,
  slug: string
): MdxDocument<T> | null {
  const filePath = path.join(collectionDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as T),
    slug,
    content: content.trim(),
  };
}

export function getAllMdx<T extends Record<string, unknown>>(
  collection: string
): MdxDocument<T>[] {
  return getMdxSlugs(collection)
    .map((slug) => getMdxBySlug<T>(collection, slug))
    .filter((doc): doc is MdxDocument<T> => doc !== null);
}

/** Escape a string for YAML double-quoted scalars. */
export function yamlQuote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}
