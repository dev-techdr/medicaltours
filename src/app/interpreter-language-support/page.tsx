import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MdxContent } from "@/components/MdxContent";
import { getContentPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

const page = getContentPage("interpreter-language-support");

export const metadata: Metadata = buildMetadata({
  title: page?.title ?? "Interpreter & Language Support for International Patients",
  description:
    page?.description ??
    "Interpreter services for international patients in India — Arabic, French, and other languages.",
  path: "/interpreter-language-support",
  keywords: ["interpreter services for international patients india"],
});

export default function InterpreterPage() {
  if (!page) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[
          { name: "Interpreter & Language Support", href: "/interpreter-language-support" },
        ]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">{page.title}</h1>
      <div className="mt-6">
        <AnswerBlock>
          TechdrHealth provides interpreter services for international patients in India so you can
          communicate clearly with doctors and nurses. Arabic, French, and other languages are
          available at partner hospitals depending on your needs.
        </AnswerBlock>
      </div>
      <div className="mt-10">
        <MdxContent source={page.content} />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
