import type { Metadata } from "next";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGlobalFaqs, getVisaFaqs } from "@/data/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Medical Tourism India",
  description:
    "Answers to common questions about medical tourism in India: safety, costs, visas, hospitals, and how Medical Tours India works.",
  path: "/faq",
  keywords: [
    "is medical tourism in india safe",
    "how to book medical treatment in india from abroad",
    "medical visa india documents required",
  ],
});

export default function FAQPage() {
  const globalFaqs = getGlobalFaqs();
  const visaFaqs = getVisaFaqs();
  const allFaqs = [...globalFaqs, ...visaFaqs];

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={faqSchema(allFaqs)} />
      <Breadcrumb items={[{ name: "FAQ", href: "/faq" }]} />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
        Frequently Asked Questions
      </h1>
      <div className="mt-6">
        <AnswerBlock>
          This FAQ covers the questions international patients ask most about medical tourism in
          India — safety, costs, medical visas, hospital selection, and how TechdrHealth coordinates your
          full treatment journey.
        </AnswerBlock>
      </div>
      <div className="mt-10 space-y-12">
        <FAQAccordion faqs={globalFaqs} title="General Medical Tourism Questions" includeSchema={false} />
        <FAQAccordion faqs={visaFaqs} title="Medical Visa Questions" includeSchema={false} />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
