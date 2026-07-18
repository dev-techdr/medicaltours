export const AFRICAN_CONTACT = {
  phoneDisplay: "+91 95422 18454",
  phoneHref: "tel:+919542218454",
  whatsappNumber: "919542218454",
  whatsappUrl:
    "https://wa.me/919542218454?text=Hi%2C%20I%20am%20from%20Africa%20and%20interested%20in%20medical%20treatment%20in%20India",
  email: "info@techdr.in",
  siteUrl: "https://medicaltoursindia.com",
} as const;

export const HERO_STATS = [
  { value: "60-80%", label: "Typical savings" },
  { value: "24 hrs", label: "To consultation" },
  { value: "0", label: "Waiting list" },
  { value: "50+", label: "Doctors on network" },
] as const;

export const TRUST_BAR_ITEMS = [
  "NABH Accredited",
  "JCI Partner Hospitals",
  "ISO Certified",
  "24x7 Coordination",
  "10,000+ Patients",
] as const;

export const AFRICA_COMPARISON_ROWS = [
  ["Heart surgery", "$45,000", "$8,000", "82%"],
  ["Kidney transplant", "$60,000", "$15,000", "75%"],
  ["Knee replacement", "$18,000", "$5,500", "69%"],
  ["IVF cycle", "$9,000", "$3,200", "64%"],
  ["Dental implants", "$6,500", "$1,400", "78%"],
] as const;

export const SPECIALTIES = [
  { name: "Cardiac", icon: "heart", blurb: "Bypass, valve repair, pediatric and minimally invasive care." },
  { name: "Ortho", icon: "joint", blurb: "Joint replacement, sports injury, trauma and rehab planning." },
  { name: "Oncology", icon: "shield", blurb: "Surgical, medical and radiation oncology in one pathway." },
  { name: "Neuro", icon: "brain", blurb: "Complex neurosurgery, stroke recovery and spine-neuro teams." },
  { name: "Transplant", icon: "drop", blurb: "Kidney, liver and bone marrow pathways with donor guidance." },
  { name: "IVF", icon: "spark", blurb: "Fertility workups, IVF cycles and donor program coordination." },
  { name: "Dental", icon: "tooth", blurb: "Implants, full-mouth rehabilitation and cosmetic dentistry." },
  { name: "Eyes", icon: "eye", blurb: "Cataract, retina, cornea and laser vision correction options." },
  { name: "Gastro", icon: "pulse", blurb: "GI surgery, endoscopy and hepatobiliary treatment planning." },
  { name: "Cosmetic", icon: "face", blurb: "Aesthetic surgery with privacy, recovery and stay support." },
  { name: "Bariatric", icon: "path", blurb: "Weight-loss surgery with multidisciplinary pre-op screening." },
  { name: "Spine", icon: "spine", blurb: "Disc, deformity and minimally invasive spine procedures." },
] as const;

export const FLIGHT_PATH_STEPS = [
  {
    step: "01",
    title: "Share reports",
    body: "Send scans, lab reports and your current diagnosis by WhatsApp or email for a first review.",
    time: "Same day",
  },
  {
    step: "02",
    title: "Free video consult",
    body: "We schedule a specialist review so you understand options before spending on travel.",
    time: "Within 24 hrs",
  },
  {
    step: "03",
    title: "Visa letter",
    body: "Once you choose a doctor, we coordinate the invitation letter and documents for your visa file.",
    time: "1-2 days",
  },
  {
    step: "04",
    title: "Travel",
    body: "Airport pickup, hotel planning, attendant support and arrival guidance are lined up before departure.",
    time: "Pre-arrival",
  },
  {
    step: "05",
    title: "Treatment",
    body: "Admission, investigations, surgery and billing are coordinated with your hospital team on ground.",
    time: "As scheduled",
  },
  {
    step: "06",
    title: "Fly home",
    body: "You leave with discharge papers, medicine notes and a clear remote follow-up plan.",
    time: "Post recovery",
  },
] as const;

export const GLOBAL_COST_ROWS = [
  ["Heart bypass surgery", "$8,000", "$85,000", "$48,000", "$45,000", "Up to $77,000"],
  ["Kidney transplant", "$15,000", "$160,000", "$95,000", "$60,000", "Up to $145,000"],
  ["Knee replacement", "$5,500", "$42,000", "$21,000", "$18,000", "Up to $36,500"],
  ["IVF cycle", "$3,200", "$18,000", "$8,500", "$9,000", "Up to $14,800"],
  ["Dental implants", "$1,400", "$6,500", "$4,800", "$6,500", "Up to $5,100"],
  ["Spine surgery", "$7,200", "$68,000", "$31,000", "$22,000", "Up to $60,800"],
] as const;

