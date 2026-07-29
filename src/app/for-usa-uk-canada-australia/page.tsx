import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { NetworkStats } from "@/components/NetworkStats";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContentPage } from "@/data/pages";
import { getAllStories } from "@/data/stories";
import {
  WESTERN_CAMPAIGN_PATH,
  WESTERN_COUNTRY_HUBS,
  WESTERN_FEATURED_TREATMENT_SLUGS,
} from "@/data/westernMarkets";
import { getTreatmentBySlug } from "@/data/treatments";
import { getTestimonialsByCountry } from "@/lib/data";
import { buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FAQItem } from "@/lib/types";

const page = getContentPage("for-usa-uk-canada-australia");
const pagePath = WESTERN_CAMPAIGN_PATH;

const pageTitle =
  page?.title ??
  "Medical Tourism India for USA, UK, Canada & Australia Patients";
const pageDescription =
  page?.description ??
  "Accreditation-first care in India for Western patients — remote second opinions, clear packages, and continuity with your home doctor.";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "medical tourism india for usa patients",
    "medical tourism india for uk patients",
    "medical tourism india for canadian patients",
    "medical tourism india for australian patients",
    "india surgery cost vs usa uk canada australia",
    "free second opinion india for western patients",
    "jci hospitals india for international patients",
  ],
});

const marketMatrix = [
  {
    market: "United States",
    driver: "Uninsured, underinsured, or high cash-pay quotes",
    focus: "Cardiac, joints, dental, bariatric, cancer, spine",
  },
  {
    market: "United Kingdom",
    driver: "NHS waits and expensive private pathways",
    focus: "Joints, cardiac, dental, IVF, spine, cancer",
  },
  {
    market: "Canada",
    driver: "Provincial wait-lists for elective specialty care",
    focus: "Joints, cardiac, cancer, IVF, dental, cosmetic",
  },
  {
    market: "Australia",
    driver: "Private elective gaps and long-haul value travel",
    focus: "Dental, IVF, joints, cosmetic, fertility, cardiac",
  },
] as const;

const reviewSteps = [
  {
    title: "Share reports by email or form",
    body: "Upload diagnosis notes, imaging summaries, and goals. WhatsApp is optional — most Western families prefer email and a written reply.",
  },
  {
    title: "Remote specialist matching",
    body: "We shortlist accredited hospitals and explain stay length, inclusions, and exclusions before you book flights.",
  },
  {
    title: "Travel only when the plan is clear",
    body: "Visa invitation, package estimate in USD, and discharge records prepared for your home GP or specialist.",
  },
] as const;

const westernFaqs: FAQItem[] = [
  {
    question: "Is medical tourism in India safe for US, UK, Canada, and Australia patients?",
    answer:
      "Yes when you choose JCI or NABH accredited hospitals and structured coordination. Medical Tours India prioritises accredited partners, written packages, and clear surgical volumes — not the lowest unidentified quote.",
  },
  {
    question: "How do Western patients start without flying first?",
    answer:
      "Send reports for a free second opinion. Most families receive hospital options and an indicative USD package within 24–48 hours after complete reports arrive, then decide whether travel makes sense.",
  },
  {
    question: "Will my home doctor get what they need after surgery?",
    answer:
      "Before you leave India we help collect operative notes, implant documentation, and imaging so your GP or specialist can continue care. Remote follow-up with the Indian team is arranged when appropriate.",
  },
  {
    question: "Does US or UK insurance cover treatment in India?",
    answer:
      "Most India packages are self-pay. If you hold insurance, confirm out-of-network or reimbursement rules with your carrier before travel. We can assemble invoices and clinical records for claims teams; coverage decisions remain with the insurer.",
  },
];

function westernProofItems() {
  const storyDocs = getAllStories().filter((s) =>
    /united states|united kingdom|usa|uk|canada|australia|america|britain/i.test(
      s.country
    )
  );
  const fromJson = ["usa", "uk", "canada", "australia"].flatMap((slug) =>
    getTestimonialsByCountry(slug).slice(0, 1)
  );

  const fromStories = storyDocs.map((s) => ({
    key: s.slug,
    name: s.patientName,
    country: s.country,
    treatment: s.treatment,
    summary: s.summary,
    href: "/patient-stories",
  }));

  const fromTestimonials = fromJson.map((t) => ({
    key: t.slug,
    name: t.patientName,
    country: t.country,
    treatment: t.treatment,
    summary: t.summary,
    href: `/patient-stories/${t.countrySlug}`,
  }));

  const seen = new Set<string>();
  return [...fromStories, ...fromTestimonials]
    .filter((item) => {
      if (seen.has(item.key)) return false;
      seen.add(item.key);
      return true;
    })
    .slice(0, 4);
}

