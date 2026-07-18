export const SITE = {
  name: "Techdr Medical Tourism",
  legalName: "Techdr Medical Tourism",
  domain: "medicaltoursindia.com",
  url: "https://medicaltoursindia.com",
  tagline: "Trusted Medical Tourism Partner for International Patients",
  description:
    "Techdr Medical Tourism connects international patients with 200+ partner hospitals across India. End-to-end care for treatment, visa, travel, and recovery — headquartered in Hyderabad.",
  phone: "+916303225006",
  phoneDisplay: "+91 6303225006",
  whatsapp: "916303225006",
  whatsappUrl: "https://wa.me/916303225006",
  email: "info@medicaltoursindia.com",
  address: {
    street: "Hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500001",
    country: "IN",
    countryName: "India",
  },
  hospitalCount: "200+",
  teamCount: "30+",
  patientCount: "5,000+",
  yearsExperience: "10+",
  languages: ["en", "ar", "fr", "bn", "sw"] as const,
  defaultLocale: "en" as const,
  logo: "/images/new-logo.png",
} as const;

export const TRUST_SIGNALS = [
  {
    label: "MOUs with 200+ Hospitals Across India",
    icon: "hospital",
  },
  {
    label: "30+ Dedicated Care Coordinators",
    icon: "coordinators",
  },
  {
    label: "JCI & NABH Partner Network",
    icon: "accreditation",
  },
  {
    label: "End-to-End Patient Coordination",
    icon: "coordination",
  },
] as const;

export const FOUNDERS = [
  {
    name: "Raviteja Pendari",
    role: "Co-Founder",
    credentials: "MBA · Healthcare Management",
    experience: "8+ Years Experience",
    image: "/images/raviteja-pendari.png",
  },
  {
    name: "Abhista Gorityala",
    role: "Co-Founder",
    credentials: "MBA · Healthcare Management",
    experience: "5+ Years Experience",
    image: "/images/abhista-gorityala.png",
  },
] as const;

export const NAV_LINKS = [
  { href: "/treatments", label: "Treatments" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/countries", label: "Countries" },
  { href: "/free-second-opinion", label: "Free Second Opinion" },
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/patient-stories", label: "Patient Stories" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  treatments: [
    {
      href: "/treatments/cardiac-care-india/heart-bypass-surgery-cost-india",
      label: "Heart Bypass (CABG)",
    },
    {
      href: "/treatments/orthopaedic-treatments-india/total-knee-replacement-surgery-india",
      label: "Knee Replacement",
    },
    {
      href: "/treatments/cancer-treatment-india/chemotherapy-cost-india",
      label: "Chemotherapy",
    },
    {
      href: "/treatments/fertility-treatments-india/ivf-treatment-cost-india",
      label: "IVF & Fertility",
    },
    {
      href: "/treatments/general-advanced-surgeries-india/liver-transplant-india",
      label: "Liver Transplant",
    },
    { href: "/treatments", label: "All Treatments" },
  ],
  patients: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/free-second-opinion", label: "Free Second Opinion" },
    { href: "/get-free-quote", label: "Get Free Quote" },
    { href: "/emergency-urgent-cases", label: "Urgent Cases" },
    { href: "/insurance-tpa-international-patients", label: "Insurance & TPA" },
    { href: "/medical-visa-assistance", label: "Medical Visa" },
    { href: "/travel-accommodation-assistance", label: "Travel & Stay" },
    { href: "/interpreter-language-support", label: "Interpreters" },
    { href: "/cost-calculator", label: "Cost Calculator" },
    { href: "/patient-stories", label: "Success Stories" },
    { href: "/reviews", label: "Reviews" },
    { href: "/faq", label: "FAQ" },
  ],
  company: [
    { href: "/about-us", label: "About Us" },
    { href: "/our-team", label: "Our Team" },
    { href: "/accreditations-certifications", label: "Accreditations" },
    { href: "/why-india-for-medical-treatment", label: "Why India" },
    { href: "/india/hyderabad", label: "Indian Patients (Hyderabad)" },
    { href: "/hospitals", label: "Hospitals" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ],
} as const;
