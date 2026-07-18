/**
 * Expands cosmetic, dermatology/skin, and hematology/BMT procedure pages
 * with SEO / AEO / GEO fields, FAQs, and category updates.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const proceduresPath = path.join(root, "content/procedures.json");
const faqsPath = path.join(root, "content/faqs.json");
const categoriesPath = path.join(root, "content/categories.json");

const GEO_CITIES = [
  "Hyderabad",
  "Delhi NCR",
  "Mumbai",
  "Chennai",
  "Bangalore",
];

const COSMETIC_IMG =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80";
const SKIN_IMG =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=80";
const HEME_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

const HOSPITALS = {
  cosmetic: [
    "kokilaben-hospital-mumbai",
    "manipal-hospital-bangalore",
    "apollo-hospitals-hyderabad",
    "apollo-hospitals-chennai",
  ],
  skin: [
    "manipal-hospital-bangalore",
    "apollo-hospitals-chennai",
    "max-healthcare-delhi",
    "apollo-hospitals-hyderabad",
  ],
  heme: [
    "apollo-hospitals-chennai",
    "medanta-gurugram",
    "yashoda-hospitals-hyderabad",
    "max-healthcare-delhi",
    "fortis-hospital-delhi",
  ],
};

function keywords(name, extras = []) {
  const n = name.toLowerCase();
  return [
    `${n} india`,
    `${n} cost india`,
    `${n} in india for foreigners`,
    `${n} price india`,
    `${n} package india`,
    `best ${n} india`,
    `affordable ${n} india`,
    `medical tourism ${n}`,
    `${n} hyderabad`,
    `${n} delhi`,
    `${n} mumbai`,
    `${n} chennai`,
    `${n} bangalore`,
    ...extras,
  ];
}

function faqsFor(slug, name, min, max, recovery, extras = []) {
  return [
    {
      question: `How much does ${name.toLowerCase()} cost in India?`,
      answer: `${name} packages for international patients typically range from $${min.toLocaleString()}–$${max.toLocaleString()} USD depending on hospital, room class, and clinical complexity. Final quotes follow medical review.`,
    },
    {
      question: `How long is recovery after ${name.toLowerCase()}?`,
      answer: recovery,
    },
    {
      question: `Is ${name.toLowerCase()} available for foreign patients in India?`,
      answer:
        "Yes. Techdr coordinates care for international patients at partner hospitals — including second opinions, written estimates, visa support, interpreters, and travel logistics across Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore.",
    },
    {
      question: "Can I get a written estimate before I travel?",
      answer:
        "Yes. Share your reports and we’ll help obtain package estimates from partner centers before you book flights whenever clinical information is sufficient.",
    },
    ...extras,
  ];
}

function procedure({
  slug,
  categorySlug,
  name,
  overview,
  shortAnswer,
  min,
  max,
  usaMin,
  usaMax,
  ukMin,
  ukMax,
  uaeMin,
  uaeMax,
  recovery,
  steps,
  hospitals,
  related,
  image,
  extras = [],
  doctorSlugs = [],
}) {
  return {
    slug,
    categorySlug,
    name,
    metaTitle: `${name} Cost in India for Foreigners | Medical Tourism`,
    metaDescription: `${name} in India typically costs $${min.toLocaleString()}–$${max.toLocaleString()} USD for international patients. Compare hospitals in Hyderabad, Delhi, Mumbai, Chennai & Bangalore vs USA/UK prices.`,
    h1: `${name} Cost in India`,
    overview,
    shortAnswer,
    geoCities: GEO_CITIES,
    costIndia: { min, max, currency: "USD" },
    costComparison: [
      { country: "USA", min: usaMin, max: usaMax },
      { country: "UK", min: ukMin, max: ukMax },
      { country: "UAE", min: uaeMin, max: uaeMax },
    ],
    recoveryTime: recovery,
    procedureSteps: steps,
    hospitalSlugs: hospitals,
    doctorSlugs,
    faqSlugKey: slug,
    relatedProcedures: related,
    images: [{ src: image, alt: `${name} in India for international patients` }],
    keywords: keywords(name, extras),
  };
}

const defaultCosmeticSteps = (label) => [
  `Share photos and medical history for a remote ${label} review`,
  "Receive board-certified plastic surgeon options and a written package estimate",
  "Arrive for in-person consultation, pre-op labs, and admission planning",
  `Undergo ${label} at an accredited hospital with anesthesia support`,
  "Recovery monitoring, medications, and travel-clearance guidance before flying home",
];

const defaultSkinSteps = (label) => [
  `Share clinical photos and prior treatment history for a remote ${label} review`,
  "Receive dermatology center options and a written package estimate",
  "Arrive for in-person assessment and treatment planning",
  `Begin ${label} (procedure or therapy protocol as advised)`,
  "Follow-up plan, medications/creams, and remote check-ins after you return home",
];

const defaultHemeSteps = (label) => [
  `Share blood reports, bone marrow reports, and imaging for a remote ${label} review`,
  "Receive hematology-oncology center options and a written package estimate",
  "Arrive for workup, donor matching (if needed), and admission planning",
  `Undergo ${label} with inpatient monitoring in a specialized unit`,
  "Discharge planning, infection precautions, and remote follow-up before travel home",
];

/** New cosmetic procedures */
const newCosmetic = [
  procedure({
    slug: "blepharoplasty-eyelid-surgery-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Blepharoplasty (Eyelid Surgery)",
    overview:
      "Upper and/or lower eyelid surgery removes excess skin and fat to refresh tired eyes. India offers experienced oculoplastic and plastic surgeons at a fraction of Western aesthetic surgery prices.",
    shortAnswer:
      "Blepharoplasty (eyelid surgery) in India for foreigners typically costs $1,200–$3,200 USD — often 60–70% less than USA or UK — at accredited centers in Hyderabad, Delhi, Mumbai, Chennai, and Bangalore.",
    min: 1200,
    max: 3200,
    usaMin: 4500,
    usaMax: 9000,
    ukMin: 3000,
    ukMax: 6500,
    uaeMin: 2800,
    uaeMax: 6000,
    recovery: "Day-care or overnight; bruising/swelling 1–2 weeks; avoid early flights if advised",
    steps: defaultCosmeticSteps("blepharoplasty"),
    hospitals: HOSPITALS.cosmetic,
    related: ["facelift-surgery-india", "brow-lift-forehead-lift-india"],
    image: COSMETIC_IMG,
    extras: ["eyelid surgery cost india", "eye bag removal india for foreigners"],
  }),
  procedure({
    slug: "mommy-makeover-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Mommy Makeover",
    overview:
      "A mommy makeover combines tummy tuck, breast lift/augmentation, and often liposuction to restore post-pregnancy body contour. Packages are customized; staged vs single-session surgery is planned for safety.",
    shortAnswer:
      "Mommy makeover surgery in India for international patients typically costs $4,500–$9,500 USD depending on combined procedures — substantially lower than USA packages of $15,000–$30,000+.",
    min: 4500,
    max: 9500,
    usaMin: 15000,
    usaMax: 30000,
    ukMin: 10000,
    ukMax: 20000,
    uaeMin: 9000,
    uaeMax: 18000,
    recovery: "Hospital 2–4 days; limited activity 4–6 weeks; plan extended stay in India",
    steps: defaultCosmeticSteps("mommy makeover"),
    hospitals: HOSPITALS.cosmetic,
    related: [
      "tummy-tuck-abdominoplasty-india",
      "breast-augmentation-reduction-india",
      "liposuction-cost-india",
    ],
    image: COSMETIC_IMG,
    extras: ["post pregnancy plastic surgery india", "mommy makeover package india"],
  }),
  procedure({
    slug: "brazilian-butt-lift-bbl-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Brazilian Butt Lift (BBL)",
    overview:
      "BBL uses liposuction fat transfer to enhance buttock shape. Safety depends on surgeon technique and hospital protocols — we refer only accredited centers with ICU backup for international patients.",
    shortAnswer:
      "Brazilian butt lift (BBL) in India typically costs $3,000–$6,500 USD for foreigners, versus $10,000–$20,000+ in the USA. Choose hospitals with strict fat-grafting safety protocols.",
    min: 3000,
    max: 6500,
    usaMin: 10000,
    usaMax: 20000,
    ukMin: 7000,
    ukMax: 14000,
    uaeMin: 6500,
    uaeMax: 12000,
    recovery: "Short stay; no sitting directly for weeks; compression garments required",
    steps: defaultCosmeticSteps("BBL / fat transfer"),
    hospitals: HOSPITALS.cosmetic,
    related: ["liposuction-cost-india", "fat-grafting-transfer-india"],
    image: COSMETIC_IMG,
    extras: ["BBL cost india", "buttock fat transfer india for foreigners"],
  }),
  procedure({
    slug: "chin-augmentation-genioplasty-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Chin Augmentation (Genioplasty)",
    overview:
      "Chin implants or sliding genioplasty improve facial balance and profile. Often planned with rhinoplasty for harmony; imaging and surgical planning are done before travel when possible.",
    shortAnswer:
      "Chin augmentation / genioplasty in India typically costs $1,500–$3,800 USD for international patients — often half or less of USA/UK aesthetic surgery pricing.",
    min: 1500,
    max: 3800,
    usaMin: 5000,
    usaMax: 10000,
    ukMin: 3500,
    ukMax: 7000,
    uaeMin: 3200,
    uaeMax: 6500,
    recovery: "Overnight or short stay; soft diet initially; swelling settles over weeks",
    steps: defaultCosmeticSteps("chin augmentation"),
    hospitals: HOSPITALS.cosmetic,
    related: ["rhinoplasty-cost-india", "facelift-surgery-india"],
    image: COSMETIC_IMG,
    extras: ["chin implant cost india", "genioplasty india for foreigners"],
  }),
  procedure({
    slug: "brow-lift-forehead-lift-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Brow Lift (Forehead Lift)",
    overview:
      "Brow lift elevates heavy brows and softens forehead lines. Endoscopic or open techniques are available; often combined with blepharoplasty for upper-face rejuvenation.",
    shortAnswer:
      "Brow lift (forehead lift) in India for foreigners typically costs $2,200–$5,000 USD at accredited plastic surgery centers, with savings of 50–70% vs Western markets.",
    min: 2200,
    max: 5000,
    usaMin: 7000,
    usaMax: 14000,
    ukMin: 5000,
    ukMax: 10000,
    uaeMin: 4500,
    uaeMax: 9000,
    recovery: "Short stay; bruising 1–2 weeks; hairline care as advised",
    steps: defaultCosmeticSteps("brow lift"),
    hospitals: HOSPITALS.cosmetic,
    related: ["blepharoplasty-eyelid-surgery-india", "facelift-surgery-india"],
    image: COSMETIC_IMG,
    extras: ["forehead lift cost india", "endoscopic brow lift india"],
  }),
  procedure({
    slug: "ear-reshaping-otoplasty-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Ear Reshaping (Otoplasty)",
    overview:
      "Otoplasty corrects prominent or asymmetric ears. Suitable for adults and older teens; usually day-care surgery with a protective headband during early recovery.",
    shortAnswer:
      "Otoplasty (ear reshaping) in India typically costs $1,000–$2,500 USD for international patients — significantly lower than USA averages of $4,000–$8,000.",
    min: 1000,
    max: 2500,
    usaMin: 4000,
    usaMax: 8000,
    ukMin: 2800,
    ukMax: 5500,
    uaeMin: 2500,
    uaeMax: 5000,
    recovery: "Day-care; headband for 1–2 weeks; avoid contact sports initially",
    steps: defaultCosmeticSteps("otoplasty"),
    hospitals: HOSPITALS.cosmetic,
    related: ["rhinoplasty-cost-india", "facelift-surgery-india"],
    image: COSMETIC_IMG,
    extras: ["otoplasty cost india", "prominent ear correction india"],
  }),
  procedure({
    slug: "breast-lift-mastopexy-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Breast Lift (Mastopexy)",
    overview:
      "Mastopexy lifts and reshapes sagging breasts, with or without implants. Ideal for post-pregnancy or weight-loss patients seeking contour without necessarily increasing size.",
    shortAnswer:
      "Breast lift (mastopexy) in India for foreigners typically costs $2,400–$5,200 USD. Combining lift with implants affects package pricing — confirmed after surgeon review.",
    min: 2400,
    max: 5200,
    usaMin: 8000,
    usaMax: 15000,
    ukMin: 5500,
    ukMax: 11000,
    uaeMin: 5000,
    uaeMax: 10000,
    recovery: "Short hospital stay; support bra and activity limits for several weeks",
    steps: defaultCosmeticSteps("breast lift"),
    hospitals: HOSPITALS.cosmetic,
    related: [
      "breast-augmentation-reduction-india",
      "mommy-makeover-india",
    ],
    image: COSMETIC_IMG,
    extras: ["mastopexy cost india", "breast lift surgery india for foreigners"],
  }),
  procedure({
    slug: "body-contouring-after-weight-loss-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Body Contouring After Weight Loss",
    overview:
      "Post-bariatric body contouring addresses excess skin of the arms, thighs, abdomen, and chest after major weight loss. Staged surgeries are common for safety and healing.",
    shortAnswer:
      "Body contouring after weight loss in India typically costs $3,500–$12,000 USD depending on areas treated — often 60%+ less than comparable USA packages.",
    min: 3500,
    max: 12000,
    usaMin: 15000,
    usaMax: 40000,
    ukMin: 10000,
    ukMax: 28000,
    uaeMin: 9000,
    uaeMax: 25000,
    recovery: "Hospital 2–5 days per stage; weeks of limited mobility; plan multi-week stay",
    steps: defaultCosmeticSteps("body contouring"),
    hospitals: HOSPITALS.cosmetic,
    related: [
      "tummy-tuck-abdominoplasty-india",
      "bariatric-weight-loss-surgery-india",
      "liposuction-cost-india",
    ],
    image: COSMETIC_IMG,
    extras: [
      "post bariatric plastic surgery india",
      "arm lift thigh lift india cost",
    ],
  }),
  procedure({
    slug: "fat-grafting-transfer-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Fat Grafting / Fat Transfer",
    overview:
      "Autologous fat transfer restores volume to face, breasts, or body using your own harvested fat. Survival rates vary; surgeons plan touch-up sessions when needed.",
    shortAnswer:
      "Fat grafting / fat transfer in India for foreigners typically costs $1,800–$4,500 USD depending on volume and areas treated, at accredited aesthetic surgery centers.",
    min: 1800,
    max: 4500,
    usaMin: 6000,
    usaMax: 15000,
    ukMin: 4000,
    ukMax: 10000,
    uaeMin: 3500,
    uaeMax: 9000,
    recovery: "Day-care or overnight; swelling weeks; avoid pressure on grafted areas",
    steps: defaultCosmeticSteps("fat grafting"),
    hospitals: HOSPITALS.cosmetic,
    related: ["brazilian-butt-lift-bbl-india", "liposuction-cost-india"],
    image: COSMETIC_IMG,
    extras: ["fat transfer cost india", "facial fat grafting india"],
  }),
  procedure({
    slug: "scar-revision-surgery-india",
    categorySlug: "cosmetic-plastic-surgery-india",
    name: "Scar Revision Surgery",
    overview:
      "Surgical and laser scar revision improves appearance of traumatic, surgical, or burn scars. Treatment plans may combine excision, Z-plasty, lasers, and silicone therapy.",
    shortAnswer:
      "Scar revision surgery in India typically costs $400–$3,500 USD for international patients depending on scar size, location, and whether laser or reconstructive techniques are used.",
    min: 400,
    max: 3500,
    usaMin: 2000,
    usaMax: 12000,
    ukMin: 1500,
    ukMax: 8000,
    uaeMin: 1200,
    uaeMax: 7000,
    recovery: "Often day-care; scar maturation months; sun protection essential",
    steps: defaultCosmeticSteps("scar revision"),
    hospitals: HOSPITALS.cosmetic,
    related: ["keloid-scar-treatment-india", "burn-scar-reconstruction-india"],
    image: COSMETIC_IMG,
    extras: ["scar removal surgery india", "keloid surgery india cost"],
  }),
];

