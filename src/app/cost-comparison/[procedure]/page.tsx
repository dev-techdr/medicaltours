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
  getAllProcedures,
  getProcedureBySlug,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { medicalProcedureSchema } from "@/lib/schema";

type Props = { params: Promise<{ procedure: string }> };

export function generateStaticParams() {
  return getAllProcedures().map((p) => ({ procedure: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) return {};
  return buildMetadata({
    title: `${procedure.name} Cost: India vs USA, UK & UAE`,
    description: `Compare ${procedure.name.toLowerCase()} costs in India versus the USA, UK, and UAE. Typical India range $${procedure.costIndia.min.toLocaleString()}–$${procedure.costIndia.max.toLocaleString()} USD.`,
    path: `/cost-comparison/${procedure.slug}`,
    keywords: [
      ...(procedure.keywords ?? []),
      `${procedure.name.toLowerCase()} cost india vs usa`,
      `${procedure.name.toLowerCase()} price comparison`,
      `${procedure.name.toLowerCase()} cost india for foreigners`,
    ],
  });
}

export default async function CostComparisonPage({ params }: Props) {
  const { procedure: slug } = await params;
  const procedure = getProcedureBySlug(slug);
  if (!procedure) notFound();

  const path = `/cost-comparison/${procedure.slug}`;

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={medicalProcedureSchema({
          name: procedure.name,
          description: procedure.overview,
          url: path,
          costMin: procedure.costIndia.min,
          costMax: procedure.costIndia.max,
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
          {procedure.name}: India vs USA, UK & UAE
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">
          {procedure.overview}
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
        <CTASection title={`Get a written ${procedure.name} estimate`} />
      </div>
    </Container>
  );
}
