/**
 * Adds Andrology category hub + 12 international SEO/AEO/GEO procedure pages
 * with 1200–1800 word depth, costs, and estimated stay days.
 *
 * Run: node scripts/add-andrology-services.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), JSON.stringify(data, null, 2) + "\n");

const CATEGORY = "andrology-treatments-india";
const IMG = "/images/services/urology.jpg";
const HOSPITALS = ["max-healthcare-delhi", "olive-hospitals", "tx-hospitals"];
const DOCTORS = ["dr-suresh-mehta-urologist"];

function kw(base, extras = []) {
  return [
    `${base} india`,
    `${base} cost india`,
    `${base} in india for foreigners`,
    `${base} price india`,
    `${base} package india`,
    `best ${base} india`,
    `affordable ${base} india`,
    `medical tourism ${base}`,
    ...extras,
  ];
}

function proc({
  slug,
  name,
  metaTitle,
  metaDescription,
  h1,
  overview,
  costMin,
  costMax,
  usa,
  uk,
  uae,
  recoveryTime,
  steps,
  related,
  keywords,
}) {
  return {
    slug,
    categorySlug: CATEGORY,
    name,
    metaTitle,
    metaDescription,
    h1,
    overview,
    costIndia: { min: costMin, max: costMax, currency: "USD" },
    costComparison: [
      { country: "USA", min: usa[0], max: usa[1] },
      { country: "UK", min: uk[0], max: uk[1] },
      { country: "UAE", min: uae[0], max: uae[1] },
    ],
    recoveryTime,
    procedureSteps: steps,
    hospitalSlugs: HOSPITALS,
    doctorSlugs: DOCTORS,
    faqSlugKey: slug,
    relatedProcedures: related,
    images: [{ src: IMG, alt: `${name} for international patients in India` }],
    keywords,
  };
}

function links(slug) {
  return [
    { href: `/doctors/urology/dr-suresh-mehta-urologist`, label: "Urology / andrology profile" },
    { href: `/cost-comparison/${slug}`, label: "Cost comparison" },
    { href: "/get-free-quote", label: "Free quote" },
    { href: `/treatments/${CATEGORY}`, label: "Andrology hub" },
  ];
}

function depth(slug, name, sections) {
  const withLinks = sections.map((s) => {
    if (s.id === "credentials") return { ...s, links: links(slug) };
    return s;
  });
  return withLinks;
}

function wordCount(sections) {
  const text = sections
    .flatMap((s) => [...(s.paragraphs || []), ...(s.bullets || [])])
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Shared AEO/GEO closing blocks tailored per procedure */
function geoParas(name, stay) {
  return [
    `Patients travel for ${name.toLowerCase()} from Nigeria, Kenya, Ghana, Uganda, Tanzania, the UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bangladesh, the United Kingdom, and the United States when waits, device costs, or self-pay quotes at home are high. Partner andrology and urology teams in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore combine English-speaking international desks with transparent USD package outlines.`,
    `Plan an India stay of about ${stay} unless your surgeon clears a shorter or longer buffer. Factor medical-visa invitation letters, attendant lodging near campus, and fit-to-fly clearance into the calendar before you buy non-refundable tickets. TechdrHealth coordinates remote report review, hospital shortlists, and discharge documents for your home clinician.`,
  ];
}

// ---------------------------------------------------------------------------
// PROCEDURE METADATA
// ---------------------------------------------------------------------------
const PROCEDURES = [
  proc({
    slug: "erectile-dysfunction-treatment-india",
    name: "Erectile Dysfunction Treatment",
    metaTitle: "Erectile Dysfunction Treatment Cost in India for Foreigners | Andrology",
    metaDescription:
      "Erectile dysfunction treatment in India typically costs $500–$3,500 USD. Compare oral therapy, shockwave, injections, and implants with stay days and India vs USA/UK prices.",
    h1: "Erectile Dysfunction Treatment Cost in India",
    overview:
      "Structured andrology evaluation and treatment for erectile dysfunction — from oral medicines and injection therapy to shockwave pathways and penile implant referral when medically appropriate.",
    costMin: 500,
    costMax: 3500,
    usa: [3000, 15000],
    uk: [1500, 8000],
    uae: [1200, 7000],
    recoveryTime: "Clinic-based to day-care; plan 3–7 days in India",
    steps: [
      "Share medical history, medications, and prior ED workups for remote andrology review",
      "Receive hospital options and a written package estimate for your pathway",
      "Arrive for in-person assessment, labs, and counselling",
      "Start medical, injection, or procedural treatment as agreed",
      "Discharge plan, medicine continuity, and follow-up before travel home",
    ],
    related: [
      "penile-implant-surgery-india",
      "peyronies-disease-treatment-india",
      "testosterone-replacement-therapy-india",
      "male-sexual-health-treatment-india",
    ],
    keywords: kw("erectile dysfunction treatment", [
      "ed treatment india cost",
      "impotence treatment india for foreigners",
      "andrology ed india",
    ]),
  }),
  proc({
    slug: "penile-implant-surgery-india",
    name: "Penile Implant Surgery",
    metaTitle: "Penile Implant Surgery Cost in India for Foreigners | Inflatable & Malleable",
    metaDescription:
      "Penile prosthesis surgery in India typically costs $4,500–$12,000 USD including device. Compare malleable vs inflatable implants, hospital stay, and India vs USA/UK prices.",
    h1: "Penile Implant Surgery Cost in India",
    overview:
      "Malleable or inflatable penile prosthesis implantation for refractory erectile dysfunction after failed medical therapy, coordinated at high-volume andrology centres.",
    costMin: 4500,
    costMax: 12000,
    usa: [15000, 35000],
    uk: [10000, 25000],
    uae: [9000, 22000],
    recoveryTime: "Hospital 1–2 nights; plan 7–10 days in India",
    steps: [
      "Share ED treatment history, diabetes status, and imaging if any for remote review",
      "Receive device options (malleable vs inflatable) and a written package estimate",
      "Arrive for pre-op assessment, infection-risk optimisation, and consent",
      "Undergo implant surgery with inpatient monitoring",
      "Device education, wound care, and fit-to-fly clearance before travel home",
    ],
    related: [
      "erectile-dysfunction-treatment-india",
      "peyronies-disease-treatment-india",
      "male-sexual-health-treatment-india",
    ],
    keywords: kw("penile implant surgery", [
      "penile prosthesis india cost",
      "inflatable penile implant india",
      "malleable penile implant india",
    ]),
  }),
  proc({
    slug: "peyronies-disease-treatment-india",
    name: "Peyronie's Disease Treatment",
    metaTitle: "Peyronie's Disease Treatment Cost in India for Foreigners | Andrology",
    metaDescription:
      "Peyronie's disease treatment in India typically costs $800–$8,000 USD. Compare injectables, plication, grafting, and implant pathways with stay days and global price ranges.",
    h1: "Peyronie's Disease Treatment Cost in India",
    overview:
      "Andrology pathways for penile curvature from Peyronie's disease — including assessment, injectable options where indicated, and surgical correction or implant when deformity and ED coexist.",
    costMin: 800,
    costMax: 8000,
    usa: [5000, 25000],
    uk: [3000, 15000],
    uae: [2500, 14000],
    recoveryTime: "Day-care to 1–2 nights; plan 5–10 days in India",
    steps: [
      "Share photographs (as advised), history of curvature, and prior treatments for remote review",
      "Receive pathway options and a written package estimate",
      "Arrive for examination, duplex if needed, and shared decision-making",
      "Undergo injection series or surgery as planned",
      "Recovery instructions and follow-up schedule before travel home",
    ],
    related: [
      "penile-implant-surgery-india",
      "erectile-dysfunction-treatment-india",
      "male-sexual-health-treatment-india",
    ],
    keywords: kw("peyronies disease treatment", [
      "penile curvature surgery india",
      "peyronie surgery cost india",
      "xiaflex alternative india",
    ]),
  }),
  proc({
    slug: "micro-tese-sperm-retrieval-india",
    name: "Micro-TESE Sperm Retrieval",
    metaTitle: "Micro-TESE Sperm Retrieval Cost in India for Foreigners | Male Fertility",
    metaDescription:
      "Micro-TESE and surgical sperm retrieval in India typically cost $1,500–$4,500 USD. Compare TESA/PESA/micro-TESE, stay days, and India vs USA/UK IVF-linked pricing.",
    h1: "Micro-TESE Sperm Retrieval Cost in India",
    overview:
      "Microsurgical testicular sperm extraction and related surgical sperm retrieval (TESA/PESA) for azoospermia, coordinated with ICSI embryology teams for international couples.",
    costMin: 1500,
    costMax: 4500,
    usa: [8000, 20000],
    uk: [4000, 12000],
    uae: [3500, 10000],
    recoveryTime: "Day-care or overnight; plan 4–7 days in India",
    steps: [
      "Share semen analyses, hormone labs, genetics if done, and partner fertility plan",
      "Receive retrieval method recommendation and package estimate (often with ICSI)",
      "Arrive for andrology and embryology coordination",
      "Undergo micro-TESE or alternate retrieval with cryopreservation planning",
      "Pathology/lab report handoff and recovery advice before travel home",
    ],
    related: [
      "azoospermia-treatment-india",
      "varicocele-surgery-india",
      "male-infertility-treatment-india",
      "icsi-treatment-india",
    ],
    keywords: kw("micro tese", [
      "micro-tese india cost",
      "surgical sperm retrieval india",
      "tesa pesa india for foreigners",
      "sperm extraction india medical tourism",
    ]),
  }),
  proc({
    slug: "vasectomy-reversal-india",
    name: "Vasectomy Reversal",
    metaTitle: "Vasectomy Reversal Cost in India for Foreigners | Microsurgery",
    metaDescription:
      "Vasectomy reversal (vaso-vasostomy) in India typically costs $2,500–$5,500 USD. Compare microsurgical success factors, stay days, and India vs USA/UK prices.",
    h1: "Vasectomy Reversal Cost in India",
    overview:
      "Microsurgical vaso-vasostomy or vaso-epididymostomy to restore fertility after vasectomy, with counselling on time since vasectomy and IVF/ICSI alternatives.",
    costMin: 2500,
    costMax: 5500,
    usa: [8000, 20000],
    uk: [5000, 12000],
    uae: [4500, 11000],
    recoveryTime: "Overnight typical; plan 5–8 days in India",
    steps: [
      "Share vasectomy operative notes if available, semen history, and partner age/fertility goals",
      "Receive microsurgery versus IVF counselling and a written estimate",
      "Arrive for pre-op assessment and microsurgical planning",
      "Undergo reversal under magnification with inpatient observation as needed",
      "Activity limits, semen analysis schedule, and fit-to-fly before travel home",
    ],
    related: [
      "micro-tese-sperm-retrieval-india",
      "azoospermia-treatment-india",
      "male-infertility-treatment-india",
      "icsi-treatment-india",
    ],
    keywords: kw("vasectomy reversal", [
      "vaso vasostomy india cost",
      "vasectomy reversal success rate india",
      "microsurgical vasectomy reversal india",
    ]),
  }),
  proc({
    slug: "hydrocele-surgery-india",
    name: "Hydrocele Surgery",
    metaTitle: "Hydrocele Surgery Cost in India for Foreigners | Andrology & Urology",
    metaDescription:
      "Hydrocele repair in India typically costs $800–$2,000 USD. Compare day-care surgery, recovery, estimated stay days, and India vs USA/UK prices for international patients.",
    h1: "Hydrocele Surgery Cost in India",
    overview:
      "Surgical repair of symptomatic hydrocele with scrotal approaches chosen for low recurrence and fertility-conscious technique at partner hospitals.",
    costMin: 800,
    costMax: 2000,
    usa: [4000, 10000],
    uk: [2500, 6000],
    uae: [2000, 5500],
    recoveryTime: "Day-care or overnight; plan 4–6 days in India",
    steps: [
      "Share scrotal ultrasound and symptom history for remote review",
      "Receive surgical plan and written package estimate",
      "Arrive for pre-op assessment and consent",
      "Undergo hydrocele repair with same-day or overnight discharge",
      "Supportive care advice and follow-up before travel home",
    ],
    related: [
      "varicocele-surgery-india",
      "circumcision-phimosis-treatment-india",
      "male-infertility-treatment-india",
    ],
    keywords: kw("hydrocele surgery", [
      "hydrocele repair india cost",
      "hydrocelectomy india for foreigners",
    ]),
  }),
  proc({
    slug: "circumcision-phimosis-treatment-india",
    name: "Circumcision & Phimosis Treatment",
    metaTitle: "Circumcision & Phimosis Treatment Cost in India for Foreigners",
    metaDescription:
      "Adult circumcision and phimosis treatment in India typically costs $400–$1,200 USD. Compare techniques, stay days, and India vs USA/UK pricing for medical travellers.",
    h1: "Circumcision & Phimosis Treatment Cost in India",
    overview:
      "Adult circumcision and phimosis pathways — including medical management when appropriate and surgical circumcision with attention to cosmetic and functional outcomes.",
    costMin: 400,
    costMax: 1200,
    usa: [2000, 6000],
    uk: [1200, 3500],
    uae: [1000, 3000],
    recoveryTime: "Day-care; plan 3–5 days in India",
    steps: [
      "Share history of phimosis, infections, or prior treatments for remote review",
      "Receive technique options and a written package estimate",
      "Arrive for examination and same-day or next-day scheduling",
      "Undergo circumcision or phimosis release as planned",
      "Wound care kit, activity limits, and follow-up before travel home",
    ],
    related: [
      "hydrocele-surgery-india",
      "male-sexual-health-treatment-india",
      "erectile-dysfunction-treatment-india",
    ],
    keywords: kw("circumcision", [
      "adult circumcision india cost",
      "phimosis treatment india",
      "circumcision for foreigners india",
    ]),
  }),
  proc({
    slug: "testosterone-replacement-therapy-india",
    name: "Testosterone Replacement Therapy",
    metaTitle: "Testosterone Replacement Therapy Cost in India for Foreigners | TRT",
    metaDescription:
      "Male hypogonadism evaluation and TRT in India typically costs $300–$1,500 USD for workup and treatment start. Compare stay days, monitoring, and global price ranges.",
    h1: "Testosterone Replacement Therapy Cost in India",
    overview:
      "Structured evaluation of male hypogonadism with confirmed low testosterone, counselling on fertility impact, and supervised testosterone replacement when clinically indicated.",
    costMin: 300,
    costMax: 1500,
    usa: [1500, 6000],
    uk: [800, 3500],
    uae: [700, 3000],
    recoveryTime: "Outpatient workup; plan 3–5 days in India",
    steps: [
      "Share morning testosterone labs, symptoms, and fertility plans for remote review",
      "Receive evaluation pathway and package estimate for labs, consults, and therapy start",
      "Arrive for confirmatory testing and andrology counselling",
      "Start supervised TRT if indicated, or fertility-preserving alternatives",
      "Monitoring schedule and medicine continuity plan before travel home",
    ],
    related: [
      "erectile-dysfunction-treatment-india",
      "male-infertility-treatment-india",
      "azoospermia-treatment-india",
    ],
    keywords: kw("testosterone replacement therapy", [
      "trt india cost",
      "low testosterone treatment india",
      "male hypogonadism india for foreigners",
    ]),
  }),
  proc({
    slug: "premature-ejaculation-treatment-india",
    name: "Premature Ejaculation Treatment",
    metaTitle: "Premature Ejaculation Treatment Cost in India for Foreigners | Andrology",
    metaDescription:
      "Premature ejaculation treatment in India typically costs $400–$2,000 USD. Compare behavioural, medical, and combined pathways with stay days and India vs USA/UK prices.",
    h1: "Premature Ejaculation Treatment Cost in India",
    overview:
      "Confidential andrology care for premature ejaculation combining behavioural counselling, topical or oral pharmacotherapy, and evaluation for concurrent erectile dysfunction.",
    costMin: 400,
    costMax: 2000,
    usa: [2000, 8000],
    uk: [1000, 4500],
    uae: [900, 4000],
    recoveryTime: "Outpatient; plan 3–5 days in India",
    steps: [
      "Share symptom timeline and any prior ED or anxiety treatments for remote review",
      "Receive pathway options and a written package estimate",
      "Arrive for confidential andrology assessment",
      "Start combined behavioural and medical plan as agreed",
      "Home programme and tele-follow-up plan before travel home",
    ],
    related: [
      "erectile-dysfunction-treatment-india",
      "male-sexual-health-treatment-india",
      "testosterone-replacement-therapy-india",
    ],
    keywords: kw("premature ejaculation treatment", [
      "pe treatment india cost",
      "premature ejaculation doctor india",
      "andrology pe india for foreigners",
    ]),
  }),
  proc({
    slug: "azoospermia-treatment-india",
    name: "Azoospermia Treatment",
    metaTitle: "Azoospermia Treatment Cost in India for Foreigners | Male Infertility",
    metaDescription:
      "Azoospermia evaluation and treatment in India typically costs $1,000–$6,000 USD. Compare obstructive vs non-obstructive pathways, micro-TESE, stay days, and global prices.",
    h1: "Azoospermia Treatment Cost in India",
    overview:
      "Full andrology workup for zero sperm count — distinguishing obstructive from non-obstructive azoospermia, with reconstruction, retrieval, or donor pathways coordinated with IVF teams.",
    costMin: 1000,
    costMax: 6000,
    usa: [8000, 30000],
    uk: [4000, 18000],
    uae: [3500, 15000],
    recoveryTime: "Workup to short stay surgery; plan 5–10 days in India",
    steps: [
      "Share repeated semen analyses, FSH/testosterone, genetics if done, and partner IVF plan",
      "Receive obstructive vs non-obstructive pathway and package estimate",
      "Arrive for confirmatory testing and multidisciplinary counselling",
      "Undergo reconstruction, micro-TESE, or planned retrieval with embryology",
      "Lab results, cryopreservation status, and recovery plan before travel home",
    ],
    related: [
      "micro-tese-sperm-retrieval-india",
      "vasectomy-reversal-india",
      "varicocele-surgery-india",
      "male-infertility-treatment-india",
    ],
    keywords: kw("azoospermia treatment", [
      "zero sperm count treatment india",
      "obstructive azoospermia india",
      "non obstructive azoospermia micro tese india",
    ]),
  }),
];

