import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { BlogAuthor } from "@/components/BlogAuthor";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { mdxHeadingId, MdxContent } from "@/components/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { MedicalFacilitatorNotice } from "@/components/MedicalFacilitatorNotice";
import { getAllPosts, getAllPostSlugs, getPostBySlug } from "@/data/blog";
import { toPlainFaqText } from "@/lib/blog-faqs";
import { blogPostingSchema, buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { BLOG_AUTHOR, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const SEARCH_STOP_WORDS = new Set([
  "about",
  "after",
  "before",
  "complete",
  "from",
  "guide",
  "india",
  "medical",
  "patient",
  "patients",
  "treatment",
  "with",
]);

function searchableTerms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((term) => term.length > 3 && !SEARCH_STOP_WORDS.has(term)),
  );
}

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
  const headings = [...post.content.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
  const currentTerms = searchableTerms(
    [post.title, post.primaryKeyword, ...(post.keywords ?? [])].join(" "),
  );
  const currentTitleTerms = searchableTerms(post.title);
  const relatedPosts = getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateTerms = searchableTerms(
        [candidate.title, candidate.primaryKeyword, ...(candidate.keywords ?? [])].join(" "),
      );
      const sharedTerms = [...candidateTerms].filter((term) => currentTerms.has(term)).length;
      const sharedTitleTerms = [...searchableTerms(candidate.title)].filter((term) =>
        currentTitleTerms.has(term),
      ).length;
      const score = sharedTerms + sharedTitleTerms * 3;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || (a.candidate.date < b.candidate.date ? 1 : -1))
    .slice(0, 4)
    .map(({ candidate }) => candidate);

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
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] xl:gap-14">
        <article className="min-w-0">
          <MdxContent source={post.content} />
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
          <MedicalFacilitatorNotice className="mt-10" />
          <div className="mt-10">
            <BlogAuthor variant="card" />
          </div>
        </article>

        <aside className="hidden space-y-5 lg:sticky lg:top-28 lg:block">
          {headings.length > 0 ? (
            <nav
              aria-label="Article sections"
              className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]"
            >
              <p className="data-label">In this guide</p>
              <ol className="mt-4 space-y-3">
                {headings.map((heading) => (
                  <li key={heading}>
                    <a
                      href={`#${mdxHeadingId(heading)}`}
                      className="block text-sm leading-snug text-muted transition-colors hover:text-accent"
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <section className="rounded-[var(--radius)] border border-line bg-navy p-5 text-white shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              Free guidance
            </p>
            <h2 className="mt-2 font-display text-xl font-medium">Need help choosing care?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Share your reports for hospital options and an itemised cost estimate.
            </p>
            <Link href="/contact-us#enquiry-form" className="btn btn-light mt-5 w-full">
              Request hospital matching
            </Link>
          </section>

          <section className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]">
            <p className="data-label">Related guides</p>
            <ul className="mt-4 divide-y divide-line">
              {relatedPosts.map((related) => (
                <li key={related.slug} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block text-sm font-medium leading-snug text-navy transition-colors hover:text-accent"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
