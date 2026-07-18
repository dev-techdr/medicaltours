import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProcedureTemplate } from "@/components/ProcedureTemplate";
import {
  getAllProcedures,
  getCategoryBySlug,
  getProcedureBySlug,
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
  return <ProcedureTemplate procedure={procedure} />;
}