/** New dermatology / skin procedures */
const newSkin = [
  procedure({
    slug: "acne-scar-treatment-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Acne Scar Treatment",
    overview:
      "Microneedling, fractional lasers, subcision, and TCA CROSS improve atrophic acne scars. India’s high-volume dermatology clinics offer multi-session packages for medical tourists.",
    shortAnswer:
      "Acne scar treatment in India for foreigners typically costs $300–$2,500 USD per package (often multi-session lasers or combination therapy) — far below USA dermatology pricing.",
    min: 300,
    max: 2500,
    usaMin: 2000,
    usaMax: 10000,
    ukMin: 1200,
    ukMax: 6000,
    uaeMin: 1000,
    uaeMax: 5500,
    recovery: "Outpatient sessions; redness days after lasers; sun avoidance critical",
    steps: defaultSkinSteps("acne scar treatment"),
    hospitals: HOSPITALS.skin,
    related: ["laser-skin-resurfacing-india", "chemical-peel-india"],
    image: SKIN_IMG,
    extras: ["acne scar laser india", "fractional CO2 acne scars india"],
  }),
  procedure({
    slug: "laser-skin-resurfacing-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Laser Skin Resurfacing",
    overview:
      "Fractional CO2, Erbium, and other resurfacing lasers treat wrinkles, scars, and sun damage. Packages specify laser type, sessions, and aftercare — important for darker skin types.",
    shortAnswer:
      "Laser skin resurfacing in India typically costs $400–$3,000 USD for international patients depending on laser modality and number of sessions at accredited dermatology centers.",
    min: 400,
    max: 3000,
    usaMin: 2500,
    usaMax: 12000,
    ukMin: 1500,
    ukMax: 7000,
    uaeMin: 1200,
    uaeMax: 6500,
    recovery: "Outpatient; peeling/redness days to 2 weeks depending on depth",
    steps: defaultSkinSteps("laser skin resurfacing"),
    hospitals: HOSPITALS.skin,
    related: ["acne-scar-treatment-india", "hyperpigmentation-melasma-treatment-india"],
    image: SKIN_IMG,
    extras: ["CO2 laser india cost", "laser resurfacing for foreigners india"],
  }),
  procedure({
    slug: "mole-skin-lesion-removal-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Mole & Skin Lesion Removal",
    overview:
      "Excision or laser removal of moles, cysts, and benign lesions with histopathology when indicated. Suspicious lesions are routed to skin cancer pathways.",
    shortAnswer:
      "Mole and skin lesion removal in India for foreigners typically costs $100–$800 USD per lesion (pathology extra when needed) at dermatology and plastic surgery clinics.",
    min: 100,
    max: 800,
    usaMin: 500,
    usaMax: 3500,
    ukMin: 350,
    ukMax: 2000,
    uaeMin: 300,
    uaeMax: 1800,
    recovery: "Day-care; stitches if excised; wound care 7–14 days",
    steps: defaultSkinSteps("mole / lesion removal"),
    hospitals: HOSPITALS.skin,
    related: ["skin-cancer-surgery-india", "scar-revision-surgery-india"],
    image: SKIN_IMG,
    extras: ["mole removal cost india", "skin tag removal india for foreigners"],
  }),
  procedure({
    slug: "eczema-atopic-dermatitis-treatment-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Eczema / Atopic Dermatitis Treatment",
    overview:
      "Comprehensive eczema care including topical protocols, phototherapy, and systemic/biologic counseling for severe disease. Ideal for patients seeking specialist review and affordable drug pathways.",
    shortAnswer:
      "Eczema / atopic dermatitis treatment packages in India typically cost $200–$2,500 USD for evaluation and therapy initiation; biologic drug costs are quoted separately after dermatology review.",
    min: 200,
    max: 2500,
    usaMin: 1500,
    usaMax: 15000,
    ukMin: 900,
    ukMax: 8000,
    uaeMin: 800,
    uaeMax: 7000,
    recovery: "Mostly outpatient; flare control over weeks",
    steps: defaultSkinSteps("eczema treatment"),
    hospitals: HOSPITALS.skin,
    related: ["psoriasis-treatment-india", "vitiligo-treatment-india"],
    image: SKIN_IMG,
    extras: ["atopic dermatitis treatment india", "eczema biologics india cost"],
  }),
  procedure({
    slug: "chemical-peel-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Chemical Peel",
    overview:
      "Superficial to medium-depth peels for pigmentation, acne, and texture. Medical-grade peels at dermatology clinics are preferred over spa settings for international patients.",
    shortAnswer:
      "Medical chemical peels in India for foreigners typically cost $80–$600 USD per session depending on peel depth and area treated.",
    min: 80,
    max: 600,
    usaMin: 300,
    usaMax: 2500,
    ukMin: 200,
    ukMax: 1500,
    uaeMin: 180,
    uaeMax: 1200,
    recovery: "Outpatient; peeling 3–7 days; strict sun protection",
    steps: defaultSkinSteps("chemical peel"),
    hospitals: HOSPITALS.skin,
    related: ["hyperpigmentation-melasma-treatment-india", "acne-scar-treatment-india"],
    image: SKIN_IMG,
    extras: ["glycolic peel india cost", "TCA peel india for foreigners"],
  }),
  procedure({
    slug: "hair-loss-treatment-prp-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Hair Loss Treatment (PRP / Medical)",
    overview:
      "Medical hair-loss pathways include PRP, mesotherapy, oral/topical regimens, and trichology assessment. Distinct from surgical hair transplant — often used before or after FUE.",
    shortAnswer:
      "PRP and medical hair-loss treatment in India typically costs $150–$1,200 USD per session/package for international patients; transplant packages are priced separately by graft count.",
    min: 150,
    max: 1200,
    usaMin: 800,
    usaMax: 4000,
    ukMin: 500,
    ukMax: 2500,
    uaeMin: 450,
    uaeMax: 2200,
    recovery: "Outpatient; mild scalp tenderness 1–2 days after PRP",
    steps: defaultSkinSteps("hair loss / PRP treatment"),
    hospitals: HOSPITALS.skin,
    related: ["hair-transplant-cost-india", "vitiligo-treatment-india"],
    image: SKIN_IMG,
    extras: ["PRP hair treatment india cost", "trichology treatment india for foreigners"],
  }),
  procedure({
    slug: "keloid-scar-treatment-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Keloid Scar Treatment",
    overview:
      "Keloids are managed with steroid injections, silicone, cryotherapy, laser, and selective surgery with adjuvant therapy to reduce recurrence — critical for ear and chest keloids.",
    shortAnswer:
      "Keloid scar treatment in India for foreigners typically costs $150–$2,000 USD depending on injections, laser sessions, or surgical excision with recurrence-prevention protocols.",
    min: 150,
    max: 2000,
    usaMin: 1000,
    usaMax: 8000,
    ukMin: 700,
    ukMax: 5000,
    uaeMin: 600,
    uaeMax: 4500,
    recovery: "Outpatient series; surgical cases need wound care weeks",
    steps: defaultSkinSteps("keloid treatment"),
    hospitals: HOSPITALS.skin,
    related: ["scar-revision-surgery-india", "acne-scar-treatment-india"],
    image: SKIN_IMG,
    extras: ["keloid injection india cost", "keloid surgery india for foreigners"],
  }),
  procedure({
    slug: "hyperpigmentation-melasma-treatment-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Hyperpigmentation & Melasma Treatment",
    overview:
      "Melasma and facial hyperpigmentation protocols combine medical peels, lasers suitable for skin of colour, and maintenance regimens — important for Middle Eastern, African, and South Asian patients.",
    shortAnswer:
      "Melasma and hyperpigmentation treatment in India typically costs $200–$2,000 USD for multi-session packages tailored to skin type, with strong emphasis on maintenance and sun protection.",
    min: 200,
    max: 2000,
    usaMin: 1500,
    usaMax: 8000,
    ukMin: 900,
    ukMax: 5000,
    uaeMin: 800,
    uaeMax: 4500,
    recovery: "Outpatient sessions over weeks; sun avoidance mandatory",
    steps: defaultSkinSteps("melasma / pigmentation treatment"),
    hospitals: HOSPITALS.skin,
    related: ["chemical-peel-india", "laser-skin-resurfacing-india"],
    image: SKIN_IMG,
    extras: ["melasma treatment india cost", "pigmentation laser india for foreigners"],
  }),
  procedure({
    slug: "burn-scar-reconstruction-india",
    categorySlug: "dermatology-skin-care-india",
    name: "Burn Scar Reconstruction",
    overview:
      "Reconstructive plastic surgery and dermatology teams treat contractures and disfiguring burn scars with grafts, flaps, lasers, and staged release — a major medical tourism strength in India.",
    shortAnswer:
      "Burn scar reconstruction in India for international patients typically costs $1,500–$12,000 USD depending on area, contracture severity, and number of staged surgeries.",
    min: 1500,
    max: 12000,
    usaMin: 10000,
    usaMax: 50000,
    ukMin: 7000,
    ukMax: 30000,
    uaeMin: 6000,
    uaeMax: 25000,
    recovery: "Hospital stay varies; physiotherapy often essential; multi-stage possible",
    steps: defaultSkinSteps("burn scar reconstruction"),
    hospitals: HOSPITALS.skin,
    related: ["scar-revision-surgery-india", "skin-cancer-surgery-india"],
    image: SKIN_IMG,
    extras: ["burn contracture surgery india", "burn scar treatment india cost"],
  }),
];

