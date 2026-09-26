import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfidentialClinicalTemplate } from "@/components/ConfidentialClinicalTemplate";
import { MtpTreatmentTemplate } from "@/components/MtpTreatmentTemplate";
import { ProcedureTemplate } from "@/components/ProcedureTemplate";
import {
  getAllProcedures,
  getCategoryBySlug,
  getProcedureBySlug,
  isConfidentialClinicalProcedure,
  procedurePath,
} from "@/lib/data";
import { procedureMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ category: string; procedure: string }>;
};

export function generateStaticParams() {
  return getAllProcedures().map((p) => ({
    category: p.categorySlug,
    procedure: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, procedure: procedureSlug } = await params;
  const procedure = getProcedureBySlug(procedureSlug);
  if (!procedure || procedure.categorySlug !== category) return {};
  const categoryName = getCategoryBySlug(procedure.categorySlug)?.name ?? "";
  const geo = procedure.geoCities ?? [
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
  ];

  if (isConfidentialClinicalProcedure(procedure)) {
    const sensitiveKeywords =
      procedure.slug === "mtp-treatment-india"
        ? [
            "medical termination of pregnancy india",
            "mtp treatment india",
            "safe mtp india for international patients",
            ...geo.map((city) => `mtp ${city.toLowerCase()}`),
          ]
        : geo.map((city) => `${procedure.name.toLowerCase()} ${city.toLowerCase()}`);

    return procedureMetadata({
      metaTitle: procedure.metaTitle,
      metaDescription: procedure.metaDescription,
      path: procedurePath(procedure),
      keywords: [
        ...(procedure.keywords ?? []),
        procedure.name.toLowerCase(),
        categoryName.toLowerCase(),
        ...sensitiveKeywords,
      ].filter(Boolean),
    });
  }

  return procedureMetadata({
    metaTitle: procedure.metaTitle,
    metaDescription: procedure.metaDescription,
    path: procedurePath(procedure),
    keywords: [
      ...(procedure.keywords ?? []),
      procedure.name.toLowerCase(),
      `${procedure.name.toLowerCase()} cost india`,
      `${procedure.name.toLowerCase()} for foreigners`,
      `${procedure.name.toLowerCase()} medical tourism india`,
      categoryName.toLowerCase(),
      ...geo.map((city) => `${procedure.name.toLowerCase()} ${city.toLowerCase()}`),
    ].filter(Boolean),
  });
}

export default async function ProcedurePage({ params }: Props) {
  const { category, procedure: procedureSlug } = await params;
  const procedure = getProcedureBySlug(procedureSlug);
  if (!procedure || procedure.categorySlug !== category) notFound();

  if (procedure.slug === "mtp-treatment-india") {
    return <MtpTreatmentTemplate procedure={procedure} />;
  }

  if (isConfidentialClinicalProcedure(procedure)) {
    return (
      <ConfidentialClinicalTemplate
        procedure={procedure}
        defaultTreatment="Women's health (confidential)"
      />
    );
  }

  return <ProcedureTemplate procedure={procedure} />;
}
