import type { Metadata } from "next";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CostCalculator } from "@/components/CostCalculator";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medical Tourism India Cost Calculator",
  description:
    "Estimate medical treatment costs in India. Select a treatment and request an exact WhatsApp quote from Techdr Medical Tourism.",
  path: "/cost-calculator",
  keywords: [
    "medical tourism india cost breakdown",
    "india medical treatment cost vs usa",
    "affordable healthcare india for international patients",
  ],
});

export default function CostCalculatorPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Cost Calculator", href: "/cost-calculator" }]} />
      <Reveal>
        <p className="data-label">Cost planning</p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-navy">
          Medical Tourism India Cost Calculator
        </h1>
        <div className="mt-6">
          <AnswerBlock>
            Choose a treatment to see an indicative India package range, then request an exact quote
            on WhatsApp for your case. Final figures always follow medical review at a partner
            hospital.
          </AnswerBlock>
        </div>
      </Reveal>
      <Reveal className="mt-10">
        <CostCalculator />
      </Reveal>
      <Reveal className="mt-14">
        <CTASection title="Prefer to talk through options first?" compact />
      </Reveal>
    </Container>
  );
}
