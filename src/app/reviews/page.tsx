import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllTestimonials } from "@/lib/data";
import { aggregateReviewSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

const pagePath = "/reviews";
const pageTitle = "Patient Reviews & Ratings | Medical Tourism India";
const pageDescription =
  "Read verified patient reviews and ratings for medical tourism in India — heart surgery, knee replacement, IVF, dental, and more through Techdr Medical Tourism.";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "medical tourism india reviews",
    "india hospital reviews international patients",
    "techdr medical tourism reviews",
  ],
});

export default function ReviewsPage() {
  const testimonials = getAllTestimonials();
  const reviewCount = testimonials.length;
  const ratingValue =
    reviewCount > 0
      ? Math.round(
          (testimonials.reduce((sum, item) => sum + item.rating, 0) / reviewCount) * 10
        ) / 10
      : 5;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath }),
          aggregateReviewSchema({
            itemReviewed: `${SITE.name} — Medical Tourism India`,
            ratingValue,
            reviewCount,
            reviews: testimonials.map((item) => ({
              author: item.patientName,
              reviewBody: `${item.summary} ${item.outcome}`,
              rating: item.rating,
            })),
          }),
        ]}
      />
      <Breadcrumb items={[{ name: "Reviews", href: pagePath }]} />

      <Reveal>
        <p className="data-label">Patient reviews</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          What international patients say about care in India
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-3xl font-display font-medium text-navy" aria-label={`${ratingValue} out of 5 average rating`}>
            {ratingValue}
            <span className="ml-2 text-accent" aria-hidden>
              ★★★★★
            </span>
          </p>
          <p className="text-sm text-muted">
            Average rating across {reviewCount} published patient reviews
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          Techdr Medical Tourism has supported {SITE.patientCount} international patients with
          coordinated hospital care in India. Published reviews cover cardiac surgery, orthopedics,
          fertility, and dental treatment from patients in Nigeria, Kenya, UAE, UK, and more.
        </AnswerBlock>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.slug} delay={(index % 2) * 70}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-sm text-muted">
        Want longer case narratives? Browse{" "}
        <Link href="/patient-stories" className="font-semibold text-accent hover:underline">
          patient stories by country
        </Link>
        .
      </Reveal>

      <Reveal className="mt-12">
        <CTASection title="Ready to start your own journey?" />
      </Reveal>
    </Container>
  );
}
