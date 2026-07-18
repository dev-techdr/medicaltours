/**
 * Bridge short country slugs (stories/testimonials) ↔ SEO hub MDX slugs.
 * Keep in sync when adding countries.
 */
export const COUNTRY_HUB_BY_SHORT_SLUG: Record<string, string> = {
  nigeria: "medical-tourism-india-for-nigerians",
  kenya: "medical-tourism-india-for-kenyans",
  tanzania: "medical-tourism-india-for-tanzanians",
  uganda: "medical-tourism-india-for-ugandans",
  zambia: "medical-tourism-india-for-zambians",
  ethiopia: "medical-tourism-india-for-ethiopians",
  ghana: "medical-tourism-india-for-ghanaians",
  "south-africa": "medical-tourism-india-for-south-africans",
  rwanda: "medical-tourism-india-for-rwandans",
  malawi: "medical-tourism-india-for-malawians",
  sudan: "medical-tourism-india-for-sudanese-patients",
  somalia: "medical-tourism-india-for-somali-patients",
  zimbabwe: "medical-tourism-india-for-zimbabweans",
  cameroon: "medical-tourism-india-for-cameroonians",
  uae: "medical-tourism-india-for-uae-residents",
  oman: "medical-tourism-india-for-omanis",
  "saudi-arabia": "medical-tourism-india-for-saudi-patients",
  qatar: "medical-tourism-india-for-qataris",
  kuwait: "medical-tourism-india-for-kuwaitis",
  bahrain: "medical-tourism-india-for-bahrainis",
  iraq: "medical-tourism-india-for-iraqis",
  yemen: "medical-tourism-india-for-yemeni-patients",
  egypt: "medical-tourism-india-for-egyptians",
  jordan: "medical-tourism-india-for-jordanians",
  iran: "medical-tourism-india-for-iranians",
  afghanistan: "medical-tourism-india-for-afghan-patients",
  bangladesh: "medical-tourism-india-for-bangladeshis",
  nepal: "medical-tourism-india-for-nepalis",
  "sri-lanka": "medical-tourism-india-for-sri-lankans",
  maldives: "medical-tourism-india-for-maldivians",
  kazakhstan: "medical-tourism-india-for-kazakhstanis",
  uk: "medical-tourism-india-for-uk-patients",
  usa: "medical-tourism-india-for-usa-patients",
  canada: "medical-tourism-india-for-canadian-patients",
  australia: "medical-tourism-india-for-australian-patients",
};

/** High-search-volume markets to feature on homepage / footer */
export const PRIORITY_COUNTRY_SHORT_SLUGS = [
  "nigeria",
  "kenya",
  "uae",
  "saudi-arabia",
  "bangladesh",
  "uk",
  "usa",
  "iraq",
  "ghana",
  "oman",
  "egypt",
] as const;

export function countryHubPathFromShortSlug(shortSlug: string): string | undefined {
  const hub = COUNTRY_HUB_BY_SHORT_SLUG[shortSlug];
  return hub ? `/countries/${hub}` : undefined;
}

export function shortSlugFromCountryHub(hubSlug: string): string | undefined {
  const entry = Object.entries(COUNTRY_HUB_BY_SHORT_SLUG).find(([, hub]) => hub === hubSlug);
  return entry?.[0];
}

export function patientStoriesPathFromHub(hubSlug: string): string | undefined {
  const short = shortSlugFromCountryHub(hubSlug);
  return short ? `/patient-stories/${short}` : undefined;
}
