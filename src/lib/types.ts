export type FAQItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type Treatment = {
  slug: string;
  name: string;
  primaryKeyword: string;
  shortAnswer: string;
  category: string;
  costMinUsd: number;
  costMaxUsd: number;
  costUsaMinUsd: number;
  costUsaMaxUsd: number;
  recoveryDays: string;
  successRate?: string;
  faqs: FAQItem[];
  relatedSlugs: string[];
  content: string;
};

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  accreditation: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  shortAnswer: string;
  internationalPatients: boolean;
  mouYear: number;
  facilities: string[];
  internationalServices: string[];
  content: string;
};

/** Serializable hospital fields for client filters (no MDX body). */
export type HospitalSummary = Omit<Hospital, "content" | "shortAnswer" | "facilities" | "internationalServices">;

export type City = {
  slug: string;
  name: string;
  primaryKeyword: string;
  shortAnswer: string;
  highlights: string[];
  content: string;
};

export type VisaStep = {
  title: string;
  body: string;
};

export type Country = {
  slug: string;
  name: string;
  demonym: string;
  primaryKeyword: string;
  shortAnswer: string;
  popularTreatments: string[];
  faqs: FAQItem[];
  currencyCode: string;
  currencySymbol: string;
  /** Approximate local units per 1 USD for display only */
  usdToLocalApprox: number;
  visaSteps: VisaStep[];
  isoCountryCode: string;
  languages: string[];
  popularCities: string[];
  travelNote: string;
  content: string;
};

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  primaryKeyword: string;
  hospitalSlug: string;
  city: string;
  experienceYears: number;
  shortAnswer: string;
  content: string;
};

export type PatientStory = {
  slug: string;
  patientName: string;
  country: string;
  treatment: string;
  treatmentSlug: string;
  hospital: string;
  summary: string;
  outcome: string;
  content: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  primaryKeyword: string;
  keywords?: string[];
  excerpt: string;
  date: string;
  content: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export type IndiaDomesticPage = {
  slug: string;
  title: string;
  primaryKeyword: string;
  shortAnswer: string;
  tier: string;
  highlights: string[];
  faqs: FAQItem[];
  costInrMin?: number;
  costInrMax?: number;
  locale: "en" | "te";
  content: string;
};

export type CostEstimate = {
  treatmentSlug: string;
  hospitalStayDays: number;
  hotelPerNightUsd: number;
  visaFeeUsd: number;
  airportTransferUsd: number;
  interpreterPerDayUsd: number;
};

/** Serializable treatment fields safe for client components (no MDX body). */
export type TreatmentSummary = Omit<Treatment, "content" | "faqs" | "relatedSlugs" | "shortAnswer" | "primaryKeyword" | "recoveryDays" | "successRate">;
