import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseFileCard } from "@/components/CaseFileCard";
import { Container } from "@/components/Container";
import { CostHighlight } from "@/components/CostHighlight";
import { CTASection } from "@/components/CTASection";
import { calculateCostEstimate } from "@/data/costs";
import { getAllTreatmentSlugs, getTreatmentBySlug } from "@/data/treatments";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ "treatment-slug": string }> };

export async function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ "treatment-slug": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "treatment-slug": slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};
  return buildMetadata({
    title: `${treatment.name} Cost in India for Foreigners`,
    description: `How much does ${treatment.name.toLowerCase()} cost in India? Typical range $${treatment.costMinUsd.toLocaleString()}–$${treatment.costMaxUsd.toLocaleString()} USD vs US prices.`,
    path: `/cost/${treatment.slug}`,
    keywords: [
      `${treatment.name.toLowerCase()} cost in india`,
      `how much does ${treatment.name.toLowerCase()} cost in india`,
    ],
  });
}

export default async function CostPage({ params }: Props) {
  const { "treatment-slug": slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const estimate = calculateCostEstimate(treatment.slug);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[
          { name: "Cost Calculator", href: "/cost-calculator" },
          { name: treatment.name, href: `/cost/${treatment.slug}` },
        ]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
        {treatment.name} Cost in India
      </h1>
      <div className="mt-6">
        <AnswerBlock>
          {treatment.name} in India typically costs{" "}
          <CostHighlight>
            ${treatment.costMinUsd.toLocaleString()}–${treatment.costMaxUsd.toLocaleString()} USD
          </CostHighlight>{" "}
          for international patients, compared with{" "}
          <CostHighlight>
            ${treatment.costUsaMinUsd.toLocaleString()}–${treatment.costUsaMaxUsd.toLocaleString()}
          </CostHighlight>{" "}
          in the United States — often saving 50–80% even after travel.
        </AnswerBlock>
      </div>

      {estimate && (
        <div className="mt-10 max-w-xl">
          <CaseFileCard
            label="Package breakdown"
            referenceId={`COST-${treatment.slug.slice(0, 8).toUpperCase()}`}
            rows={[
              {
                label: "Treatment package",
                value: `$${estimate.treatmentMin.toLocaleString()}–$${estimate.treatmentMax.toLocaleString()}`,
              },
              {
                label: `Hotel (${estimate.hotelNights} nights)`,
                value: `$${estimate.hotelTotal.toLocaleString()}`,
              },
              {
                label: "Visa + transfers + interpreter",
                value: `$${(
                  estimate.visaFee +
                  estimate.airportTransfer +
                  estimate.interpreterTotal
                ).toLocaleString()}`,
              },
              {
                label: "Estimated total",
                value: `$${estimate.totalMin.toLocaleString()}–$${estimate.totalMax.toLocaleString()}`,
                accent: true,
              },
            ]}
          >
            <p className="mt-4 text-sm text-muted">
              Approximate savings vs US:{" "}
              <CostHighlight>{estimate.savingsPercent}%</CostHighlight>. Flights not included.{" "}
              <Link href="/cost-calculator" className="font-medium text-accent">
                Customize this estimate
              </Link>
              .
            </p>
          </CaseFileCard>
        </div>
      )}

      <p className="mt-8 max-w-3xl text-ink leading-relaxed">
        Learn more about the procedure on our{" "}
        <Link href={`/treatments/${treatment.slug}`} className="font-medium text-accent">
          {treatment.name} treatment page
        </Link>
        .
      </p>

      <div className="mt-12">
        <CTASection title={`Get an exact ${treatment.name.toLowerCase()} quote`} />
      </div>
    </Container>
  );
}
