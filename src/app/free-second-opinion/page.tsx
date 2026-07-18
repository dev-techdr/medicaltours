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

const pageTitle = "Free Second Opinion in India - Send Your Medical Reports";
const pageDescription =
  "Send medical reports for a free second opinion from India. Techdr Medical Tourism reviews your case, shortlists hospitals, and shares treatment cost guidance within 24-48 hours.";
const pagePath = "/free-second-opinion";

const reportChecklist = [
  "Recent diagnosis, discharge summary, or doctor note",
  "Blood tests, biopsy reports, scans, X-rays, MRI, CT, PET-CT, or ultrasound summaries",
  "Current medicines, previous surgery details, and allergies if any",
  "Preferred treatment country timeline and whether you already have a visa",
  "Patient age, country, WhatsApp number, and best time to contact",
] as const;

const reviewSteps = [
  {
    title: "Send your reports",
    body: "Share reports through the form or WhatsApp. If files are large, send a message first and our coordinator will guide you.",
  },
  {
    title: "Case review and hospital matching",
    body: "We review the diagnosis, urgency, treatment goal, and budget before shortlisting suitable hospitals and specialists in India.",
  },
  {
    title: "Receive options before you travel",
    body: "You get likely treatment pathways, estimated cost ranges, hospital choices, and next steps for visa, travel, and appointment planning.",
  },
] as const;

const secondOpinionFaqs: FAQItem[] = [
  {
    question: "Can I send medical reports for free consultation in India?",
    answer:
      "Yes. You can share your medical reports with Techdr Medical Tourism for an initial free consultation. Our team reviews the case details and helps shortlist hospitals or doctors in India before you decide to travel.",
  },
  {
    question: "How long does a free second opinion from India take?",
    answer:
      "Most patients receive initial guidance within 24-48 hours after sending complete reports. Complex oncology, transplant, cardiac, or neurosurgery cases may take longer if a specialist needs more information.",
  },
  {
    question: "Do I need to travel to India before getting an estimate?",
    answer:
      "No. The purpose of sending reports first is to understand possible treatment options, hospital availability, and expected cost ranges before booking travel.",
  },
  {
    question: "Are my medical reports kept confidential?",
    answer:
      "Yes. Reports are used only to understand your medical enquiry and coordinate relevant hospital or doctor options. Your details are not published or shared for marketing.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "send medical reports for free consultation india",
    "free second opinion india",
    "medical second opinion india",
    "online doctor opinion india for international patients",
    "free medical consultation india for foreigners",
  ],
});

export default function FreeSecondOpinionPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={webPageSchema({
          name: pageTitle,
          description: pageDescription,
          url: pagePath,
        })}
      />
      <Breadcrumb items={[{ name: "Free Second Opinion", href: pagePath }]} />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <p className="data-label">Send your reports</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              Free second opinion from India before you travel
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Share your medical reports and our Hyderabad care team will help you understand Indian
              hospital options, likely treatment pathways, and cost ranges before you commit to a
              trip.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#enquiry-form" className="btn btn-primary w-full sm:w-auto">
                Send reports for review
              </Link>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full sm:w-auto"
              >
                Send on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <AnswerBlock label="Quick answer">
              You can send medical reports to Techdr Medical Tourism for a free second opinion in
              India. We review your case, identify suitable hospitals or doctors, and share expected
              treatment cost guidance within 24-48 hours when reports are complete.
            </AnswerBlock>
          </Reveal>

          <Reveal className="mt-10 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="data-label">What to send</p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
              Reports that help doctors respond faster
            </h2>
            <ul className="mt-6 space-y-3.5">
              {reportChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              If you do not have every report, send what you have. We will tell you if a specialist
              needs a missing scan, lab value, or summary before giving a useful opinion.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <PatientEnquiryForm className="lg:sticky lg:top-28" />
        </Reveal>
      </div>

      <section className="mt-16">
        <Reveal>
          <p className="data-label">How it works</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy">
            From report upload to treatment plan clarity
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviewSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 70}
              className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="font-display text-5xl font-medium text-accent/25">
                {index + 1}
              </span>
              <h3 className="-mt-2 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="rounded-[var(--radius)] bg-navy p-6 text-white shadow-[var(--shadow-soft)] sm:p-8">
          <p className="text-sm font-semibold text-accent-light/90">Why patients start here</p>
          <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-white">
            A second opinion lowers travel risk
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/72">
            Medical travel decisions should not begin with flights. A report review helps your
            family compare whether India is suitable, which city or hospital fits the case, and what
            budget range to prepare for.
          </p>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Response time", "24-48 hours"],
              ["Hospital network", SITE.hospitalCount],
              ["Care team", `${SITE.teamCount} coordinators`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[var(--radius-sm)] bg-white/8 p-4">
                <dt className="text-white/55">{label}</dt>
                <dd className="mt-1 font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <FAQAccordion faqs={secondOpinionFaqs} title="Free Second Opinion Questions" />
        </Reveal>
      </section>
    </Container>
  );
}
