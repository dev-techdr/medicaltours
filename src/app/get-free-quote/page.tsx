import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FAQItem } from "@/lib/types";

const pagePath = "/get-free-quote";
const pageTitle = "Get a Free Treatment Quote in India";
const pageDescription =
  "Request a free written treatment quote from a Techdr care coordinator. We compare hospital options, package inclusions, and costs — not just a calculator estimate.";

const quoteFaqs: FAQItem[] = [
  {
    question: "What is the difference between the cost calculator and a free quote?",
    answer:
      "The cost calculator gives instant indicative ranges for common procedures. A free quote is personalized: a coordinator reviews your case, confirms hospital fit, and sends a written package outline based on your reports.",
  },
  {
    question: "How fast will I receive a treatment quote?",
    answer:
      "Most families receive an initial quote outline within 24–48 hours after sharing reports. Urgent oncology or cardiac cases are prioritized when timelines are tight.",
  },
  {
    question: "Is the quote binding?",
    answer:
      "Quotes are indicative until a hospital reviews your full medical file. Final costs can change if additional tests, complications, or room upgrades are needed — we explain this clearly upfront.",
  },
  {
    question: "What does a typical India treatment package include?",
    answer:
      "Packages usually cover hospital fees, standard room category, surgeon fees where applicable, and expected length of stay. Travel, visa, medicines after discharge, and attendant stay are quoted separately.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "free medical treatment quote india",
    "hospital cost estimate india international patients",
    "medical tourism package quote india",
  ],
});

export default function GetFreeQuotePage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Get Free Quote", href: pagePath }]} />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <p className="data-label">Talk to a coordinator</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              Get a free treatment quote — reviewed by our team
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              The cost calculator is a starting point. This page is for families who want a
              coordinator to review reports, compare hospitals, and send a written quote outline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#enquiry-form" className="btn btn-primary w-full sm:w-auto">
                Request my quote
              </Link>
              <Link href="/cost-calculator" className="btn btn-outline w-full sm:w-auto">
                Try cost calculator first
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <AnswerBlock label="Quick answer">
              Submit your details and medical reports to receive a free treatment quote for India.
              Techdr coordinators compare accredited hospitals, clarify package inclusions, and share
              indicative costs within 24–48 hours.
            </AnswerBlock>
          </Reveal>

          <Reveal className="mt-10 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="data-label">What you receive</p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
              A written quote outline — not a generic price list
            </h2>
            <ul className="mt-6 space-y-3.5">
              {[
                "2–3 hospital options matched to your diagnosis and budget",
                "Indicative USD package range with inclusions explained",
                "Suggested city and doctor specialty pathway",
                "Visa, travel, and recovery planning guidance if you proceed",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Prefer instant ranges? Use the{" "}
              <Link href="/cost-calculator" className="font-semibold text-accent hover:underline">
                cost calculator
              </Link>{" "}
              first, then request a coordinator quote when you are ready.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <PatientEnquiryForm
            className="lg:sticky lg:top-28"
            label="Free quote request"
            title="Request your treatment quote"
            description={`A ${SITE.teamCount} coordinator will review your case and reply with hospital options and package guidance — usually within 24–48 hours.`}
            submitLabel="Request free quote"
            messagePlaceholder="Share diagnosis, reports available, urgency, and budget range if known."
            sourcePage="get-free-quote"
          />
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <FAQAccordion faqs={quoteFaqs} title="Free Quote Questions" />
      </Reveal>
    </Container>
  );
}
