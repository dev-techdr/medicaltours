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

const pageTitle = "Hospital Second Opinion Coordination in India";
const pageDescription =
  "Medical Tours India securely coordinates report review by independent hospitals and licensed specialists in India before you travel.";
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
    title: "Hospital review and matching",
    body: "We securely forward your reports to suitable independent hospitals, whose licensed specialists assess the clinical details. Our coordinators compare hospital fit, logistics, and indicative costs.",
  },
  {
    title: "Receive options before you travel",
    body: "The hospital provides clinical guidance. We coordinate its response, estimated cost range, and next steps for visa, travel, and appointment planning.",
  },
] as const;

const secondOpinionFaqs: FAQItem[] = [
  {
    question: "Can I send medical reports for a hospital opinion in India?",
    answer:
      "Yes. You can share reports with Medical Tours India for secure forwarding to selected independent hospitals. Licensed hospital specialists review the clinical details; our team coordinates their responses and helps you compare providers before travel.",
  },
  {
    question: "How long does a hospital second opinion take?",
    answer:
      "Many hospitals respond within 24-48 hours after receiving complete reports. Complex oncology, transplant, cardiac, or neurosurgery cases may take longer if the reviewing specialist needs more information.",
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
    "hospital second opinion india",
    "medical report review by hospital india",
    "medical second opinion india",
    "online doctor opinion india for international patients",
    "hospital matching india for foreigners",
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
      <Breadcrumb items={[{ name: "Hospital Second Opinion", href: pagePath }]} />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <p className="data-label">Send your reports</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              Coordinate a hospital second opinion before you travel
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Share your medical reports for secure forwarding to independent Indian hospitals.
              Licensed hospital specialists provide clinical guidance; our Hyderabad team
              coordinates responses, provider options, and indicative costs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#enquiry-form" className="btn btn-primary w-full sm:w-auto">
                Request hospital review
              </Link>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full sm:w-auto"
              >
                Send on WhatsApp
              </a>
              <Link
                href="/for-usa-uk-canada-australia"
                className="btn btn-outline w-full sm:w-auto"
              >
                From USA · UK · CA · AU?
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <AnswerBlock label="Quick answer">
              You can send reports to Medical Tours India for secure forwarding to suitable
              independent hospitals in India. Licensed hospital specialists review the clinical
              information; we coordinate their responses and indicative cost guidance.
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
              If you do not have every report, send what you have. We will coordinate with the
              hospital if its specialist requests a missing scan, lab value, or summary.
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
            Medical travel decisions should not begin with flights. An independent hospital review
            can help your family assess possible care pathways while our team compares hospital
            logistics and indicative budget ranges.
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
          <FAQAccordion faqs={secondOpinionFaqs} title="Hospital Second Opinion Questions" />
        </Reveal>
      </section>
    </Container>
  );
}
