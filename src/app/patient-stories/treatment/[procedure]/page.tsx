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
  getProcedureBySlug,
  getStoryProcedures,
  getTestimonialsByProcedure,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { reviewSchema } from "@/lib/schema";

type Props = { params: Promise<{ procedure: string }> };

export function generateStaticParams() {
  return getStoryProcedures().map((p) => ({ procedure: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) return {};
  const nameLower = procedure.name.toLowerCase();
  return buildMetadata({
    title: `${procedure.name} Patient Stories | Medical Tourism India`,
    description: `Real international patient success stories for ${procedure.name} in India — costs, hospitals, recovery, and outcomes for medical tourism patients.`,
    path: `/patient-stories/treatment/${procedure.slug}`,
    keywords: [
      `${nameLower} patient stories india`,
      `${nameLower} success stories medical tourism`,
      `${nameLower} cost india reviews`,
      `international patients ${nameLower} india`,
      `medical tourism india ${nameLower}`,
      `best ${nameLower} india patient reviews`,
    ],
  });
}

export default async function PatientStoriesByTreatmentPage({ params }: Props) {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) notFound();

  const stories = getTestimonialsByProcedure(procedure.slug);
  if (!stories.length) notFound();

  const countries = [...new Set(stories.map((s) => s.country))];

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
          { name: procedure.name, href: `/patient-stories/treatment/${procedure.slug}` },
        ]}
      />

      <Reveal>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {procedure.name} Patient Stories in India
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          International patients from {countries.join(", ")} chose India for {procedure.name} —
          transparent packages, partner hospitals, and coordinated care.{" "}
          <Link href={procedurePath(procedure)} className="font-semibold text-accent hover:underline">
            Read the full {procedure.name} cost guide
          </Link>
          .
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        <span className="self-center text-xs font-semibold uppercase tracking-wide text-muted">
          From
        </span>
        {stories.map((s) => (
          <Link
            key={s.slug}
            href={`/patient-stories/${s.countrySlug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {s.country}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {stories.map((story, i) => (
          <Reveal key={story.slug} delay={(i % 2) * 60}>
            <TestimonialCard testimonial={story} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <CTASection title={`Planning ${procedure.name} in India?`} />
      </div>
    </Container>
  );
}
