import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/data/blog";
import { blogCollectionSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medical Tourism Blog — Guides & Advice",
  description:
    "Guides on choosing hospitals in India, medical visas, cost comparisons, and how to avoid medical tourism scams.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const blogPosts = getAllPosts();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={blogCollectionSchema(
          blogPosts.map((post) => ({
            title: post.title,
            url: `/blog/${post.slug}`,
          })),
        )}
      />
      <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          Medical Tourism Blog
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Practical guides for families planning treatment in India — visas, hospitals, costs, and
          how to stay safe.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 2) * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="lift-card block rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <time className="text-sm text-muted">{post.date}</time>
              <h2 className="mt-2 text-lg font-semibold text-navy">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <p className="mt-4 text-sm font-semibold text-accent">Read article →</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