/** Hematology & bone marrow category procedures */
const newHeme = [
  procedure({
    slug: "leukemia-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Leukemia Treatment",
    overview:
      "Induction chemotherapy, targeted therapy, and transplant pathways for ALL, AML, CLL, and CML at Indian hematology-oncology centers. Protocols follow international guidelines with transparent drug and isolation costs.",
    shortAnswer:
      "Leukemia treatment in India for foreigners typically costs $8,000–$35,000 USD for chemotherapy pathways; allogeneic transplant packages are higher and quoted after hematology review.",
    min: 8000,
    max: 35000,
    usaMin: 80000,
    usaMax: 300000,
    ukMin: 50000,
    ukMax: 180000,
    uaeMin: 40000,
    uaeMax: 150000,
    recovery: "Weeks of inpatient/outpatient chemo cycles; transplant adds isolation weeks",
    steps: defaultHemeSteps("leukemia treatment"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "lymphoma-treatment-india",
      "car-t-cell-therapy-india",
    ],
    image: HEME_IMG,
    doctorSlugs: ["dr-anita-sharma-oncologist"],
    extras: [
      "ALL AML treatment india cost",
      "leukemia chemotherapy india for foreigners",
    ],
  }),
  procedure({
    slug: "lymphoma-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Lymphoma Treatment",
    overview:
      "Hodgkin and non-Hodgkin lymphoma care including chemo-immunotherapy, PET-guided staging, radiation, and transplant for relapsed disease at high-volume Indian cancer centers.",
    shortAnswer:
      "Lymphoma treatment in India typically costs $6,000–$28,000 USD for international patients depending on subtype, cycles, and whether stem-cell transplant is required.",
    min: 6000,
    max: 28000,
    usaMin: 70000,
    usaMax: 250000,
    ukMin: 40000,
    ukMax: 150000,
    uaeMin: 35000,
    uaeMax: 120000,
    recovery: "Outpatient/inpatient cycles over months; transplant extends stay",
    steps: defaultHemeSteps("lymphoma treatment"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "leukemia-treatment-india",
      "immunotherapy-cost-india",
    ],
    image: HEME_IMG,
    doctorSlugs: ["dr-anita-sharma-oncologist"],
    extras: [
      "Hodgkin lymphoma treatment india",
      "non-Hodgkin lymphoma cost india",
    ],
  }),
  procedure({
    slug: "thalassemia-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Thalassemia Treatment",
    overview:
      "India is a global hub for thalassemia major care — transfusion programs, chelation, and curative bone marrow / stem cell transplant for eligible children and young adults from Africa, Middle East, and South Asia.",
    shortAnswer:
      "Thalassemia treatment in India ranges from ongoing transfusion/chelation packages to curative bone marrow transplant typically $18,000–$45,000 USD — a fraction of Western transplant costs.",
    min: 5000,
    max: 45000,
    usaMin: 100000,
    usaMax: 400000,
    ukMin: 60000,
    ukMax: 220000,
    uaeMin: 50000,
    uaeMax: 180000,
    recovery: "Transfusion day-care; BMT requires weeks of isolation and months of follow-up",
    steps: defaultHemeSteps("thalassemia treatment / transplant evaluation"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "sickle-cell-treatment-india",
      "aplastic-anemia-treatment-india",
    ],
    image: HEME_IMG,
    extras: [
      "thalassemia bone marrow transplant india",
      "thalassemia major treatment india for foreigners",
    ],
  }),
  procedure({
    slug: "sickle-cell-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Sickle Cell Disease Treatment",
    overview:
      "Comprehensive sickle cell care including crisis management, hydroxyurea optimization, exchange transfusion planning, and curative transplant for selected patients — highly relevant for African medical tourists.",
    shortAnswer:
      "Sickle cell disease treatment in India for foreigners typically costs $3,000–$40,000 USD depending on medical management vs curative bone marrow transplant pathway.",
    min: 3000,
    max: 40000,
    usaMin: 50000,
    usaMax: 350000,
    ukMin: 30000,
    ukMax: 200000,
    uaeMin: 25000,
    uaeMax: 160000,
    recovery: "Varies: outpatient disease management vs weeks of transplant isolation",
    steps: defaultHemeSteps("sickle cell treatment"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "thalassemia-treatment-india",
      "leukemia-treatment-india",
    ],
    image: HEME_IMG,
    extras: [
      "sickle cell transplant india cost",
      "sickle cell treatment india for african patients",
    ],
  }),
  procedure({
    slug: "aplastic-anemia-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Aplastic Anemia Treatment",
    overview:
      "Immunosuppressive therapy and allogeneic stem cell transplant for severe aplastic anemia at specialized Indian BMT units with HEPA isolation and experienced transplant teams.",
    shortAnswer:
      "Aplastic anemia treatment in India typically costs $10,000–$45,000 USD for international patients depending on IST vs allogeneic transplant and donor availability.",
    min: 10000,
    max: 45000,
    usaMin: 120000,
    usaMax: 400000,
    ukMin: 70000,
    ukMax: 220000,
    uaeMin: 55000,
    uaeMax: 180000,
    recovery: "Prolonged cytopenia monitoring; transplant isolation weeks to months",
    steps: defaultHemeSteps("aplastic anemia treatment"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "leukemia-treatment-india",
      "thalassemia-treatment-india",
    ],
    image: HEME_IMG,
    extras: [
      "severe aplastic anemia transplant india",
      "aplastic anemia treatment cost india foreigners",
    ],
  }),
  procedure({
    slug: "multiple-myeloma-treatment-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Multiple Myeloma Treatment",
    overview:
      "Induction therapy, autologous stem cell transplant, and maintenance regimens for multiple myeloma. Novel agents and transplant packages are quoted transparently after staging.",
    shortAnswer:
      "Multiple myeloma treatment in India for foreigners typically costs $12,000–$40,000 USD including autologous transplant pathways — often 70%+ less than USA totals.",
    min: 12000,
    max: 40000,
    usaMin: 100000,
    usaMax: 350000,
    ukMin: 60000,
    ukMax: 200000,
    uaeMin: 50000,
    uaeMax: 160000,
    recovery: "Induction months; auto-transplant adds hospital isolation weeks",
    steps: defaultHemeSteps("multiple myeloma treatment"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "lymphoma-treatment-india",
      "chemotherapy-cost-india",
    ],
    image: HEME_IMG,
    doctorSlugs: ["dr-anita-sharma-oncologist"],
    extras: [
      "myeloma autologous transplant india",
      "multiple myeloma cost india for foreigners",
    ],
  }),
  procedure({
    slug: "car-t-cell-therapy-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "CAR-T Cell Therapy",
    overview:
      "CAR-T cell therapy for eligible relapsed/refractory blood cancers is available at select Indian centers at a fraction of US list prices. Eligibility, manufacturing timelines, and ICU readiness drive candidacy.",
    shortAnswer:
      "CAR-T cell therapy in India for eligible international patients typically costs $40,000–$80,000 USD — dramatically lower than USA prices often exceeding $300,000–$500,000.",
    min: 40000,
    max: 80000,
    usaMin: 300000,
    usaMax: 500000,
    ukMin: 250000,
    ukMax: 400000,
    uaeMin: 200000,
    uaeMax: 350000,
    recovery: "Hospital stay for infusion and CRS monitoring; weeks of close follow-up",
    steps: defaultHemeSteps("CAR-T cell therapy"),
    hospitals: HOSPITALS.heme,
    related: [
      "leukemia-treatment-india",
      "lymphoma-treatment-india",
      "bone-marrow-transplant-india",
    ],
    image: HEME_IMG,
    extras: [
      "CAR T therapy cost india",
      "CAR-T cell therapy india for foreigners",
    ],
  }),
  procedure({
    slug: "autologous-stem-cell-transplant-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Autologous Stem Cell Transplant",
    overview:
      "Autologous HSCT uses the patient’s own stem cells — common in myeloma and some lymphomas. India’s BMT units offer HEPA rooms and experienced transplant nursing at competitive package rates.",
    shortAnswer:
      "Autologous stem cell transplant in India typically costs $15,000–$30,000 USD for international patients, versus $100,000–$250,000+ in the USA.",
    min: 15000,
    max: 30000,
    usaMin: 100000,
    usaMax: 250000,
    ukMin: 60000,
    ukMax: 150000,
    uaeMin: 50000,
    uaeMax: 120000,
    recovery: "2–4 weeks hospital isolation typical; outpatient follow-up months",
    steps: defaultHemeSteps("autologous stem cell transplant"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "multiple-myeloma-treatment-india",
      "allogeneic-stem-cell-transplant-india",
    ],
    image: HEME_IMG,
    extras: [
      "auto HSCT india cost",
      "autologous bone marrow transplant india",
    ],
  }),
  procedure({
    slug: "allogeneic-stem-cell-transplant-india",
    categorySlug: "hematology-bone-marrow-india",
    name: "Allogeneic Stem Cell Transplant",
    overview:
      "Allogeneic transplant from matched related, unrelated, or haploidentical donors treats leukemias, aplastic anemia, and hemoglobinopathies. Donor search and GVHD prophylaxis are built into package planning.",
    shortAnswer:
      "Allogeneic stem cell transplant in India for foreigners typically costs $25,000–$55,000 USD depending on donor type, conditioning, and isolation length — a major savings vs Western markets.",
    min: 25000,
    max: 55000,
    usaMin: 200000,
    usaMax: 450000,
    ukMin: 100000,
    ukMax: 280000,
    uaeMin: 80000,
    uaeMax: 220000,
    recovery: "Weeks in isolation; months of immunosuppression and infection monitoring",
    steps: defaultHemeSteps("allogeneic stem cell transplant"),
    hospitals: HOSPITALS.heme,
    related: [
      "bone-marrow-transplant-india",
      "autologous-stem-cell-transplant-india",
      "leukemia-treatment-india",
    ],
    image: HEME_IMG,
    extras: [
      "allo HSCT india cost",
      "haploidentical transplant india for foreigners",
    ],
  }),
];

