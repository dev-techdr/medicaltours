/** US / UK / Canada / Australia campaign + hub helpers */

export const WESTERN_CAMPAIGN_PATH = "/for-usa-uk-canada-australia";

export const WESTERN_COUNTRY_HUBS = [
  {
    shortSlug: "usa",
    name: "United States",
    demonym: "American",
    iso: "US",
    hubSlug: "medical-tourism-india-for-usa-patients",
    angle: "Self-pay and high deductibles",
    href: "/countries/medical-tourism-india-for-usa-patients",
  },
  {
    shortSlug: "uk",
    name: "United Kingdom",
    demonym: "British",
    iso: "GB",
    hubSlug: "medical-tourism-india-for-uk-patients",
    angle: "NHS waits and private UK costs",
    href: "/countries/medical-tourism-india-for-uk-patients",
  },
  {
    shortSlug: "canada",
    name: "Canada",
    demonym: "Canadian",
    iso: "CA",
    hubSlug: "medical-tourism-india-for-canadian-patients",
    angle: "Provincial wait-lists",
    href: "/countries/medical-tourism-india-for-canadian-patients",
  },
  {
    shortSlug: "australia",
    name: "Australia",
    demonym: "Australian",
    iso: "AU",
    hubSlug: "medical-tourism-india-for-australian-patients",
    angle: "Elective gaps and private quotes",
    href: "/countries/medical-tourism-india-for-australian-patients",
  },
] as const;

export const WESTERN_HUB_SLUGS = new Set(
  WESTERN_COUNTRY_HUBS.map((c) => c.hubSlug)
);

export const WESTERN_SHORT_SLUGS = new Set(
  WESTERN_COUNTRY_HUBS.map((c) => c.shortSlug)
);

export function isWesternHubSlug(hubSlug: string): boolean {
  return WESTERN_HUB_SLUGS.has(hubSlug as (typeof WESTERN_COUNTRY_HUBS)[number]["hubSlug"]);
}

export function isWesternShortSlug(shortSlug: string): boolean {
  return WESTERN_SHORT_SLUGS.has(
    shortSlug as (typeof WESTERN_COUNTRY_HUBS)[number]["shortSlug"]
  );
}

/** Flagship procedures for the Western campaign landing */
export const WESTERN_FEATURED_TREATMENT_SLUGS = [
  "heart-surgery-india",
  "knee-replacement-india",
  "hip-replacement-india",
  "cancer-treatment-india",
  "ivf-treatment-india",
  "dental-implants-india",
  "spine-surgery-india",
  "bariatric-surgery-india",
] as const;
