import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PatientStoriesDirectory } from "@/components/PatientStoriesDirectory";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllTestimonials,
  getProcedureBySlug,
  getStoryCountries,
  getStoryProcedures,
  procedurePath,
} from "@/lib/data";
import { aggregateReviewSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

const stories = getAllTestimonials();
const storyCountries = getStoryCountries();
const storyTreatments = getStoryProcedures();

export const metadata: Metadata = buildMetadata({
  title: "Patient Success Stories by Country & Treatment | Medical Tourism India",
  description:
    "Real international patient success stories from USA, UK, Nigeria, Kenya, UAE, Saudi Arabia, Ghana, and 20+ countries — heart surgery, knee replacement, IVF, dental implants, cancer care, and more in India.",
  path: "/patient-stories",
  keywords: [
    "india medical tourism success stories",
    "patient stories medical tourism india",
    "international patient reviews india hospitals",
    "medical tourism india for foreigners success stories",
    "heart surgery patient stories india",
    "knee replacement success stories india",
    "ivf success stories india international patients",
    "dental implants medical tourism india reviews",
    "cancer treatment patient stories india",
    "african patients medical tourism india",
    "gulf patients treatment in india stories",
  ],
});

export default function PatientStoriesPage() {
  const storyCards = stories.map((testimonial) => {
    const procedure = testimonial.procedureSlug
      ? getProcedureBySlug(testimonial.procedureSlug)
      : undefined;
    return {
      testimonial,
      procedureHref: procedure ? procedurePath(procedure) : null,
      procedureName: procedure?.name ?? null,
    };
  });

  const avgRating =
    Math.round(
      (stories.reduce((sum, item) => sum + item.rating, 0) / Math.max(stories.length, 1)) * 10
    ) / 10;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: "Patient Success Stories | Medical Tourism India",
            description:
              "International patient journeys to India for surgery, fertility, dental, and cancer care — filter by country or treatment.",
            url: "/patient-stories",
          }),
          aggregateReviewSchema({
            itemReviewed: `${SITE.name} — Medical Tourism India`,
            ratingValue: avgRating,
            reviewCount: stories.length,
            reviews: stories.map((item) => ({
              author: item.patientName,
              reviewBody: `${item.summary} ${item.outcome}`,
              rating: item.rating,
            })),
          }),
        ]}
      />
      <Breadcrumb items={[{ name: "Patient Stories", href: "/patient-stories" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          India Medical Tourism Success Stories
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Real journeys from {storyCountries.length}+ countries — filter by your country or
          treatment to see how patients planned heart surgery, joint replacement, IVF, dental care,
          and oncology packages in India with TechdrHealth.
        </p>
      </Reveal>

      <div className="mt-10">
        <PatientStoriesDirectory
          stories={storyCards}
          countries={storyCountries}
          treatments={storyTreatments.map((t) => ({ slug: t.slug, name: t.name }))}
        />
      </div>

      <div className="mt-14">
        <CTASection title="Ready to plan your own journey?" />
      </div>
    </Container>
  );
}
