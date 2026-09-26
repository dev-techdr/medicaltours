import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { Doctor } from "@/lib/types";

type DoctorFrontmatter = {
  name: string;
  specialty: string;
  primaryKeyword: string;
  hospitalSlug: string;
  city: string;
  experienceYears: number;
  shortAnswer: string;
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<DoctorFrontmatter>>>
): Doctor {
  return {
    slug: doc.slug,
    name: doc.name,
    specialty: doc.specialty,
    primaryKeyword: doc.primaryKeyword,
    hospitalSlug: doc.hospitalSlug,
    city: doc.city,
    experienceYears: Number(doc.experienceYears),
    shortAnswer: doc.shortAnswer,
    content: doc.content,
  };
}

export function getAllDoctors(): Doctor[] {
  return getAllMdx<DoctorFrontmatter>("doctors").map(normalize);
}

export function getDoctorBySlug(slug: string): Doctor | undefined {
  const doc = getMdxBySlug<DoctorFrontmatter>("doctors", slug);
  return doc ? normalize(doc) : undefined;
}

export function getAllDoctorSlugs(): string[] {
  return getMdxSlugs("doctors");
}

export function getDoctorsByHospital(hospitalSlug: string): Doctor[] {
  return getAllDoctors().filter((d) => d.hospitalSlug === hospitalSlug);
}

export function getDoctorsBySpecialtyKeywords(keywords: string[]): Doctor[] {
  const needles = keywords.map((k) => k.toLowerCase());
  return getAllDoctors().filter((d) =>
    needles.some((n) => d.specialty.toLowerCase().includes(n))
  );
}
