export type Accreditation = {
  acronym: string;
  name: string;
  issuer: string;
  summary: string;
  whyItMatters: string;
  /** Official issuer or directory URL for verification */
  verifyUrl: string;
};

export const HOSPITAL_ACCREDITATIONS: Accreditation[] = [
  {
    acronym: "JCI",
    name: "Joint Commission International",
    issuer: "Joint Commission International (USA)",
    summary:
      "JCI is a globally recognized hospital accreditation standard used by leading international patient departments.",
    whyItMatters:
      "For international patients, JCI signals standardized patient safety protocols, infection control, medication management, and surgical safety comparable to major US hospital systems.",
    verifyUrl: "https://www.jointcommissioninternational.org/",
  },
  {
    acronym: "NABH",
    name: "National Accreditation Board for Hospitals",
    issuer: "Quality Council of India",
    summary:
      "NABH is India's national accreditation for hospitals and healthcare providers, widely used across major private hospitals.",
    whyItMatters:
      "NABH accreditation confirms structured clinical governance, patient rights, emergency preparedness, and quality monitoring — a strong baseline for medical tourists choosing India.",
    verifyUrl: "https://nabh.co/",
  },
  {
    acronym: "NABL",
    name: "National Accreditation Board for Testing and Calibration Laboratories",
    issuer: "Quality Council of India",
    summary:
      "NABL accredits diagnostic laboratories for testing quality, equipment calibration, and result reliability.",
    whyItMatters:
      "Accurate pathology, imaging, and lab results are critical for oncology, transplant, cardiac, and fertility cases. NABL-linked labs support confident treatment decisions.",
    verifyUrl: "https://nabl-india.org/",
  },
];
