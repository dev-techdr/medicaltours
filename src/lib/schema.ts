import { SITE, SOCIAL_SAME_AS } from "@/lib/site";
import { absoluteUrl } from "@/lib/metadata";
import type { FAQItem } from "@/lib/data";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

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

export function faqSchema(faqs: FAQItem[]) {
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
    "@type": ["Hospital", "MedicalClinic"],
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

export function reviewSchema({
  authorName,
  reviewBody,
  ratingValue,
  itemName,
}: {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  itemName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: authorName,
    },
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "MedicalProcedure",
      name: itemName,
    },
  };
}