export default function WesternMarketsCampaignPage() {
  const featuredTreatments = WESTERN_FEATURED_TREATMENT_SLUGS.map((slug) =>
    getTreatmentBySlug(slug)
  ).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const proof = westernProofItems();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: pageTitle,
            description: pageDescription,
            url: pagePath,
          }),
          faqSchema(westernFaqs),
        ]}
      />

      <Breadcrumb
        items={[
          { name: "Countries", href: "/countries" },
          { name: "USA · UK · Canada · Australia", href: pagePath },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <p className="data-label">{SITE.name}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              Accreditation-first care for US, UK, Canada &amp; Australia patients
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Planned specialty treatment in JCI and NABH partner hospitals — clear packages,
              remote case review before you fly, and records ready for your home clinician.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-second-opinion" className="btn btn-primary w-full sm:w-auto">
                Free second opinion
              </Link>
              <Link href="/cost-calculator" className="btn btn-outline w-full sm:w-auto">
                Compare costs
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <AnswerBlock label="Quick answer">
              Patients from the United States, United Kingdom, Canada, and Australia travel to
              India for accredited specialty care when waits are long or self-pay quotes at home are
              high. Medical Tours India coordinates hospital matching, written USD estimates, visas,
              and discharge documentation — quality and continuity first, savings as the result.
            </AnswerBlock>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <PatientEnquiryForm
            audience="western"
            sourcePage={pagePath}
            label="Western patient enquiry"
            title="Request a written second opinion"
            submitLabel="Send for case review"
            description="Email-first review for US, UK, Canada, and Australia patients. Share reports and we reply within 24–48 hours with hospital options and a package estimate."
            messagePlaceholder="Diagnosis, reports available, wait-list or insurance context, and what you need help with."
          />
        </Reveal>
      </div>

      <section className="mt-16" aria-labelledby="why-western-heading">
        <Reveal>
          <p className="data-label">Why Western patients travel</p>
          <h2
            id="why-western-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
          >
            Different countries. One quality bar.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {marketMatrix.map((row, index) => (
            <Reveal
              key={row.market}
              delay={index * 50}
              className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <p className="text-sm font-semibold text-accent">{row.market}</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">{row.driver}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{row.focus}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="hubs-heading">
        <Reveal>
          <p className="data-label">Country guides</p>
          <h2
            id="hubs-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
          >
            Dedicated hubs for each market
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WESTERN_COUNTRY_HUBS.map((hub, index) => (
            <Reveal key={hub.shortSlug} delay={index * 40}>
              <Link
                href={hub.href}
                className="flex h-full flex-col rounded-[var(--radius-sm)] border border-line bg-white px-4 py-4 shadow-[var(--shadow-soft)] transition hover:border-accent hover:bg-accent-light"
              >
                <span className="text-sm font-semibold text-navy">{hub.name}</span>
                <span className="mt-1 text-xs text-muted">{hub.angle}</span>
                <span className="mt-3 text-sm font-semibold text-accent">
                  {hub.demonym} guide →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="process-heading">
        <Reveal>
          <p className="data-label">How remote review works</p>
          <h2
            id="process-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
          >
            Decide with a written plan — then book travel
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviewSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70} className="relative pt-2">
              <span className="font-display text-5xl font-medium text-accent/25">
                {index + 1}
              </span>
              <h3 className="-mt-2 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="trust-heading">
        <Reveal>
          <p className="data-label">Trust</p>
          <h2
            id="trust-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
          >
            Accreditation and process over cheap quotes
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            We lead with JCI and NABH partners, named stay length, implant and ICU inclusions, and
            documentation for continuity of care.{" "}
            <Link href="/accreditations-certifications" className="font-semibold text-accent">
              See how we explain accreditations →
            </Link>
          </p>
        </Reveal>
        <div className="mt-8">
          <NetworkStats />
        </div>
      </section>

      {featuredTreatments.length > 0 && (
        <section className="mt-16" aria-labelledby="procedures-heading">
          <Reveal>
            <p className="data-label">Procedures Western patients request</p>
            <h2
              id="procedures-heading"
              className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
            >
              Flagship pathways with transparent USD ranges
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTreatments.map((t, index) => (
              <Reveal key={t.slug} delay={index * 40}>
                <Link
                  href={`/cost/${t.slug}`}
                  className="block rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3.5 shadow-[var(--shadow-soft)] transition hover:border-accent hover:bg-accent-light"
                >
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    ${t.costMinUsd.toLocaleString()}–${t.costMaxUsd.toLocaleString()} USD
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4">
            <Link href="/treatments" className="text-sm font-semibold text-accent hover:text-navy">
              Browse all treatments →
            </Link>
          </Reveal>
        </section>
      )}

      {proof.length > 0 && (
        <section className="mt-16" aria-labelledby="proof-heading">
          <Reveal>
            <p className="data-label">Patient proof</p>
            <h2
              id="proof-heading"
              className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy"
            >
              Outcomes shared by Western families
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {proof.map((item) => (
              <article key={item.key} className="quote-card">
                <p className="quote-mark">&ldquo;</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{item.summary}</p>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-semibold text-navy">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.country} · {item.treatment}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-3 inline-block text-sm font-semibold text-accent"
                  >
                    More patient stories →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <FAQAccordion
          faqs={westernFaqs}
          title="FAQs for US, UK, Canada & Australia patients"
          includeSchema={false}
        />
      </div>

      <div className="mt-12">
        <CTASection
          audience="western"
          title="Ready for a written hospital shortlist?"
          description="Share reports for a free second opinion. Most Western families receive options and a USD package estimate within 24–48 hours — then decide whether travel makes sense."
        />
      </div>
    </Container>
  );
}
