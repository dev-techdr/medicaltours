/**
 * Flat legacy treatment MDX slugs → canonical nested procedure (or category) URLs.
 * Keep in sync with permanent redirects in next.config.ts.
 */
export const TREATMENT_CANONICAL_PATH: Record<string, string> = {
  "heart-surgery-india":
    "/treatments/cardiac-care-india/heart-bypass-surgery-cost-india",
  "knee-replacement-india":
    "/treatments/orthopaedic-treatments-india/total-knee-replacement-surgery-india",
  "cancer-treatment-india":
    "/treatments/cancer-treatment-india/chemotherapy-cost-india",
  "ivf-treatment-india":
    "/treatments/fertility-treatments-india/ivf-treatment-cost-india",
  "neurosurgery-india":
    "/treatments/neurology-neurosurgery-india/brain-tumor-surgery-india",
  "hip-replacement-india":
    "/treatments/orthopaedic-treatments-india/hip-replacement-surgery-india",
  "spine-surgery-india":
    "/treatments/orthopaedic-treatments-india/spine-surgery-india",
  "bone-marrow-transplant-india":
    "/treatments/hematology-bone-marrow-india/bone-marrow-transplant-india",
  "liver-transplant-india":
    "/treatments/general-advanced-surgeries-india/liver-transplant-india",
  "kidney-transplant-india":
    "/treatments/general-advanced-surgeries-india/kidney-transplant-india",
  "organ-transplant-india": "/treatments/general-advanced-surgeries-india",
  "bariatric-surgery-india":
    "/treatments/general-advanced-surgeries-india/bariatric-weight-loss-surgery-india",
  "cosmetic-surgery-india": "/treatments/cosmetic-plastic-surgery-india",
  "hair-transplant-india":
    "/treatments/cosmetic-plastic-surgery-india/hair-transplant-cost-india",
  "dental-implants-india":
    "/treatments/dental-treatments-india/dental-implants-cost-india",
  "eye-surgery-india":
    "/treatments/eye-care-ophthalmology-india/lasik-eye-surgery-cost-india",
  "cochlear-implant-india":
    "/treatments/ent-treatments-india/cochlear-implant-cost-india",
};

/** Cost calculator legacy URLs → cost-comparison procedure pages. */
export const COST_CANONICAL_PATH: Record<string, string> = {
  "heart-surgery-india": "/cost-comparison/heart-bypass-surgery-cost-india",
  "knee-replacement-india":
    "/cost-comparison/total-knee-replacement-surgery-india",
  "cancer-treatment-india": "/cost-comparison/chemotherapy-cost-india",
  "ivf-treatment-india": "/cost-comparison/ivf-treatment-cost-india",
  "neurosurgery-india": "/cost-comparison/brain-tumor-surgery-india",
  "cochlear-implant-india": "/cost-comparison/cochlear-implant-cost-india",
  "hip-replacement-india": "/cost-comparison/hip-replacement-surgery-india",
  "spine-surgery-india": "/cost-comparison/spine-surgery-india",
  "bone-marrow-transplant-india":
    "/cost-comparison/bone-marrow-transplant-india",
  "liver-transplant-india": "/cost-comparison/liver-transplant-india",
  "kidney-transplant-india": "/cost-comparison/kidney-transplant-india",
  "bariatric-surgery-india":
    "/cost-comparison/bariatric-weight-loss-surgery-india",
  "dental-implants-india": "/cost-comparison/dental-implants-cost-india",
  "hair-transplant-india": "/cost-comparison/hair-transplant-cost-india",
  "eye-surgery-india": "/cost-comparison/lasik-eye-surgery-cost-india",
  "cosmetic-surgery-india": "/treatments/cosmetic-plastic-surgery-india",
  "organ-transplant-india": "/treatments/general-advanced-surgeries-india",
};

export function treatmentCanonicalHref(slug: string): string {
  return TREATMENT_CANONICAL_PATH[slug] ?? `/treatments/${slug}`;
}

export function costCanonicalHref(slug: string): string {
  return COST_CANONICAL_PATH[slug] ?? `/cost-comparison/${slug}`;
}
