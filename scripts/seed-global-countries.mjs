/**
 * Seed high-value country SEO pages missing from the site.
 * Run: node scripts/seed-global-countries.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const countries = [
  {
    code: "NP",
    name: "Nepal",
    shortSlug: "nepal",
    hubSlug: "medical-tourism-india-for-nepalis",
    demonym: "Nepali",
    flag: "np",
    currencyCode: "NPR",
    currencySymbol: "Rs",
    usdToLocalApprox: 133,
    languages: ["Nepali", "English", "Hindi"],
    cities: "southAsia",
    travelNote:
      "Kathmandu patients often travel to Delhi, Varanasi-linked corridors, Mumbai, or Hyderabad for tertiary care.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "kidney-transplant-india", "eye-surgery-india"],
    citiesList: ["Delhi", "Mumbai", "Hyderabad", "Chennai"],
  },
  {
    code: "LK",
    name: "Sri Lanka",
    shortSlug: "sri-lanka",
    hubSlug: "medical-tourism-india-for-sri-lankans",
    demonym: "Sri Lankan",
    flag: "lk",
    currencyCode: "LKR",
    currencySymbol: "Rs",
    usdToLocalApprox: 300,
    languages: ["Sinhala", "Tamil", "English"],
    cities: "southAsia",
    travelNote:
      "Colombo has frequent flights to Chennai, Mumbai, Delhi, and Hyderabad for planned surgery and oncology care.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "knee-replacement-india", "ivf-treatment-india"],
    citiesList: ["Chennai", "Hyderabad", "Mumbai", "Delhi"],
  },
  {
    code: "IR",
    name: "Iran",
    shortSlug: "iran",
    hubSlug: "medical-tourism-india-for-iranians",
    demonym: "Iranian",
    flag: "ir",
    currencyCode: "IRR",
    currencySymbol: "﷼",
    usdToLocalApprox: 42000,
    languages: ["Persian", "English"],
    cities: "gulf",
    travelNote:
      "Tehran and other Iranian cities typically connect to Delhi, Mumbai, or Hyderabad via regional hubs for tertiary care.",
    treatments: ["cancer-treatment-india", "heart-surgery-india", "ivf-treatment-india", "neurosurgery-india"],
    citiesList: ["Delhi", "Mumbai", "Hyderabad", "Chennai"],
  },
  {
    code: "JO",
    name: "Jordan",
    shortSlug: "jordan",
    hubSlug: "medical-tourism-india-for-jordanians",
    demonym: "Jordanian",
    flag: "jo",
    currencyCode: "JOD",
    currencySymbol: "د.ا",
    usdToLocalApprox: 0.71,
    languages: ["Arabic", "English"],
    cities: "gulf",
    travelNote:
      "Amman travelers commonly reach Mumbai, Delhi, or Hyderabad via Gulf hubs for cardiac, oncology, and fertility care.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "ivf-treatment-india", "knee-replacement-india"],
    citiesList: ["Hyderabad", "Mumbai", "Delhi", "Chennai"],
  },
  {
    code: "SO",
    name: "Somalia",
    shortSlug: "somalia",
    hubSlug: "medical-tourism-india-for-somali-patients",
    demonym: "Somali",
    flag: "so",
    currencyCode: "SOS",
    currencySymbol: "Sh",
    usdToLocalApprox: 570,
    languages: ["Somali", "Arabic", "English"],
    cities: "africa",
    travelNote:
      "Mogadishu and diaspora families often route through Dubai, Nairobi, or Addis Ababa into Hyderabad, Mumbai, or Delhi.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "kidney-transplant-india", "eye-surgery-india"],
    citiesList: ["Hyderabad", "Mumbai", "Delhi", "Chennai"],
  },
  {
    code: "ZW",
    name: "Zimbabwe",
    shortSlug: "zimbabwe",
    hubSlug: "medical-tourism-india-for-zimbabweans",
    demonym: "Zimbabwean",
    flag: "zw",
    currencyCode: "USD",
    currencySymbol: "$",
    usdToLocalApprox: 1,
    languages: ["English", "Shona", "Ndebele"],
    cities: "africa",
    travelNote:
      "Harare and Bulawayo travelers typically reach India via Johannesburg, Dubai, or Nairobi into major metros.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "knee-replacement-india", "eye-surgery-india"],
    citiesList: ["Hyderabad", "Chennai", "Mumbai", "Delhi"],
  },
  {
    code: "CM",
    name: "Cameroon",
    shortSlug: "cameroon",
    hubSlug: "medical-tourism-india-for-cameroonians",
    demonym: "Cameroonian",
    flag: "cm",
    currencyCode: "XAF",
    currencySymbol: "FCFA",
    usdToLocalApprox: 600,
    languages: ["French", "English"],
    cities: "africa",
    travelNote:
      "Douala and Yaoundé patients often fly via European or Gulf hubs into Mumbai, Delhi, or Hyderabad.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "kidney-transplant-india", "ivf-treatment-india"],
    citiesList: ["Hyderabad", "Mumbai", "Delhi", "Chennai"],
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    shortSlug: "kazakhstan",
    hubSlug: "medical-tourism-india-for-kazakhstanis",
    demonym: "Kazakhstani",
    flag: "kz",
    currencyCode: "KZT",
    currencySymbol: "₸",
    usdToLocalApprox: 480,
    languages: ["Kazakh", "Russian", "English"],
    cities: "west",
    travelNote:
      "Almaty and Astana travelers commonly reach Delhi or Mumbai via Gulf or Central Asian hubs for specialty care.",
    treatments: ["cancer-treatment-india", "heart-surgery-india", "ivf-treatment-india", "neurosurgery-india"],
    citiesList: ["Delhi", "Mumbai", "Hyderabad", "Bangalore"],
  },
  {
    code: "MV",
    name: "Maldives",
    shortSlug: "maldives",
    hubSlug: "medical-tourism-india-for-maldivians",
    demonym: "Maldivian",
    flag: "mv",
    currencyCode: "MVR",
    currencySymbol: "Rf",
    usdToLocalApprox: 15.4,
    languages: ["Dhivehi", "English"],
    cities: "southAsia",
    travelNote:
      "Malé has frequent short-haul connections to Chennai, Bangalore, Mumbai, and Delhi for tertiary referrals.",
    treatments: ["heart-surgery-india", "cancer-treatment-india", "kidney-transplant-india", "eye-surgery-india"],
    citiesList: ["Chennai", "Bangalore", "Mumbai", "Delhi"],
  },
  {
    code: "CA",
    name: "Canada",
    shortSlug: "canada",
    hubSlug: "medical-tourism-india-for-canadian-patients",
    demonym: "Canadian",
    flag: "ca",
    currencyCode: "CAD",
    currencySymbol: "C$",
    usdToLocalApprox: 1.37,
    languages: ["English", "French"],
    cities: "west",
    travelNote:
      "Toronto, Vancouver, and Montreal travelers typically fly to Delhi, Mumbai, Bangalore, or Hyderabad for planned elective care.",
    treatments: ["dental-implants-india", "knee-replacement-india", "ivf-treatment-india", "cosmetic-surgery-india"],
    citiesList: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
  },
  {
    code: "AU",
    name: "Australia",
    shortSlug: "australia",
    hubSlug: "medical-tourism-india-for-australian-patients",
    demonym: "Australian",
    flag: "au",
    currencyCode: "AUD",
    currencySymbol: "A$",
    usdToLocalApprox: 1.52,
    languages: ["English"],
    cities: "west",
    travelNote:
      "Sydney and Melbourne connect to Indian metros via Singapore, Dubai, or direct long-haul options for elective treatment.",
    treatments: ["dental-implants-india", "ivf-treatment-india", "cosmetic-surgery-india", "knee-replacement-india"],
    citiesList: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
  },
];

function mdxBody(c) {
  const demLower = c.demonym.toLowerCase();
  return `---
name: "${c.name}"
demonym: "${c.demonym}"
primaryKeyword: "medical tourism india for ${demLower}${c.demonym.endsWith("s") || c.demonym.includes(" ") ? "" : "s"}"
shortAnswer: "${c.demonym} patients choose India for affordable, high-quality cardiac, oncology, orthopedic, fertility, and specialty care — with English-speaking teams, medical visa help, airport pickup, and transparent packages typically 50–80% below US, UK, or Gulf private prices."
popularTreatments:
${c.treatments.map((t) => `  - ${t}`).join("\n")}
faqs:
  - question: "Is medical tourism in India safe for ${c.demonym} patients?"
    answer: "Yes — when you choose JCI or NABH accredited hospitals with coordinated facilitation. Techdr matches ${c.demonym} patients with verified partner hospitals, arranges visa invitation letters, and supports airport pickup, admission, and recovery stay."
  - question: "What documents do ${c.demonym} patients need for a medical visa to India?"
    answer: "Typically a valid passport, photos, hospital invitation or appointment letter, medical reports, and the forms required by the Indian mission or e-visa channel serving ${c.name}. We help obtain the hospital letter and guide attendant visas."
  - question: "How long should ${c.demonym} patients plan to stay in India?"
    answer: "Simple procedures may need 7–14 days. Major cardiac, orthopedic, oncology, or transplant pathways often need 2–6 weeks including recovery — we confirm the timeline after medical review."
  - question: "Can a family member accompany a ${c.demonym} patient?"
    answer: "Yes. Medical attendant visas are commonly available. We help plan hotel stay near the hospital and airport pickup for both patient and attendant."
  - question: "Which Indian cities do ${c.demonym} patients choose most?"
    answer: "Patients often choose accredited centres in ${c.citiesList.join(", ")} depending on specialty. Techdr shortlists based on diagnosis, budget, and doctor fit."
  - question: "How do ${c.demonym} families pay for treatment packages?"
    answer: "Hospitals typically quote in USD or INR with a ${c.currencyCode} planning reference. Families often pay by bank transfer, card, or cash as arranged with hospital finance. We explain inclusions before travel."
---

## Medical tourism in India for ${c.demonym} patients

India is a leading destination for ${c.demonym} patients seeking cardiac surgery, cancer treatment, joint replacement, fertility care, transplants, and complex specialty procedures. Techdr Medical Tourism arranges hospital selection, medical visa invitation letters, flights guidance, accommodation near campus, and transparent treatment packages for families from ${c.name}.

Compared with referral networks that only book appointments, our Hyderabad-based team stays with your case from first WhatsApp enquiry through discharge and remote follow-up — so attendants know who to call in India.

## Why ${c.demonym} families choose accredited Indian hospitals

Accredited hospitals combine high procedure volumes with specialist depth and international patient departments that work in English${c.languages.includes("Arabic") ? " and Arabic when needed" : c.languages.includes("French") ? " and French when needed" : ""}. For many families from ${c.name}, the decision is driven by clear package ranges, shorter waiting times for complex surgery, and the ability to bring an attendant.

${c.travelNote}

## Cost planning in ${c.currencyCode}

Packages are quoted in USD with an approximate ${c.currencyCode} reference for family budgeting. Final estimates follow specialist review of reports. Typical savings versus US or UK private care are 50–80% for comparable procedure classes — always confirm inclusions (surgeon fees, implants, ICU days, investigations) before travel.

## How Techdr helps patients from ${c.name}

We arrange hospital and doctor shortlists, free specialist opinions, medical visa invitation letters, airport pickup, interpreters for ${c.languages.filter((l) => l !== "English").slice(0, 2).join(" and ") || "local languages"} when needed, hotel planning near campus, and post-treatment follow-up tailored for ${c.demonym} patients and families.
`;
}

// Fix primaryKeyword for awkward demonyms
function primaryKeywordFix(content, c) {
  const map = {
    "Sri Lankan": "medical tourism india for sri lankans",
    Somali: "medical tourism india for somali patients",
    Canadian: "medical tourism india for canadian patients",
    Australian: "medical tourism india for australian patients",
    Kazakhstani: "medical tourism india for kazakhstanis",
    Maldivian: "medical tourism india for maldivians",
    Cameroonian: "medical tourism india for cameroonians",
    Zimbabwean: "medical tourism india for zimbabweans",
    Jordanian: "medical tourism india for jordanians",
    Iranian: "medical tourism india for iranians",
    Nepali: "medical tourism india for nepalis",
  };
  const pk = map[c.demonym];
  if (!pk) return content;
  return content.replace(/primaryKeyword: "[^"]+"/, `primaryKeyword: "${pk}"`);
}

const countriesDir = path.join(root, "content/countries");
const countriesJsonPath = path.join(root, "content/countries.json");
const metaPath = path.join(root, "src/data/countryMeta.ts");

const existingJson = JSON.parse(fs.readFileSync(countriesJsonPath, "utf8"));
const existingCodes = new Set(existingJson.map((c) => c.code));

let metaSrc = fs.readFileSync(metaPath, "utf8");

for (const c of countries) {
  const mdxPath = path.join(countriesDir, `${c.hubSlug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    fs.writeFileSync(mdxPath, primaryKeywordFix(mdxBody(c), c));
    console.log("wrote", mdxPath);
  } else {
    console.log("skip existing", c.hubSlug);
  }

  if (!existingCodes.has(c.code)) {
    existingJson.push({ code: c.code, name: c.name, slug: c.shortSlug });
    existingCodes.add(c.code);
  }

  const metaKey = `"${c.hubSlug}"`;
  if (!metaSrc.includes(metaKey)) {
    const cityRef =
      c.cities === "africa"
        ? "[...cities.africa]"
        : c.cities === "gulf"
          ? "[...cities.gulf]"
          : c.cities === "west"
            ? "[...cities.west]"
            : `["${c.citiesList.join('", "')}"]`;
    const block = `  "${c.hubSlug}": {
    currencyCode: "${c.currencyCode}",
    currencySymbol: "${c.currencySymbol}",
    usdToLocalApprox: ${c.usdToLocalApprox},
    isoCountryCode: "${c.code}",
    languages: ${JSON.stringify(c.languages)},
    popularCities: ${cityRef},
    travelNote: "${c.travelNote}",
    visaSteps: defaultVisaSteps("${c.name}"),
  },
`;
    metaSrc = metaSrc.replace(
      /\n};\n\nexport function getCountryMeta/,
      `\n${block}};\n\nexport function getCountryMeta`
    );
  }
}

fs.writeFileSync(countriesJsonPath, JSON.stringify(existingJson, null, 2) + "\n");
fs.writeFileSync(metaPath, metaSrc);
console.log("Updated countries.json and countryMeta.ts");
console.log("Total countries.json entries:", existingJson.length);