function enrichExisting(p) {
  const cosmetic = p.categorySlug === "cosmetic-plastic-surgery-india";
  const skin = p.categorySlug === "dermatology-skin-care-india";
  const bmt = p.slug === "bone-marrow-transplant-india";

  if (!cosmetic && !skin && !bmt) return p;

  const shortAnswers = {
    "rhinoplasty-cost-india":
      "Rhinoplasty (nose job) in India for foreigners typically costs $1,800–$4,000 USD — often 50–70% less than USA or UK — at accredited plastic surgery centers in Hyderabad, Delhi, Mumbai, Chennai, and Bangalore.",
    "liposuction-cost-india":
      "Liposuction in India typically costs $1,500–$4,500 USD for international patients depending on areas treated and technique (including VASER), with savings of 60%+ vs Western packages.",
    "breast-augmentation-reduction-india":
      "Breast augmentation or reduction in India for foreigners typically costs $2,500–$5,500 USD including implant options where applicable — substantially below USA averages of $8,000–$15,000.",
    "tummy-tuck-abdominoplasty-india":
      "Tummy tuck (abdominoplasty) in India typically costs $2,800–$5,500 USD for international patients, often combined with liposuction; recovery planning should allow several weeks in-country.",
    "hair-transplant-cost-india":
      "Hair transplant (FUE/FUT) in India typically costs $1,200–$3,500 USD for foreigners, priced by graft count — among the most sought medical tourism procedures in Hyderabad, Delhi, Mumbai, Chennai, and Bangalore.",
    "facelift-surgery-india":
      "Facelift surgery in India for international patients typically costs $3,000–$7,000 USD at accredited centers with ICU backup — often 60–70% less than USA pricing.",
    "gynecomastia-surgery-india":
      "Gynecomastia (male breast reduction) surgery in India typically costs $1,200–$2,800 USD for foreigners, usually as day-care or overnight surgery with compression garments afterward.",
    "skin-cancer-surgery-india":
      "Skin cancer surgery in India for foreigners typically costs $500–$4,000 USD for excision of basal cell, squamous cell, or melanoma with pathology — reconstruction increases package cost when needed.",
    "vitiligo-treatment-india":
      "Vitiligo treatment in India typically costs $300–$3,500 USD for international patients, spanning medical therapy, phototherapy, and melanocyte transplant / grafting at specialist dermatology centers.",
    "psoriasis-treatment-india":
      "Psoriasis treatment in India for foreigners typically costs $200–$4,000 USD for evaluation and therapy initiation; biologics are quoted separately after dermatology review.",
    "bone-marrow-transplant-india":
      "Bone marrow / stem cell transplant in India for foreigners typically costs $18,000–$45,000 USD for autologous or allogeneic procedures — often 70–85% less than USA totals of $150,000–$400,000.",
  };

  const next = {
    ...p,
    geoCities: GEO_CITIES,
    shortAnswer: shortAnswers[p.slug] ?? p.shortAnswer,
    metaTitle: p.metaTitle.includes("Medical Tourism")
      ? p.metaTitle
      : `${p.metaTitle.replace(/\|.*$/, "").trim()} | Medical Tourism`,
    metaDescription: p.metaDescription.includes("Hyderabad")
      ? p.metaDescription
      : `${p.name} in India typically costs $${p.costIndia.min.toLocaleString()}–$${p.costIndia.max.toLocaleString()} USD for international patients. Compare hospitals in Hyderabad, Delhi, Mumbai, Chennai & Bangalore vs USA/UK prices.`,
  };

  if (bmt) {
    next.categorySlug = "hematology-bone-marrow-india";
    next.relatedProcedures = [
      "autologous-stem-cell-transplant-india",
      "allogeneic-stem-cell-transplant-india",
      "leukemia-treatment-india",
      "thalassemia-treatment-india",
    ];
    next.keywords = [
      ...(p.keywords ?? []),
      "hematology india",
      "BMT india for foreigners",
      "stem cell transplant hyderabad",
      "bone marrow transplant delhi",
      "bone marrow transplant mumbai",
      "bone marrow transplant chennai",
      "bone marrow transplant bangalore",
    ];
  }

  if (cosmetic || skin) {
    const extraKw = [
      `${p.name.toLowerCase()} hyderabad`,
      `${p.name.toLowerCase()} delhi`,
      `${p.name.toLowerCase()} mumbai`,
    ];
    next.keywords = [...new Set([...(p.keywords ?? []), ...extraKw])];
  }

  return next;
}

