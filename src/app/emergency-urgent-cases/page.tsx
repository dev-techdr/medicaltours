import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

const pagePath = "/emergency-urgent-cases";
const pageTitle = "Urgent & Emergency Medical Cases in India";
const pageDescription =
  "Fast-track medical tourism support for urgent cancer, cardiac, transplant, and neurosurgery cases in India. Priority coordinator response for time-sensitive patients.";

const urgentPathways = [
  "Oncology — biopsy pending, staging needed, or treatment delay at home",
  "Cardiac — angioplasty, bypass, or valve surgery with worsening symptoms",
  "Transplant — liver or kidney evaluation with limited local options",
  "Neurosurgery — brain or spine cases needing rapid specialist access",
] as const;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "urgent medical treatment india",
    "fast track medical tourism india",
    "emergency cancer treatment india international patients",
  ],
});

export default function EmergencyUrgentCasesPage() {
  const urgentWhatsApp = `${SITE.whatsappUrl}?text=${encodeURIComponent("URGENT: I need fast-track help for medical treatment in India. Please respond as soon as possible.")}`;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Urgent Cases", href: pagePath }]} />

      <Reveal className="rounded-[var(--radius)] border border-red-200 bg-red-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-800">Urgent pathway</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          Fast-track support for time-sensitive cases
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
          If cancer, cardiac, transplant, or neurosurgery cannot wait, contact us immediately. We
          prioritize urgent enquiries for hospital matching, invitation letters, and travel planning.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={urgentWhatsApp} className="btn btn-primary w-full sm:w-auto">
            WhatsApp urgent line
          </a>
          <a href={`tel:${SITE.phone}`} className="btn btn-outline w-full sm:w-auto">
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <AnswerBlock label="Important">
              This page is for urgent medical travel coordination — not emergency ambulance care in
              your home country. If someone is in immediate life-threatening danger, call local
              emergency services first, then contact us for India treatment planning.
            </AnswerBlock>
          </Reveal>

          <Reveal className="mt-8 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="data-label">Common urgent pathways</p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
              Cases we fast-track most often
            </h2>
            <ul className="mt-6 space-y-3.5">
              {urgentPathways.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Share available reports immediately — even partial files help us start hospital outreach
              while you gather remaining documents.
            </p>
          </Reveal>

          <Reveal className="mt-8 rounded-[var(--radius)] bg-navy p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-medium tracking-tight text-white">
              What happens on an urgent enquiry
            </h2>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-white/80">
              <li>1. Coordinator acknowledges receipt — WhatsApp is fastest.</li>
              <li>2. Reports are sent to relevant hospital international desks same day when possible.</li>
              <li>3. You receive hospital fit, timeline, and indicative cost range as soon as reviewed.</li>
              <li>4. Visa invitation and travel planning are accelerated for confirmed pathways.</li>
            </ol>
            <p className="mt-6 text-sm text-white/65">
              Learn the full journey on our{" "}
              <Link href="/how-it-works" className="font-semibold text-accent-light hover:underline">
                how it works
              </Link>{" "}
              page.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <PatientEnquiryForm
            className="lg:sticky lg:top-28 border-red-200"
            label="Urgent enquiry"
            title="Request fast-track coordination"
            description="Mark your timeline clearly — e.g. surgery needed within 2 weeks. We prioritize urgent oncology, cardiac, transplant, and neurosurgery cases."
            submitLabel="Submit urgent request"
            messagePlaceholder="Describe urgency, diagnosis, reports available, and your target travel date."
            sourcePage="emergency-urgent-cases"
          />
        </Reveal>
      </div>
    </Container>
  );
}
