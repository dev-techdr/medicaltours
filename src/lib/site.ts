export const SITE = {
  name: "Medical Tours India",
  legalName: "TechDr",
  domain: "medicaltoursindia.com",
  url: "https://medicaltoursindia.com",
  tagline: "Trusted Medical Tourism Partner for International Patients",
  description:
    "Medical Tours India connects international patients with 200+ partner hospitals across India. End-to-end care for treatment, visa, travel, and recovery — headquartered in Hyderabad.",
  ownershipDeclaration:
    "Medical Tours India is a brand owned and operated by TechDr. All medical value travel facilitation services are provided under the legal entity TechDr.",
  phone: "+916303225006",
  phoneDisplay: "+91 6303225006",
  whatsapp: "916303225006",
  whatsappUrl: "https://wa.me/916303225006",
  email: "hi@medicaltoursindia.com",
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
  footerLogo: "/images/footer-logo.png",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://x.com/medtoursindia",
    label: "Follow us on X",
    icon: "x",
  },
  {
    href: "https://www.instagram.com/medicaltours.india",
    label: "Follow us on Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.facebook.com/medicaltoursindia1",
    label: "Follow us on Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.linkedin.com/company/medical-tours-india",
    label: "Follow us on LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://www.youtube.com/@medical-tourism-india",
    label: "Subscribe on YouTube",
    icon: "youtube",
  },
  {
    href: "https://maps.app.goo.gl/QURcqiRDh1iSLo6f8",
    label: "Find us on Google Maps",
    icon: "map",
  },
  {
    href: "https://share.google/Zz3Td1gtEf4j0CLoJ",
    label: "View our Google Business Profile",
    icon: "google",
  },
] as const;

export type SocialLinkIcon = (typeof SOCIAL_LINKS)[number]["icon"];

export const SOCIAL_SAME_AS = SOCIAL_LINKS.map((link) => link.href);

export const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "sw", label: "Swahili", nativeLabel: "Kiswahili" },
] as const;

export type SiteLanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];

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
      href: "/treatments/cancer-treatment-india",
      label: "Cancer Treatment",
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
  countries: [
    { href: "/countries/medical-tourism-india-for-nigerians", label: "Nigeria" },
    { href: "/countries/medical-tourism-india-for-kenyans", label: "Kenya" },
    { href: "/countries/medical-tourism-india-for-uae-residents", label: "UAE" },
    { href: "/countries/medical-tourism-india-for-saudi-patients", label: "Saudi Arabia" },
    { href: "/countries/medical-tourism-india-for-bangladeshis", label: "Bangladesh" },
    { href: "/countries/medical-tourism-india-for-uk-patients", label: "United Kingdom" },
    { href: "/countries/medical-tourism-india-for-usa-patients", label: "United States" },
    { href: "/countries/medical-tourism-india-for-iraqis", label: "Iraq" },
    { href: "/countries/medical-tourism-india-for-nepalis", label: "Nepal" },
    { href: "/countries/medical-tourism-india-for-sri-lankans", label: "Sri Lanka" },
    { href: "/countries", label: "All Countries" },
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
    { href: "/blog", label: "Blog & Guides" },
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
