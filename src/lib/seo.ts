import type { Metadata } from "next";
import { SITE, SOCIAL_SAME_AS } from "@/lib/site";
import type { BreadcrumbItem, FAQItem } from "@/lib/types";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE.name)
    ? title
    : `${title} | ${SITE.name}`;
  const ogImage = absoluteUrl(SITE.logo);

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: url,
      // Only advertise locales that actually exist as crawlable pages.
      // LanguageSwitcher may offer translate UX; do not invent /ar|/fr|/bn|/sw routes.
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalOrganization", "LocalBusiness"],
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.logo),
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.385,
      longitude: 78.4867,
    },
    areaServed: "Worldwide",
    priceRange: "$$",
    sameAs: [SITE.whatsappUrl, ...SOCIAL_SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "French", "Hindi"],
      areaServed: "Worldwide",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: readonly FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function medicalProcedureSchema({
  name,
  description,
  url,
  costMin,
  costMax,
}: {
  name: string;
  description: string;
  url: string;
  costMin: number;
  costMax: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: absoluteUrl(url),
    procedureType: "https://schema.org/SurgicalProcedure",
    status: "https://schema.org/ActiveActionStatus",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: costMin,
      highPrice: costMax,
      offerCount: 1,
      availability: "https://schema.org/InStock",
    },
  };
}

/** Domestic India procedure pricing in INR (Hyderabad budget pages). */
export function medicalProcedureInrSchema({
  name,
  description,
  url,
  costMin,
  costMax,
  location = "Hyderabad",
}: {
  name: string;
  description: string;
  url: string;
  costMin: number;
  costMax: number;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: absoluteUrl(url),
    procedureType: "https://schema.org/SurgicalProcedure",
    status: "https://schema.org/ActiveActionStatus",
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: costMin,
      highPrice: costMax,
      offerCount: 1,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "MedicalOrganization",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: absoluteUrl(SITE.logo),
    },
    inLanguage: ["en", "te"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/treatments?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function blogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(url),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.logo),
      },
    },
    image: absoluteUrl(SITE.logo),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    inLanguage: "en",
  };
}

export function blogCollectionSchema(
  posts: readonly { title: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medical Tourism Blog",
    description:
      "Guides on choosing hospitals in India, medical visas, cost comparisons, and how to avoid medical tourism scams.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@type": "MedicalOrganization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(post.url),
      })),
    },
  };
}

export function hospitalSchema({
  name,
  description,
  url,
  city,
  rating,
  reviewCount,
  accreditation,
}: {
  name: string;
  description: string;
  url: string;
  city: string;
  rating: number;
  reviewCount: number;
  accreditation: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name,
    description,
    url: absoluteUrl(url),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    hasCredential: accreditation.map((a) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: a,
    })),
    parentOrganization: {
      "@type": "MedicalOrganization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function hospitalItemListSchema(
  hospitals: {
    name: string;
    description: string;
    url: string;
    city: string;
    rating: number;
    reviewCount: number;
    accreditation: string[];
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical Tours India Partner Hospitals",
    numberOfItems: hospitals.length,
    itemListElement: hospitals.map((hospital, index) => {
      const schema = hospitalSchema(hospital) as Record<string, unknown>;
      const org = Object.fromEntries(
        Object.entries(schema).filter(([key]) => key !== "@context")
      );
      return {
        "@type": "ListItem",
        position: index + 1,
        item: org,
      };
    }),
  };
}

export function physicianSchema({
  name,
  description,
  url,
  specialty,
  hospitalName,
}: {
  name: string;
  description: string;
  url: string;
  specialty: string;
  hospitalName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    description,
    url: absoluteUrl(url),
    medicalSpecialty: specialty,
    hospitalAffiliation: {
      "@type": "MedicalOrganization",
      name: hospitalName,
    },
  };
}

export function webPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(url),
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      "@type": "Thing",
      name: "Medical tourism in India",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/** Medical travel facilitation service targeted at a patient nationality / country. */
export function countryMedicalTravelSchema({
  countryName,
  demonym,
  description,
  url,
  isoCountryCode,
  languages,
}: {
  countryName: string;
  demonym: string;
  description: string;
  url: string;
  isoCountryCode: string;
  languages: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Medical tourism assistance in India for ${demonym} patients`,
    description,
    url: absoluteUrl(url),
    serviceType: "Medical tourism facilitation",
    provider: {
      "@type": "MedicalOrganization",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
    },
    areaServed: {
      "@type": "Country",
      name: countryName,
      identifier: isoCountryCode,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(url),
      servicePhone: SITE.phone,
    },
    audience: {
      "@type": "PeopleAudience",
      geographicArea: {
        "@type": "Country",
        name: countryName,
      },
    },
    inLanguage: languages,
  };
}

/** HowTo schema for medical visa steps — strong AEO/GEO signal. */
export function visaHowToSchema({
  demonym,
  countryName,
  steps,
  url,
}: {
  demonym: string;
  countryName: string;
  steps: { title: string; body: string }[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${demonym} patients get a medical visa for India`,
    description: `Step-by-step medical visa process for patients travelling from ${countryName} to India for treatment.`,
    url: absoluteUrl(url),
    totalTime: "P14D",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
    })),
  };
}

export function aggregateReviewSchema({
  itemReviewed,
  ratingValue,
  reviewCount,
  reviews,
}: {
  itemReviewed: string;
  ratingValue: number;
  reviewCount: number;
  reviews: { author: string; reviewBody: string; rating: number }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: itemReviewed,
    url: SITE.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
    })),
  };
}

export function countryItemListSchema(
  countries: { name: string; demonym: string; url: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical tourism in India by nationality",
    description:
      "Guides for international patients travelling to India for treatment, visa support, and hospital coordination.",
    numberOfItems: countries.length,
    itemListElement: countries.map((country, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Medical tourism India for ${country.demonym} patients`,
      url: absoluteUrl(country.url),
      description: country.description,
      item: {
        "@type": "WebPage",
        name: `Medical tourism India for ${country.demonym} patients`,
        url: absoluteUrl(country.url),
        description: country.description,
      },
    })),
  };
}