// --- Apply ---
const procedures = JSON.parse(fs.readFileSync(proceduresPath, "utf8"));
const faqs = JSON.parse(fs.readFileSync(faqsPath, "utf8"));
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

const existingSlugs = new Set(procedures.map((p) => p.slug));
const enriched = procedures.map(enrichExisting);

const toAdd = [...newCosmetic, ...newSkin, ...newHeme].filter(
  (p) => !existingSlugs.has(p.slug)
);

const all = [...enriched, ...toAdd];

for (const p of toAdd) {
  faqs[p.slug] = faqsFor(
    p.slug,
    p.name,
    p.costIndia.min,
    p.costIndia.max,
    p.recoveryTime
  );
}

// Enrich FAQs for existing cosmetic/skin/bmt with foreigner + geo question if missing
for (const slug of [
  "rhinoplasty-cost-india",
  "liposuction-cost-india",
  "breast-augmentation-reduction-india",
  "tummy-tuck-abdominoplasty-india",
  "hair-transplant-cost-india",
  "facelift-surgery-india",
  "gynecomastia-surgery-india",
  "skin-cancer-surgery-india",
  "vitiligo-treatment-india",
  "psoriasis-treatment-india",
  "bone-marrow-transplant-india",
]) {
  if (!faqs[slug]) continue;
  const hasForeigner = faqs[slug].some((f) =>
    f.question.toLowerCase().includes("foreign")
  );
  if (!hasForeigner) {
    faqs[slug].push({
      question: `Is ${slug.replace(/-/g, " ").replace(/india|cost/g, "").trim()} available for foreign patients in India?`,
      answer:
        "Yes. Techdr coordinates care for international patients at partner hospitals in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore — including second opinions, written estimates, visa support, and travel logistics.",
    });
  }
}

