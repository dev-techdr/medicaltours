import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MdxContent } from "@/components/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPostSlugs, getPostBySlug } from "@/data/blog";
import { blogPostingSchema, buildMetadata, webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords ?? [post.primaryKeyword],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: post.title,
            description: post.excerpt,
            url: path,
          }),
          blogPostingSchema({
            title: post.title,
            description: post.excerpt,
            url: path,
            datePublished: post.date,
            keywords: [post.primaryKeyword],
          }),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: path },
        ]}
      />
      <time className="text-sm font-medium text-muted" dateTime={post.date}>
        {post.date}
      </time>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-navy">
        {post.title}
      </h1>
      <div className="mt-6">
        <AnswerBlock>{post.excerpt}</AnswerBlock>
      </div>
      <div className="mt-10">
        <MdxContent source={post.content} />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
