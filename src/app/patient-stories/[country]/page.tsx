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
  getCountryBySlug,
  getTestimonialsByCountry,
  getStoryCountries,
  getStoryProcedures,
  procedurePath,
  getProcedureBySlug,
} from "@/lib/data";
import { countryHubPathFromShortSlug } from "@/data/countryRoutes";
import { buildMetadata } from "@/lib/metadata";
import { reviewSchema } from "@/lib/schema";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return getStoryCountries().map((country) => ({ country: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  const nameLower = country.name.toLowerCase();
  return buildMetadata({
    title: `Patient Stories from ${country.name} | Medical Tourism India`,
    description: `Real ${country.name} patient success stories who travelled to India for surgery, IVF, dental, and cancer care with Medical Tours India — costs, hospitals, and outcomes.`,
    path: `/patient-stories/${country.slug}`,
    keywords: [
      `medical tourism india ${nameLower}`,
      `patient stories ${nameLower} india`,
      `${nameLower} patients treatment in india`,
      `medical tourism india for ${nameLower} patients`,
      `${nameLower} hospital reviews india`,
      `success stories medical tourism india ${nameLower}`,
    ],
  });
}

export default async function PatientStoriesByCountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const stories = getTestimonialsByCountry(country.slug);
  if (!stories.length) notFound();

  const relatedTreatments = getStoryProcedures().filter((p) =>
    stories.some((s) => s.procedureSlug === p.slug)
  );
  const countryHubHref = countryHubPathFromShortSlug(country.slug);

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
          Medical Tourism India Patient Stories from {country.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          How patients from {country.name} planned treatment in India — package costs, partner
          hospitals, visa support, and real outcomes. Browse all countries on the{" "}
          <Link href="/patient-stories" className="font-semibold text-accent hover:underline">
            patient stories hub
          </Link>
          {countryHubHref ? (
            <>
              {" "}
              or read the full{" "}
              <Link href={countryHubHref} className="font-semibold text-accent hover:underline">
                medical tourism guide for {country.name}
              </Link>
            </>
          ) : null}
          .
        </p>
      </Reveal>

      {relatedTreatments.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="self-center text-xs font-semibold uppercase tracking-wide text-muted">
            Treatments
          </span>
          {relatedTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/patient-stories/treatment/${t.slug}`}
              className="rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
            >
              {t.name}
            </Link>
          ))}
        </div>
      ) : null}

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
