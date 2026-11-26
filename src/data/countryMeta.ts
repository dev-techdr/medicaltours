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
        body: "TechdrHealth obtains an invitation/appointment letter from a partner hospital for your medical visa file.",
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
  "medical-tourism-india-for-ghanaians": {
    currencyCode: "GHS",
    currencySymbol: "GH₵",
    usdToLocalApprox: 15.5,
    isoCountryCode: "GH",
    languages: ["English", "Twi"],
    popularCities: [...cities.africa],
    travelNote: "Accra travelers commonly reach Mumbai, Delhi, or Hyderabad via European or Gulf hubs.",
    visaSteps: defaultVisaSteps("Ghana"),
  },
  "medical-tourism-india-for-south-africans": {
    currencyCode: "ZAR",
    currencySymbol: "R",
    usdToLocalApprox: 18,
    isoCountryCode: "ZA",
    languages: ["English", "Afrikaans", "Zulu"],
    popularCities: [...cities.africa],
    travelNote: "Johannesburg and Cape Town connect to Indian metros via Dubai, Doha, or direct long-haul options.",
    visaSteps: defaultVisaSteps("South Africa"),
  },
  "medical-tourism-india-for-rwandans": {
    currencyCode: "RWF",
    currencySymbol: "FRw",
    usdToLocalApprox: 1400,
    isoCountryCode: "RW",
    languages: ["English", "French", "Kinyarwanda"],
    popularCities: [...cities.africa],
    travelNote: "Kigali flights typically connect through Nairobi, Dubai, or Addis Ababa into Indian metros.",
    visaSteps: defaultVisaSteps("Rwanda"),
  },
  "medical-tourism-india-for-saudi-patients": {
    currencyCode: "SAR",
    currencySymbol: "﷼",
    usdToLocalApprox: 3.75,
    isoCountryCode: "SA",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Riyadh, Jeddah, and Dammam have frequent flights to Mumbai, Hyderabad, Delhi, and Chennai.",
    visaSteps: defaultVisaSteps("Saudi Arabia"),
  },
  "medical-tourism-india-for-qataris": {
    currencyCode: "QAR",
    currencySymbol: "ر.ق",
    usdToLocalApprox: 3.64,
    isoCountryCode: "QA",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Doha has strong daily connections to Mumbai, Hyderabad, Delhi, and Chennai for medical travel.",
    visaSteps: defaultVisaSteps("Qatar"),
  },
  "medical-tourism-india-for-kuwaitis": {
    currencyCode: "KWD",
    currencySymbol: "د.ك",
    usdToLocalApprox: 0.31,
    isoCountryCode: "KW",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Kuwait City connects easily to Mumbai, Hyderabad, and Delhi for short medical trips.",
    visaSteps: defaultVisaSteps("Kuwait"),
  },
  "medical-tourism-india-for-bahrainis": {
    currencyCode: "BHD",
    currencySymbol: "د.ب",
    usdToLocalApprox: 0.38,
    isoCountryCode: "BH",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Manama has convenient links to Mumbai, Hyderabad, and Chennai for planned surgery.",
    visaSteps: defaultVisaSteps("Bahrain"),
  },
  "medical-tourism-india-for-egyptians": {
    currencyCode: "EGP",
    currencySymbol: "E£",
    usdToLocalApprox: 50,
    isoCountryCode: "EG",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Cairo travelers often reach Delhi, Mumbai, or Hyderabad via Gulf hubs or one-stop routes.",
    visaSteps: defaultVisaSteps("Egypt"),
  },
  "medical-tourism-india-for-sudanese-patients": {
    currencyCode: "SDG",
    currencySymbol: "ج.س",
    usdToLocalApprox: 600,
    isoCountryCode: "SD",
    languages: ["Arabic", "English"],
    popularCities: [...cities.gulf],
    travelNote: "Travel routes often go through regional hubs into Hyderabad, Mumbai, or Delhi depending on current connections.",
    visaSteps: defaultVisaSteps("Sudan"),
  },
  "medical-tourism-india-for-malawians": {
    currencyCode: "MWK",
    currencySymbol: "MK",
    usdToLocalApprox: 1750,
    isoCountryCode: "MW",
    languages: ["English", "Chichewa"],
    popularCities: [...cities.africa],
    travelNote: "Lilongwe and Blantyre travelers often reach India via Johannesburg, Nairobi, or Dubai.",
    visaSteps: defaultVisaSteps("Malawi"),
  },
  "medical-tourism-india-for-nepalis": {
    currencyCode: "NPR",
    currencySymbol: "Rs",
    usdToLocalApprox: 133,
    isoCountryCode: "NP",
    languages: ["Nepali","English","Hindi"],
    popularCities: ["Delhi", "Mumbai", "Hyderabad", "Chennai"],
    travelNote: "Kathmandu patients often travel to Delhi, Varanasi-linked corridors, Mumbai, or Hyderabad for tertiary care.",
    visaSteps: defaultVisaSteps("Nepal"),
  },
  "medical-tourism-india-for-sri-lankans": {
    currencyCode: "LKR",
    currencySymbol: "Rs",
    usdToLocalApprox: 300,
    isoCountryCode: "LK",
    languages: ["Sinhala","Tamil","English"],
    popularCities: ["Chennai", "Hyderabad", "Mumbai", "Delhi"],
    travelNote: "Colombo has frequent flights to Chennai, Mumbai, Delhi, and Hyderabad for planned surgery and oncology care.",
    visaSteps: defaultVisaSteps("Sri Lanka"),
  },
  "medical-tourism-india-for-iranians": {
    currencyCode: "IRR",
    currencySymbol: "﷼",
    usdToLocalApprox: 42000,
    isoCountryCode: "IR",
    languages: ["Persian","English"],
    popularCities: [...cities.gulf],
    travelNote: "Tehran and other Iranian cities typically connect to Delhi, Mumbai, or Hyderabad via regional hubs for tertiary care.",
    visaSteps: defaultVisaSteps("Iran"),
  },
  "medical-tourism-india-for-jordanians": {
    currencyCode: "JOD",
    currencySymbol: "د.ا",
    usdToLocalApprox: 0.71,
    isoCountryCode: "JO",
    languages: ["Arabic","English"],
    popularCities: [...cities.gulf],
    travelNote: "Amman travelers commonly reach Mumbai, Delhi, or Hyderabad via Gulf hubs for cardiac, oncology, and fertility care.",
    visaSteps: defaultVisaSteps("Jordan"),
  },
  "medical-tourism-india-for-somali-patients": {
    currencyCode: "SOS",
    currencySymbol: "Sh",
    usdToLocalApprox: 570,
    isoCountryCode: "SO",
    languages: ["Somali","Arabic","English"],
    popularCities: [...cities.africa],
    travelNote: "Mogadishu and diaspora families often route through Dubai, Nairobi, or Addis Ababa into Hyderabad, Mumbai, or Delhi.",
    visaSteps: defaultVisaSteps("Somalia"),
  },
  "medical-tourism-india-for-zimbabweans": {
    currencyCode: "USD",
    currencySymbol: "$",
    usdToLocalApprox: 1,
    isoCountryCode: "ZW",
    languages: ["English","Shona","Ndebele"],
    popularCities: [...cities.africa],
    travelNote: "Harare and Bulawayo travelers typically reach India via Johannesburg, Dubai, or Nairobi into major metros.",
    visaSteps: defaultVisaSteps("Zimbabwe"),
  },
  "medical-tourism-india-for-cameroonians": {
    currencyCode: "XAF",
    currencySymbol: "FCFA",
    usdToLocalApprox: 600,
    isoCountryCode: "CM",
    languages: ["French","English"],
    popularCities: [...cities.africa],
    travelNote: "Douala and Yaoundé patients often fly via European or Gulf hubs into Mumbai, Delhi, or Hyderabad.",
    visaSteps: defaultVisaSteps("Cameroon"),
  },
  "medical-tourism-india-for-kazakhstanis": {
    currencyCode: "KZT",
    currencySymbol: "₸",
    usdToLocalApprox: 480,
    isoCountryCode: "KZ",
    languages: ["Kazakh","Russian","English"],
    popularCities: [...cities.west],
    travelNote: "Almaty and Astana travelers commonly reach Delhi or Mumbai via Gulf or Central Asian hubs for specialty care.",
    visaSteps: defaultVisaSteps("Kazakhstan"),
  },
  "medical-tourism-india-for-maldivians": {
    currencyCode: "MVR",
    currencySymbol: "Rf",
    usdToLocalApprox: 15.4,
    isoCountryCode: "MV",
    languages: ["Dhivehi","English"],
    popularCities: ["Chennai", "Bangalore", "Mumbai", "Delhi"],
    travelNote: "Malé has frequent short-haul connections to Chennai, Bangalore, Mumbai, and Delhi for tertiary referrals.",
    visaSteps: defaultVisaSteps("Maldives"),
  },
  "medical-tourism-india-for-canadian-patients": {
    currencyCode: "CAD",
    currencySymbol: "C$",
    usdToLocalApprox: 1.37,
    isoCountryCode: "CA",
    languages: ["English","French"],
    popularCities: [...cities.west],
    travelNote: "Toronto, Vancouver, and Montreal travelers typically fly to Delhi, Mumbai, Bangalore, or Hyderabad for planned elective care.",
    visaSteps: defaultVisaSteps("Canada"),
  },
  "medical-tourism-india-for-australian-patients": {
    currencyCode: "AUD",
    currencySymbol: "A$",
    usdToLocalApprox: 1.52,
    isoCountryCode: "AU",
    languages: ["English"],
    popularCities: [...cities.west],
    travelNote: "Sydney and Melbourne connect to Indian metros via Singapore, Dubai, or direct long-haul options for elective treatment.",
    visaSteps: defaultVisaSteps("Australia"),
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