// Fix foreigner FAQ wording for known names
const nameBySlug = Object.fromEntries(all.map((p) => [p.slug, p.name]));
for (const slug of Object.keys(faqs)) {
  faqs[slug] = faqs[slug].map((f) => {
    if (
      f.question.includes("available for foreign") &&
      f.question.includes(slug.replace(/-/g, " "))
    ) {
      const name = nameBySlug[slug];
      if (name) {
        return {
          ...f,
          question: `Is ${name.toLowerCase()} available for foreign patients in India?`,
        };
      }
    }
    return f;
  });
}

// Categories update
const cancer = categories.find((c) => c.slug === "cancer-treatment-india");
if (cancer) {
  cancer.procedureSlugs = cancer.procedureSlugs.filter(
    (s) => s !== "bone-marrow-transplant-india"
  );
  cancer.description =
    "Chemotherapy, radiation, immunotherapy, robotic oncology, and related cancer packages in India. For blood cancers and transplant, see Hematology & Bone Marrow.";
}

const cosmetic = categories.find(
  (c) => c.slug === "cosmetic-plastic-surgery-india"
);
if (cosmetic) {
  cosmetic.procedureSlugs = [
    "rhinoplasty-cost-india",
    "liposuction-cost-india",
    "breast-augmentation-reduction-india",
    "breast-lift-mastopexy-india",
    "tummy-tuck-abdominoplasty-india",
    "mommy-makeover-india",
    "hair-transplant-cost-india",
    "facelift-surgery-india",
    "blepharoplasty-eyelid-surgery-india",
    "brow-lift-forehead-lift-india",
    "gynecomastia-surgery-india",
    "brazilian-butt-lift-bbl-india",
    "chin-augmentation-genioplasty-india",
    "ear-reshaping-otoplasty-india",
    "body-contouring-after-weight-loss-india",
    "fat-grafting-transfer-india",
    "scar-revision-surgery-india",
  ];
  cosmetic.description =
    "Rhinoplasty, liposuction, breast surgery, facelift, hair transplant, mommy makeover, BBL, and body contouring with board-certified plastic surgeons across India.";
}

