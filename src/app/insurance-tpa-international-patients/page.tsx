import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import type { FAQItem } from "@/lib/types";

const pagePath = "/insurance-tpa-international-patients";
const pageTitle = "Insurance & TPA for International Patients in India";
const pageDescription =
  "Does India accept international health insurance? Learn how insurance, TPAs, cashless claims, and self-pay packages work for medical tourists in India.";

const insuranceFaqs: FAQItem[] = [
  {
    question: "Can I use my home country health insurance in India?",
    answer:
      "Sometimes — but not automatically. Coverage depends on your insurer, plan type, and whether the Indian hospital has a direct settlement arrangement with your insurer or TPA. Many international patients still pay upfront in India and claim reimbursement at home.",
  },
  {
    question: "Do Indian hospitals accept international insurance cashless?",
    answer:
      "A limited number of large hospitals have tie-ups with select international insurers or global assistance companies. Cashless approval is case-by-case and usually needs pre-authorization before admission.",
  },
  {
    question: "What is a TPA in Indian healthcare?",
    answer:
      "A Third Party Administrator (TPA) processes insurance claims between hospitals and insurers. For international patients, a TPA may coordinate pre-authorization, document checks, and settlement — when your policy and hospital both support it.",
  },
  {
    question: "What if my insurance does not cover treatment in India?",
    answer:
      "Most medical tourists self-pay using transparent hospital packages quoted in USD. Techdr helps compare package inclusions so families can plan total cost before travel — often still far below US or UK private rates.",
  },
  {
    question: "Can Techdr help with insurance paperwork?",
    answer:
      "We help you understand what documents hospitals typically need for insurance or reimbursement claims — itemized bills, discharge summaries, and procedure codes. Final claim approval remains with your insurer.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "does india accept international health insurance",
    "medical tourism insurance india",
    "tpa international patients india hospital",
  ],
});

export default function InsuranceTpaPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Insurance & TPA", href: pagePath }]} />

      <Reveal>
        <p className="data-label">Insurance guidance</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          Insurance, TPA, and payment for international patients in India
        </h1>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          Most international patients pay hospital packages directly in India and claim reimbursement
          from their home insurer if eligible. Some hospitals support limited cashless arrangements
          through select insurers or TPAs — we help you check options before you travel.
        </AnswerBlock>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Self-pay packages",
            body: "The most common path. Hospitals quote transparent USD packages; you pay and receive itemized bills for possible reimbursement.",
          },
          {
            title: "Cashless (limited)",
            body: "Available only when your insurer, TPA, and the Indian hospital have an active tie-up. Pre-authorization is usually required.",
          },
          {
            title: "Reimbursement at home",
            body: "After treatment, submit discharge summary, invoices, and reports to your insurer. Approval depends entirely on your policy terms.",
          },
        ].map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 60}
            className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]"
          >
            <h2 className="text-xl font-semibold text-navy">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="data-label">Before you travel</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
          Documents to prepare for insurance questions
        </h2>
        <ul className="mt-6 space-y-3.5">
          {[
            "Policy document or member ID showing overseas treatment coverage",
            "Insurer pre-authorization letter if cashless is being requested",
            "Hospital cost estimate or package breakdown in writing",
            "Passport, visa, and attendant details for admission paperwork",
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
          Need a written package estimate first?{" "}
          <Link href="/get-free-quote" className="font-semibold text-accent hover:underline">
            Request a free quote
          </Link>{" "}
          or{" "}
          <Link href="/free-second-opinion" className="font-semibold text-accent hover:underline">
            send your reports
          </Link>
          .
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <FAQAccordion faqs={insuranceFaqs} title="Insurance & TPA Questions" />
      </Reveal>

      <Reveal className="mt-12">
        <CTASection
          title="Not sure if your insurance applies?"
          description="Share your policy type and treatment need — we will help you understand likely payment paths and hospital package options in India."
        />
      </Reveal>
    </Container>
  );
}
