import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { BlogAuthor } from "@/components/BlogAuthor";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MdxContent } from "@/components/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPostSlugs, getPostBySlug } from "@/data/blog";
import { toPlainFaqText } from "@/lib/blog-faqs";
import { blogPostingSchema, buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { BLOG_AUTHOR, SITE } from "@/lib/site";

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
    authors: [{ name: BLOG_AUTHOR.name, url: `${SITE.url}${BLOG_AUTHOR.profilePath}` }],
    creator: BLOG_AUTHOR.name,
    ogType: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const schemaFaqs = post.faqs.map((faq) => ({
    question: faq.question,
    answer: toPlainFaqText(faq.answer),
  }));

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
          ...(schemaFaqs.length ? [faqSchema(schemaFaqs)] : []),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: path },
        ]}
      />
      <BlogAuthor variant="byline" date={post.date} />
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-navy">
        {post.title}
      </h1>
      <div className="mt-6">
        <AnswerBlock>{post.excerpt}</AnswerBlock>
      </div>
      <div className="mt-10">
        <MdxContent source={post.content} />
      </div>
      {post.faqs.length > 0 ? (
        <div className="mt-12 max-w-3xl">
          <FAQAccordion faqs={post.faqs} includeSchema={false} />
        </div>
      ) : null}
      {post.footer ? (
        <div className="mt-10">
          <MdxContent source={post.footer} />
        </div>
      ) : null}
      <div className="mt-10">
        <BlogAuthor variant="card" />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
