/**
 * Single source of truth for treatment cost ranges and itemized breakdowns.
 * Update this file only — calculator and treatment pages read from here.
 */

export type CostLineItem = {
  label: string;
  minUsd: number;
  maxUsd: number;
};

export type TreatmentCostConfig = {
  treatmentSlug: string;
  treatmentName: string;
  category: string;
  packageMinUsd: number;
  packageMaxUsd: number;
  usaMinUsd: number;
  usaMaxUsd: number;
  lineItems: CostLineItem[];
  included: string[];
  recoverySteps: { day: string; title: string; body: string }[];
  processSteps: { step: string; title: string; body: string }[];
};

type CostSeed = {
  treatmentSlug: string;
  treatmentName: string;
  category: string;
  packageMinUsd: number;
  packageMaxUsd: number;
  usaMinUsd: number;
  usaMaxUsd: number;
  lineItems?: CostLineItem[];
  included?: string[];
  recoverySteps?: TreatmentCostConfig["recoverySteps"];
  processSteps?: TreatmentCostConfig["processSteps"];
};

const DEFAULT_PROCESS: TreatmentCostConfig["processSteps"] = [
  {
    step: "01",
    title: "Share reports",
    body: "Send medical reports via WhatsApp for a free specialist review.",
  },
  {
    step: "02",
    title: "Get options & cost",
    body: "Receive hospital options and a written package estimate.",
  },
  {
    step: "03",
    title: "Visa & travel",
    body: "Invitation letter, travel planning, and airport pickup.",
  },
  {
    step: "04",
    title: "Treatment & follow-up",
    body: "Admission, treatment, discharge, and remote follow-up.",
  },
];

const DEFAULT_RECOVERY: TreatmentCostConfig["recoverySteps"] = [
  {
    day: "Days 1–3",
    title: "Hospital recovery",
    body: "Inpatient monitoring and early mobilization as clinically appropriate.",
  },
  {
    day: "Week 1–2",
    title: "Local follow-up",
    body: "Wound review and clearance planning before travel home.",
  },
  {
    day: "Week 3+",
    title: "Home recovery",
    body: "Continued recovery with remote follow-up support from our team.",
  },
];

function lineItemsFromPackage(min: number, max: number): CostLineItem[] {
  return [
    {
      label: "Hospital / OT package",
      minUsd: Math.round(min * 0.45),
      maxUsd: Math.round(max * 0.45),
    },
    {
      label: "Surgeon & anesthesia fees",
      minUsd: Math.round(min * 0.3),
      maxUsd: Math.round(max * 0.3),
    },
    {
      label: "Hospital stay",
      minUsd: Math.round(min * 0.18),
      maxUsd: Math.round(max * 0.18),
    },
    {
      label: "Consumables & medications",
      minUsd: Math.round(min * 0.07),
      maxUsd: Math.round(max * 0.07),
    },
  ];
}

function buildConfig(seed: CostSeed): TreatmentCostConfig {
  return {
    treatmentSlug: seed.treatmentSlug,
    treatmentName: seed.treatmentName,
    category: seed.category,
    packageMinUsd: seed.packageMinUsd,
    packageMaxUsd: seed.packageMaxUsd,
    usaMinUsd: seed.usaMinUsd,
    usaMaxUsd: seed.usaMaxUsd,
    lineItems: seed.lineItems ?? lineItemsFromPackage(seed.packageMinUsd, seed.packageMaxUsd),
    included: seed.included ?? [
      "Hospital package charges",
      "Surgeon fees (package scope)",
      "Stay for package days",
      "Care coordination by Techdr",
    ],
    recoverySteps: seed.recoverySteps ?? DEFAULT_RECOVERY,
    processSteps: seed.processSteps ?? DEFAULT_PROCESS,
  };
}

