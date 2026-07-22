/**
 * Bulk generator: adds depth sections for procedures missing from procedure-depth.json.
 * Uses category-aware templates enriched with procedure metadata.
 * Run: node scripts/generate-procedure-depth-bulk.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const procs = JSON.parse(
  fs.readFileSync(path.join(root, "content/procedures.json"), "utf8")
);
const depthPath = path.join(root, "content/procedure-depth.json");
const depth = JSON.parse(fs.readFileSync(depthPath, "utf8"));

const fmt = (n) => "$" + n.toLocaleString("en-US");

function costRange(p) {
  if (!p.costIndia) return "indicative package ranges after clinical review";
  return `${fmt(p.costIndia.min)}–${fmt(p.costIndia.max)} USD`;
}

const DOCTOR_LINKS = {
  "dr-rajesh-kumar-cardiologist": {
    href: "/doctors/cardiology/dr-rajesh-kumar-cardiologist",
    label: "Cardiology profile",
    hub: "/doctors/cardiology",
  },
  "dr-vikram-singh-orthopedic": {
    href: "/doctors/orthopedics/dr-vikram-singh-orthopedic",
    label: "Orthopedic profile",
    hub: "/doctors/orthopedics",
  },
  "dr-anita-sharma-oncologist": {
    href: "/doctors/oncology/dr-anita-sharma-oncologist",
    label: "Oncology profile",
    hub: "/doctors/oncology",
  },
  "dr-meera-nair-neurosurgeon": {
    href: "/doctors/neurosurgery/dr-meera-nair-neurosurgeon",
    label: "Neurosurgery profile",
    hub: "/doctors/neurosurgery",
  },
  "dr-arjun-patel-transplant": {
    href: "/doctors/transplant/dr-arjun-patel-transplant",
    label: "Transplant profile",
    hub: "/doctors/transplant",
  },
  "dr-anil-desai-ent": {
    href: "/doctors/ent/dr-anil-desai-ent",
    label: "ENT profile",
    hub: "/doctors/ent",
  },
  "dr-suresh-mehta-urologist": {
    href: "/doctors/urology/dr-suresh-mehta-urologist",
    label: "Urology profile",
    hub: "/doctors/urology",
  },
  "dr-priya-reddy-fertility": {
    href: "/doctors/fertility/dr-priya-reddy-fertility",
    label: "Fertility profile",
    hub: "/doctors/fertility",
  },
  "dr-neha-kapoor-gynecologist": {
    href: "/doctors/gynecology/dr-neha-kapoor-gynecologist",
    label: "Gynecology profile",
    hub: "/doctors/gynecology",
  },
  "dr-kavita-rao-gastroenterologist": {
    href: "/doctors/gastroenterology/dr-kavita-rao-gastroenterologist",
    label: "Gastroenterology profile",
    hub: "/doctors/gastroenterology",
  },
};

function buildLinks(p) {
  const links = [];
  const doc = p.doctorSlugs?.[0] ? DOCTOR_LINKS[p.doctorSlugs[0]] : null;
  if (doc) {
    links.push({ href: doc.href, label: doc.label });
    links.push({ href: doc.hub, label: "Specialty doctors" });
  }
  links.push({ href: `/cost-comparison/${p.slug}`, label: "Cost comparison" });
  links.push({ href: "/get-free-quote", label: "Free quote" });
  const seen = new Set();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

/** Category-level clinical context for template paragraphs */
const CATEGORY_CONTEXT = {
  "cardiac-care-india": {
    specialty: "cardiac",
    riskExamples: "bleeding, arrhythmia, stroke, kidney injury, or prolonged ICU stay",
    credentialNote: "cardiothoracic surgeons with documented case volume and cath lab / ICU backup",
    itemFocus: "ICU nights, graft or device costs, and antiplatelet planning",
  },
  "orthopaedic-treatments-india": {
    specialty: "orthopedic",
    riskExamples: "infection, blood clots, stiffness, implant issues, or nerve injury",
    credentialNote: "orthopedic surgeons with high arthroplasty or spine volume and physiotherapy support",
    itemFocus: "implant brand, navigation fees, physio sessions, and walker provision",
  },
  "cancer-treatment-india": {
    specialty: "oncology",
    riskExamples: "infection during low blood counts, fatigue, organ toxicity, or treatment delays",
    credentialNote: "medical and surgical oncologists in multidisciplinary tumour-board settings",
    itemFocus: "drug names, cycle count, imaging, and growth-factor support",
  },
  "neurology-neurosurgery-india": {
    specialty: "neurosurgical",
    riskExamples: "bleeding, infection, seizures, neurological deficit, or CSF leak",
    credentialNote: "neurosurgeons with navigation, ICU neuro monitoring, and rehab access",
    itemFocus: "ICU nights, imaging, histopathology, and rehab sessions",
  },
  "fertility-treatments-india": {
    specialty: "fertility",
    riskExamples: "ovarian hyperstimulation, multiple pregnancy, cycle cancellation, or lab variability",
    credentialNote: "IVF specialists with transparent lab protocols and cycle counselling",
    itemFocus: "cycle count, medication tiers, ICSI add-ons, and freezing fees",
  },
  "general-advanced-surgeries-india": {
    specialty: "surgical",
    riskExamples: "bleeding, infection, anaesthetic complications, or leak (bariatric/GI)",
    credentialNote: "surgeons in accredited hospitals with ICU and blood bank support",
    itemFocus: "procedure type, ICU backup, and extended-stay triggers",
  },
  "cosmetic-plastic-surgery-india": {
    specialty: "cosmetic",
    riskExamples: "bleeding, infection, scarring, asymmetry, or contour irregularity",
    credentialNote: "board-qualified plastic surgeons with photo documentation and airway-safe anaesthesia",
    itemFocus: "areas treated, anaesthesia type, garment provision, and revision policy",
  },
  "dental-treatments-india": {
    specialty: "dental",
    riskExamples: "infection, implant failure, nerve injury, or need for grafting",
    credentialNote: "implantologists with CBCT planning and sterilisation protocols",
    itemFocus: "implant brand, crown material, grafting, and visit count",
  },
  "eye-care-ophthalmology-india": {
    specialty: "ophthalmology",
    riskExamples: "infection, retinal detachment, refractive surprise, or corneal oedema",
    credentialNote: "ophthalmologists with biometry, laser platforms, and day-care safety protocols",
    itemFocus: "IOL or laser technique tier, second-eye pricing, and enhancement policy",
  },
  "ent-treatments-india": {
    specialty: "ENT",
    riskExamples: "bleeding, infection, voice change, balance symptoms, or device malfunction",
    credentialNote: "ENT surgeons with audiology support and cochlear mapping when relevant",
    itemFocus: "device/processor costs, mapping sessions, and rehab visits",
  },
  "urology-treatments-india": {
    specialty: "urology",
    riskExamples: "bleeding, infection, incontinence, erectile dysfunction, or stricture recurrence",
    credentialNote: "urologists with robotic or endoscopic volume and oncology links when needed",
    itemFocus: "robot fees, stent costs, catheter period, and pathology",
  },
  "gastroenterology-india": {
    specialty: "gastroenterology",
    riskExamples: "bleeding, perforation, pancreatitis after ERCP, or sedation complications",
    credentialNote: "gastroenterologists with ERCP, endoscopy, and hepatology backup",
    itemFocus: "scope type, sedation, biopsy processing, and admission if complications",
  },
  "endocrinology-diabetes-india": {
    specialty: "endocrine",
    riskExamples: "glucose swings, hypoglycaemia, wound infection, or medication side effects",
    credentialNote: "endocrinologists and multidisciplinary foot or pituitary teams as indicated",
    itemFocus: "monitoring days, investigations, and device or medicine tiers",
  },
  "vascular-surgery-india": {
    specialty: "vascular",
    riskExamples: "bleeding, graft thrombosis, access failure, or limb ischaemia",
    credentialNote: "vascular surgeons with angio suite and ICU capability",
    itemFocus: "stent or graft types, ICU nights, and dialysis access planning",
  },
  "pulmonology-lung-care-india": {
    specialty: "pulmonary",
    riskExamples: "bleeding, air leak, infection, or respiratory failure",
    credentialNote: "thoracic teams with ICU ventilation and oncology links for lung cancer",
    itemFocus: "procedure type, ICU days, and bronchoscopy pathology",
  },
  "hematology-bone-marrow-india": {
    specialty: "haematology",
    riskExamples: "infection during neutropenia, graft-versus-host disease, organ toxicity, or graft failure",
    credentialNote: "haemato-oncologists in accredited transplant units with isolation facilities",
    itemFocus: "conditioning regimen, isolation days, donor search, and prophylaxis medicines",
  },
  "dermatology-skin-care-india": {
    specialty: "dermatology",
    riskExamples: "pigment change, scarring, infection, or incomplete response",
    credentialNote: "dermatologists or plastic surgeons for procedural dermatology with laser safety protocols",
    itemFocus: "session count, laser type, topical medicines, and follow-up reviews",
  },
  "gynecology-womens-health-india": {
    specialty: "gynecology",
    riskExamples: "bleeding, infection, injury to adjacent organs, or hormonal effects",
    credentialNote: "obstetrician-gynaecologists with laparoscopic or oncology links when needed",
    itemFocus: "approach (open vs keyhole), histopathology, and inpatient nights",
  },
  "pediatric-treatments-india": {
    specialty: "paediatric",
    riskExamples: "anaesthetic complications, infection, or growth-related considerations",
    credentialNote: "paediatric specialists with PICU, child-life support, and family-centred consent",
    itemFocus: "PICU backup, attendant lodging, and age-appropriate rehab",
  },
  "wellness-holistic-healing-india": {
    specialty: "wellness",
    riskExamples: "dehydration, medication interactions, or unsuitable packages for acute illness",
    credentialNote: "licensed Ayurveda or rehab centres with medical screening before programmes",
    itemFocus: "programme length, therapies included, and medical clearance requirements",
  },
};

