import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MdxContent } from "@/components/MdxContent";
import { getContentPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

const page = getContentPage("why-india-for-medical-treatment");

export const metadata: Metadata = buildMetadata({
  title: page?.title ?? "Why India for Medical Treatment",
  description:
    page?.description ??
    "Why international patients choose India for medical treatment: cost savings, accredited hospitals, and specialist expertise.",
  path: "/why-india-for-medical-treatment",
  keywords: [
    "why is medical treatment cheaper in india",
    "india medical treatment cost vs usa",
    "is medical tourism in india safe",
  ],
});

const faqs = [
  {
    question: "Why is medical treatment cheaper in India?",
    answer:
      "Lower operating costs, high procedure volumes, and competitive specialist fees allow accredited hospitals to deliver the same clinical standards at a fraction of US or UK prices.",
  },
  {
    question: "Is India safe for medical tourism?",
    answer:
      "Yes, when you choose JCI/NABH accredited hospitals and a reliable facilitator. India treats hundreds of thousands of international patients annually with strong outcomes in cardiac, orthopedic, oncology, and transplant care.",
  },
  {
    question: "How does India compare to Thailand or Singapore for medical tourism?",
    answer:
      "India often offers lower prices than Singapore and comparable or better specialist depth for complex procedures like transplants and cardiac surgery. Thailand is strong for cosmetic and wellness; India leads for high-acuity tertiary care value.",
  },
];

export default function WhyIndiaPage() {
  if (!page) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[{ name: "Why India for Medical Treatment", href: "/why-india-for-medical-treatment" }]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">{page.title}</h1>
      <div className="mt-6">
        <AnswerBlock>
          International patients choose India for medical treatment because accredited hospitals
          deliver specialist care at 50–80% lower cost than the US or UK, with shorter wait times,
          English-speaking doctors, and mature international patient services across major cities.
        </AnswerBlock>
      </div>

      <div className="mt-10">
        <MdxContent source={page.content} />
      </div>

      <p className="mt-10 max-w-3xl text-ink leading-relaxed">
        Compare treatment costs with our{" "}
        <Link href="/cost-calculator" className="font-semibold text-accent">
          cost calculator
        </Link>{" "}
        or explore{" "}
        <Link href="/hospital-network" className="font-semibold text-accent">
          partner hospitals
        </Link>
        .
      </p>

      <div className="mt-12">
        <FAQAccordion faqs={faqs} />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