const derm = categories.find((c) => c.slug === "dermatology-skin-care-india");
if (derm) {
  derm.procedureSlugs = [
    "skin-cancer-surgery-india",
    "vitiligo-treatment-india",
    "psoriasis-treatment-india",
    "acne-scar-treatment-india",
    "laser-skin-resurfacing-india",
    "mole-skin-lesion-removal-india",
    "eczema-atopic-dermatitis-treatment-india",
    "chemical-peel-india",
    "hair-loss-treatment-prp-india",
    "keloid-scar-treatment-india",
    "hyperpigmentation-melasma-treatment-india",
    "burn-scar-reconstruction-india",
  ];
  derm.description =
    "Skin cancer surgery, vitiligo, psoriasis, acne scars, laser resurfacing, melasma, keloids, and burn scar reconstruction for international patients in India.";
}

const hemeExists = categories.some(
  (c) => c.slug === "hematology-bone-marrow-india"
);
if (!hemeExists) {
  categories.push({
    slug: "hematology-bone-marrow-india",
    name: "Hematology & Bone Marrow",
    description:
      "Bone marrow and stem cell transplant, leukemia, lymphoma, myeloma, thalassemia, sickle cell, aplastic anemia, and CAR-T therapy at specialized Indian hematology centers.",
    heroImage: HEME_IMG,
    procedureSlugs: [
      "bone-marrow-transplant-india",
      "autologous-stem-cell-transplant-india",
      "allogeneic-stem-cell-transplant-india",
      "leukemia-treatment-india",
      "lymphoma-treatment-india",
      "multiple-myeloma-treatment-india",
      "thalassemia-treatment-india",
      "sickle-cell-treatment-india",
      "aplastic-anemia-treatment-india",
      "car-t-cell-therapy-india",
    ],
  });
}

fs.writeFileSync(proceduresPath, JSON.stringify(all, null, 2) + "\n");
fs.writeFileSync(faqsPath, JSON.stringify(faqs, null, 2) + "\n");
fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2) + "\n");

console.log(
  JSON.stringify(
    {
      added: toAdd.length,
      totalProcedures: all.length,
      cosmetic: all.filter(
        (p) => p.categorySlug === "cosmetic-plastic-surgery-india"
      ).length,
      skin: all.filter(
        (p) => p.categorySlug === "dermatology-skin-care-india"
      ).length,
      heme: all.filter(
        (p) => p.categorySlug === "hematology-bone-marrow-india"
      ).length,
      newSlugs: toAdd.map((p) => p.slug),
    },
    null,
    2
  )
);
