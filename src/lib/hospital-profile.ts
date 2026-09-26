import { hospitalImage, treatmentImage, MEDIA } from "@/lib/media";
import { SITE } from "@/lib/site";
import type { Hospital, HospitalFacilityGroup, HospitalLocationLandmark } from "@/lib/types";

export const SPECIALTY_TREATMENT_PATH: Record<string, string> = {
  Cardiology: "/treatments/cardiac-care-india",
  Orthopedics: "/treatments/orthopaedic-treatments-india",
  Transplant: "/treatments/general-advanced-surgeries-india",
  Oncology: "/treatments/cancer-treatment-india",
  Fertility: "/treatments/fertility-treatments-india",
  Cosmetic: "/treatments/cosmetic-plastic-surgery-india",
  Bariatric: "/treatments/general-advanced-surgeries-india",
  Dental: "/treatments/dental-treatments-india",
  Neurosurgery: "/treatments/neurology-neurosurgery-india",
  ENT: "/treatments/ent-treatments-india",
  Ophthalmology: "/treatments/eye-care-ophthalmology-india",
  Gastroenterology: "/treatments/gastroenterology-india",
  Gynecology: "/treatments/gynecology-womens-health-india",
  Urology: "/treatments/urology-treatments-india",
  Pulmonology: "/treatments/pulmonology-lung-care-india",
  Nephrology: "/treatments/urology-treatments-india",
  "General Surgery": "/treatments/general-advanced-surgeries-india",
  Dermatology: "/treatments/dermatology-skin-care-india",
};

const CITY_LANDMARKS: Record<string, HospitalLocationLandmark[]> = {
  hyderabad: [
    {
      name: "Rajiv Gandhi International Airport, Hyderabad",
      distanceKm: 30,
      timeMinutes: 45,
    },
    { name: "Hyderabad Metro", distanceKm: 3, timeMinutes: 12 },
  ],
  delhi: [
    {
      name: "Indira Gandhi International Airport, New Delhi",
      distanceKm: 18,
      timeMinutes: 40,
    },
  ],
};

const BASE_FACILITY_GROUPS: HospitalFacilityGroup[] = [
  {
    id: "comfort",
    title: "Comfort During Stay",
    items: [
      "Private rooms",
      "Free Wifi",
      "Family accommodation support",
      "Laundry",
      "Safe in the room",
      "Café / cafeteria",
      "Parking available",
    ],
  },
  {
    id: "money",
    title: "Money Matters",
    items: [
      "Health insurance coordination",
      "Foreign currency exchange support",
      "Credit / debit card",
      "Netbanking",
    ],
  },
  {
    id: "food",
    title: "Food",
    items: ["Diet on request", "Hospital restaurant / cafeteria", "International-friendly meals"],
  },
  {
    id: "language",
    title: "Language",
    items: ["Interpreter on request", "Translation of medical reports"],
  },
  {
    id: "transport",
    title: "Transportation",
    items: [
      "Airport pickup coordination",
      "Local transportation booking",
      "Visa / travel office support",
      "Car hire",
    ],
  },
];

export function defaultLandmarks(citySlug: string): HospitalLocationLandmark[] {
  return CITY_LANDMARKS[citySlug] ?? CITY_LANDMARKS.hyderabad;
}

export function defaultFacilityGroups(
  facilities: string[],
  internationalServices: string[]
): HospitalFacilityGroup[] {
  const treatmentItems = [
    "Medical records transfer",
    "Online doctor consultation",
    "Pharmacy",
    "Post-operative follow-up coordination",
    ...facilities,
  ];
  const uniqueTreatment = [...new Set(treatmentItems)];

  const extras = internationalServices.filter(
    (item) =>
      !BASE_FACILITY_GROUPS.some((group) =>
        group.items.some((g) => g.toLowerCase() === item.toLowerCase())
      ) &&
      !uniqueTreatment.some((g) => g.toLowerCase() === item.toLowerCase())
  );

  const groups = [
    ...BASE_FACILITY_GROUPS.slice(0, 3),
    { id: "treatment", title: "Treatment Related", items: uniqueTreatment },
    ...BASE_FACILITY_GROUPS.slice(3),
  ];

  if (extras.length) {
    groups.push({
      id: "international",
      title: "International Patient Services",
      items: extras,
    });
  }

  return groups;
}

export function specialtyHref(specialty: string): string {
  return SPECIALTY_TREATMENT_PATH[specialty] ?? "/treatments";
}

export function hospitalWhatsAppHref(hospitalName: string, city: string, extra?: string) {
  const text = extra
    ? `Hello, I would like to enquire about ${extra} at ${hospitalName}, ${city}. Please help with a doctor, package estimate, and admission.`
    : `Hello, I would like to book treatment at ${hospitalName}, ${city}. Please help with hospital options, a package estimate, and visa support.`;
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function hospitalMapsHref(hospital: Pick<Hospital, "name" | "city" | "address">) {
  const query = [hospital.name, hospital.address || hospital.city, "India"]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function hospitalGallery(hospital: Pick<Hospital, "slug" | "name" | "specialties">) {
  const images = [
    { src: hospitalImage(hospital.slug), alt: `${hospital.name} campus` },
    { src: MEDIA.hospitalLobby, alt: `${hospital.name} international patient lounge` },
    { src: MEDIA.consultation, alt: `Consultation at ${hospital.name}` },
    { src: MEDIA.surgery, alt: `Clinical care at ${hospital.name}` },
  ];

  for (const specialty of hospital.specialties.slice(0, 3)) {
    const src = treatmentImage(specialty);
    if (!images.some((img) => img.src === src)) {
      images.push({ src, alt: `${specialty} at ${hospital.name}` });
    }
  }

  const seen = new Set<string>();
  return images.filter((img) => {
    if (seen.has(img.src)) return false;
    seen.add(img.src);
    return true;
  });
}