export const AFRICAN_COUNTRY_GROUPS = [
  {
    region: "West Africa",
    countries: [
      "Benin",
      "Burkina Faso",
      "Cape Verde",
      "Cote d'Ivoire",
      "Gambia",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Liberia",
      "Mali",
      "Mauritania",
      "Niger",
      "Nigeria",
      "Senegal",
      "Sierra Leone",
      "Togo",
    ],
  },
  {
    region: "East Africa",
    countries: [
      "Burundi",
      "Comoros",
      "Djibouti",
      "Eritrea",
      "Ethiopia",
      "Kenya",
      "Rwanda",
      "Seychelles",
      "Somalia",
      "South Sudan",
      "Sudan",
      "Tanzania",
      "Uganda",
    ],
  },
  {
    region: "Central Africa",
    countries: [
      "Angola",
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Republic of the Congo",
      "Democratic Republic of the Congo",
      "Equatorial Guinea",
      "Gabon",
      "Sao Tome and Principe",
    ],
  },
  {
    region: "Southern Africa",
    countries: [
      "Botswana",
      "Eswatini",
      "Lesotho",
      "Madagascar",
      "Malawi",
      "Mauritius",
      "Mozambique",
      "Namibia",
      "South Africa",
      "Zambia",
      "Zimbabwe",
    ],
  },
  {
    region: "North Africa",
    countries: ["Algeria", "Egypt", "Libya", "Morocco", "Tunisia"],
  },
] as const;

export const AFRICA_MAP_DOTS = [
  { name: "Nigeria", cx: 120, cy: 163 },
  { name: "Ghana", cx: 105, cy: 166 },
  { name: "Sudan", cx: 168, cy: 124 },
  { name: "Ethiopia", cx: 192, cy: 146 },
  { name: "Kenya", cx: 194, cy: 184 },
  { name: "Zimbabwe", cx: 184, cy: 254 },
] as const;

export const TESTIMONIALS = [
  {
    text: "Add real patient testimonial here. Use a detailed outcome-driven quote from a cardiac patient once approved.",
    name: "Patient story pending",
    country: "Nigeria",
    flag: "🇳🇬",
    treatment: "Cardiac surgery",
  },
  {
    text: "Add real patient testimonial here. Swap this with a fertility or orthopedic experience from East Africa.",
    name: "Patient story pending",
    country: "Kenya",
    flag: "🇰🇪",
    treatment: "IVF treatment",
  },
  {
    text: "Add real patient testimonial here. Keep one slot for a complex transplant or oncology case study.",
    name: "Patient story pending",
    country: "Ghana",
    flag: "🇬🇭",
    treatment: "Transplant care",
  },
] as const;

export const FAQS = [
  {
    question: "How do African patients get a medical visa for India?",
    answer:
      "After your doctor and hospital are finalized, we help arrange the invitation letter, appointment confirmation and document checklist needed for the Indian medical visa application.",
  },
  {
    question: "Is treatment in India safe for patients traveling from Africa?",
    answer:
      "We work with accredited hospitals, coordinate specialist review before travel and keep your treatment plan, arrival, stay and discharge steps aligned so there are fewer surprises on ground.",
  },
  {
    question: "How much can I really save compared with private treatment in Africa?",
    answer:
      "For major procedures, patients commonly save between 60% and 80%, even after accounting for flights, hotel stay and attendant expenses.",
  },
  {
    question: "Will someone help if I do not speak Hindi or I am unfamiliar with India?",
    answer:
      "Yes. We coordinate English-speaking support and can arrange interpreter help where needed so hospital consultations, admission and discharge are easier to follow.",
  },
  {
    question: "What documents should I send before asking for an estimate?",
    answer:
      "Share your passport copy if available, recent medical reports, scan images, biopsy or pathology notes, current diagnosis and any prior cost estimate from home.",
  },
  {
    question: "How long do patients usually stay in India?",
    answer:
      "Length of stay depends on the treatment, but most surgical journeys include pre-op evaluation, hospital stay and a recovery window before flying back home. We tell you the expected stay before you travel.",
  },
  {
    question: "Can I bring a family member or attendant?",
    answer:
      "Yes. Many African patients travel with a spouse, sibling or caregiver. We help plan accommodation, airport pickup and attendant logistics along with the medical schedule.",
  },
  {
    question: "How quickly can I speak to a specialist after sending reports?",
    answer:
      "Most patients receive an initial review within 24 hours, and urgent cases are prioritized faster when the reports clearly show an emergency or rapidly changing condition.",
  },
] as const;

export const PROMISES = ["Free", "No commitment", "Reply in 24 hrs"] as const;

export const URGENCY_OPTIONS = ["Routine", "Soon", "Urgent", "Emergency"] as const;
export const TRAVEL_TIMELINES = ["As soon as possible", "Within 2 weeks", "Within 1 month", "Just researching"] as const;
export const VISA_OPTIONS = ["Yes", "No", "Not sure"] as const;
export const HOME_ESTIMATE_OPTIONS = ["Yes", "No", "Waiting for one"] as const;
export const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "Google ad",
  "WhatsApp referral",
  "Doctor referral",
  "Friend or family",
  "YouTube",
  "Facebook or Instagram",
  "Other",
] as const;
