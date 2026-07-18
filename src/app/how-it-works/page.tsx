import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PATIENT_JOURNEY_STEPS } from "@/lib/patient-journey";
import { buildMetadata, webPageSchema } from "@/lib/seo";

const pagePath = "/how-it-works";
const pageTitle = "How Medical Tourism in India Works";
const pageDescription =
  "Step-by-step patient journey for medical tourism in India: enquiry, report review, quote, visa, travel, treatment, recovery, and follow-up with Techdr Medical Tourism.";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "how medical tourism works in india",
    "medical tourism process india step by step",
    "patient journey medical treatment india",
  ],
});

export default function HowItWorksPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "How It Works", href: pagePath }]} />

      <Reveal>
        <p className="data-label">Patient journey</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          How medical tourism in India works — step by step
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          From first enquiry to follow-up after you return home — here is the full pathway Techdr
          coordinates for international patients and families.
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          Medical tourism in India typically follows eight steps: enquiry, medical report review,
          hospital matching and quote, medical visa, travel planning, treatment, recovery, and
          follow-up. Techdr coordinates each stage so families are not navigating India alone.
        </AnswerBlock>
      </Reveal>

      <ol className="mt-12 space-y-5">
        {PATIENT_JOURNEY_STEPS.map((step, index) => (
          <Reveal
            key={step.title}
            delay={index * 50}
            as="li"
            className="grid gap-4 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:grid-cols-[auto_1fr] sm:gap-6"
          >
            <span className="font-display text-5xl font-medium text-accent/25">{index + 1}</span>
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-navy">
                {step.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ink">{step.body}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-12 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="data-label">Ready to start?</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
          Most families begin with reports or a quote request
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          You do not need to know every step before contacting us. Share your case and we will guide
          you through the right sequence for your treatment type and timeline.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/free-second-opinion" className="btn btn-primary w-full sm:w-auto">
            Send medical reports
          </Link>
          <Link href="/get-free-quote" className="btn btn-outline w-full sm:w-auto">
            Get a free quote
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <CTASection
          title="Questions about your specific journey?"
          description="Tell us your diagnosis and timeline — we will map the right hospitals, visa steps, and cost range for your family."
        />
      </Reveal>
    </Container>
  );
}