const DEFAULT_CTX = {
  specialty: "medical",
  riskExamples: "bleeding, infection, anaesthetic complications, or unexpected extended stay",
  credentialNote: "specialists in JCI or NABH accredited hospitals with appropriate ICU backup",
  itemFocus: "surgeon fees, theatre, inpatient nights, and investigation inclusions",
};

function buildFromTemplate(p) {
  const ctx = CATEGORY_CONTEXT[p.categorySlug] || DEFAULT_CTX;
  const name = p.name;
  const lower = name.toLowerCase();
  const overview = p.overview?.trim() || p.shortAnswer?.trim() || "";
  const cost = costRange(p);
  const recovery = p.recoveryTime || "Recovery timelines are confirmed after clinical review.";
  const cities = (p.geoCities || [
    "Hyderabad",
    "Delhi NCR",
    "Mumbai",
    "Chennai",
    "Bangalore",
  ]).join(", ");
  const aeo =
    p.shortAnswer ||
    `${name} in India for international patients is coordinated at accredited partner hospitals with transparent package estimates.`;

  return [
    {
      id: "condition",
      heading: `What ${lower} involves`,
      paragraphs: [
        overview ||
          `${name} is a treatment pathway offered at accredited Indian hospitals for international patients who need specialist evaluation and structured care coordination.`,
        aeo,
        `For medical travellers, the first step is confirming that ${lower} is the right option after remote review of your reports — not choosing a destination based on headline price alone.`,
      ],
    },
    {
      id: "who",
      heading: `Who ${lower} in India is for`,
      paragraphs: [
        `Typical candidates have a confirmed or strongly suspected indication for ${lower} after specialist review, acceptable fitness for anaesthesia or the planned procedure, and realistic expectations about recovery and follow-up.`,
        `International patients often compare India packages with self-pay quotes at home. Honest triage covers whether your case is elective or urgent, how long you should stay, and whether an attendant should travel with you.`,
      ],
      bullets: [
        "Recent specialist reports or imaging available for remote review",
        "Medical optimisation of diabetes, blood pressure, or anaemia when relevant",
        "Clear understanding of expected hospital stay and recovery buffer",
        "Attendant plan for major surgery or prolonged treatment courses",
        "Willingness to follow discharge and medicine instructions at home",
      ],
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: [
        `Coordination starts with sharing records, medication lists, and allergies. Partner hospitals respond with a proposed plan for ${lower}, expected stay, and a written package outline. Settle inclusions before booking non-refundable flights.`,
        `On arrival, pre-assessment confirms fitness and consent. TechdrHealth helps with admission, language support when needed, and discharge documentation for your home clinician.`,
      ],
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: [
        `All ${ctx.specialty} pathways carry procedure-specific risks, including ${ctx.riskExamples}. Mitigation includes accredited centres, experienced teams, infection control, and ICU backup when appropriate.`,
        `Your consent discussion should be personalised. Generic medical tourism marketing is not a substitute for named-specialist counselling about your case.`,
      ],
      bullets: [
        "Bleeding or transfusion need",
        "Infection",
        "Unexpected ICU or extended stay",
        "Procedure-specific complications discussed in consent",
        "Clot risk after major surgery — follow mobility and prophylaxis advice",
      ],
    },
    {
      id: "recovery",
      heading: "Recovery timeline and fit-to-fly planning",
      paragraphs: [
        `Recovery after ${lower} depends on procedure complexity and your baseline health. Build a buffer beyond minimum hospital stay before long-haul flights, especially after major surgery or systemic therapy.`,
        `Typical guidance on this pathway: ${recovery}. Your treating team and TechdrHealth coordinator confirm personalised clearance before you fly home.`,
      ],
    },
    {
      id: "cost",
      heading: `Cost of ${lower} in India for foreign patients`,
      paragraphs: [
        `Indicative packages for international patients commonly fall around ${cost}, depending on technique, implants or devices, room category, comorbidities, and whether additional procedures are required. Private care in the USA or UK is often substantially higher for comparable pathways.`,
        `Always ask what the package includes: surgeon and anaesthesia fees, theatre, standard consumables, routine labs, inpatient nights, and medicines during stay. Typical exclusions are ICU beyond the package, unexpected additional procedures, extended stay, premium devices, and long-term medicines after discharge. Final quotes follow medical review of your reports.`,
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        `Look for ${ctx.credentialNote}. Named-surgeon clarity on the estimate matters more than a generic international desk booking.`,
        `TechdrHealth shortlists partner teams across ${cities} and helps you obtain written package outlines before travel. Verify credentials on the hospital letter you receive.`,
      ],
      links: buildLinks(p),
    },
    {
      id: "itemisation",
      heading: `How to read a ${lower} package without surprises`,
      paragraphs: [
        `Reject vague package language. Require clarity on ${ctx.itemFocus}, and what triggers additional billing such as extra ICU days, premium implants, or unplanned investigations.`,
        `Share complete reports early so the quote matches your actual case — not a best-case brochure estimate.`,
      ],
    },
    {
      id: "travel",
      heading: "Building a travel calendar around treatment",
      paragraphs: [
        `Plan: remote review → visa/invitation letter when needed → arrival before admission → treatment → recovery buffer → fit-to-fly clearance. Urgent cases may need accelerated timelines; do not self-delay unstable symptoms for cheaper fares.`,
        `Carry printed and digital records, a medication list, and attendant documents. Arrange lodging near the hospital for attendants during inpatient care.`,
      ],
    },
    {
      id: "comprehensive",
      heading: `${name} in India — decision framework for foreign patients`,
      paragraphs: [
        `Choose India for ${lower} when accredited hospitals offer transparent packages, appropriate specialist depth, and written inclusions — not because a website lists the lowest headline price.`,
        `TechdrHealth coordinates second opinions, hospital shortlists, visa letters when required, and on-ground support so families compare clinical fit first, then cost.`,
      ],
    },
  ];
}

const NEW_DEPTH = {};
let added = 0;
let skipped = 0;

for (const p of procs) {
  if (p.pageVariant === "confidential-clinical") continue;
  if (depth[p.slug] && !process.argv.includes("--force")) {
    skipped++;
    continue;
  }
  if (!p.costIndia && !process.argv.includes("--include-no-cost")) continue;
  NEW_DEPTH[p.slug] = buildFromTemplate(p);
  added++;
}

const merged = { ...depth, ...NEW_DEPTH };
fs.writeFileSync(depthPath, JSON.stringify(merged, null, 2) + "\n");

console.log("Added depth for", added, "procedures");
console.log("Skipped existing", skipped);
console.log("Total depth entries:", Object.keys(merged).length);
