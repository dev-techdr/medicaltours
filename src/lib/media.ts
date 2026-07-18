/** Curated Unsplash photography — medical, hospital, and India travel contexts. */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MEDIA = {
  hero: u("photo-1519494026892-80bbd2d6fd0d", 1920),
  heroSecondary: u("photo-1631217868264-e5b90bb7e133", 1200),
  careTeam: u("photo-1559839734-2b71ea197ec2", 900),
  team: "/images/team-photo2.png",
  consultation: u("photo-1579684385127-1ef15d508118", 900),
  surgery: u("photo-1551190822-a9333d879b1f", 900),
  recovery: u("photo-1576091160399-112ba8d25d1d", 900),
  hospitalLobby: u("photo-1586773860418-d37222d8fce3", 900),
  patient: u("photo-1576091160550-2173dba999ef", 900),
  visa: u("photo-1436491865332-7a61a109cc05", 900),
} as const;

export const CITY_IMAGES: Record<string, string> = {
  hyderabad: u("photo-1582510003544-4d00b7f74220", 800),
  delhi: u("photo-1587474260584-136574528ed5", 800),
  chennai: u("photo-1582510003544-4d00b7f74220", 800),
  mumbai: u("photo-1566552881560-0be862a7c445", 800),
  bangalore: u("photo-1596176530529-78163a4f7af2", 800),
};

export const CATEGORY_IMAGES: Record<string, string> = {
  Cardiology: u("photo-1628348068343-c6a848d2b6dd", 800),
  Orthopedics: u("photo-1576091160399-112ba8d25d1d", 800),
  Transplant: u("photo-1579684385127-1ef15d508118", 800),
  Oncology: u("photo-1579154204601-01588f351e67", 800),
  Fertility: u("photo-1584820927498-cfe5211fd8bf", 800),
  Cosmetic: u("photo-1512290923902-8a9f81dc236c", 800),
  Bariatric: u("photo-1490645935967-10de6ba17061", 800),
  Dental: u("photo-1606811841689-23dfddce3e95", 800),
  Neurosurgery: u("photo-1559757175-5700dde675bc", 800),
  ENT: u("photo-1581595220892-b2452abe5b1b", 800),
  Ophthalmology: u("photo-1551601651-2a8555f1a136", 800),
};

export const HOSPITAL_IMAGES: Record<string, string> = {
  "apollo-hospitals-hyderabad": MEDIA.hospitalLobby,
  "apollo-hospitals-chennai": MEDIA.careTeam,
  "fortis-hospital-delhi": MEDIA.consultation,
  "max-healthcare-delhi": MEDIA.surgery,
  "medanta-gurugram": MEDIA.heroSecondary,
  "manipal-hospital-bangalore": MEDIA.recovery,
  "kokilaben-hospital-mumbai": MEDIA.patient,
  "yashoda-hospitals-hyderabad": MEDIA.hospitalLobby,
};

export function treatmentImage(category: string, slug?: string): string {
  return CATEGORY_IMAGES[category] ?? MEDIA.consultation;
}

export function cityImage(slug: string): string {
  return CITY_IMAGES[slug] ?? MEDIA.hero;
}

export function hospitalImage(slug: string): string {
  return HOSPITAL_IMAGES[slug] ?? MEDIA.hospitalLobby;
}
