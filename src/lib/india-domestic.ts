import { canonicalUrl } from "@/lib/seo";

export type IndiaDomesticTier =
  | "hub"
  | "tier1"
  | "tier2"
  | "tier3"
  | "budget"
  | "logistics";

export type IndiaDomesticPageMeta = {
  slug: string;
  title: string;
  primaryKeyword: string;
  tier: IndiaDomesticTier;
  priority: number;
  telugu?: boolean;
};

export const INDIA_DOMESTIC_CITY = "hyderabad" as const;

export const INDIA_DOMESTIC_PAGES: IndiaDomesticPageMeta[] = [
  {
    slug: "",
    title: "Surgery in Hyderabad for Indian Patients",
    primaryKeyword: "surgery in hyderabad for indian patients",
    tier: "hub",
    priority: 1,
    telugu: true,
  },
  {
    slug: "telangana-andhra-patients",
    title: "Surgery in Hyderabad for Telangana & Andhra Pradesh Patients",
    primaryKeyword: "surgery hyderabad telangana andhra patients",
    tier: "tier1",
    priority: 0.95,
    telugu: true,
  },
  {
    slug: "for-warangal-patients",
    title: "Hyderabad Surgery Guide for Warangal Patients",
    primaryKeyword: "surgery hyderabad for warangal patients",
    tier: "tier1",
    priority: 0.9,
  },
  {
    slug: "for-vijayawada-patients",
    title: "Hyderabad Surgery Guide for Vijayawada Patients",
    primaryKeyword: "surgery hyderabad for vijayawada patients",
    tier: "tier1",
    priority: 0.9,
  },
  {
    slug: "for-karimnagar-patients",
    title: "Hyderabad Surgery Guide for Karimnagar Patients",
    primaryKeyword: "surgery hyderabad for karimnagar patients",
    tier: "tier1",
    priority: 0.9,
  },
  {
    slug: "for-visakhapatnam-patients",
    title: "Hyderabad Surgery Guide for Visakhapatnam Patients",
    primaryKeyword: "surgery hyderabad for visakhapatnam patients",
    tier: "tier1",
    priority: 0.9,
  },
  {
    slug: "for-nizamabad-patients",
    title: "Hyderabad Surgery Guide for Nizamabad Patients",
    primaryKeyword: "surgery hyderabad for nizamabad patients",
    tier: "tier1",
    priority: 0.9,
  },
  {
    slug: "aarogyasri-empanelled-hospitals",
    title: "Aarogyasri Empanelled Hospitals in Hyderabad",
    primaryKeyword: "aarogyasri empanelled hospitals hyderabad",
    tier: "tier1",
    priority: 0.98,
    telugu: true,
  },
  {
    slug: "emi-medical-loans",
    title: "EMI & Medical Loans for Surgery in Hyderabad",
    primaryKeyword: "emi medical loan surgery hyderabad",
    tier: "tier1",
    priority: 0.85,
  },
  {
    slug: "free-medical-camps",
    title: "Free Medical Camps in Hyderabad",
    primaryKeyword: "free medical camps hyderabad",
    tier: "tier1",
    priority: 0.8,
  },
  {
    slug: "for-odisha-patients",
    title: "Hyderabad Surgery Guide for Odisha Patients",
    primaryKeyword: "surgery hyderabad for odisha patients",
    tier: "tier2",
    priority: 0.75,
  },
  {
    slug: "for-chhattisgarh-patients",
    title: "Hyderabad Surgery Guide for Chhattisgarh Patients",
    primaryKeyword: "surgery hyderabad for chhattisgarh patients",
    tier: "tier2",
    priority: 0.75,
  },
  {
    slug: "for-karnataka-patients",
    title: "Hyderabad Surgery Guide for Karnataka Patients",
    primaryKeyword: "surgery hyderabad for karnataka patients",
    tier: "tier2",
    priority: 0.75,
  },
  {
    slug: "for-maharashtra-patients",
    title: "Hyderabad Surgery Guide for Maharashtra Patients",
    primaryKeyword: "surgery hyderabad for maharashtra patients",
    tier: "tier2",
    priority: 0.75,
  },
  {
    slug: "for-tamil-nadu-patients",
    title: "Hyderabad Surgery Guide for Tamil Nadu Patients",
    primaryKeyword: "surgery hyderabad for tamil nadu patients",
    tier: "tier2",
    priority: 0.75,
  },
  {
    slug: "ayushman-bharat-hospitals",
    title: "Ayushman Bharat Empanelled Hospitals in Hyderabad",
    primaryKeyword: "ayushman bharat hospitals hyderabad",
    tier: "tier3",
    priority: 1,
    telugu: true,
  },
  {
    slug: "cghs-empanelled-hospitals",
    title: "CGHS Empanelled Hospitals in Hyderabad",
    primaryKeyword: "cghs empanelled hospitals hyderabad",
    tier: "tier3",
    priority: 0.9,
  },
  {
    slug: "insurance-schemes-comparison",
    title: "Insurance Schemes Comparison — Aarogyasri vs Ayushman Bharat vs CGHS",
    primaryKeyword: "aarogyasri ayushman bharat cghs comparison hyderabad",
    tier: "tier3",
    priority: 0.88,
  },
  {
    slug: "low-cost-knee-replacement",
    title: "Low-Cost Knee Replacement in Hyderabad",
    primaryKeyword: "low cost knee replacement hyderabad price",
    tier: "budget",
    priority: 0.85,
  },
  {
    slug: "affordable-cardiac-surgery",
    title: "Affordable Cardiac Surgery in Hyderabad",
    primaryKeyword: "affordable cardiac surgery hyderabad cost",
    tier: "budget",
    priority: 0.85,
  },
  {
    slug: "budget-cataract-surgery",
    title: "Budget Cataract Surgery in Hyderabad",
    primaryKeyword: "budget cataract surgery hyderabad cost",
    tier: "budget",
    priority: 0.8,
  },
  {
    slug: "low-cost-cancer-treatment",
    title: "Low-Cost Cancer Treatment in Hyderabad",
    primaryKeyword: "low cost cancer treatment hyderabad",
    tier: "budget",
    priority: 0.85,
  },
  {
    slug: "low-cost-hip-replacement",
    title: "Low-Cost Hip Replacement in Hyderabad",
    primaryKeyword: "low cost hip replacement hyderabad price",
    tier: "budget",
    priority: 0.85,
  },
  {
    slug: "affordable-spine-surgery",
    title: "Affordable Spine Surgery in Hyderabad",
    primaryKeyword: "affordable spine surgery hyderabad cost",
    tier: "budget",
    priority: 0.85,
  },
  {
    slug: "second-opinion-doctors",
    title: "Second Opinion Doctors in Hyderabad",
    primaryKeyword: "second opinion doctors hyderabad",
    tier: "logistics",
    priority: 0.8,
  },
  {
    slug: "train-flight-travel-guide",
    title: "Train & Flight Travel Guide to Hyderabad for Surgery",
    primaryKeyword: "travel to hyderabad for surgery train flight",
    tier: "logistics",
    priority: 0.8,
  },
  {
    slug: "interstate-doctor-referrals",
    title: "Interstate Doctor Referrals to Hyderabad Hospitals",
    primaryKeyword: "interstate doctor referral hyderabad hospitals",
    tier: "logistics",
    priority: 0.8,
  },
];

