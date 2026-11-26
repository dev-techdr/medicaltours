import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import {
  defaultFacilityGroups,
  defaultLandmarks,
} from "@/lib/hospital-profile";
import type {
  Hospital,
  HospitalFacilityGroup,
  HospitalLocationLandmark,
  HospitalSummary,
} from "@/lib/types";

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
  establishedYear?: number;
  beds?: number;
  specialtyType?: string;
  address?: string;
  pincode?: string;
  infrastructure?: string;
  teamNote?: string;
  locationLandmarks?: HospitalLocationLandmark[];
  facilityGroups?: HospitalFacilityGroup[];
};

function defaultInfrastructure(name: string, city: string) {
  return `${name} is equipped for tertiary and planned surgical care, with ICU capacity, diagnostics on campus, and an international patient pathway coordinated by TechdrHealth. Dedicated reception, waiting, and family areas help patients from overseas move through admission, treatment, and discharge in ${city} without logistical guesswork.`;
}

function defaultTeamNote(name: string, specialties: string[]) {
  const focus = specialties.slice(0, 4).join(", ");
  return `${name} works with a multidisciplinary clinical team — physicians, specialists, and nursing staff — covering ${focus}${specialties.length > 4 ? ", and related specialties" : ""}. TechdrHealth stays with you from first report review through discharge and follow-up.`;
}

function byHospitalName<T extends { name: string }>(a: T, b: T) {
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<HospitalFrontmatter>>>
): Hospital {
  const facilities = doc.facilities?.length ? doc.facilities : DEFAULT_FACILITIES;
  const internationalServices = doc.internationalServices?.length
    ? doc.internationalServices
    : DEFAULT_IP_SERVICES;
  const specialties = doc.specialties ?? [];

  return {
    slug: doc.slug,
    name: doc.name,
    city: doc.city,
    citySlug: doc.citySlug,
    accreditation: doc.accreditation ?? [],
    specialties,
    rating: Number(doc.rating),
    reviewCount: Number(doc.reviewCount),
    shortAnswer: doc.shortAnswer,
    internationalPatients: doc.internationalPatients ?? true,
    mouYear: Number(doc.mouYear ?? 2019),
    facilities,
    internationalServices,
    content: doc.content,
    establishedYear: Number(doc.establishedYear ?? doc.mouYear ?? 2010),
    beds: Number(doc.beds ?? 200),
    specialtyType: doc.specialtyType ?? "Multi Specialty",
    address: doc.address ?? `${doc.city}, India`,
    pincode: doc.pincode,
    infrastructure: doc.infrastructure ?? defaultInfrastructure(doc.name, doc.city),
    teamNote: doc.teamNote ?? defaultTeamNote(doc.name, specialties),
    locationLandmarks: doc.locationLandmarks?.length
      ? doc.locationLandmarks
      : defaultLandmarks(doc.citySlug),
    facilityGroups: doc.facilityGroups?.length
      ? doc.facilityGroups
      : defaultFacilityGroups(facilities, internationalServices),
  };
}

export function getAllHospitals(): Hospital[] {
  return getAllMdx<HospitalFrontmatter>("hospitals").map(normalize).sort(byHospitalName);
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
      establishedYear,
      beds,
      specialtyType,
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
      establishedYear,
      beds,
      specialtyType,
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
