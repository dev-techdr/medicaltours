import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  getAllTestimonials,
  getCountryBySlug,
  getProcedureBySlug,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Patient Success Stories | Medical Tourism India",
  description:
    "Real international patient success stories from Nigeria, Kenya, UK, UAE, and more — heart surgery, knee replacement, dental, and IVF in India.",
  path: "/patient-stories",
  keywords: ["india medical tourism success stories", "india hospital reviews international patients"],
});

export default function PatientStoriesPage() {
  const stories = getAllTestimonials();
  const countries = [
    ...new Map(
      stories.map((s) => [s.countrySlug, getCountryBySlug(s.countrySlug)?.name ?? s.country])
    ),
  ];

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Patient Stories", href: "/patient-stories" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          India Medical Tourism Success Stories
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          International patients trust Techdr for heart surgery, joint replacement, IVF, and more —
          with transparent packages and coordinated hospital care.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-3">
        {countries.map(([slug, name]) => (
          <Link
            key={slug}
            href={`/patient-stories/${slug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {stories.map((story, i) => {
          const procedure = story.procedureSlug
            ? getProcedureBySlug(story.procedureSlug)
            : undefined;
          return (
            <Reveal key={story.slug} delay={(i % 2) * 70}>
              <div>
                <TestimonialCard testimonial={story} />
                {procedure ? (
                  <Link
                    href={procedurePath(procedure)}
                    className="mt-3 inline-block text-sm font-semibold text-accent"
                  >
                    About this treatment →
                  </Link>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-14">
        <CTASection title="Ready to plan your own journey?" />
      </div>
    </Container>
  );
}
