import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllCountries,
  getCountryBySlug,
  getTestimonialsByCountry,
  procedurePath,
  getProcedureBySlug,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { reviewSchema } from "@/lib/schema";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  // Only generate pages for countries that have stories (plus keep stubs from countries with stories)
  const withStories = new Set(
    getAllCountries()
      .filter((c) => getTestimonialsByCountry(c.slug).length > 0)
      .map((c) => c.slug)
  );
  return [...withStories].map((country) => ({ country }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  return buildMetadata({
    title: `Patient Stories from ${country.name} | Medical Tourism India`,
    description: `Real patient journeys from ${country.name} who travelled to India for treatment with Techdr Medical Tourism.`,
    path: `/patient-stories/${country.slug}`,
    keywords: [`medical tourism india ${country.name.toLowerCase()}`, `patient stories ${country.name.toLowerCase()}`],
  });
}

export default async function PatientStoriesByCountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const stories = getTestimonialsByCountry(country.slug);
  if (!stories.length) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={stories.map((s) =>
          reviewSchema({
            authorName: s.patientName,
            reviewBody: `${s.summary} ${s.outcome}`,
            ratingValue: s.rating,
            itemName: s.treatment,
          })
        )}
      />
      <Breadcrumb
        items={[
          { name: "Patient stories", href: "/patient-stories" },
          { name: country.name, href: `/patient-stories/${country.slug}` },
        ]}
      />

      <Reveal>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          Patient stories from {country.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          How patients from {country.name} planned treatment in India — costs, hospitals, and
          outcomes.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {stories.map((story, i) => {
          const procedure = story.procedureSlug
            ? getProcedureBySlug(story.procedureSlug)
            : undefined;
          return (
            <Reveal key={story.slug} delay={(i % 2) * 60}>
              <div>
                <TestimonialCard testimonial={story} />
                {procedure ? (
                  <p className="mt-3">
                    <Link
                      href={procedurePath(procedure)}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      Read {procedure.name} guide →
                    </Link>
                  </p>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-14">
        <CTASection title={`Planning treatment from ${country.name}?`} />
      </div>
    </Container>
  );
}
