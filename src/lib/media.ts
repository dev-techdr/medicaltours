/** Local photography in public/images/services/ (replaces Unsplash). */

const s = (file: string) => `/images/services/${file}`;

export const MEDIA = {
  hero: s("hospital-lobby.jpg"),
  heroVideo: "/hero-hospital.mp4",
  heroSecondary: s("surgery.jpg"),
  careTeam: s("care-team.jpg"),
  team: "/images/team-photo2.jpg",
  consultation: s("consultation.jpg"),
  surgery: s("surgery.jpg"),
  recovery: s("recovery.jpg"),
  hospitalLobby: s("hospital-lobby.jpg"),
  patient: s("patient-journey.jpg"),
  visa: s("visa-travel.jpg"),
  secondOpinion: s("second-opinion.jpg"),
  emiFinance: s("emi-finance.jpg"),
  ayushmanBharat: s("ayushman-bharat.jpg"),
  trainTravel: s("train-travel-hyd.jpg"),
  globalReach: s("70-countries.jpg"),
} as const;

export const CITY_IMAGES: Record<string, string> = {
  hyderabad: s("hyderabad.jpg"),
  delhi: s("delhi.jpg"),
  chennai: s("chennai.jpg"),
  mumbai: s("mumbai.jpg"),
  bangalore: s("bangalore.jpg"),
  gurugram: s("delhi.jpg"),
};

/** Category display names used by treatmentImage() helpers. */
export const CATEGORY_IMAGES: Record<string, string> = {
  Cardiology: s("cardiac-care.jpg"),
  Orthopedics: s("orthopaedics.jpg"),
  Transplant: s("general-surgery.jpg"),
  Oncology: s("cancer.jpg"),
  Fertility: s("fertility.jpg"),
  Cosmetic: s("cosmetic.jpg"),
  Bariatric: s("general-surgery.jpg"),
  Dental: s("dental.jpg"),
  Neurosurgery: s("neurosurgery.jpg"),
  ENT: s("ent.jpg"),
  Ophthalmology: s("eye-care.jpg"),
};

/** Category slug → local hero (treatments hub + category pages). */
export const CATEGORY_SLUG_IMAGES: Record<string, string> = {
  "cardiac-care-india": s("cardiac-care.jpg"),
  "orthopaedic-treatments-india": s("orthopaedics.jpg"),
  "cancer-treatment-india": s("cancer.jpg"),
  "fertility-treatments-india": s("fertility.jpg"),
  "neurology-neurosurgery-india": s("neurosurgery.jpg"),
  "cosmetic-plastic-surgery-india": s("cosmetic.jpg"),
  "general-advanced-surgeries-india": s("general-surgery.jpg"),
  "eye-care-ophthalmology-india": s("eye-care.jpg"),
  "dental-treatments-india": s("dental.jpg"),
  "wellness-holistic-healing-india": s("wellness.jpg"),
  "urology-treatments-india": s("urology.jpg"),
  "andrology-treatments-india": "/images/services/andrology/andrology.jpg",
  "gynecology-womens-health-india": s("gynecology.jpg"),
  "ent-treatments-india": s("ent.jpg"),
  "gastroenterology-india": s("gastroenterology.jpg"),
  "endocrinology-diabetes-india": s("endocrinology.jpg"),
  "vascular-surgery-india": s("vascular.jpg"),
  "dermatology-skin-care-india": s("dermatology.jpg"),
  "pediatric-treatments-india": s("pediatrics.jpg"),
  "pulmonology-lung-care-india": s("pulmonology.jpg"),
  "hematology-bone-marrow-india": s("hematology.jpg"),
};

export const HOSPITAL_IMAGES: Record<string, string> = {
  "olive-hospitals": s("olive-hospitals.jpg"),
  "tx-hospitals": s("tx-hospitals.jpg"),
  "medicover-hospitals": s("medicover-hospitals.jpg"),
  "max-healthcare-delhi": s("max-healthcare-delhi.jpg"),
};

/** Domestic Hyderabad page slug → optional hero image. */
export const DOMESTIC_PAGE_IMAGES: Record<string, string> = {
  "": s("hyderabad.jpg"),
  "ayushman-bharat-hospitals": s("ayushman-bharat.jpg"),
  "emi-medical-loans": s("emi-finance.jpg"),
  "second-opinion-doctors": s("second-opinion.jpg"),
  "train-flight-travel-guide": s("train-travel-hyd.jpg"),
  "aarogyasri-empanelled-hospitals": s("ayushman-bharat.jpg"),
  "insurance-schemes-comparison": s("ayushman-bharat.jpg"),
  "cghs-empanelled-hospitals": s("hospital-lobby.jpg"),
};

export function treatmentImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? MEDIA.consultation;
}

export function categoryImage(categorySlug: string): string {
  return CATEGORY_SLUG_IMAGES[categorySlug] ?? MEDIA.consultation;
}

export function cityImage(slug: string): string {
  return CITY_IMAGES[slug] ?? MEDIA.hero;
}

export function hospitalImage(slug: string): string {
  return HOSPITAL_IMAGES[slug] ?? MEDIA.hospitalLobby;
}

export function domesticPageImage(slug: string): string | undefined {
  return DOMESTIC_PAGE_IMAGES[slug];
}
