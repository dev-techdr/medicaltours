import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { DepthSections } from "@/components/DepthSections";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCategoryBySlug,
  getFaqsForProcedure,
  getProcedureDepth,
  getRelatedProcedures,
  procedurePath,
  type Procedure,
} from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type ConfidentialClinicalTemplateProps = {
  procedure: Procedure;
  /** Soft treatment dropdown default for the private form */
  defaultTreatment?: string;
};

/**
 * Sensitive women's-health pages (cosmetic gynecology, vaginal rejuvenation, etc.):
 * clinical depth, no cost-led UI, private form/email CTA, disclaimer.
 */
export function ConfidentialClinicalTemplate({
  procedure,
  defaultTreatment = "Women's health (confidential)",
}: ConfidentialClinicalTemplateProps) {
  const category = getCategoryBySlug(procedure.categorySlug);
  const path = procedurePath(procedure);
  const faqs = getFaqsForProcedure(procedure.faqSlugKey);
  const related = getRelatedProcedures(procedure);
  const depthSections = getProcedureDepth(procedure.slug);

  const crumbs = [
    { name: "Treatments", href: "/treatments" },
    ...(category
      ? [{ name: category.name, href: `/treatments/${category.slug}` }]
      : []),
    { name: procedure.name, href: path },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}

      <Breadcrumb items={crumbs} />

      <Reveal>
        <p className="data-label">Women&apos;s health · Confidential care</p>
        <h1 className="mt-3 max-w-4xl font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
          {procedure.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {procedure.shortAnswer ?? procedure.overview}
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          {procedure.shortAnswer ?? procedure.overview} Care is coordinated discreetly with partner
          specialists; clinical suitability is confirmed after consultation — not by online price
          comparison.
        </AnswerBlock>
      </Reveal>

      <section className="mt-12 max-w-3xl">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">{procedure.overview}</p>
        </Reveal>
      </section>

      {depthSections.length > 0 ? (
        <div className="mt-14">
          <DepthSections sections={depthSections} />
        </div>
      ) : null}

      <section className="mt-14 max-w-3xl" aria-labelledby="journey-heading">
        <Reveal>
          <h2
            id="journey-heading"
            className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
          >
            Patient journey
          </h2>
          <p className="mt-2 text-sm text-muted">
            <span className="font-semibold text-navy">Typical recovery:</span> {procedure.recoveryTime}
          </p>
          <ol className="mt-6 space-y-4">
            {procedure.procedureSteps.map((step, index) => (
              <li
                key={step}
                className="grid gap-3 rounded-[var(--radius)] border border-line bg-white p-5 sm:grid-cols-[auto_1fr]"
              >
                <span className="font-display text-3xl font-medium text-accent/30">{index + 1}</span>
                <p className="text-base leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {faqs.length > 0 ? (
        <section className="mt-14 max-w-3xl" aria-labelledby="faq-heading">
          <Reveal>
            <h2
              id="faq-heading"
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FAQAccordion faqs={faqs} />
            </div>
          </Reveal>
        </section>
      ) : null}

      <section id="confidential-contact" className="mt-14 scroll-mt-28">
        <Reveal>
          <PatientEnquiryForm
            sourcePage={path}
            confidentialMode
            label="Private enquiry"
            title="Speak confidentially with our patient care team"
            description="Use this private form or email. We respond discreetly — usually within 24–48 hours."
            submitLabel="Send confidential enquiry"
            messagePlaceholder="Share your goals, prior consultations if any, and questions for the care team. You can keep the message high-level if you prefer."
            defaultTreatment={defaultTreatment as never}
          />
          <p className="mt-4 text-sm text-muted">
            Prefer email?{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
              {SITE.email}
            </a>
          </p>
        </Reveal>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight text-navy">
              Related care
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={procedurePath(item)}
                    className="block rounded-[var(--radius)] border border-line bg-white p-4 text-sm font-semibold text-navy hover:border-accent"
                  >
                    {item.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <aside className="mt-14 max-w-3xl rounded-[var(--radius)] border border-line bg-white px-5 py-5 text-sm leading-relaxed text-muted sm:px-6">
        <p className="font-semibold text-navy">Legal &amp; medical disclaimer</p>
        <p className="mt-2">
          This page is general information only — not medical advice and not a substitute for
          in-person specialist consultation. TechdrHealth coordinates care with partner hospitals and
          does not itself perform procedures. Suitability, risks, and expected results must be
          confirmed by the treating clinician after examination.
        </p>
      </aside>
    </Container>
  );
}
