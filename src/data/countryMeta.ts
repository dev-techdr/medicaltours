import type { VisaStep } from "@/lib/types";

export type CountryMeta = {
  currencyCode: string;
  currencySymbol: string;
  usdToLocalApprox: number;
  visaSteps: VisaStep[];
  /** ISO 3166-1 alpha-2 */
  isoCountryCode: string;
  /** Languages useful for care coordination */
  languages: string[];
  /** India cities patients from this country commonly choose */
  popularCities: string[];
  /** Short flight / travel note for GEO snippets */
  travelNote: string;
};

const defaultVisaSteps = (countryName: string): VisaStep[] => [
  {
    title: "Share medical reports",
    body: `Send reports via WhatsApp so we can obtain a hospital invitation letter for your ${countryName} medical visa application.`,
  },
  {
    title: "Receive invitation letter",
    body: "Partner hospital issues an appointment/invitation letter required by the Indian mission or e-visa channel.",
  },
  {
    title: "Apply at Indian mission / e-visa",
    body: "Submit passport, photos, medical documents, and the invitation letter. Attendant visas can be filed for family members.",
  },
  {
    title: "Travel & admission",
    body: "Once the visa is issued, we coordinate flights guidance, airport pickup, and hospital admission in India.",
  },
];

const cities = {
  metro: ["Hyderabad", "Delhi", "Chennai", "Mumbai", "Bangalore"],
  gulf: ["Hyderabad", "Mumbai", "Delhi", "Chennai"],
  africa: ["Hyderabad", "Chennai", "Mumbai", "Delhi"],
  west: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
} as const;