// Existing procedures to re-home under andrology (metadata updates applied in run())
const MOVE_SLUGS = ["varicocele-surgery-india", "male-sexual-health-treatment-india"];

// ---------------------------------------------------------------------------
// DEPTH CONTENT (target 1200–1800 words each)
// ---------------------------------------------------------------------------
function buildDepthLibrary() {
  /** @type {Record<string, ReturnType<typeof depth>>} */
  const out = {};

  out["erectile-dysfunction-treatment-india"] = depth("erectile-dysfunction-treatment-india", "Erectile Dysfunction Treatment", [
    {
      id: "condition",
      heading: "What erectile dysfunction treatment in India involves",
      paragraphs: [
        "Erectile dysfunction (ED) is the persistent inability to achieve or maintain an erection firm enough for satisfactory sexual activity. It is a medical condition with vascular, neurologic, hormonal, medication-related, and psychological contributors — not a character flaw. Andrology-led care in India starts with a structured history, review of diabetes, blood pressure, heart disease, smoking, alcohol, pelvic surgery, and antidepressants, then confirms whether first-line oral PDE5 inhibitors, lifestyle change, injection therapy, vacuum devices, low-intensity shockwave in selected protocols, or penile prosthesis referral is the honest next step.",
        "International patients often arrive after incomplete trials of tablets bought online without cardiovascular clearance, or after embarrassment delayed care for years. Partner centres separate psychogenic from organic ED, screen for hypogonadism when symptoms fit, and look for Peyronie's plaques or venous leak clues that change the pathway. Treatment is stepwise: correct reversible causes, optimise cardiometabolic health, trial approved oral agents with education on timing and food interactions, then escalate to second-line options if response is poor or contraindicated.",
        "For medical travellers, the early question is not which city is cheapest but whether your ED is a marker of silent coronary disease that needs medical attention before elective procedures. Remote triage of medication lists, ECG or cardiology notes when available, and prior treatment responses prevents mismatched packages and unsafe prescribing.",
      ],
    },
    {
      id: "who",
      heading: "Who ED treatment in India is for",
      paragraphs: [
        "Typical candidates are men with ED lasting months, failed or partial response to medicines at home, contraindications to PDE5 inhibitors (for example nitrate use), or desire for a confidential specialist plan before considering implant surgery. Couples travelling for fertility may also need ED addressed so timed intercourse or assisted reproduction is feasible.",
        "Honest triage covers cardiac risk, prostate history, neurological disease, and whether premature ejaculation or low desire coexist. Men seeking only unregulated ‘herbal boosters’ are counselled toward evidence-based pathways. Suitability for travel depends on whether evaluation can finish in a short stay or whether staged cardiac clearance is required first.",
      ],
      bullets: [
        "Medication list including nitrates, alpha-blockers, and antidepressants",
        "Diabetes and blood-pressure history with recent labs if available",
        "Prior PDE5 inhibitor doses tried and side effects",
        "Willingness to stay 3–7 days for assessment and treatment start",
        "Partner involvement when relationship counselling is part of care",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Coordination begins when you share history, medicines, and any prior hormone or Doppler reports. The andrology team proposes an evaluation day plan — consult, morning testosterone if indicated, metabolic labs, and counselling — plus an indicative USD package for the likely first treatment tier. Settle what is included (consults, labs, first medicine supply) before booking flights.",
        "On arrival, examination and shared decision-making confirm the pathway. Oral therapy education covers nitrate safety and priapism warnings. Injection training, if chosen, is hands-on so you can self-administer correctly at home. Shockwave protocols, where offered, are scheduled across visits; implant discussion is reserved for refractory organic ED after failed less invasive options.",
        "TechdrHealth helps with admission logistics, discreet appointment timing, language support when needed, and discharge documents so your home physician understands the plan. Follow-up may continue by teleconsult for dose titration after you fly home.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Oral PDE5 inhibitors can cause headache, flushing, nasal congestion, visual changes, and dangerous blood-pressure drops with nitrates. Injection therapy risks priapism, bruising, and fibrosis if misused. Any procedural pathway adds infection and device-specific risks if you later choose an implant.",
        "Mitigation means accredited hospitals, named specialists, cardiovascular screening when indicated, and clear emergency instructions for erections lasting longer than four hours. Marketing claims of ‘permanent natural cures’ without examination are not a substitute for consent counselling.",
      ],
      bullets: [
        "Nitrate interaction with oral ED medicines — always disclose chest-pain drugs",
        "Priapism risk with injections — know when to seek emergency care",
        "Missed cardiac disease if ED is treated in isolation",
        "Psychological distress if expectations ignore relationship factors",
        "Counterfeit medicines — use hospital pharmacy supply chains",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Most ED evaluation and medical-therapy starts are outpatient. Estimated stay in India is typically 3–7 days: one to two days for assessment and labs, time to receive medicines or complete injection training, and a buffer for any cardiac clearance. Pure telemedicine starts are sometimes possible after remote review, but travellers who want hands-on training or second-line procedures should plan the longer end of that window.",
        "If shockwave sessions are spaced, ask whether a single clustered visit is feasible or whether you should complete a first block in India and continue locally. Penile implant candidates should read the dedicated implant page — that pathway needs hospital nights and a 7–10 day India stay, not a clinic-only calendar.",
        "Fit-to-fly is rarely limited after consult-only visits. After minor procedures, follow wound and activity advice before long-haul flights. Carry medicines in original packaging with prescriptions for airport security.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of erectile dysfunction treatment in India for foreign patients",
      paragraphs: [
        "Indicative packages for international patients commonly fall around $500–$3,500 USD for evaluation plus medical or injection pathways, depending on lab intensity, medicine brands, number of consults, and whether Doppler or specialised testing is required. Penile implant surgery is a separate, higher package (see implant page). Private care in the USA or UK for comparable specialist pathways is often several times higher when self-pay.",
        "Directional comparisons on this page place USA ranges roughly $3,000–$15,000, UK $1,500–$8,000, and UAE $1,200–$7,000 for analogous tiers — not identical device or pharmacy baskets. Always ask what the India package includes: specialist fees, standard labs, first medicine supply, and training visits. Typical exclusions are long-term medicine refills after discharge, cardiac procedures, and implant devices.",
        "Final quotes follow medical review. Reject vague ‘guaranteed cure’ pricing. Require written inclusions and exclusions before you travel.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Look for andrologists or urologists with documented sexual-medicine volume, access to duplex ultrasound, and clear referral links to cardiology and endocrinology. Named-surgeon or named-specialist clarity on the estimate matters more than a generic international desk booking.",
        "TechdrHealth shortlists partner teams across Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore and helps you obtain written package outlines before travel. Verify credentials on the hospital letter you receive.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives and combined pathways",
      paragraphs: [
        "Not every man needs escalation. Weight loss, smoking cessation, sleep apnoea treatment, and medication review can improve erections. Psychosexual therapy helps when anxiety or relationship conflict dominates. Vacuum erection devices remain useful for selected patients, including after prostate surgery.",
        "When tablets fail and injections are unacceptable, penile prosthesis becomes the durable surgical option. If curvature coexists, Peyronie's treatment may be sequenced or combined. Low testosterone is treated only after confirmed labs and fertility counselling — testosterone can suppress sperm production.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Compile a medication list with doses, nitrate use, and allergy history. Bring prior hormone results, cardiac notes, and a concise symptom timeline (onset, morning erections, situational vs constant ED). Fasting labs may be needed on arrival — ask whether to arrive morning-ready.",
        "Discuss attendant travel if mobility or language support helps. Book flexible hotels near the hospital for 3–7 nights rather than assuming a same-day turnaround. Share fertility goals if you may want children — that changes TRT and some surgical choices.",
        "Avoid starting unknown online ED tablets immediately before travel; disclose everything already tried so dosing is safe.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and continuity at home",
      paragraphs: [
        "Aftercare focuses on correct medicine use, lifestyle targets, and scheduled tele-follow-up for dose changes. Injection users need a clear priapism action plan and needle-disposal guidance. Keep your home GP or urologist copied on discharge summaries.",
        "If response remains poor after an adequate trial, request reassessment for second-line therapy or implant counselling rather than endlessly increasing tablet doses without review.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Erectile Dysfunction Treatment", "3–7 days"),
    },
  ]);

  out["penile-implant-surgery-india"] = depth("penile-implant-surgery-india", "Penile Implant Surgery", [
    {
      id: "condition",
      heading: "What penile implant surgery involves",
      paragraphs: [
        "A penile prosthesis is a surgically implanted device that allows men with refractory erectile dysfunction to achieve a usable erection on demand. Two broad families exist: malleable (semi-rigid) rods and inflatable devices with cylinders in the penis, a pump in the scrotum, and often a fluid reservoir in the abdomen or space of Retzius. Implants treat ED that has failed or cannot use oral drugs, injections, or devices — they do not increase penile length beyond what anatomy allows and they do not treat low libido alone.",
        "India’s high-volume andrology and urology units implant both malleable and three-piece inflatable systems from established manufacturers. Choice depends on manual dexterity, infection risk, prior pelvic surgery, cost sensitivity, and patient preference after seeing models. Concurrent Peyronie's correction or residual curvature planning is discussed when deformity and ED coexist.",
        "For international patients, implant surgery is a destination procedure: you need infection-optimised preparation, hospital nights, device teaching, and a recovery buffer before long-haul flights. Remote review of diabetes control, prior priapism or corporal fibrosis, and previous penile surgery prevents underestimating operative complexity and package cost.",
      ],
    },
    {
      id: "who",
      heading: "Who penile implant surgery in India is for",
      paragraphs: [
        "Typical candidates have organic ED unresponsive to or unsuitable for PDE5 inhibitors and injection therapy, acceptable anaesthetic risk, and realistic expectations about sensation, length, and the irreversible nature of cylinder placement in most pathways. Men after radical prostatectomy, with severe diabetes-related ED, or with Peyronie's plus ED are common implant candidates when counselled carefully.",
        "Medical travellers compare India device packages with self-pay quotes at home that often exceed $15,000–$35,000 USD in the USA. Triage covers HbA1c targets, urinary tract infection clearance, and whether revision surgery after prior implant is involved — revisions cost more and need experienced teams.",
      ],
      bullets: [
        "Documented failure or contraindication to less invasive ED therapies",
        "Optimised glucose and infection risk before elective implant",
        "Understanding of malleable vs inflatable trade-offs",
        "Plan for 7–10 days in India including hospital 1–2 nights",
        "Attendant helpful for early postoperative days",
      ],
    },
    {
      id: "process",
      heading: "Procedure process from enquiry to follow-up",
      paragraphs: [
        "Share ED treatment history, HbA1c, medication list, and any penile Doppler or photos of curvature. Centres propose device type, expected operative time, antibiotic protocol, and a written package that should name the implant brand and model tier. Confirm what happens if corporal fibrosis requires specialised tools or grafts.",
        "On arrival, pre-op assessment, urine culture when indicated, skin preparation counselling, and informed consent cover infection, erosion, mechanical failure, and revision rates. Surgery is usually under general or regional anaesthesia. Postoperative pain control, scrotal support, and catheter protocols vary by surgeon.",
        "Device cycling for inflatable implants typically starts after a healing interval set by your surgeon — often weeks, not days — so early teaching focuses on wound care and activity limits. TechdrHealth coordinates discharge summaries, implant cards, and tele-follow-up windows after you return home.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "The most serious early risk is infection, which may require device removal. Other risks include haematoma, urethral injury, reservoir issues, mechanical malfunction over years, erosion, and dissatisfaction with length or concealability. Diabetes and revision cases carry higher infection risk.",
        "Mitigation includes experienced implanters, antibiotic protocols, theatre discipline, glucose control, and avoiding unnecessary urethral instrumentation. Consent should quote your surgeon’s infection and revision discussion — not brochure averages alone.",
      ],
      bullets: [
        "Infection requiring explant",
        "Bleeding or haematoma",
        "Device malfunction over time",
        "Erosion or pain",
        "Need for revision surgery",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Hospital stay is commonly 1–2 nights for uncomplicated primary implants; complex or revision cases may stay longer. Estimated total stay in India is typically 7–10 days: pre-op day, surgery, inpatient recovery, early wound check, and a buffer before long-haul flights. Do not plan tourist itineraries that involve heavy walking in the first postoperative week.",
        "Sexual activity and full inflatable cycling wait for surgeon clearance — often 4–6 weeks. Sitting comfort, scrotal swelling, and bruise resolution vary. Fit-to-fly depends on wound stability, pain control, and absence of fever; your team’s clearance overrides the cheapest airfare.",
        "Arrange a hotel near campus for attendant lodging. Carry spare supportive underwear and know red-flag symptoms: fever, severe pain, discharge, or device sticking out of the skin — seek urgent care.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of penile implant surgery in India for foreign patients",
      paragraphs: [
        "Indicative packages for international patients commonly fall around $4,500–$12,000 USD, driven mainly by malleable versus inflatable device choice, brand, hospital room class, and whether curvature correction or revision is included. USA self-pay ranges on this page are directional at $15,000–$35,000; UK and UAE private care also typically exceeds Indian packages for comparable devices.",
        "Demand itemisation: implant model, surgeon and anaesthesia fees, theatre, antibiotics, inpatient nights, and routine labs. Typical exclusions are ICU beyond package, treatment of infection requiring explant, extended stay, and later revision. Final quotes follow clinical review of fibrosis risk and comorbidities.",
        "Cheapest headline prices that omit the device brand are not usable for travel decisions. Align the written estimate with the consent discussion about which prosthesis you will receive.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Choose surgeons with substantial annual implant volume, infection-rate transparency, and experience in diabetic and revision cases when relevant. Hospitals should support sterile protocol, urology OT lists, and 24/7 care if complications arise.",
        "TechdrHealth shortlists partner teams across major Indian metros and helps you compare written device-inclusive packages before flights.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives before choosing an implant",
      paragraphs: [
        "Maximise oral agents, injection training, vacuum devices, and treatable hormonal issues before irreversible implant surgery. Psychosexual support still matters for couples adjusting to a device.",
        "If curvature is the dominant problem with preserved erections, Peyronie's surgery without implant may suffice. If fertility is the priority and ED is mild, address fertility first — implants do not restore sperm production.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Optimise diabetes; treat active infections; stop smoking if possible; share anticoagulation plans. Ask whether genital hair clipping is done in hospital and what shower soap protocol is preferred.",
        "Confirm attendant travel, hotel nights for 7–10 days, and flexible return tickets. Bring prior operative notes if you had penile, urethral, or prostate surgery.",
        "Decide malleable versus inflatable preferences after video or model counselling so you are not choosing under pre-op stress alone.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and long-term device care",
      paragraphs: [
        "Follow wound care, antibiotic courses if prescribed, and activity limits. Inflatable users learn pump technique at the scheduled visit. Keep implant identification information for future MRI or airport questions as advised by your team.",
        "Report fever or wound problems early. Mechanical issues years later need urology assessment — do not attempt DIY repairs. Annual check-ins help catch problems early.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Penile Implant Surgery", "7–10 days"),
    },
  ]);

  out["peyronies-disease-treatment-india"] = depth("peyronies-disease-treatment-india", "Peyronie's Disease Treatment", [
    {
      id: "condition",
      heading: "What Peyronie's disease treatment involves",
      paragraphs: [
        "Peyronie's disease causes penile plaques of scar tissue that can bend, shorten, or indent the erect penis and make intercourse painful or impossible. The condition has an active (inflammatory) phase with pain and changing deformity, and a stable phase when curvature plateaus. Treatment differs by phase: observation, traction, oral agents with limited evidence, injectable therapies where available and indicated, and surgery for stable, functionally limiting deformity.",
        "Andrology teams in India assess plaque location, degrees of curvature, erectile quality, and hinge or hourglass deformity. Duplex ultrasound may map plaque and vascular status. Men with both severe curvature and refractory ED may be counselled toward penile implant with modelling rather than plication alone.",
        "International patients should send clear, consented photographs of the erect deformity (as clinically requested), symptom timeline, and prior injections or surgeries. Travelling during a rapidly changing acute phase may mean you are not yet a surgical candidate — remote triage avoids wasted flights.",
      ],
    },
    {
      id: "who",
      heading: "Who Peyronie's treatment in India is for",
      paragraphs: [
        "Candidates include men with stable curvature that prevents intercourse, significant psychological distress, or combined ED. Acute painful disease may need anti-inflammatory strategies and follow-up rather than immediate surgery. Men with mild curvature that does not impair function may be advised watchful waiting.",
        "Medical travellers often seek surgery after years of embarrassment or after injectable courses elsewhere. Triage establishes stability (typically six months without change), erectile function, and whether grafting, plication, or implant is more appropriate.",
      ],
      bullets: [
        "Stable deformity documentation when surgery is requested",
        "Honest ED assessment — implants change the surgical plan",
        "Plan 5–10 days in India depending on injection vs surgery",
        "Realistic expectations about length trade-offs with plication",
        "Willingness to follow traction or rehab protocols if prescribed",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "After remote review, the centre proposes non-surgical versus surgical pathways and a package outline. Injection series may require multiple visits; ask whether a compressed schedule is feasible for travellers. Surgical consent covers residual curvature, length change, sensory changes, and ED risk.",
        "Plication shortens the longer side; incision/grafting addresses severe curves but can affect erectile rigidity; implant addresses ED plus deformity. Postoperative dressings, erection rehab timing, and activity limits are surgeon-specific.",
        "TechdrHealth helps sequence appointments, manage discreet scheduling, and organise discharge photography or diagrams for your home clinician.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Surgical risks include bleeding, infection, residual or recurrent curvature, penile shortening, erectile dysfunction, and sensory change. Grafting pathways add graft-related complications. Injection therapies have their own local risks and variable availability by product and country regulation.",
        "Mitigation means operating in the stable phase when surgery is chosen, accurate deformity measurement, and matching technique to severity and erectile function.",
      ],
      bullets: [
        "Residual curvature",
        "Length loss (especially plication)",
        "New or worsened ED",
        "Infection or haematoma",
        "Need for revision or later implant",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Injection-focused visits may be outpatient with an estimated India stay of about 5–7 days if several sessions or assessments are clustered. Surgical patients commonly need day-care or 1–2 hospital nights and an overall India stay of about 5–10 days before fit-to-fly clearance.",
        "Swelling and bruise resolution take weeks. Sexual activity waits for surgeon clearance. Avoid heavy lifting and strenuous tourism early after grafting or implant-combined cases.",
        "Build buffer nights into hotel bookings; do not schedule the return flight for the morning after surgery.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of Peyronie's disease treatment in India for foreign patients",
      paragraphs: [
        "Indicative packages commonly range $800–$8,000 USD: lower for evaluation and selected non-surgical care, higher for plication, grafting, or combined implant pathways. USA directional ranges $5,000–$25,000 and UK/UAE private care also typically exceed Indian surgical packages for comparable complexity.",
        "Clarify whether ultrasound, injection drug costs, graft materials, and implant devices are inside the quote. Exclusions often include revision for residual curve and long-term medicines. Final pricing follows examination and stability confirmation.",
        "Compare clinical fit first — an inexpensive plication is the wrong buy if you need an implant for ED.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Seek andrologists/urologists with dedicated Peyronie's operative volume and implant capability when ED coexists. Ask how they measure curvature and which techniques they perform regularly.",
        "TechdrHealth shortlists partner centres in major metros and obtains written estimates before you travel.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives and decision points",
      paragraphs: [
        "Observation, traction, and medical measures may suit mild or evolving disease. Injectables, where appropriate and available, can reduce curve in selected men. Surgery is for stable, functionally limiting deformity.",
        "If intercourse is impossible mainly because of ED, prioritise erectile pathways — including implant — rather than curvature surgery alone.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Document curve stability, list prior treatments, and prepare consented erect photographs if requested. Disclose ED medicines and cardiac drugs. Optimise diabetes before elective surgery.",
        "Plan 5–10 day lodging, attendant support after surgery, and flexible tickets. Ask whether postoperative traction devices must be purchased in India or can be sourced at home.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and home follow-up",
      paragraphs: [
        "Follow wound care, night dressing protocols, and rehab exercises exactly. Report fever, severe pain, or sudden deformity change. Tele-follow-up can review photos of healing when clinically acceptable.",
        "Allow months for final cosmetic and functional results before judging success; early swelling exaggerates appearance.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Peyronie's Disease Treatment", "5–10 days"),
    },
  ]);

  out["micro-tese-sperm-retrieval-india"] = depth("micro-tese-sperm-retrieval-india", "Micro-TESE Sperm Retrieval", [
    {
      id: "condition",
      heading: "What micro-TESE and surgical sperm retrieval involve",
      paragraphs: [
        "When ejaculated semen has no sperm (azoospermia), sperm can sometimes be retrieved surgically for ICSI. Micro-TESE uses an operating microscope to identify fuller seminiferous tubules in non-obstructive azoospermia, improving retrieval chances versus blind biopsies in many series. TESA (aspiration) and PESA (epididymal aspiration) suit selected obstructive cases or specific anatomies. Retrieved sperm may be used fresh with a coordinated egg-retrieval cycle or cryopreserved.",
        "India’s partner fertility and andrology units run combined pathways so embryologists are ready the day of retrieval. Genetic counselling matters for non-obstructive azoospermia — karyotype and Y-chromosome microdeletion results can change prognosis and couple counselling.",
        "International patients should not book micro-TESE as a tourist add-on. Success is probabilistic, not guaranteed. Remote review of FSH, testosterone, testicular exam notes, prior biopsies, and partner age frames honest expectations before flights.",
      ],
    },
    {
      id: "who",
      heading: "Who micro-TESE in India is for",
      paragraphs: [
        "Typical candidates have confirmed azoospermia on at least two semen analyses, completed basic hormonal workup, and a partner plan for ICSI. Obstructive azoospermia after vasectomy may prefer reversal or PESA/TESA depending on goals and time since vasectomy. Non-obstructive cases are the classic micro-TESE group.",
        "Travellers from regions with limited microsurgery access choose India for combined retrieval + IVF packages. Triage includes Klinefelter counselling, prior chemo/radiation, undescended testis history, and whether donor-sperm backup should be consented in advance.",
      ],
      bullets: [
        "Two semen analyses showing azoospermia",
        "FSH, testosterone, and genetics as indicated",
        "Partner IVF/ICSI timeline aligned",
        "Plan 4–7 days in India for retrieval ± cryopreservation",
        "Emotional readiness for possible zero retrieval",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Share labs and partner fertility summary. Centres propose TESA, PESA, or micro-TESE with fresh versus freeze strategies and a written package — sometimes bundled with ICSI. Confirm embryology lab accreditation and cryostorage terms for foreign patients.",
        "On arrival, andrology and reproductive medicine consults finalise the plan. Micro-TESE is performed under anaesthesia with microsurgical exploration; samples go immediately to the embryology lab. Pain control, scrotal support, and antibiotic guidance follow.",
        "If sperm are found, cryopreservation paperwork and export/storage rules are explained. If not, counselling covers donor options or further medical therapy in rare selected protocols. TechdrHealth helps with documentation for your home IVF clinic.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include bleeding, infection, haematoma, testosterone decline after extensive bilateral exploration, anaesthesia events, and failure to retrieve sperm. Multiple prior biopsies can scar tissue and lower yield.",
        "Mitigation includes microsurgical technique, experienced fertility labs, staged decision-making, and preoperative genetic counselling when indicated.",
      ],
      bullets: [
        "No sperm retrieved despite micro-TESE",
        "Haematoma or infection",
        "Hypogonadism risk after extensive surgery",
        "Anaesthesia risks",
        "Cryostorage or shipping logistics issues — clarify early",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Many men go home the same day or after one night. Estimated stay in India is typically 4–7 days: pre-op consults, procedure, early wound check, and lab result counselling. Combined fresh ICSI cycles may extend the couple’s stay to match ovarian stimulation — plan as a fertility trip, not a 48-hour dash.",
        "Scrotal discomfort settles over one to two weeks. Avoid heavy lifting and strenuous exercise until cleared. Fit-to-fly is usually early for uncomplicated retrievals, but follow your surgeon’s advice if haematoma develops.",
        "Schedule semen or lab result discussions before you fly when possible so you leave with a written next-step plan.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of micro-TESE in India for foreign patients",
      paragraphs: [
        "Indicative surgical retrieval packages commonly fall around $1,500–$4,500 USD, excluding full IVF/ICSI cycle fees unless bundled. USA directional ranges $8,000–$20,000 for comparable retrieval components; UK and UAE self-pay also typically higher. Combined cycle packages vary widely with stimulation drugs and embryo procedures.",
        "Ask whether microscope fees, anaesthesia, histopathology, cryopreservation of multiple vials, and first-year storage are included. Exclusions often include subsequent IVF cycles, genetic testing of embryos, and donor sperm. Final quotes follow FSH/genetic review.",
        "Price shopping without lab quality comparison is risky — retrieval without competent embryology wastes the surgery.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Look for microsurgeons working inside fertility units with documented retrieval rates they will discuss honestly, and embryology labs experienced with testicular samples. Named-surgeon clarity matters.",
        "TechdrHealth shortlists partner andrology–IVF teams in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives and related pathways",
      paragraphs: [
        "Obstructive cases may consider reconstructive surgery or simpler aspiration. Donor sperm remains an important option when retrieval fails or genetics counsel against use. Varicocele repair is sometimes discussed before retrieval in highly selected men — not a universal first step.",
        "Clomiphene or hCG protocols are specialist decisions for hypogonadotropic states, not DIY pretreatments before micro-TESE.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Complete genetic tests if advised before travel. Align partner stimulation calendar if fresh ICSI is planned. Disclose blood thinners and infections. Arrange 4–7 day lodging and attendant support.",
        "Prepare emotionally for binary outcomes and decide donor-sperm backup preferences in advance. Bring prior biopsy slides/reports if they exist.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and fertility next steps",
      paragraphs: [
        "Use scrotal support, ice as advised, and pain medicines safely. Watch for fever or expanding swelling. Confirm cryostorage invoices and contact persons for future thaw cycles.",
        "Hormone follow-up may be needed after extensive bilateral micro-TESE. Coordinate embryo plans with your home clinic using the discharge packet TechdrHealth helps assemble.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Micro-TESE Sperm Retrieval", "4–7 days"),
    },
  ]);

  out["vasectomy-reversal-india"] = depth("vasectomy-reversal-india", "Vasectomy Reversal", [
    {
      id: "condition",
      heading: "What vasectomy reversal involves",
      paragraphs: [
        "Vasectomy reversal reconnects the vas deferens after a prior vasectomy, usually with microsurgical vaso-vasostomy. When epididymal blowout is suspected, vaso-epididymostomy may be required — a more demanding anastomosis. Success depends on time since vasectomy, surgeon microsurgical skill, partner age and fertility, and whether anti-sperm antibodies or female factors coexist.",
        "Reversal is not the only path to parenthood after vasectomy. Surgical sperm retrieval with ICSI can be more efficient for older female partners or when reversal prognosis is poor. Honest counselling compares cumulative pregnancy rates, cost, and willingness to undergo microsurgery versus IVF.",
        "International patients should send vasectomy date, operative notes if available, and partner fertility summary. Remote triage prevents travelling for reversal when IVF retrieval is clearly the better first recommendation.",
      ],
    },
    {
      id: "who",
      heading: "Who vasectomy reversal in India is for",
      paragraphs: [
        "Candidates are men who desire restored natural fertility after vasectomy, preferably with favourable obstructive intervals and partners with reasonable fertility potential. Men seeking reversal solely to ‘feel whole’ without pregnancy plans still need surgical risk counselling.",
        "Travellers choose India when USA/UK microsurgery self-pay quotes are high. Triage includes prior scrotal surgeries, smoking, and whether simultaneous sperm cryopreservation during reversal is offered.",
      ],
      bullets: [
        "Vasectomy date and notes if available",
        "Partner age and fertility evaluation plan",
        "Understanding of vaso-epididymostomy possibility",
        "Plan 5–8 days in India with overnight stay typical",
        "Willingness to do postoperative semen analyses",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Centres propose microsurgical reversal, anaesthesia plan, and package outline. Confirm microscope use, possible epididymal anastomosis, and overnight observation. Some teams freeze sperm intraoperatively as backup if fluid quality is poor — ask whether that add-on is included.",
        "Surgery lasts several hours under magnification. Postoperative scrotal support, activity limits, and semen analysis schedules (often from 6–12 weeks onward) are explained before discharge.",
        "TechdrHealth coordinates hospital logistics and ensures you leave with a written semen-testing calendar for your home lab.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include bleeding, infection, chronic pain, anastomotic failure or late stricture, and anaesthesia events. Pregnancy is never guaranteed even with sperm returning to the ejaculate.",
        "Mitigation means true microsurgery (not loupes-only in complex cases), experienced high-volume reversals, and dual counselling with IVF options.",
      ],
      bullets: [
        "Failure to restore sperm in ejaculate",
        "Haematoma or infection",
        "Chronic scrotal pain",
        "Need for later IVF despite surgery",
        "Anaesthesia risks",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Overnight hospital observation is common. Estimated stay in India is typically 5–8 days: pre-op, surgery, early review, and buffer before long-haul flights. Avoid intercourse and strenuous activity for the period your surgeon sets — often several weeks.",
        "Desk work may resume relatively early; heavy labour waits longer. Fit-to-fly usually follows wound check and pain control. Do not judge success by the first postoperative weeks — semen analyses come later.",
        "Plan hotel rest rather than extensive tourism immediately after microsurgery.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of vasectomy reversal in India for foreign patients",
      paragraphs: [
        "Indicative packages commonly range $2,500–$5,500 USD for microsurgical reversal, depending on hospital, whether vaso-epididymostomy is needed, and cryopreservation add-ons. USA directional ranges $8,000–$20,000; UK and UAE private microsurgery also typically higher.",
        "Itemise surgeon fees, microscope, anaesthesia, overnight stay, and sperm freeze if offered. Compare total cost against one IVF/ICSI cycle with retrieval — for some couples IVF is economically and time-wise clearer.",
        "Final quotes follow review of vasectomy interval and scrotal exam findings.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Choose microsurgeons who regularly perform reversal and vaso-epididymostomy, with access to an operating microscope and fertility lab backup. Ask about personal patency and pregnancy discussions relevant to your obstructive interval.",
        "TechdrHealth shortlists partner teams across major Indian cities and obtains written estimates pre-travel.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives — reversal versus IVF",
      paragraphs: [
        "PESA/TESA or micro-TESE with ICSI bypasses the need for anastomotic healing and may suit older partners. Donor sperm is another path. Some men attempt reversal and freeze sperm during surgery as a hybrid strategy.",
        "Decision quality improves when both andrology and reproductive medicine weigh in before you buy tickets.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Locate vasectomy records, complete partner fertility basics if possible, stop smoking, and disclose blood thinners. Arrange 5–8 day lodging and an attendant for the first postoperative night after discharge if you leave hospital early.",
        "Clarify semen analysis labs at home that can follow WHO methods for follow-up.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and fertility tracking",
      paragraphs: [
        "Wear scrotal support, avoid ejaculation until cleared, and protect the wound. Complete semen tests on schedule even if you feel normal — patency is laboratory-confirmed.",
        "If azoospermia persists, discuss retrieval/ICSI rather than indefinite waiting. Keep operative diagrams for any future microsurgeon.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Vasectomy Reversal", "5–8 days"),
    },
  ]);

  out["hydrocele-surgery-india"] = depth("hydrocele-surgery-india", "Hydrocele Surgery", [
    {
      id: "condition",
      heading: "What hydrocele surgery involves",
      paragraphs: [
        "A hydrocele is a fluid collection around the testis that causes scrotal swelling. Many are idiopathic in adults; others follow infection, trauma, or filariasis in endemic regions. Surgery (hydrocelectomy) removes or everts the sac to relieve bulk, discomfort, and embarrassment when aspiration alone would recur.",
        "Ultrasound confirms the diagnosis and excludes tumour or significant varicocele that might change the plan. Approaches are chosen to minimise recurrence and injury to testicular vessels. Fertility-conscious technique matters for men still planning children.",
        "International patients from filariasis-endemic areas should mention chronic swelling history and prior aspirations. Remote review of ultrasound images prevents surprises such as concurrent hernia.",
      ],
    },
    {
      id: "who",
      heading: "Who hydrocele surgery in India is for",
      paragraphs: [
        "Candidates have symptomatic or cosmetically significant hydroceles confirmed on imaging, acceptable anaesthetic risk, and understanding that mild asymptomatic hydroceles can be observed. Acute painful swelling needs urgent review to rule out torsion or infection before elective packaging.",
        "Medical travellers seek affordable day-care surgery with short recovery. Triage covers anticoagulation, uncontrolled diabetes, and whether bilateral repair is planned in one sitting.",
      ],
      bullets: [
        "Scrotal ultrasound available for remote review",
        "No signs of acute torsion emergency",
        "Plan 4–6 days in India",
        "Arrangements for scrotal support postoperatively",
        "Disclosure of prior scrotal surgery or aspirations",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "After ultrasound review, centres propose unilateral or bilateral repair, anaesthesia type, and a written package. Confirm whether orchidectomy would ever be considered for rare complex cases — usually not for simple hydrocele.",
        "Surgery is often day-care or overnight. A drain is sometimes used briefly. Discharge covers wound care, swelling expectations, and activity limits.",
        "TechdrHealth helps with scheduling and ensures you receive operative notes for your home doctor.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include bleeding, infection, haematoma, persistent swelling, recurrence, injury to the vas or vessels, and anaesthesia events. Thick chronic sacs can be more challenging.",
        "Mitigation includes proper imaging, meticulous haemostasis, and infection control in accredited theatres.",
      ],
      bullets: [
        "Haematoma",
        "Infection",
        "Recurrence",
        "Chronic pain or numbness",
        "Testicular injury (uncommon with careful surgery)",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Estimated stay in India is typically 4–6 days: assessment, surgery, and a wound check before flying. Swelling can persist for weeks; that is expected and not automatically recurrence.",
        "Avoid strenuous activity and sexual activity until cleared. Supportive underwear helps. Fit-to-fly is usually early for uncomplicated repairs once pain is controlled and there is no expanding haematoma.",
        "Plan limited walking tours only; skip heavy sightseeing the day after surgery.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of hydrocele surgery in India for foreign patients",
      paragraphs: [
        "Indicative packages commonly range $800–$2,000 USD depending on unilateral versus bilateral repair, hospital, and room category. USA directional ranges $4,000–$10,000; UK and UAE private care also typically higher.",
        "Confirm surgeon fees, theatre, anaesthesia, overnight stay if any, and ultrasound. Exclusions include treatment of unexpected pathology and extended stay for haematoma drainage.",
        "Final quotes follow imaging review.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Urologists/andrologists with regular scrotal surgery volume and ultrasound support are appropriate. Named-surgeon estimates beat anonymous package desks.",
        "TechdrHealth shortlists partner hospitals in major metros for international patients.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives to surgery",
      paragraphs: [
        "Observation suits small asymptomatic hydroceles. Aspiration with or without sclerotherapy may be discussed but recurrence is common; it is not always ideal before long-haul travel without a recurrence plan.",
        "Treat underlying infection when present before elective repair.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Upload ultrasound, list anticoagulants, and arrange 4–6 day lodging. Buy or plan for firm scrotal support. Discuss bilateral symptoms so both sides are examined.",
        "Arrive with enough loose clothing for postoperative swelling.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare at home",
      paragraphs: [
        "Keep the wound clean and dry as advised, use support, and watch for fever or rapidly increasing swelling. Complete antibiotics if prescribed.",
        "Residual firmness can last weeks; follow scheduled review rather than panicking early. Contact the team if redness spreads or discharge appears.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Hydrocele Surgery", "4–6 days"),
    },
  ]);

  out["circumcision-phimosis-treatment-india"] = depth("circumcision-phimosis-treatment-india", "Circumcision & Phimosis Treatment", [
    {
      id: "condition",
      heading: "What circumcision and phimosis treatment involve",
      paragraphs: [
        "Phimosis is inability to retract the foreskin; it may be physiologic in children but in adults often reflects scarring from infection, diabetes-related balanitis, or lichen sclerosus. Adult circumcision removes the foreskin to resolve recurrent infections, cracking, sexual pain, or religious/personal preference when medically counselled. Some early phimosis responds to steroid creams; surgery is chosen when medical therapy fails or scarring is established.",
        "Technique choice (sleeve, dorsal slit as interim, or formal circumcision) depends on anatomy and disease. Cosmetic expectations should be discussed frankly. Lichen sclerosus may need pathological assessment and longer-term surveillance advice.",
        "International adult patients often seek discreet, rapid scheduling. Remote photos are sometimes requested clinically; share diabetes history because glucose control affects infection and healing risk.",
      ],
    },
    {
      id: "who",
      heading: "Who this pathway in India is for",
      paragraphs: [
        "Candidates include adults with symptomatic phimosis, recurrent balanitis, tearing during intercourse, or elective circumcision after counselling. Emergency paraphimosis is a different, urgent pathway — do not wait for elective medical-tourism packaging if the foreskin is trapped and swollen.",
        "Travellers value day-care surgery and short stays. Triage covers bleeding disorders, anticoagulants, and active genital infection that should be treated first.",
      ],
      bullets: [
        "Adult symptomatic phimosis or counselled elective circumcision",
        "Diabetes disclosed and ideally optimised",
        "Plan 3–5 days in India",
        "Understanding of wound-care needs for 1–2 weeks",
        "Not an emergency paraphimosis case",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "After history review, centres propose medical trial versus surgery and a written package for day-care circumcision. Consent covers bleeding, infection, cosmetic irregularity, meatal stenosis risk, and changed sensation.",
        "Local, regional, or short general anaesthesia may be used. Dissolvable sutures are common. You leave with antibiotic ointment instructions, swelling expectations, and hygiene guidance.",
        "TechdrHealth arranges discreet timing and discharge notes for continuity at home.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include bleeding, infection, wound separation, unsatisfactory cosmesis, persistent sensitivity changes, and rare injury to the glans or urethra. Poor glucose control raises infection risk.",
        "Mitigation includes experienced genital surgeons, sterile technique, and clear aftercare. Smoking cessation helps healing.",
      ],
      bullets: [
        "Bleeding or haematoma",
        "Infection",
        "Wound gaping",
        "Cosmetic dissatisfaction",
        "Meatal issues (uncommon)",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Circumcision is typically day-care. Estimated stay in India is 3–5 days so a wound check can occur before long-haul flights. Swelling and bruising settle over one to two weeks; complete healing takes longer.",
        "Avoid intercourse and strenuous activity until cleared — often several weeks. Wear loose clothing. Fit-to-fly is usually early if the wound is dry and pain is mild.",
        "Do not schedule the procedure the evening before an ultra-long-haul flight without surgeon agreement.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of circumcision and phimosis treatment in India",
      paragraphs: [
        "Indicative packages commonly range $400–$1,200 USD for adult circumcision, depending on anaesthesia type and hospital. USA directional ranges $2,000–$6,000; UK and UAE private care also typically higher.",
        "Confirm whether histology (if lichen sclerosus suspected), medicines, and follow-up visit are included. Final quotes follow examination.",
        "Emergency paraphimosis care is priced and sequenced differently — seek urgent local care if needed before travel.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Urologists/andrologists or experienced general surgeons with regular adult circumcision volume are appropriate. Ask about lichen sclerosus experience if foreskin looks scarred and white.",
        "TechdrHealth shortlists partner hospitals for international patients seeking discreet care.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives to circumcision",
      paragraphs: [
        "Topical steroids can help non-scarred phimosis. Treating candidal balanitis and improving glucose may reduce symptoms. Dorsal slit is sometimes an interim measure but is not always cosmetically preferred long term.",
        "Elective circumcision for preference alone still deserves infection-risk and expectation counselling.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Optimise diabetes, treat active infection, list blood thinners, and arrange 3–5 day lodging. Bring breathable underwear. Discuss religious or cultural timing preferences early so theatre scheduling respects them when possible.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare at home",
      paragraphs: [
        "Follow cleaning and ointment routines, expect yellow fibrinous patches during healing (ask what is normal vs infection), and avoid pulling crusts. Seek care for fever, pus, or heavy bleeding.",
        "Sensation changes evolve over months; patience is part of recovery.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Circumcision & Phimosis Treatment", "3–5 days"),
    },
  ]);

  out["testosterone-replacement-therapy-india"] = depth("testosterone-replacement-therapy-india", "Testosterone Replacement Therapy", [
    {
      id: "condition",
      heading: "What testosterone replacement therapy (TRT) involves",
      paragraphs: [
        "Testosterone replacement treats clinically confirmed male hypogonadism — symptoms plus repeatedly low morning testosterone — not a single borderline lab from an afternoon blood draw. Causes include primary testicular failure, pituitary/hypothalamic disease, ageing-related declines with careful selection, and medication or opioid effects. TRT can use injections, gels, or other supervised formulations; unsupervised online ‘TRT clinics’ without proper diagnosis risk infertility, erythrocytosis, and missed pituitary tumours.",
        "Andrology evaluation in India pairs symptoms (libido, energy, erectile quality, mood, muscle, gynaecomastia) with labs: total testosterone, SHBG/free testosterone when needed, LH/FSH, prolactin, and blood counts. Fertility desire is decisive: exogenous testosterone suppresses spermatogenesis; men wanting children may need alternative strategies such as selective oestrogen receptor modulators or hCG under specialist care instead of standard TRT.",
        "International patients should upload morning labs and a medication list before travel. A 3–5 day visit can confirm diagnosis, exclude contraindications (such as seeking unexplained PSA rises), and start supervised therapy with a monitoring plan for home.",
      ],
    },
    {
      id: "who",
      heading: "Who TRT evaluation in India is for",
      paragraphs: [
        "Candidates have compatible symptoms and documented low testosterone on appropriate testing, or complex cases needing pituitary assessment. Men chasing athletic performance without deficiency are not appropriate TRT candidates.",
        "Travellers often want a definitive workup after fragmented testing at home. Triage covers prostate history, sleep apnoea, fertility goals, and cardiovascular risk.",
      ],
      bullets: [
        "Morning testosterone results (ideally repeated)",
        "Clear statement of fertility plans",
        "PSA and haematocrit planning for age-appropriate men",
        "Plan 3–5 days in India for workup and therapy start",
        "Commitment to monitoring labs after return home",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Remote review determines whether confirmatory labs and endocrine/andrology consults are needed on arrival. Packages may include consults, labs, ultrasound if indicated, and initial medicine supply. Contraindications and monitoring intervals are documented before first dose.",
        "Injection teaching or gel application counselling happens in clinic. You leave with a written schedule for haematocrit, testosterone levels, and symptom review.",
        "TechdrHealth helps align prescriptions with what you can legally continue in your home country and shares summaries with your local physician.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include erythrocytosis, acne, oedema, sleep apnoea worsening, infertility while on TRT, potential prostate monitoring issues, and cardiovascular considerations that remain under active study and guideline debate. Gel transfer to partners/children is a household safety issue.",
        "Mitigation means confirmed deficiency, fertility counselling, baseline PSA/haematocrit when indicated, and scheduled monitoring — not lifelong unsupervised self-injection.",
      ],
      bullets: [
        "High red-cell mass (erythrocytosis)",
        "Suppressed sperm production",
        "Acne or fluid retention",
        "Worsened sleep apnoea",
        "Need to stop TRT if complications arise",
      ],
    },
    {
      id: "recovery",
      heading: "Timeline and estimated stay in India",
      paragraphs: [
        "TRT start is outpatient. Estimated stay in India is typically 3–5 days for confirmatory testing, counselling, and first supervised doses. Symptom improvement can take weeks to months; do not expect instant transformation during the trip.",
        "No surgical fit-to-fly issues apply for pure medical TRT visits. If injectable procedures or implants for ED are combined, follow those pages’ longer stay guidance.",
        "Plan pharmacy supply for travel days and know how refills will work at home before you fly.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of TRT evaluation and start in India for foreign patients",
      paragraphs: [
        "Indicative packages for workup and treatment initiation commonly fall around $300–$1,500 USD depending on lab depth, imaging, and medicine formulation. Long-term medicine costs continue after discharge and vary by country availability. USA directional ranges for comparable specialist starts often run $1,500–$6,000; UK and UAE private endocrine care also typically higher for unbundled pathways.",
        "Clarify what labs and how many weeks of medicine are included. Exclusions include indefinite refills, pituitary MRI if later needed, and fertility treatments. Final quotes follow lab review.",
        "Beware of cheap ‘testosterone tourism’ without monitoring plans — that is not the pathway partner hospitals support.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Andrologists, endocrinologists, or urologists with male-hormone expertise and lab access are appropriate. Ask how they handle fertility preservation counselling.",
        "TechdrHealth shortlists partner teams in major Indian metros for international patients.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives when fertility matters",
      paragraphs: [
        "Weight loss, sleep apnoea treatment, opioid reduction, and treating prolactin issues may raise testosterone naturally. For fertility, avoid standard TRT; discuss SERMs, hCG, or other specialist protocols instead.",
        "ED can be treated without TRT when testosterone is normal — do not use hormones as a default erectile drug.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Get morning labs if possible, list all supplements and anabolic steroid history honestly, and state fertility goals in writing. Arrange 3–5 day lodging near the clinic.",
        "Check customs rules for carrying testosterone products home — regulations differ widely.",
      ],
    },
    {
      id: "aftercare",
      heading: "Monitoring after you return home",
      paragraphs: [
        "Complete haematocrit and testosterone checks on schedule. Report ankle swelling, severe headaches, breathing pauses at night, or urinary changes. Do not double doses without advice.",
        "Share the Indian discharge plan with your local doctor so monitoring is continuous.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Testosterone Replacement Therapy", "3–5 days"),
    },
  ]);

  out["premature-ejaculation-treatment-india"] = depth("premature-ejaculation-treatment-india", "Premature Ejaculation Treatment", [
    {
      id: "condition",
      heading: "What premature ejaculation treatment involves",
      paragraphs: [
        "Premature ejaculation (PE) is ejaculation that always or nearly always occurs within about one minute of penetration (lifelong PE) or a bothersome reduction in latency (acquired PE), with inability to delay and negative personal consequences. It is common, treatable, and often mixed with erectile difficulty or performance anxiety. Andrology care combines behavioural techniques, couples counselling when helpful, topical anaesthetics, and oral pharmacotherapy selected after medical review.",
        "Evaluation asks about onset, condom use, erectile firmness, substance use, thyroid symptoms, and relationship context. Treating PE with ED tablets alone fails when the primary issue is ejaculatory control; treating PE while ignoring ED also frustrates couples. Partner involvement improves adherence to behavioural plans such as start–stop and squeeze techniques.",
        "International patients seek confidential clinics that will not moralise. A 3–5 day visit can establish diagnosis, start therapy, and teach techniques with optional tele-follow-up after return home.",
      ],
    },
    {
      id: "who",
      heading: "Who PE treatment in India is for",
      paragraphs: [
        "Candidates are men with bothersome early ejaculation who want structured care, including those who failed self-help or online medicines. Acquired PE needs screening for ED, prostatitis symptoms, and thyroid issues.",
        "Travellers value privacy and English-speaking counselling. Triage covers SSRI history, serotonin-syndrome risk, and whether depression needs parallel mental-health care.",
      ],
      bullets: [
        "Clear symptom timeline (lifelong vs acquired)",
        "ED symptoms disclosed if present",
        "Plan 3–5 days in India",
        "Openness to behavioural practice, not only pills",
        "Medication list for interaction checks",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Remote history leads to a proposed package of consults, basic labs if indicated, and initial therapy. On arrival, confidential assessment sets a combined plan. Topical agents require education about transfer to partners and condom use. Oral agents need timing and side-effect counselling.",
        "Behavioural homework is written down so practice continues at home. Follow-up may be virtual for dose adjustment.",
        "TechdrHealth helps protect privacy in scheduling and documentation.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Medicines may cause nausea, dizziness, fatigue, mood changes, or reduced libido. Topicals can cause numbness in both partners if misused. Unsupervised high-dose SSRIs for PE without medical oversight are unsafe.",
        "Mitigation includes specialist prescribing, interaction checks, and combining drugs with behavioural methods for better durability.",
      ],
      bullets: [
        "Medication side effects",
        "Partner numbness from topicals",
        "Serotonin-related risks with drug combinations",
        "Relationship strain if partner excluded from plan",
        "Relapse if behavioural practice stops",
      ],
    },
    {
      id: "recovery",
      heading: "Timeline and estimated stay in India",
      paragraphs: [
        "Care is outpatient. Estimated stay in India is typically 3–5 days for assessment, counselling, and therapy start. Meaningful improvement often needs weeks of practice after you go home — the trip starts the programme, it rarely finishes it.",
        "No surgical recovery applies unless a separate procedure is planned. Fit-to-fly is unrestricted for consult-only visits.",
        "Schedule at least one structured counselling session rather than a medicine-only handoff when anxiety is prominent.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of premature ejaculation treatment in India",
      paragraphs: [
        "Indicative packages commonly range $400–$2,000 USD for evaluation and treatment initiation, depending on counselling intensity and medicine supply. USA directional ranges $2,000–$8,000 for comparable specialist pathways; UK and UAE private care also typically higher.",
        "Ask what consults and medicine weeks are included. Long-term pharmacy costs continue at home. Final quotes follow clinical review.",
        "Reject clinics promising permanent one-day cures without behavioural components or examination.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Andrologists or sexual-medicine clinicians with PE protocols and ED differential skills are appropriate. Integrated counselling access is a plus.",
        "TechdrHealth shortlists discreet partner clinics in major metros.",
      ],
    },
    {
      id: "alternatives",
      heading: "Combined and alternative approaches",
      paragraphs: [
        "Psychosexual therapy alone helps selected lifelong PE. Treating ED first can normalise latency when early ejaculation was compensatory. Pelvic-floor physiotherapy is adjunctive in some programmes.",
        "Alcohol reduction and stopping recreational stimulants may help acquired PE.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Write a concise history, list medicines, and decide whether your partner will attend sessions. Arrange 3–5 day lodging. Avoid starting unknown online PE drugs right before travel without telling the clinic.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and practice at home",
      paragraphs: [
        "Follow dosing schedules, practise behavioural techniques several times weekly, and use tele-follow-up for adjustments. Report mood changes on medicines promptly.",
        "If ED emerges or worsens, request combined reassessment rather than adding random tablets.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Premature Ejaculation Treatment", "3–5 days"),
    },
  ]);

  out["azoospermia-treatment-india"] = depth("azoospermia-treatment-india", "Azoospermia Treatment", [
    {
      id: "condition",
      heading: "What azoospermia treatment in India involves",
      paragraphs: [
        "Azoospermia means no sperm in the ejaculate on centrifuged semen analysis. Roughly, it divides into obstructive (production present, outflow blocked) and non-obstructive (production impaired). Treatment follows the type: reconstruction or retrieval for obstruction; medical therapy in rare hormonal deficiencies; micro-TESE for many non-obstructive cases; and donor-sperm or adoption counselling when retrieval is unlikely or unsuccessful.",
        "Workup includes repeat semen analyses, FSH, testosterone, LH, physical exam (vas palpable? testis size?), and genetic tests when non-obstructive disease is suspected. CFTR-related issues matter in some obstructive phenotypes. Imaging and prior genital surgery history refine the map.",
        "International couples often combine male workup with female IVF planning in one trip. Remote triage of labs prevents booking micro-TESE when a simple missed obstruction diagnosis was never completed.",
      ],
    },
    {
      id: "who",
      heading: "Who azoospermia pathways in India are for",
      paragraphs: [
        "Candidates are men with confirmed azoospermia seeking diagnosis and a fertility plan, including post-vasectomy obstruction, infection-related obstruction, and non-obstructive failure. Partners should be included in counselling about ICSI timelines and genetics.",
        "Travellers choose India for integrated andrology–IVF capability and transparent packages. Triage covers chemo history, undescended testes, and prior failed retrievals.",
      ],
      bullets: [
        "Two semen analyses confirming azoospermia",
        "Hormone labs and genetics as indicated",
        "Partner fertility plan documented",
        "Plan 5–10 days in India depending on surgery vs workup-only",
        "Emotional readiness for donor-sperm discussions",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Share complete labs. Centres classify likely obstructive versus non-obstructive pathways and quote evaluation, reconstruction, or micro-TESE ± ICSI packages. Consent covers retrieval failure probability and genetic implications for offspring when relevant.",
        "On arrival, confirmatory testing and multidisciplinary consults set the operative or medical plan. Embryology readiness is confirmed before retrieval days.",
        "TechdrHealth synchronises couple schedules, visa letters, and documentation for home clinics.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Diagnostic delay, unnecessary surgery, retrieval failure, hypogonadism after extensive testicular surgery, anaesthesia risks, and genetic transmission issues are the core concerns. Emotional strain on couples is real and should be anticipated.",
        "Mitigation means correct classification before invasive steps, microsurgical expertise, genetic counselling, and transparent lab quality.",
      ],
      bullets: [
        "Failed sperm retrieval",
        "Surgical complications (bleeding, infection, hormone drop)",
        "Genetic findings that change plans",
        "IVF cycle cancellation logistics",
        "Financial stress from stacked procedures — itemise early",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Workup-only visits may need 5–7 days. When reconstruction or micro-TESE is performed, estimate 5–10 days in India including early postoperative review. Fresh ICSI coordination can extend the couple’s stay to match stimulation — plan holistically.",
        "Scrotal surgery recovery mirrors the micro-TESE and reversal pages: support, activity limits, and wound vigilance. Fit-to-fly follows surgical clearance.",
        "Leave with written next steps: freeze status, embryo plan, or donor pathway — not verbal assurances alone.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of azoospermia treatment in India for foreign patients",
      paragraphs: [
        "Indicative packages commonly span $1,000–$6,000 USD for male evaluation and surgical retrieval/reconstruction components, with full IVF/ICSI cycles priced separately unless bundled. USA directional ranges for complex male-factor pathways often run $8,000–$30,000; UK and UAE private care also typically higher.",
        "Demand clarity on genetics, micro-TESE, cryostorage, and whether female stimulation drugs are inside any ‘couple package’. Final quotes follow classification of obstructive versus non-obstructive disease.",
        "The lowest male-only headline price is meaningless if embryology and genetics are poor quality.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "High-quality azoospermia care needs andrologists/urologists plus IVF embryology under one coordinated pathway. Ask about micro-TESE volume and genetic counselling access.",
        "TechdrHealth shortlists partner fertility–andrology centres in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives and decision framework",
      paragraphs: [
        "Donor sperm, adoption, and remaining child-free are valid outcomes when medically appropriate. For post-vasectomy obstruction, compare reversal versus retrieval/ICSI using partner age as a major factor.",
        "Varicocele repair is not a universal azoospermia cure; it is selectively discussed.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Complete or organise genetics before travel when advised, align partner calendars, and arrange 5–10 day lodging. Discuss donor-sperm backup consent in advance to avoid crisis decisions under anaesthesia time pressure.",
        "Bring all prior semen and operative records.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and next fertility steps",
      paragraphs: [
        "Follow surgical aftercare if operated. Confirm cryostorage paperwork. Schedule hormone checks after extensive micro-TESE. Continue couple counselling support as needed.",
        "Share full reports with your home reproductive specialist before the next stimulation cycle.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Azoospermia Treatment", "5–10 days"),
    },
  ]);

  // Upgraded depth for moved procedures
  out["varicocele-surgery-india"] = depth("varicocele-surgery-india", "Varicocele Surgery", [
    {
      id: "condition",
      heading: "What varicocele surgery involves",
      paragraphs: [
        "A varicocele is dilation of scrotal veins of the pampiniform plexus, more often on the left. It can cause ache, testicular atrophy, and impaired semen parameters. Repair aims to interrupt refluxing veins while preserving arterial supply and lymphatics — microsurgical subinguinal varicocelectomy is widely preferred for lower recurrence and hydrocele rates versus older non-microsurgical approaches; laparoscopy is an alternative in selected cases.",
        "Not every varicocele needs surgery. Adolescents with growth disparity, men with infertility and abnormal semen, and those with significant pain after conservative care are typical operative candidates. Embolisation is another option in some centres. Andrology context matters: couples may combine repair with timed IVF/ICSI rather than waiting indefinitely for semen improvement.",
        "International patients should send scrotal ultrasound with grade, semen analyses, and hormone labs. Remote triage distinguishes incidental varicoceles from clinically significant disease so you do not travel for an operation that will not change fertility odds meaningfully.",
      ],
    },
    {
      id: "who",
      heading: "Who varicocele surgery in India is for",
      paragraphs: [
        "Candidates include men with clinically significant varicoceles plus infertility, abnormal semen, or refractory pain, after specialist confirmation. Men with normal semen and no symptoms are often observed. Bilateral findings and grade discussion should be explicit.",
        "Medical travellers compare Indian microsurgical packages with high self-pay quotes abroad. Triage covers prior embolisation or surgery, anticoagulation, and whether simultaneous fertility treatments are planned.",
      ],
      bullets: [
        "Ultrasound and semen reports for remote review",
        "Pain or infertility indication clearly documented",
        "Plan 4–7 days in India (day-care or overnight surgery)",
        "Understanding that semen gains take months, not days",
        "Partner fertility plan if trying to conceive",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Centres propose microsurgical or laparoscopic repair, anaesthesia, and a written package. Confirm microscope use and whether bilateral repair is advised. Consent covers recurrence, hydrocele, artery injury, and failure to improve semen or pain.",
        "Surgery is often day-care or overnight. Postoperative support, ice, and activity limits are explained. Semen retesting is typically deferred for about three months.",
        "TechdrHealth coordinates hospital stay and ensures operative notes reach your home fertility clinic.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks include bleeding, infection, hydrocele formation, recurrence, testicular atrophy if arterial injury occurs, and persistent pain. Anaesthesia risks apply as with any operation.",
        "Mitigation emphasises microsurgical technique, experienced varicocele surgeons, and correct patient selection.",
      ],
      bullets: [
        "Hydrocele",
        "Recurrence",
        "Haematoma or infection",
        "Arterial injury (uncommon with microsurgery)",
        "No semen improvement despite technical success",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and estimated stay in India",
      paragraphs: [
        "Estimated stay in India is typically 4–7 days: consult, surgery, and early review before long-haul flights. Many men resume desk work within days but avoid heavy lifting for several weeks as advised.",
        "Pain usually improves gradually; residual ache can linger. Fit-to-fly is commonly early after uncomplicated repair once walking comfortably and wounds are dry.",
        "Do not schedule semen analysis during the trip expecting final fertility answers — improvement is assessed months later.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of varicocele surgery in India for foreign patients",
      paragraphs: [
        "Indicative packages commonly range $1,000–$2,500 USD for microsurgical repair, depending on unilateral versus bilateral and hospital class. USA directional ranges $5,000–$12,000; UK and UAE private care also typically higher.",
        "Itemise microscope fees, anaesthesia, overnight stay, and medicines. Exclusions include later fertility treatments and hydrocele repair if it develops. Final quotes follow ultrasound and semen review.",
        "Compare against IVF timing — some couples wisely parallel-path rather than waiting solely on varicocele response.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Choose urologists/andrologists with regular microsurgical varicocelectomy volume and fertility clinic links. Named-surgeon clarity matters.",
        "TechdrHealth shortlists partner teams across Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternatives to surgery",
      paragraphs: [
        "Observation, analgesics, scrotal support, and embolisation are alternatives in selected men. IVF/ICSI may be prioritised when female age is the dominant clock.",
        "Repairing a subclinical varicocele found only on ultrasound without semen issues is generally discouraged.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Upload ultrasound and semen results, list blood thinners, and arrange 4–7 day lodging. Discuss bilateral symptoms. Plan time off from heavy physical work after return.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and fertility follow-up",
      paragraphs: [
        "Use scrotal support, avoid strain, and watch for fever or severe swelling. Schedule semen analysis with your home lab at the interval your surgeon sets.",
        "If pain was the indication, track symptom scores; if fertility was the indication, coordinate next steps with reproductive medicine rather than repeating surgery prematurely.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Varicocele Surgery", "4–7 days"),
    },
  ]);

  out["male-sexual-health-treatment-india"] = depth("male-sexual-health-treatment-india", "Male Sexual Health Treatment", [
    {
      id: "condition",
      heading: "What male sexual health treatment in India covers",
      paragraphs: [
        "Male sexual health is an andrology umbrella spanning erectile dysfunction, premature ejaculation, low desire, Peyronie's disease, hypogonadism-related symptoms, and post-prostatectomy sexual rehabilitation. Treatment is diagnosis-led: the same symptom of ‘poor performance’ may need vascular ED care, PE behavioural therapy, testosterone evaluation, or psychosexual support — sometimes several together.",
        "Partner hospitals in India offer confidential pathways with urologists/andrologists, access to duplex ultrasound, hormone labs, and escalation to penile implant when appropriate. The goal is restoring function and confidence with evidence-based steps, not selling a single procedure to every traveller.",
        "International patients often want one coordinated visit that sorts overlapping issues. Remote triage using a structured questionnaire, medication list, and prior labs prevents wrong-package bookings.",
      ],
    },
    {
      id: "who",
      heading: "Who male sexual health pathways are for",
      paragraphs: [
        "Candidates are men with sexual symptoms affecting quality of life who want discreet specialist care, including those who failed fragmented online treatments. Couples travelling for fertility may need sexual function restored for timed intercourse or comfort during ART.",
        "Triage separates emergency ischaemic priapism (urgent local care) from elective sexual-medicine travel. Cardiac risk screening is part of responsible ED care.",
      ],
      bullets: [
        "Symptom list covering erection, ejaculation, desire, and pain/curvature",
        "Medication and nitrate disclosure",
        "Plan 3–7 days in India for evaluation and treatment start",
        "Partner participation when relationship factors matter",
        "Willingness to follow stepped care before implant requests",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        "Share history securely. Centres propose assessment days, likely first-line therapy, and written estimates. You may be routed into focused pages — ED, PE, Peyronie's, TRT, or implant — after the index consult.",
        "On arrival, examination and counselling set a plan. Education covers medicine safety, behavioural homework, and when to escalate. TechdrHealth maintains privacy in logistics and documentation.",
        "Discharge packets list diagnoses, medicines, and tele-follow-up contacts for your home clinician.",
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        "Risks mirror the specific therapies used — drug interactions, priapism with injections, surgical risks if implants or Peyronie's operations follow, and psychological harm from unrealistic marketing promises.",
        "Mitigation is stepped, named-specialist care in accredited hospitals with clear consent at each escalation.",
      ],
      bullets: [
        "Medicine interactions (especially nitrates)",
        "Priapism with injection misuse",
        "Missed cardiac or hormonal disease",
        "Procedure-specific surgical risks if escalated",
        "Dissatisfaction if expectations ignore relationship context",
      ],
    },
    {
      id: "recovery",
      heading: "Timeline and estimated stay in India",
      paragraphs: [
        "Most sexual-health evaluations are outpatient with an estimated India stay of 3–7 days. If implant or reconstructive surgery is chosen, follow those pages’ 7–10 day guidance instead.",
        "Improvement timelines differ: medicines may work on first correct doses; behavioural PE work takes weeks; hormonal change takes longer. Fit-to-fly is unrestricted for consult-only care.",
        "Build hotel buffer for possible same-week ultrasound or second consults.",
      ],
    },
    {
      id: "cost",
      heading: "Cost of male sexual health treatment in India",
      paragraphs: [
        "Indicative packages commonly span $800–$8,000 USD because pathways range from consult-and-medicine care to procedural treatments. Implant surgery sits higher on its own page. USA directional ranges often $3,000–$20,000+ for comparable specialist stacks; UK and UAE private care also typically exceed Indian evaluation packages.",
        "Require itemisation by consults, labs, medicines, and any procedures. Final quotes follow diagnosis — not a single blurry ‘sexual wellness’ flyer price.",
        "Use child pages for ED, PE, Peyronie's, TRT, and implants to compare specific USD ranges before travel.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        "Look for andrology/sexual-medicine experience within urology departments that can escalate to surgery when needed. Confidentiality practices should be explicit for international desks.",
        "TechdrHealth shortlists partner teams across major Indian metros.",
      ],
    },
    {
      id: "alternatives",
      heading: "How this hub relates to focused treatments",
      paragraphs: [
        "Use this page when symptoms overlap or diagnosis is unclear. Once a primary diagnosis is set, deepen planning on erectile dysfunction, premature ejaculation, Peyronie's, testosterone, or penile implant pages.",
        "Fertility-first patients should also open male infertility, azoospermia, and micro-TESE guides.",
      ],
    },
    {
      id: "prep",
      heading: "How to prepare before you fly",
      paragraphs: [
        "Write symptoms plainly, list medicines, gather labs, and decide partner involvement. Arrange 3–7 day lodging. Avoid last-minute unregulated supplements that confound hormone testing.",
      ],
    },
    {
      id: "aftercare",
      heading: "Aftercare and continuity",
      paragraphs: [
        "Follow the specific aftercare for whichever therapy you start. Keep tele-follow-up appointments and share summaries with your home GP. Reassess if new chest pain, mood change, or genital pain appears.",
        "Escalation to implant or surgery should be a deliberate second trip or planned extension — not an impulse upgrade without consent time.",
      ],
    },
    {
      id: "geo",
      heading: "International patients and city options (GEO)",
      paragraphs: geoParas("Male Sexual Health Treatment", "3–7 days"),
    },
  ]);

  return out;
}

function buildFaqs() {
  /** @type {Record<string, {question: string; answer: string}[]>} */
  const faqs = {};
  const add = (slug, items) => {
    faqs[slug] = items;
  };

  add("erectile-dysfunction-treatment-india", [
    { question: "What is the cost of erectile dysfunction treatment in India for foreigners?", answer: "Indicative packages commonly range about $500–$3,500 USD for evaluation and medical or injection pathways. Penile implants are quoted separately at higher ranges. Final prices follow clinical review." },
    { question: "How many days should I stay in India for ED treatment?", answer: "Plan about 3–7 days for assessment, labs, counselling, and treatment start. Implant surgery needs a longer 7–10 day stay — see the penile implant page." },
    { question: "Can I get ED treatment if I take heart medicines?", answer: "Maybe not oral PDE5 inhibitors if you use nitrates. Always disclose chest-pain drugs. Your andrology and cardiology teams will advise safe options." },
    { question: "Is erectile dysfunction treatment confidential for international patients?", answer: "Yes. Partner centres and TechdrHealth coordinate discreet scheduling and documentation. Share only what clinicians need for safe care." },
    { question: "When is a penile implant considered?", answer: "When organic ED is refractory to or unsuitable for tablets and injections, and you accept surgical risks after counselling. It is not a first-line step for most men." },
    { question: "Will insurance cover ED treatment in India?", answer: "Many international plans exclude elective sexual-medicine care. Confirm with your insurer; most travellers self-pay packages." },
  ]);

  add("penile-implant-surgery-india", [
    { question: "What does penile implant surgery cost in India?", answer: "Indicative packages often range $4,500–$12,000 USD including the device, depending on malleable versus inflatable models and hospital. USA self-pay is frequently much higher." },
    { question: "How long is the hospital and India stay?", answer: "Hospital stay is commonly 1–2 nights. Plan about 7–10 days in India for surgery, early wound review, and fit-to-fly clearance." },
    { question: "Malleable or inflatable — which is better?", answer: "Neither is universally better. Inflatable devices offer a more natural flaccid appearance; malleable devices are simpler to use and often cost less. Dexterity, cost, and surgeon advice guide the choice." },
    { question: "What is the infection risk?", answer: "Infection is the most serious early complication and may require device removal. Diabetes control, antibiotic protocols, and experienced implanters reduce risk. Your surgeon will quote personalised counselling." },
    { question: "When can I resume sexual activity?", answer: "Usually after several weeks when your surgeon clears healing — often around 4–6 weeks for many primary implants. Follow your operative instructions, not forum timelines." },
    { question: "Can Peyronie's disease be treated at the same time?", answer: "Often yes — implant with modelling or adjunctive correction may be planned when ED and curvature coexist. This can change package cost and stay length." },
  ]);

  add("peyronies-disease-treatment-india", [
    { question: "What is the cost of Peyronie's treatment in India?", answer: "Packages commonly span about $800–$8,000 USD depending on injectables versus plication, grafting, or combined implant surgery." },
    { question: "How long should I stay in India?", answer: "Plan roughly 5–10 days. Injection pathways may cluster outpatient visits; surgery usually needs day-care or 1–2 nights plus a recovery buffer." },
    { question: "Can I have surgery during the painful acute phase?", answer: "Usually no. Surgery is preferred when deformity is stable. Acute disease may need medical measures and reassessment." },
    { question: "Will surgery shorten the penis?", answer: "Plication can reduce length as a trade-off for straightening. Grafting and implant strategies have different length profiles. Consent must cover this explicitly." },
    { question: "What if I also have erectile dysfunction?", answer: "Combined pathways including penile implant may be more appropriate than curvature surgery alone. Tell your surgeon about erection quality honestly." },
    { question: "Are injectable therapies available?", answer: "Availability of specific branded injectables varies by regulation and hospital. Ask during remote review which options your centre currently offers." },
  ]);

  add("micro-tese-sperm-retrieval-india", [
    { question: "What does micro-TESE cost in India for foreigners?", answer: "Indicative retrieval packages often range $1,500–$4,500 USD, usually excluding a full IVF/ICSI cycle unless bundled." },
    { question: "How many days do I need in India?", answer: "Plan about 4–7 days for consults, procedure, and early follow-up. Fresh ICSI with a partner may require a longer couple stay aligned to stimulation." },
    { question: "Is sperm retrieval guaranteed?", answer: "No. Micro-TESE improves odds in non-obstructive azoospermia but cannot guarantee sperm. Discuss failure counselling and donor backup before surgery." },
    { question: "TESA, PESA, or micro-TESE — which do I need?", answer: "Obstructive cases may use PESA/TESA; many non-obstructive cases favour micro-TESE. Classification after labs and exam decides the method." },
    { question: "Can sperm be frozen for later IVF abroad?", answer: "Often yes, subject to lab protocols and shipping/storage rules. Clarify cryostorage duration, fees, and export options in writing before travel." },
    { question: "Should I do genetic tests first?", answer: "For non-obstructive azoospermia, karyotype and Y-microdeletion testing are commonly advised before or as part of planning. Results can change counselling." },
  ]);

  add("vasectomy-reversal-india", [
    { question: "What is the cost of vasectomy reversal in India?", answer: "Indicative microsurgical packages commonly range $2,500–$5,500 USD depending on complexity and hospital." },
    { question: "How long is the stay?", answer: "Overnight observation is typical. Plan about 5–8 days in India including pre-op and early wound review before flying home." },
    { question: "Is reversal better than IVF?", answer: "It depends on time since vasectomy, partner age, cost, and preference for natural conception attempts. Many couples benefit from joint andrology–IVF counselling before choosing." },
    { question: "When will sperm return to the semen?", answer: "If successful, sperm may appear over months. Semen analyses usually start weeks to months after surgery per your surgeon’s schedule — not during the hospital week." },
    { question: "What is vaso-epididymostomy?", answer: "A more complex microsurgical connection used when epididymal blowout prevents standard vaso-vasostomy. It requires high microsurgical skill and may be decided intraoperatively." },
    { question: "Can sperm be frozen during reversal?", answer: "Some centres offer intraoperative cryopreservation as backup for future ICSI. Ask whether it is included in your package." },
  ]);

  add("hydrocele-surgery-india", [
    { question: "What does hydrocele surgery cost in India?", answer: "Indicative packages commonly range $800–$2,000 USD for repair, with bilateral cases toward the higher end." },
    { question: "How many days should I stay?", answer: "Plan about 4–6 days for assessment, day-care or overnight surgery, and a wound check before long-haul flights." },
    { question: "Will the swelling go away immediately?", answer: "Bulk from fluid is addressed at surgery, but postoperative swelling and firmness can last weeks and are often normal. Recurrence is different and is assessed later." },
    { question: "Is aspiration a good alternative before travel?", answer: "Aspiration often recurs. It may be discussed but is usually not a durable substitute for definitive repair when symptoms are significant." },
    { question: "Can hydrocele surgery affect fertility?", answer: "Careful technique aims to protect vessels and vas. Discuss fertility plans so the surgical approach remains fertility-conscious." },
    { question: "Do I need ultrasound first?", answer: "Yes — ultrasound confirms hydrocele and helps exclude other scrotal pathology before elective packaging." },
  ]);

  add("circumcision-phimosis-treatment-india", [
    { question: "What is the cost of adult circumcision in India?", answer: "Indicative packages commonly range $400–$1,200 USD depending on anaesthesia and hospital." },
    { question: "How long do I need to stay in India?", answer: "Plan about 3–5 days so a wound check can occur before you fly. Full healing takes longer at home." },
    { question: "Can phimosis be treated without surgery?", answer: "Early, non-scarred phimosis may respond to steroid creams. Established scarring usually needs circumcision after counselling." },
    { question: "Is adult circumcision painful?", answer: "Anaesthesia covers the procedure; postoperative soreness is expected for days and managed with medicines and loose clothing." },
    { question: "What about diabetes and healing?", answer: "Uncontrolled diabetes raises infection risk. Optimise glucose before elective circumcision whenever possible." },
    { question: "When is paraphimosis an emergency?", answer: "If the foreskin is trapped behind the glans causing pain and swelling, seek urgent local care — do not wait for elective medical-tourism scheduling." },
  ]);

  add("testosterone-replacement-therapy-india", [
    { question: "What does TRT evaluation cost in India for foreigners?", answer: "Workup and treatment-start packages commonly range about $300–$1,500 USD. Ongoing medicine costs continue after discharge and vary by country." },
    { question: "How many days should I stay?", answer: "Plan about 3–5 days for confirmatory labs, counselling, and supervised therapy initiation." },
    { question: "Will TRT affect fertility?", answer: "Standard testosterone therapy typically suppresses sperm production. Tell your doctor if you want children — alternatives may be more appropriate." },
    { question: "Can I start TRT on one low lab value?", answer: "No. Diagnosis needs compatible symptoms plus properly timed, usually repeated morning testosterone testing and clinical judgement." },
    { question: "What monitoring is required?", answer: "Schedules often include haematocrit, testosterone levels, and age-appropriate prostate assessment. Your discharge letter should specify intervals." },
    { question: "Can I take testosterone home on the plane?", answer: "Rules differ by country and formulation. Check customs and carry prescriptions; ask the clinic for travel documentation." },
  ]);

  add("premature-ejaculation-treatment-india", [
    { question: "What is the cost of PE treatment in India?", answer: "Indicative packages commonly range $400–$2,000 USD for evaluation and treatment start, depending on counselling and medicines." },
    { question: "How long is the stay?", answer: "Plan about 3–5 outpatient days. Lasting improvement usually continues with practice after you return home." },
    { question: "Are medicines enough on their own?", answer: "Medicines help many men, but combined behavioural techniques generally produce more durable results. Your plan should include both when appropriate." },
    { question: "Is PE treatment confidential?", answer: "Yes. Discreet scheduling and documentation are standard for sexual-medicine pathways coordinated for international patients." },
    { question: "What if I also have erectile dysfunction?", answer: "Combined assessment is important. Treating only PE or only ED when both exist often fails. Tell your clinician about both symptom sets." },
    { question: "How soon will I see results?", answer: "Some medicine effects appear with correct dosing; behavioural gains build over weeks. Be wary of one-day permanent-cure claims." },
  ]);

  add("azoospermia-treatment-india", [
    { question: "What does azoospermia treatment cost in India?", answer: "Male evaluation and surgical components commonly span about $1,000–$6,000 USD; full IVF/ICSI cycles are usually separate unless bundled." },
    { question: "How many days should we stay in India?", answer: "Plan about 5–10 days depending on whether the trip is workup-only or includes reconstruction/micro-TESE, and whether a fresh ICSI cycle is coordinated." },
    { question: "Obstructive vs non-obstructive — why does it matter?", answer: "Obstruction may be treatable with reconstruction or simpler retrieval; non-obstructive disease often needs micro-TESE and has different genetic counselling needs." },
    { question: "Is sperm always found with micro-TESE?", answer: "No. Retrieval rates depend on underlying diagnosis. Discuss failure plans and donor options before surgery." },
    { question: "Should my partner travel with me?", answer: "Usually yes if IVF/ICSI is planned in the same window. Even for male-only surgery, partner counselling improves decisions." },
    { question: "Do I need genetic tests?", answer: "Often yes for non-obstructive azoospermia. Karyotype and Y-microdeletion results can change prognosis and embryo counselling." },
  ]);

  add("varicocele-surgery-india", [
    { question: "What is the cost of varicocele surgery in India for foreigners?", answer: "Indicative microsurgical packages commonly range $1,000–$2,500 USD depending on unilateral versus bilateral repair and hospital." },
    { question: "How long should I stay in India?", answer: "Plan about 4–7 days for consult, day-care or overnight surgery, and early review before flying home." },
    { question: "Will surgery fix infertility immediately?", answer: "No. When semen improves, it usually takes months. Some couples pursue IVF in parallel rather than waiting only on varicocele response." },
    { question: "Is microsurgery necessary?", answer: "Microsurgical subinguinal repair is widely preferred for lower recurrence and hydrocele rates. Confirm microscope use in your package." },
    { question: "Can pain-only varicoceles be repaired?", answer: "Yes, selected men with refractory ache after conservative care may be candidates after other causes are excluded." },
    { question: "What are common complications?", answer: "Hydrocele, recurrence, haematoma, and persistent pain are discussed in consent. Arterial injury is uncommon with careful microsurgery." },
  ]);

  add("male-sexual-health-treatment-india", [
    { question: "What does male sexual health treatment cost in India?", answer: "Pathways commonly span about $800–$8,000 USD because care ranges from consult-and-medicine plans to procedures. Implants are quoted on a separate page." },
    { question: "How many days should I stay?", answer: "Plan about 3–7 days for evaluation and treatment start. Surgical implant pathways need roughly 7–10 days." },
    { question: "Is this the same as erectile dysfunction treatment?", answer: "ED is one part of male sexual health. PE, low desire, Peyronie's, and hormonal issues may coexist and need combined planning." },
    { question: "Will my visit be confidential?", answer: "Yes. Discreet coordination is standard. Share clinically relevant history so care remains safe." },
    { question: "Which page should I read next?", answer: "After initial triage, use focused guides for erectile dysfunction, premature ejaculation, Peyronie's disease, testosterone therapy, or penile implant surgery." },
    { question: "Do I need a partner present?", answer: "Not mandatory, but partner involvement often improves PE and relationship-related pathways. Decide based on your goals." },
  ]);

  return faqs;
}

const HUB = [
  {
    id: "overview",
    heading: "Andrology treatment in India for international patients",
    paragraphs: [
      "Andrology focuses on male reproductive and sexual health — erectile dysfunction, Peyronie's disease, hypogonadism, premature ejaculation, varicocele, azoospermia, surgical sperm retrieval, vasectomy reversal, and related scrotal surgery. International patients travel to India for discreet specialist care, transparent USD packages, and shorter waits than many self-pay markets in Africa, the Middle East, the UK, and the USA.",
      "This hub introduces TechdrHealth-coordinated pathways at partner hospitals in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore. Each linked service page provides 1,200+ words of clinical substance, cost ranges, estimated stay days, risks, and FAQs written for SEO, answer-engine clarity, and geographic intent.",
      "Care is delivered by andrologists and urologists at partner centres; TechdrHealth facilitates matching, second opinions, visa invitation letters, travel planning, and follow-up — we do not replace your treating clinician.",
    ],
  },
  {
    id: "who",
    heading: "Who this andrology hub is for",
    paragraphs: [
      "Men seeking evaluation or treatment for erectile problems, ejaculatory disorders, penile curvature, low testosterone symptoms, infertility with zero or low sperm counts, post-vasectomy parenthood plans, or symptomatic hydrocele and phimosis. Couples coordinating male-factor care alongside IVF/ICSI also use these pages.",
      "Suitability for medical travel depends on whether your pathway is clinic-based (often 3–7 days in India) or surgical (commonly 5–10 days, longer for implants).",
    ],
    bullets: [
      "Prefer written USD estimates before booking flights",
      "Need confidential scheduling for sexual-medicine visits",
      "Want microsurgical fertility options linked to embryology labs",
      "Require attendant or interpreter support during admission",
    ],
  },
  {
    id: "pathways",
    heading: "Sexual medicine, fertility, and scrotal surgery pathways",
    paragraphs: [
      "Sexual-medicine pages cover erectile dysfunction, premature ejaculation, male sexual health overviews, Peyronie's disease, and penile implant surgery for refractory ED. Hormonal care is addressed on the testosterone replacement page with fertility warnings made explicit.",
      "Fertility-andrology pages cover azoospermia, micro-TESE/surgical sperm retrieval, vasectomy reversal, and varicocele repair — with cross-links to the fertility hub for IVF/ICSI. Day-care scrotal procedures include hydrocele repair and circumcision/phimosis treatment.",
    ],
    links: [
      { href: "/treatments/fertility-treatments-india", label: "Fertility treatments hub" },
      { href: "/treatments/urology-treatments-india", label: "Urology hub" },
      { href: "/how-it-works", label: "How care coordination works" },
    ],
  },
  {
    id: "quality",
    heading: "Quality, accreditation, and coordination",
    paragraphs: [
      "Partner hospitals are prioritised for recognised accreditation such as JCI and/or NABH where available, experienced andrology/urology teams, and international patient infrastructure. Package quotes should clarify device brands for implants, microscope use for microsurgery, room class, and inpatient nights.",
      "Before travel, share medicines (especially nitrates), labs, ultrasound, semen analyses, and fertility goals. Remote triage prevents unsafe prescribing and mismatched surgery.",
    ],
  },
  {
    id: "costs-nav",
    heading: "Costs, stay days, and next steps",
    paragraphs: [
      "Each child page lists USD ranges with India versus USA/UK/UAE directional comparisons and an estimated stay in India tied to clinic versus surgical pathways. Use the cards below to open deep guides, then request a confidential review of your reports for hospital options and a written estimate.",
      "Ready to talk discreetly? Request a free second opinion or quote with your reports attached.",
    ],
    links: [
      { href: "/free-second-opinion", label: "Free second opinion" },
      { href: "/get-free-quote", label: "Get a free quote" },
      { href: "/cost-calculator", label: "Cost calculator" },
    ],
  },
];

function run() {
  const categories = read("content/categories.json");
  const hubs = read("content/category-hubs.json");
  const procedures = read("content/procedures.json");
  const depthFile = read("content/procedure-depth.json");
  const faqs = read("content/faqs.json");
  const nextConfigPath = path.join(root, "next.config.ts");
  let nextConfig = fs.readFileSync(nextConfigPath, "utf8");

  // Category
  if (!categories.some((c) => c.slug === CATEGORY)) {
    categories.push({
      slug: CATEGORY,
      name: "Andrology",
      description:
        "Male sexual health, erectile dysfunction, penile implants, Peyronie's disease, male infertility microsurgery, vasectomy reversal, and related andrology care for international patients in India.",
      heroImage: IMG,
      procedureSlugs: [
        ...PROCEDURES.map((p) => p.slug),
        ...MOVE_SLUGS,
      ],
    });
  } else {
    const cat = categories.find((c) => c.slug === CATEGORY);
    cat.procedureSlugs = [...PROCEDURES.map((p) => p.slug), ...MOVE_SLUGS];
    cat.description =
      "Male sexual health, erectile dysfunction, penile implants, Peyronie's disease, male infertility microsurgery, vasectomy reversal, and related andrology care for international patients in India.";
  }

  // Remove moved slugs from urology
  const urology = categories.find((c) => c.slug === "urology-treatments-india");
  if (urology) {
    urology.procedureSlugs = urology.procedureSlugs.filter(
      (s) => !MOVE_SLUGS.includes(s)
    );
    urology.description =
      "Prostate surgery, kidney stone treatment, robotic prostatectomy, urethral stricture, and bladder cancer surgery for medical tourists in India. Male sexual health and varicocele pathways are listed under Andrology.";
  }

  hubs[CATEGORY] = HUB;

  // Procedures: add new + move existing
  const bySlug = new Map(procedures.map((p) => [p.slug, p]));
  for (const p of PROCEDURES) {
    bySlug.set(p.slug, p);
  }
  for (const slug of MOVE_SLUGS) {
    const existing = bySlug.get(slug);
    if (!existing) throw new Error(`Missing procedure to move: ${slug}`);
    existing.categorySlug = CATEGORY;
    if (slug === "varicocele-surgery-india") {
      existing.recoveryTime = "Day-care or overnight; plan 4–7 days in India";
      existing.relatedProcedures = [
        "azoospermia-treatment-india",
        "micro-tese-sperm-retrieval-india",
        "male-infertility-treatment-india",
        "hydrocele-surgery-india",
      ];
      existing.metaTitle =
        "Varicocele Surgery Cost in India for Foreigners | Andrology";
      existing.keywords = kw("varicocele surgery", [
        "varicocele repair india cost",
        "microsurgical varicocelectomy india",
        "varicocele treatment for infertility india",
      ]);
    }
    if (slug === "male-sexual-health-treatment-india") {
      existing.recoveryTime = "Clinic-based to short stay; plan 3–7 days in India";
      existing.relatedProcedures = [
        "erectile-dysfunction-treatment-india",
        "penile-implant-surgery-india",
        "peyronies-disease-treatment-india",
        "premature-ejaculation-treatment-india",
      ];
      existing.metaTitle =
        "Male Sexual Health Treatment Cost in India for Foreigners | Andrology";
      existing.costIndia = { min: 800, max: 8000, currency: "USD" };
      existing.keywords = kw("male sexual health treatment", [
        "andrology clinic india for foreigners",
        "male sexual medicine india cost",
      ]);
    }
    bySlug.set(slug, existing);
  }

  // Cross-link male infertility toward andrology pages
  const maleInf = bySlug.get("male-infertility-treatment-india");
  if (maleInf) {
    const rel = new Set([
      ...(maleInf.relatedProcedures || []),
      "azoospermia-treatment-india",
      "micro-tese-sperm-retrieval-india",
      "varicocele-surgery-india",
    ]);
    maleInf.relatedProcedures = [...rel];
  }

  const depthLib = buildDepthLibrary();
  const faqLib = buildFaqs();

  for (const [slug, sections] of Object.entries(depthLib)) {
    const words = wordCount(sections);
    if (words < 1200 || words > 1800) {
      console.warn(`WORD COUNT ${slug}: ${words} (target 1200–1800)`);
    } else {
      console.log(`OK ${slug}: ${words} words`);
    }
    depthFile[slug] = sections;
  }

  for (const [slug, items] of Object.entries(faqLib)) {
    faqs[slug] = items;
  }

  write("content/categories.json", categories);
  write("content/category-hubs.json", hubs);
  write("content/procedures.json", [...bySlug.values()]);
  write("content/procedure-depth.json", depthFile);
  write("content/faqs.json", faqs);

  // Redirects for moved procedures
  const redirectBlock = `
      // Andrology re-homes (from Urology)
      {
        source: "/treatments/urology-treatments-india/varicocele-surgery-india",
        destination: "/treatments/andrology-treatments-india/varicocele-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/urology-treatments-india/male-sexual-health-treatment-india",
        destination: "/treatments/andrology-treatments-india/male-sexual-health-treatment-india",
        permanent: true,
      },`;

  if (!nextConfig.includes("andrology-treatments-india/varicocele-surgery-india")) {
    nextConfig = nextConfig.replace(
      "async redirects() {\n    return [\n      ...LEGACY_REDIRECTS,",
      `async redirects() {\n    return [\n      ...LEGACY_REDIRECTS,${redirectBlock}`
    );
    fs.writeFileSync(nextConfigPath, nextConfig);
    console.log("Added andrology redirects to next.config.ts");
  }

  console.log(
    `\nDone. Andrology procedures: ${PROCEDURES.length + MOVE_SLUGS.length}`
  );
}

run();
