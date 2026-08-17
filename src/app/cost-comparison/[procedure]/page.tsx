import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CostComparisonTable } from "@/components/CostComparisonTable";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCostComparableProcedures,
  getProcedureBySlug,
  isConfidentialClinicalProcedure,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ procedure: string }> };

export function generateStaticParams() {
  return getCostComparableProcedures().map((p) => ({ procedure: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (
    !procedure ||
    isConfidentialClinicalProcedure(procedure) ||
    !procedure.costIndia
  ) {
    return {};
  }
  return buildMetadata({
    title: `${procedure.name} Cost: India vs USA, UK, Canada & Australia`,
    description: `Compare ${procedure.name.toLowerCase()} costs in India versus the USA, UK, and UAE — with planning notes for Canada (CAD) and Australia (AUD). Typical India range $${procedure.costIndia.min.toLocaleString()}–$${procedure.costIndia.max.toLocaleString()} USD.`,
    path: `/cost-comparison/${procedure.slug}`,
    keywords: [
      ...(procedure.keywords ?? []),
      `${procedure.name.toLowerCase()} cost india vs usa`,
      `${procedure.name.toLowerCase()} cost india vs uk`,
      `${procedure.name.toLowerCase()} cost india vs canada`,
      `${procedure.name.toLowerCase()} cost india vs australia`,
      `${procedure.name.toLowerCase()} price comparison`,
      `${procedure.name.toLowerCase()} cost india for foreigners`,
    ],
  });
}

export default async function CostComparisonPage({ params }: Props) {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (
    !procedure ||
    isConfidentialClinicalProcedure(procedure) ||
    !procedure.costIndia ||
    !procedure.costComparison?.length
  ) {
    notFound();
  }

  const path = `/cost-comparison/${procedure.slug}`;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={webPageSchema({
          name: `${procedure.name} cost: India vs USA, UK & UAE`,
          description: `Compare ${procedure.name.toLowerCase()} package costs in India with typical USA, UK, and UAE prices for international patients.`,
          url: path,
        })}
      />
      <Breadcrumb
        items={[
          { name: "Cost comparison", href: "/cost-comparison/" + procedure.slug },
          { name: procedure.name, href: path },
        ]}
      />

      <Reveal>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {procedure.name}: India vs USA, UK &amp; UAE
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">
          {procedure.overview}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          Packages are quoted in USD for international patients. Families from Canada and Australia
          typically convert the mid-range for CAD or AUD budgeting; UK patients often compare
          against private GBP quotes and NHS wait timelines.{" "}
          <Link href="/for-usa-uk-canada-australia" className="font-semibold text-accent hover:underline">
            Western markets guide
          </Link>
          {" · "}
          <Link href="/free-second-opinion" className="font-semibold text-accent hover:underline">
            Free second opinion
          </Link>
        </p>
        <p className="mt-3">
          <Link
            href={procedurePath(procedure)}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Full {procedure.name} treatment guide →
          </Link>
        </p>
      </Reveal>

      <div className="mt-10">
        <CostComparisonTable
          india={procedure.costIndia}
          comparisons={procedure.costComparison}
          procedureName={procedure.name}
        />
      </div>

      <div className="mt-14">
        <CTASection
          audience="western"
          title={`Get a written ${procedure.name} estimate`}
          description="Share reports for a free second opinion. Most Western families receive hospital options and a USD package range within 24–48 hours."
        />
      </div>
    </Container>
  );
}
