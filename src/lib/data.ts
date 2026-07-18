import categoriesData from "../../content/categories.json";
import proceduresData from "../../content/procedures.json";
import hospitalsData from "../../content/hospitals.json";
import doctorsData from "../../content/doctors.json";
import countriesData from "../../content/countries.json";
import faqsData from "../../content/faqs.json";
import testimonialsData from "../../content/testimonials.json";

export type CostRange = {
  min: number;
  max: number;
  currency: "USD";
};

export type CostComparisonRow = {
  country: string;
  min: number;
  max: number;
};

export type ProcedureImage = {
  src: string;
  alt: string;
};

export type Procedure = {
  slug: string;
  categorySlug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  overview: string;
  /** AEO: 40–60 word answer-first snippet for featured snippets / AI answers */
  shortAnswer?: string;
  /** GEO: cities commonly associated with this treatment in India */
  geoCities?: string[];
  costIndia: CostRange;
  costComparison: CostComparisonRow[];
  recoveryTime: string;
  procedureSteps: string[];
  hospitalSlugs: string[];
  doctorSlugs: string[];
  faqSlugKey: string;
  relatedProcedures: string[];
  images: ProcedureImage[];
  /** SEO keywords for generateMetadata (primary + long-tail) */
  keywords?: string[];
  testimonialSlug?: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  procedureSlugs: string[];
};

export type ContentHospital = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  accreditation: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  shortAnswer: string;
  image: string;
};

export type ContentDoctor = {
  slug: string;
  name: string;
  specialty: string;
  specialtySlug: string;
  hospitalSlug: string;
  city: string;
  experienceYears: number;
  shortAnswer: string;
};

export type ContentCountry = {
  code: string;
  name: string;
  slug: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  slug: string;
  patientName: string;
  country: string;
  countrySlug: string;
  treatment: string;
  procedureSlug: string | null;
  hospital: string;
  summary: string;
  outcome: string;
  rating: number;
};

export type CityHub = {
  slug: string;
  name: string;
};

const categories = categoriesData as Category[];
const procedures = proceduresData as Procedure[];
const hospitals = hospitalsData as ContentHospital[];
const doctors = doctorsData as ContentDoctor[];
const countries = countriesData as ContentCountry[];
const faqs = faqsData as Record<string, FAQItem[]>;
const testimonials = testimonialsData as Testimonial[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllProcedures(): Procedure[] {
  return procedures;
}

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}

export function getProceduresByCategory(categorySlug: string): Procedure[] {
  return procedures.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProcedures(procedure: Procedure): Procedure[] {
  return procedure.relatedProcedures
    .map((slug) => getProcedureBySlug(slug))
    .filter((p): p is Procedure => Boolean(p));
}

export function getAllHospitals(): ContentHospital[] {
  return hospitals;
}

export function getHospitalBySlug(slug: string): ContentHospital | undefined {
  return hospitals.find((h) => h.slug === slug);
}

export function getHospitalsBySlugs(slugs: string[]): ContentHospital[] {
  return slugs
    .map((slug) => getHospitalBySlug(slug))
    .filter((h): h is ContentHospital => Boolean(h));
}

export function getHospitalsByCity(citySlug: string): ContentHospital[] {
  return hospitals.filter((h) => h.citySlug === citySlug);
}

export function getAllCityHubs(): CityHub[] {
  const map = new Map<string, string>();
  for (const h of hospitals) {
    if (!map.has(h.citySlug)) map.set(h.citySlug, h.city);
  }
  // Normalize Delhi/NCR display name
  if (map.has("delhi")) map.set("delhi", "Delhi NCR");
  return [...map.entries()].map(([slug, name]) => ({ slug, name }));
}

export function getCityHub(citySlug: string): CityHub | undefined {
  return getAllCityHubs().find((c) => c.slug === citySlug);
}

export function getAllDoctors(): ContentDoctor[] {
  return doctors;
}

export function getDoctorBySlug(slug: string): ContentDoctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function getDoctorsBySlugs(slugs: string[]): ContentDoctor[] {
  return slugs
    .map((slug) => getDoctorBySlug(slug))
    .filter((d): d is ContentDoctor => Boolean(d));
}

export function getDoctorsBySpecialty(specialtySlug: string): ContentDoctor[] {
  return doctors.filter((d) => d.specialtySlug === specialtySlug);
}

export function getAllSpecialtyHubs(): { slug: string; name: string }[] {
  const map = new Map<string, string>();
  for (const d of doctors) {
    if (!map.has(d.specialtySlug)) map.set(d.specialtySlug, d.specialty);
  }
  return [...map.entries()].map(([slug, name]) => ({ slug, name }));
}

export function getSpecialtyHub(specialtySlug: string) {
  return getAllSpecialtyHubs().find((s) => s.slug === specialtySlug);
}

export function getAllCountries(): ContentCountry[] {
  return countries;
}

export function getCountryBySlug(slug: string): ContentCountry | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getFaqsForProcedure(faqSlugKey: string): FAQItem[] {
  return faqs[faqSlugKey] ?? [];
}

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

export function getTestimonialBySlug(slug: string): Testimonial | undefined {
  return testimonials.find((t) => t.slug === slug);
}

export function getTestimonialsByCountry(countrySlug: string): Testimonial[] {
  return testimonials.filter((t) => t.countrySlug === countrySlug);
}

export function getTestimonialsByProcedure(procedureSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.procedureSlug === procedureSlug);
}

export function getStoryCountries(): ContentCountry[] {
  const slugs = new Set(testimonials.map((t) => t.countrySlug));
  return countries
    .filter((c) => slugs.has(c.slug))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getStoryProcedures(): Procedure[] {
  const slugs = new Set(
    testimonials.map((t) => t.procedureSlug).filter((s): s is string => Boolean(s))
  );
  return procedures
    .filter((p) => slugs.has(p.slug))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function procedurePath(procedure: Procedure): string {
  return `/treatments/${procedure.categorySlug}/${procedure.slug}`;
}

export function costComparisonPath(procedureSlug: string): string {
  return `/cost-comparison/${procedureSlug}`;
}
