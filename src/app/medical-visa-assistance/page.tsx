import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MdxContent } from "@/components/MdxContent";
import { getVisaFaqs } from "@/data/faqs";
import { getContentPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

const page = getContentPage("medical-visa-assistance");

export const metadata: Metadata = buildMetadata({
  title: page?.title ?? "Medical Visa India Assistance",
  description:
    page?.description ??
    "Medical visa India application help: documents required, attendant visas, and hospital invitation letters.",
  path: "/medical-visa-assistance",
  keywords: [
    "medical visa india application process",
    "how to get medical visa for india",
    "medical visa india documents required",
    "medical attendant visa india",
  ],
});

export default function MedicalVisaPage() {
  if (!page) notFound();
  const visaFaqs = getVisaFaqs();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Medical Visa Assistance", href: "/medical-visa-assistance" }]} />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">{page.title}</h1>
      <div className="mt-6">
        <AnswerBlock>
          Medical Tours India helps international patients obtain medical visas for India by
          arranging hospital invitation letters, document checklists, and guidance for attendant
          visas — so applications are complete and processing is as fast as possible.
        </AnswerBlock>
      </div>

      <div className="mt-10">
        <MdxContent source={page.content} />
      </div>

      <div className="mt-12">
        <FAQAccordion faqs={visaFaqs} />
      </div>
      <div className="mt-12">
        <CTASection title="Need a hospital invitation letter?" />
      </div>
    </Container>
  );
}
