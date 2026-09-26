import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HospitalEmpanelmentForm } from "@/components/HospitalEmpanelmentForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FAQItem } from "@/lib/types";

const pagePath = "/hospital-empanelment";
const pageTitle = "Hospital Empanelment | Partner with Medical Tours India";
const pageDescription =
  "Apply for hospital empanelment with Medical Tours India. Join our MOU partner network for international patient referrals across JCI and NABH accredited centres.";

const benefits = [
  {
    title: "Qualified international referrals",
    body: "Receive pre-screened cases from Africa, the Middle East, South Asia, and beyond — matched to your specialties and capacity.",
  },
  {
    title: "End-to-end coordination",
    body: "Our Hyderabad team handles enquiry triage, visa letters, airport pickup, and attendant logistics so your international desk stays focused on care.",
  },
  {
    title: "Transparent MOU partnership",
    body: "Clear commercial terms, written package pathways, and a single point of contact — no opaque middleman markups on clinical fees.",
  },
] as const;

const processSteps = [
  {
    title: "Submit your hospital profile",
    body: "Share accreditation, specialties, bed strength, and your international patient capabilities.",
  },
  {
    title: "Partnerships review",
    body: "We assess clinical fit, language support, package readiness, and geographic coverage needs.",
  },
  {
    title: "MOU and onboarding",
    body: "Aligned hospitals sign an MOU and join our referral workflow with coordinator training.",
  },
] as const;

const empanelmentFaqs: FAQItem[] = [
  {
    question: "What is hospital empanelment with Medical Tours India?",
    answer:
      "Empanelment means a formal MOU partnership. Your hospital joins our verified network for international medical tourism referrals coordinated by Medical Tours India (TechDr).",
  },
  {
    question: "Which hospitals can apply?",
    answer:
      "We prioritise JCI and NABH accredited multi-specialty hospitals with an international patient desk, transparent package capability, and specialties in demand among medical tourists — cardiac, oncology, transplant, orthopedics, fertility, and more.",
  },
  {
    question: "How long does empanelment take?",
    answer:
      "Most applications receive an initial response within 2–3 business days. Full MOU onboarding typically takes a few weeks depending on documentation and commercial alignment.",
  },
  {
    question: "Is this the same as Aarogyasri or Ayushman empanelment?",
    answer:
      "No. This page is for hospitals seeking a B2B partnership with Medical Tours India for international patients. Government scheme empanelment (Aarogyasri, Ayushman Bharat, CGHS) is a separate process with state or central authorities.",
  },
  {
    question: "Where can patients see partner hospitals?",
    answer:
      "Featured partners appear on our hospital network directory. The full 200+ network is matched case-by-case after medical review.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "hospital empanelment medical tourism india",
    "hospital mou partnership medical tours india",
    "partner hospital network international patients",
    "join medical tourism hospital network india",
  ],
});

export default function HospitalEmpanelmentPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Hospital Empanelment", href: pagePath }]} />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <p className="data-label">For hospitals</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              Hospital empanelment with {SITE.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Partner with a Hyderabad-based facilitator that already coordinates{" "}
              {SITE.patientCount} international patient journeys across {SITE.hospitalCount} MOU
              hospitals. Apply to join our referral network.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#empanelment-form" className="btn btn-primary w-full sm:w-auto">
                Apply for empanelment
              </Link>
              <Link href="/hospital-network" className="btn btn-outline w-full sm:w-auto">
                View partner network
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <AnswerBlock label="Quick answer">
              Hospitals can apply for MOU empanelment with {SITE.name} to receive coordinated
              international patient referrals. Submit your profile below — our partnerships team
              responds within 2–3 business days.
            </AnswerBlock>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {benefits.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 60}
                className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:col-span-1"
              >
                <h2 className="text-base font-semibold text-navy">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="data-label">Empanelment process</p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
              From application to live referrals
            </h2>
            <ol className="mt-6 space-y-5">
              {processSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              Looking for patient-facing hospital listings? Browse the{" "}
              <Link href="/hospital-network" className="font-semibold text-accent hover:underline">
                hospital network
              </Link>{" "}
              or{" "}
              <Link href="/hospitals" className="font-semibold text-accent hover:underline">
                hospitals by city
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <HospitalEmpanelmentForm className="lg:sticky lg:top-28" />
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <FAQAccordion faqs={empanelmentFaqs} title="Hospital Empanelment Questions" />
      </Reveal>
    </Container>
  );
}
