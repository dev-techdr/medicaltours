import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryHubSections,
  getProceduresByCategory,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { DepthSections } from "@/components/DepthSections";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} in India for Foreigners | Costs & Hospitals`,
    description: `${category.description} Compare packages in Hyderabad, Delhi, Mumbai, Chennai, and Bangalore.`,
    path: `/treatments/${category.slug}`,
    keywords: [
      category.name.toLowerCase(),
      `${category.name.toLowerCase()} india cost`,
      `${category.name.toLowerCase()} for foreigners`,
      `${category.name.toLowerCase()} medical tourism india`,
      `${category.name.toLowerCase()} hyderabad`,
      `${category.name.toLowerCase()} delhi`,
      `${category.name.toLowerCase()} mumbai`,
    ],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const procedures = getProceduresByCategory(category.slug);
  const hubSections = getCategoryHubSections(category.slug);
  const priced = procedures.filter((p) => p.costIndia != null);
  const minCost = priced.length
    ? Math.min(...priced.map((p) => p.costIndia!.min))
    : null;
  const maxCost = priced.length
    ? Math.max(...priced.map((p) => p.costIndia!.max))
    : null;

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[
          { name: "Treatments", href: "/treatments" },
          { name: category.name, href: `/treatments/${category.slug}` },
        ]}
      />

      <Reveal>
        <div className="relative mb-8 overflow-hidden rounded-[var(--radius)] border border-line">
          <div className="relative aspect-[21/9] min-h-[180px]">
            <Image
              src={category.heroImage}
              alt={category.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="media-overlay media-overlay-navy-soft" />
          <div className="absolute bottom-0 left-0 p-5 text-white sm:p-8">
            <p className="text-sm font-semibold text-white/80">Treatment category</p>
            <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {category.name} in India
            </h1>
          </div>
        </div>
        <div className="max-w-3xl">
          <AnswerBlock>
            {category.name} for international patients is available at accredited Indian hospitals
            in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore
            {minCost != null && maxCost != null
              ? `, with typical package ranges from $${minCost.toLocaleString()}–$${maxCost.toLocaleString()} USD depending on the procedure`
              : ""}
            . TechdrHealth coordinates written estimates, visa support, and travel logistics.
          </AnswerBlock>
        </div>
        <p className="mt-6 max-w-3xl text-base text-muted sm:text-lg">{category.description}</p>
      </Reveal>

      {hubSections.length > 0 ? (
        <div className="mt-12">
          <DepthSections sections={hubSections} />
        </div>
      ) : null}

      {procedures.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {procedures.map((procedure, i) => (
            <Reveal key={procedure.slug} delay={(i % 2) * 60}>
              <Link
                href={procedurePath(procedure)}
                className="block rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-accent"
              >
                <h2 className="text-lg font-semibold text-navy">{procedure.name}</h2>
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {procedure.shortAnswer ?? procedure.overview}
                </p>
                {procedure.costIndia ? (
                  <p className="mt-3 text-sm font-medium text-accent">
                    ${procedure.costIndia.min.toLocaleString()}–$
                    {procedure.costIndia.max.toLocaleString()} USD
                  </p>
                ) : (
                  <p className="mt-3 text-sm font-medium text-accent">
                    Confidential clinical care →
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-[var(--radius)] border border-dashed border-line bg-white px-5 py-8 text-muted">
          Procedure pages for this category are being added.{" "}
          <Link href="/contact-us" className="font-semibold text-accent hover:underline">
            Request a quote
          </Link>{" "}
          and we’ll match you with partner hospitals.
        </p>
      )}

      <div className="mt-14">
        <CTASection title={`Planning ${category.name.toLowerCase()} in India?`} />
      </div>
    </Container>
  );
}
