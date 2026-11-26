import { getCountryMeta } from "@/data/countryMeta";
import { getAllMdx, getMdxBySlug, getMdxSlugs } from "@/lib/mdx";
import type { Country, FAQItem } from "@/lib/types";

type CountryFrontmatter = {
  name: string;
  demonym: string;
  primaryKeyword: string;
  shortAnswer: string;
  popularTreatments?: string[];
  faqs?: FAQItem[];
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<CountryFrontmatter>>>
): Country {
  const meta = getCountryMeta(doc.slug, doc.name);
  return {
    slug: doc.slug,
    name: doc.name,
    demonym: doc.demonym,
    primaryKeyword: doc.primaryKeyword,
    shortAnswer: doc.shortAnswer,
    popularTreatments: doc.popularTreatments ?? [],
    faqs: doc.faqs ?? [],
    currencyCode: meta.currencyCode,
    currencySymbol: meta.currencySymbol,
    usdToLocalApprox: meta.usdToLocalApprox,
    visaSteps: meta.visaSteps,
    isoCountryCode: meta.isoCountryCode,
    languages: meta.languages,
    popularCities: meta.popularCities,
    travelNote: meta.travelNote,
    content: doc.content,
  };
}

export function getAllCountries(): Country[] {
  return getAllMdx<CountryFrontmatter>("countries").map(normalize);
}

export function getCountryBySlug(slug: string): Country | undefined {
  const doc = getMdxBySlug<CountryFrontmatter>("countries", slug);
  return doc ? normalize(doc) : undefined;
}

export function getAllCountrySlugs(): string[] {
  return getMdxSlugs("countries");
}

/** Merge MDX FAQs with AEO baseline questions so every country page has depth. */
export function buildCountryAeoFaqs(country: Country): FAQItem[] {
  const { demonym, name, currencyCode, languages, popularCities, travelNote } = country;
  const baseline: FAQItem[] = [
    {
      question: `Is medical tourism in India safe for ${demonym} patients?`,
      answer: `Yes — when you choose JCI or NABH accredited hospitals and coordinated facilitation. TechdrHealth matches ${demonym} patients with verified partner hospitals, arranges visa invitation letters, and supports airport pickup, admission, and recovery stay so families are not navigating India alone.`,
    },
    {
      question: `How much does medical treatment in India cost for patients from ${name}?`,
      answer: `Most ${demonym} patients save about 50–80% versus typical US or UK hospital prices for the same procedure class. Packages are quoted in USD with an approximate ${currencyCode} reference for planning. Final quotes follow medical review of your reports.`,
    },
    {
      question: `How do ${demonym} patients get a medical visa for India?`,
      answer: `Share medical reports so a partner hospital can issue an invitation or appointment letter. Then apply through the Indian mission, visa centre, or e-visa channel that serves ${name}. Attendant visas are often available for one or more family members.`,
    },
    {
      question: `Which Indian cities do ${demonym} patients choose most often?`,
      answer: `${demonym} patients commonly travel to ${popularCities.join(", ")} depending on specialty, doctor availability, and flight convenience. ${travelNote}`,
    },
    {
      question: `Will language be a problem for ${demonym} patients in Indian hospitals?`,
      answer: `English is widely used in major international patient departments. TechdrHealth also arranges interpreters when needed for languages such as ${languages.filter((l) => l !== "English").slice(0, 3).join(", ") || "Arabic and regional languages"}.`,
    },
    {
      question: `How long does TechdrHealth take to respond to a ${demonym} patient enquiry?`,
      answer: `Most families receive hospital options and an indicative package range within 24–48 hours after sharing reports on WhatsApp or email. Complex transplant or oncology cases may need an extra specialist review cycle.`,
    },
  ];

  const seen = new Set<string>();
  const merged: FAQItem[] = [];

  for (const faq of [...country.faqs, ...baseline]) {
    const key = faq.question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(faq);
  }

  return merged.slice(0, 8);
}
