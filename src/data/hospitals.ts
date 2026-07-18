import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { Hospital, HospitalSummary } from "@/lib/types";

const DEFAULT_FACILITIES = [
  "ICU & critical care",
  "Advanced imaging (CT / MRI)",
  "International patient lounge",
  "Pharmacy & diagnostics on campus",
];

const DEFAULT_IP_SERVICES = [
  "Airport pickup coordination",
  "Admission & discharge support",
  "Interpreter on request",
  "Written package estimates",
  "Post-treatment follow-up coordination",
];

type HospitalFrontmatter = {
  name: string;
  city: string;
  citySlug: string;
  accreditation?: string[];
  specialties?: string[];
  rating: number;
  reviewCount: number;
  shortAnswer: string;
  internationalPatients?: boolean;
  mouYear?: number;
  facilities?: string[];
  internationalServices?: string[];
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<HospitalFrontmatter>>>
): Hospital {
  return {
    slug: doc.slug,
    name: doc.name,
    city: doc.city,
    citySlug: doc.citySlug,
    accreditation: doc.accreditation ?? [],
    specialties: doc.specialties ?? [],
    rating: Number(doc.rating),
    reviewCount: Number(doc.reviewCount),
    shortAnswer: doc.shortAnswer,
    internationalPatients: doc.internationalPatients ?? true,
    mouYear: Number(doc.mouYear ?? 2019),
    facilities: doc.facilities?.length ? doc.facilities : DEFAULT_FACILITIES,
    internationalServices: doc.internationalServices?.length
      ? doc.internationalServices
      : DEFAULT_IP_SERVICES,
    content: doc.content,
  };
}

export function getAllHospitals(): Hospital[] {
  return getAllMdx<HospitalFrontmatter>("hospitals").map(normalize);
}

export function getHospitalBySlug(slug: string): Hospital | undefined {
  const doc = getMdxBySlug<HospitalFrontmatter>("hospitals", slug);
  return doc ? normalize(doc) : undefined;
}

export function getHospitalsByCity(citySlug: string): Hospital[] {
  return getAllHospitals().filter((h) => h.citySlug === citySlug);
}

export function getHospitalsBySpecialty(specialty: string): Hospital[] {
  const needle = specialty.toLowerCase();
  return getAllHospitals().filter((h) =>
    h.specialties.some((s) => s.toLowerCase().includes(needle))
  );
}

export function getAllHospitalSlugs(): string[] {
  return getMdxSlugs("hospitals");
}

export function getHospitalSummaries(): HospitalSummary[] {
  return getAllHospitals().map(
    ({
      slug,
      name,
      city,
      citySlug,
      accreditation,
      specialties,
      rating,
      reviewCount,
      internationalPatients,
      mouYear,
    }) => ({
      slug,
      name,
      city,
      citySlug,
      accreditation,
      specialties,
      rating,
      reviewCount,
      internationalPatients,
      mouYear,
    })
  );
}

/** Map treatment category → hospital specialty filter keywords */
export function specialtyKeywordsForCategory(category: string): string[] {
  const map: Record<string, string[]> = {
    Cardiology: ["Cardiology"],
    Orthopedics: ["Orthopedics"],
    Transplant: ["Transplant"],
    Oncology: ["Oncology"],
    Fertility: ["Fertility"],
    Cosmetic: ["Cosmetic", "Plastic"],
    Bariatric: ["Bariatric", "Orthopedics", "Cardiology"],
    Dental: ["Dental"],
    Neurosurgery: ["Neurosurgery", "Oncology"],
    ENT: ["ENT"],
    Ophthalmology: ["Ophthalmology", "Eye"],
  };
  return map[category] ?? [category];
}