/** Currency + visa + GEO metadata keyed by country MDX slug */
export const countryMetaBySlug: Record<string, CountryMeta> = {
  "medical-tourism-india-for-nigerians": {
    currencyCode: "NGN",
    currencySymbol: "₦",
    usdToLocalApprox: 1600,
    isoCountryCode: "NG",
    languages: ["English", "Yoruba", "Igbo", "Hausa"],
    popularCities: [...cities.africa],
    travelNote: "Direct and one-stop flights commonly connect Lagos and Abuja with Mumbai, Delhi, and Hyderabad.",
    visaSteps: [
      {
        title: "Prepare documents in Nigeria",
        body: "Valid passport, passport photos, medical reports, and funds evidence as required by the Indian High Commission / visa centre.",
      },
      {
        title: "Hospital invitation letter",
        body: "Techdr obtains an invitation/appointment letter from a partner hospital for your medical visa file.",
      },
      {
        title: "Apply for medical visa (MED)",
        body: "Apply through the Indian mission or authorised centre serving Nigeria. Attendant visas are available for accompanying family.",
      },
      {
        title: "Travel to India",
        body: "After visa issuance, we arrange airport pickup and hospital admission support in your treatment city.",
      },
    ],
  },
  "medical-tourism-india-for-kenyans": {
    currencyCode: "KES",
    currencySymbol: "KSh",
    usdToLocalApprox: 130,
    isoCountryCode: "KE",
    languages: ["English", "Swahili"],
    popularCities: [...cities.africa],
    travelNote: "Nairobi has strong connections to Mumbai, Delhi, and Hyderabad for medical travel.",
    visaSteps: defaultVisaSteps("Kenya"),
  },
  "medical-tourism-india-for-tanzanians": {
    currencyCode: "TZS",
    currencySymbol: "TSh",
    usdToLocalApprox: 2600,
    isoCountryCode: "TZ",
    languages: ["English", "Swahili"],
    popularCities: [...cities.africa],
    travelNote: "Patients commonly fly from Dar es Salaam or Kilimanjaro via Gulf hubs or Mumbai.",
    visaSteps: defaultVisaSteps("Tanzania"),
  },
  "medical-tourism-india-for-iraqis": {
    currencyCode: "IQD",
    currencySymbol: "ع.د",
    usdToLocalApprox: 1310,
    isoCountryCode: "IQ",
    languages: ["Arabic", "Kurdish", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Baghdad, Erbil, and Basra travelers often reach Delhi, Mumbai, or Hyderabad via regional hubs.",
    visaSteps: defaultVisaSteps("Iraq"),
  },
  "medical-tourism-india-for-bangladeshis": {
    currencyCode: "BDT",
    currencySymbol: "৳",
    usdToLocalApprox: 110,
    isoCountryCode: "BD",
    languages: ["Bengali", "English"],
    popularCities: ["Kolkata", "Hyderabad", "Chennai", "Delhi", "Mumbai"],
    travelNote: "Dhaka and Chittagong have frequent air links to Kolkata, Delhi, and other Indian metros.",
    visaSteps: defaultVisaSteps("Bangladesh"),
  },
  "medical-tourism-india-for-omanis": {
    currencyCode: "OMR",
    currencySymbol: "ر.ع.",
    usdToLocalApprox: 0.39,
    isoCountryCode: "OM",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Muscat connects easily to Mumbai, Hyderabad, and Chennai for short medical trips.",
    visaSteps: defaultVisaSteps("Oman"),
  },
  "medical-tourism-india-for-ugandans": {
    currencyCode: "UGX",
    currencySymbol: "USh",
    usdToLocalApprox: 3700,
    isoCountryCode: "UG",
    languages: ["English", "Luganda"],
    popularCities: [...cities.africa],
    travelNote: "Entebbe flights typically connect through Nairobi, Dubai, or Mumbai into Indian metros.",
    visaSteps: defaultVisaSteps("Uganda"),
  },
  "medical-tourism-india-for-zambians": {
    currencyCode: "ZMW",
    currencySymbol: "ZK",
    usdToLocalApprox: 27,
    isoCountryCode: "ZM",
    languages: ["English"],
    popularCities: [...cities.africa],
    travelNote: "Lusaka travelers often reach India via Johannesburg, Dubai, or Nairobi.",
    visaSteps: defaultVisaSteps("Zambia"),
  },
  "medical-tourism-india-for-uk-patients": {
    currencyCode: "GBP",
    currencySymbol: "£",
    usdToLocalApprox: 0.79,
    isoCountryCode: "GB",
    languages: ["English"],
    popularCities: [...cities.west],
    travelNote: "London, Birmingham, and Manchester have frequent non-stop and one-stop flights to Delhi, Mumbai, and Bangalore.",
    visaSteps: defaultVisaSteps("the United Kingdom"),
  },
  "medical-tourism-india-for-usa-patients": {
    currencyCode: "USD",
    currencySymbol: "$",
    usdToLocalApprox: 1,
    isoCountryCode: "US",
    languages: ["English"],
    popularCities: [...cities.west],
    travelNote: "US patients typically fly into Delhi, Mumbai, or Bangalore with one stop via Europe or the Middle East.",
    visaSteps: defaultVisaSteps("the United States"),
  },
  "medical-tourism-india-for-uae-residents": {
    currencyCode: "AED",
    currencySymbol: "د.إ",
    usdToLocalApprox: 3.67,
    isoCountryCode: "AE",
    languages: ["Arabic", "English", "Hindi"],
    popularCities: [...cities.gulf],
    travelNote: "Dubai and Abu Dhabi have multiple daily flights to Mumbai, Hyderabad, Delhi, and Chennai.",
    visaSteps: defaultVisaSteps("the UAE"),
  },
  "medical-tourism-india-for-afghan-patients": {
    currencyCode: "AFN",
    currencySymbol: "؋",
    usdToLocalApprox: 70,
    isoCountryCode: "AF",
    languages: ["Dari", "Pashto", "English"],
    popularCities: ["Delhi", "Hyderabad", "Mumbai", "Chennai"],
    travelNote: "Patients commonly reach Delhi or other metros via regional transit hubs depending on current travel rules.",
    visaSteps: defaultVisaSteps("Afghanistan"),
  },
  "medical-tourism-india-for-yemeni-patients": {
    currencyCode: "YER",
    currencySymbol: "﷼",
    usdToLocalApprox: 250,
    isoCountryCode: "YE",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Travel routes often go through Gulf hubs into Hyderabad, Mumbai, or Delhi.",
    visaSteps: defaultVisaSteps("Yemen"),
  },
  "medical-tourism-india-for-ethiopians": {
    currencyCode: "ETB",
    currencySymbol: "Br",
    usdToLocalApprox: 120,
    isoCountryCode: "ET",
    languages: ["Amharic", "English"],
    popularCities: [...cities.africa],
    travelNote:
      "Addis Ababa Bole International Airport has connections to Delhi, Mumbai, and Hyderabad for medical travel.",
    visaSteps: defaultVisaSteps("Ethiopia"),
  },
};

export function getCountryMeta(slug: string, countryName: string): CountryMeta {
  return (
    countryMetaBySlug[slug] ?? {
      currencyCode: "USD",
      currencySymbol: "$",
      usdToLocalApprox: 1,
      isoCountryCode: "IN",
      languages: ["English"],
      popularCities: ["Hyderabad", "Delhi", "Mumbai"],
      travelNote: "We help plan flights into the nearest metro for your chosen hospital.",
      visaSteps: defaultVisaSteps(countryName),
    }
  );
}

export function formatLocalCurrency(
  usdAmount: number,
  meta: Pick<CountryMeta, "currencyCode" | "currencySymbol" | "usdToLocalApprox">
): string {
  if (meta.currencyCode === "USD") {
    return `$${usdAmount.toLocaleString()}`;
  }
  const local = Math.round(usdAmount * meta.usdToLocalApprox);
  return `${meta.currencySymbol}${local.toLocaleString()} ${meta.currencyCode}`;
}