export const TIER_LABELS: Record<IndiaDomesticTier, string> = {
  hub: "Hyderabad Hub",
  tier1: "AP & Telangana",
  tier2: "Pan-India States",
  tier3: "National Insurance Schemes",
  budget: "Budget Procedures (₹)",
  logistics: "Logistics & Support",
};

export function getIndiaDomesticPath(
  slug: string,
  locale: "en" | "te" = "en"
): string {
  const base = locale === "te" ? "/te/hyderabad" : "/india/hyderabad";
  return slug ? `${base}/${slug}` : `${base}/`;
}

export function getIndiaDomesticPageMeta(slug: string) {
  return INDIA_DOMESTIC_PAGES.find((p) => p.slug === slug);
}

export function getIndiaDomesticSubSlugs(): string[] {
  return INDIA_DOMESTIC_PAGES.filter((p) => p.slug).map((p) => p.slug);
}

export function getTeluguPageSlugs(): string[] {
  return INDIA_DOMESTIC_PAGES.filter((p) => p.telugu).map((p) => p.slug);
}

export function getPagesByTier(tier: IndiaDomesticTier) {
  return INDIA_DOMESTIC_PAGES.filter((p) => p.tier === tier && p.slug);
}

export function getDomesticHreflangAlternates(slug: string) {
  const enPath = getIndiaDomesticPath(slug, "en");
  const meta = getIndiaDomesticPageMeta(slug);
  const enUrl = canonicalUrl(enPath);
  const alternates: Record<string, string> = {
    en: enUrl,
    "x-default": enUrl,
  };
  if (meta?.telugu) {
    alternates.te = canonicalUrl(getIndiaDomesticPath(slug, "te"));
  }
  return alternates;
}