const seeds: CostSeed[] = [
  {
    treatmentSlug: "heart-surgery-india",
    treatmentName: "Heart Surgery",
    category: "Cardiology",
    packageMinUsd: 4500,
    packageMaxUsd: 12000,
    usaMinUsd: 70000,
    usaMaxUsd: 150000,
    lineItems: [
      { label: "Hospital / OT package", minUsd: 2200, maxUsd: 5500 },
      { label: "Surgeon & anesthesia fees", minUsd: 1200, maxUsd: 3500 },
      { label: "ICU & ward stay", minUsd: 800, maxUsd: 2200 },
      { label: "Consumables & medications", minUsd: 300, maxUsd: 800 },
    ],
    included: [
      "Surgeon and OT charges",
      "Hospital stay (package days)",
      "ICU as clinically indicated",
      "Medications during admission",
      "Care coordination by Techdr",
    ],
    recoverySteps: [
      {
        day: "Day 0–2",
        title: "ICU monitoring",
        body: "Close cardiac monitoring after surgery with pain control and early mobilization as advised.",
      },
      {
        day: "Day 3–7",
        title: "Ward recovery",
        body: "Step-down care, wound checks, and physiotherapy before discharge planning.",
      },
      {
        day: "Week 2–6",
        title: "Home recovery",
        body: "Gradual activity increase; remote follow-up coordinated before you fly home.",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Share reports",
        body: "Send ECG, echo, angiogram, and clinical notes via WhatsApp for a free specialist review.",
      },
      {
        step: "02",
        title: "Hospital options",
        body: "Receive partner cardiac centers, surgeon profiles, and a written package estimate.",
      },
      {
        step: "03",
        title: "Visa & travel",
        body: "We arrange the hospital invitation letter, attendant visa guidance, and airport pickup.",
      },
      {
        step: "04",
        title: "Surgery & follow-up",
        body: "Admission, procedure, discharge summary, and remote follow-up support after you return home.",
      },
    ],
  },
  {
    treatmentSlug: "knee-replacement-india",
    treatmentName: "Knee Replacement Surgery",
    category: "Orthopedics",
    packageMinUsd: 4000,
    packageMaxUsd: 8000,
    usaMinUsd: 35000,
    usaMaxUsd: 60000,
  },
  {
    treatmentSlug: "hip-replacement-india",
    treatmentName: "Hip Replacement Surgery",
    category: "Orthopedics",
    packageMinUsd: 5000,
    packageMaxUsd: 9000,
    usaMinUsd: 40000,
    usaMaxUsd: 65000,
  },
  {
    treatmentSlug: "spine-surgery-india",
    treatmentName: "Spine Surgery",
    category: "Orthopedics",
    packageMinUsd: 5000,
    packageMaxUsd: 12000,
    usaMinUsd: 50000,
    usaMaxUsd: 100000,
  },
  {
    treatmentSlug: "kidney-transplant-india",
    treatmentName: "Kidney Transplant",
    category: "Transplant",
    packageMinUsd: 12000,
    packageMaxUsd: 20000,
    usaMinUsd: 150000,
    usaMaxUsd: 300000,
  },
  {
    treatmentSlug: "liver-transplant-india",
    treatmentName: "Liver Transplant",
    category: "Transplant",
    packageMinUsd: 25000,
    packageMaxUsd: 40000,
    usaMinUsd: 300000,
    usaMaxUsd: 500000,
  },
  {
    treatmentSlug: "cancer-treatment-india",
    treatmentName: "Cancer Treatment",
    category: "Oncology",
    packageMinUsd: 3000,
    packageMaxUsd: 25000,
    usaMinUsd: 50000,
    usaMaxUsd: 200000,
  },
  {
    treatmentSlug: "ivf-treatment-india",
    treatmentName: "IVF & Fertility Treatment",
    category: "Fertility",
    packageMinUsd: 2500,
    packageMaxUsd: 5000,
    usaMinUsd: 12000,
    usaMaxUsd: 25000,
  },
  {
    treatmentSlug: "cosmetic-surgery-india",
    treatmentName: "Cosmetic & Plastic Surgery",
    category: "Cosmetic",
    packageMinUsd: 1500,
    packageMaxUsd: 8000,
    usaMinUsd: 8000,
    usaMaxUsd: 25000,
  },
  {
    treatmentSlug: "bariatric-surgery-india",
    treatmentName: "Bariatric / Weight Loss Surgery",
    category: "Bariatric",
    packageMinUsd: 4000,
    packageMaxUsd: 8000,
    usaMinUsd: 15000,
    usaMaxUsd: 35000,
  },
  {
    treatmentSlug: "dental-implants-india",
    treatmentName: "Dental Implants & Full Mouth Treatment",
    category: "Dental",
    packageMinUsd: 400,
    packageMaxUsd: 12000,
    usaMinUsd: 3000,
    usaMaxUsd: 45000,
  },
  {
    treatmentSlug: "hair-transplant-india",
    treatmentName: "Hair Transplant",
    category: "Cosmetic",
    packageMinUsd: 1000,
    packageMaxUsd: 3000,
    usaMinUsd: 8000,
    usaMaxUsd: 15000,
  },
  {
    treatmentSlug: "neurosurgery-india",
    treatmentName: "Neurosurgery",
    category: "Neurosurgery",
    packageMinUsd: 6000,
    packageMaxUsd: 18000,
    usaMinUsd: 80000,
    usaMaxUsd: 200000,
  },
  {
    treatmentSlug: "organ-transplant-india",
    treatmentName: "Organ Transplant",
    category: "Transplant",
    packageMinUsd: 12000,
    packageMaxUsd: 40000,
    usaMinUsd: 150000,
    usaMaxUsd: 500000,
  },
  {
    treatmentSlug: "bone-marrow-transplant-india",
    treatmentName: "Bone Marrow Transplant",
    category: "Oncology",
    packageMinUsd: 15000,
    packageMaxUsd: 35000,
    usaMinUsd: 200000,
    usaMaxUsd: 400000,
  },
  {
    treatmentSlug: "cochlear-implant-india",
    treatmentName: "Cochlear Implant Surgery",
    category: "ENT",
    packageMinUsd: 10000,
    packageMaxUsd: 18000,
    usaMinUsd: 40000,
    usaMaxUsd: 100000,
  },
  {
    treatmentSlug: "eye-surgery-india",
    treatmentName: "Eye Surgery (LASIK & Cataract)",
    category: "Ophthalmology",
    packageMinUsd: 300,
    packageMaxUsd: 2500,
    usaMinUsd: 2000,
    usaMaxUsd: 6000,
  },
];

export const treatmentCosts: TreatmentCostConfig[] = seeds.map(buildConfig);

export function getTreatmentCostConfig(treatmentSlug: string): TreatmentCostConfig | null {
  return treatmentCosts.find((t) => t.treatmentSlug === treatmentSlug) ?? null;
}

export function getAllTreatmentCostOptions() {
  return treatmentCosts.map((t) => ({
    slug: t.treatmentSlug,
    name: t.treatmentName,
    category: t.category,
    costMinUsd: t.packageMinUsd,
    costMaxUsd: t.packageMaxUsd,
    costUsaMinUsd: t.usaMinUsd,
    costUsaMaxUsd: t.usaMaxUsd,
  }));
}
