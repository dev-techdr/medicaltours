# Medical Tours India — Next.js Architecture Spec

## Stack
- Next.js 14+ App Router, TypeScript
- Content: JSON/MDX data-driven (NOT hardcoded JSX per page) — one template renders all procedure pages
- next-sitemap for sitemap.xml generation
- next/image for all media
- Tailwind (or existing design system)

## Core principle
ONE dynamic route + ONE data file per content type generates ALL pages.
Never hand-build 150 individual page.tsx files — build the template + schema once, feed it structured data.

---

## Folder structure

```
app/
  layout.tsx                          → root layout, global schema (Organization)
  page.tsx                            → homepage
  sitemap.ts                          → dynamic sitemap generator
  robots.ts

  treatments/
    page.tsx                          → treatments hub (lists all categories)
    [category]/
      page.tsx                        → category page (e.g., cardiac-care-india)
      [procedure]/
        page.tsx                      → procedure page template (renders ALL procedures)

  cost-comparison/
    [procedure]/
      page.tsx                        → India vs USA/UK/etc cost comparison template

  hospitals/
    page.tsx                          → hospitals hub
    [city]/
      page.tsx                        → city hospital page (Hyderabad, Delhi, Mumbai...)

  doctors/
    page.tsx
    [specialty]/
      page.tsx

  patient-stories/
    [country]/
      page.tsx                        → e.g. patient-stories/nigeria, /uk, /usa

  blogs/
    page.tsx
    [slug]/
      page.tsx

  about/page.tsx
  services/page.tsx
  contact/page.tsx

content/
  categories.json                     → 10 categories: slug, name, description, icon, hero image
  procedures.json                     → ALL procedures (150+), each linked to category
  hospitals.json
  doctors.json
  countries.json                      → for cost-comparison + patient-stories
  faqs.json                           → keyed by procedure slug

lib/
  schema.ts                           → JSON-LD generator functions (MedicalProcedure, FAQPage, Physician, etc.)
  metadata.ts                         → generateMetadata() helpers, reused across all dynamic routes
  data.ts                             → typed loaders/getters for content JSON

components/
  ProcedureTemplate.tsx                → the master template (used by ALL procedure pages)
  CostComparisonTable.tsx
  FAQAccordion.tsx
  DoctorCard.tsx
  HospitalCard.tsx
  TestimonialCard.tsx
  Breadcrumbs.tsx
  CTASection.tsx
```

---

## Data model (build this first — it's the foundation)

### `content/procedures.json`
```ts
type Procedure = {
  slug: string;                    // "heart-bypass-surgery-cost-india"
  categorySlug: string;            // "cardiac-care-india"
  name: string;                    // "Heart Bypass Surgery (CABG)"
  metaTitle: string;
  metaDescription: string;
  h1: string;
  overview: string;                // rich text / markdown
  costIndia: { min: number; max: number; currency: "USD" };
  costComparison: { country: string; min: number; max: number }[];
  recoveryTime: string;
  procedureSteps: string[];
  hospitalSlugs: string[];         // links to hospitals.json
  doctorSlugs: string[];           // links to doctors.json
  faqSlugKey: string;              // links to faqs.json
  relatedProcedures: string[];     // slugs, for internal linking
  images: { src: string; alt: string }[];
}
```

### `content/categories.json`
```ts
type Category = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  procedureSlugs: string[];       // auto-populate from procedures.json in code, or maintain here
}
```

### `content/faqs.json`
```ts
{ [procedureSlug: string]: { question: string; answer: string }[] }
```

### `content/countries.json` (for cost-comparison + patient-stories)
```ts
type Country = { code: string; name: string; slug: string }
```

---

## Routing logic (give this exactly to Cursor)

**`app/treatments/[category]/[procedure]/page.tsx`**
```
- generateStaticParams(): map over procedures.json, return {category, procedure} for every entry
- generateMetadata(): pull metaTitle/metaDescription from procedures.json entry; set canonical URL
- page component: look up procedure by slug, pass to <ProcedureTemplate procedure={data} />
- Inject JSON-LD: MedicalProcedure schema + FAQPage schema + BreadcrumbList schema via lib/schema.ts
- 404 via notFound() if slug not found
```

Apply the same pattern to `/hospitals/[city]`, `/doctors/[specialty]`, `/patient-stories/[country]`, `/cost-comparison/[procedure]` — same architecture, different JSON source.

---

## `ProcedureTemplate.tsx` section order (fixed, reused everywhere)
1. Breadcrumbs
2. H1 + short intro
3. Cost table (India vs top 3 comparison countries) → `<CostComparisonTable>`
4. "Why choose India" trust block (accreditations, generic — pull from a shared partial)
5. Doctors/hospitals for this procedure → `<DoctorCard>` / `<HospitalCard>` grid
6. Procedure steps + recovery timeline
7. Testimonial (real, attributed) → `<TestimonialCard>`
8. FAQ (schema-marked) → `<FAQAccordion>`
9. Related procedures (internal linking, 4-6 links)
10. CTA form

---

## Schema.org (lib/schema.ts) — generate per page type
- Root layout: `MedicalOrganization` + `LocalBusiness`
- Every procedure page: `MedicalProcedure`, `FAQPage`, `BreadcrumbList`
- Doctor pages: `Physician`
- Hospital pages: `Hospital` / `MedicalClinic`
- Testimonials: `Review` + `AggregateRating`

---

## sitemap.ts
```
Loop over procedures.json, categories.json, hospitals.json, doctors.json, countries.json (x2 for cost-comparison + patient-stories), blogs — output full URL list with lastmod dates.
```

---

## Build instructions for Cursor (paste as-is)
1. Scaffold the folder structure above.
2. Build `content/*.json` with placeholder data for 5 procedures first (one per top category) — validate the template renders correctly before scaling to all 150.
3. Build `ProcedureTemplate.tsx` and the dynamic route with `generateStaticParams` + `generateMetadata`.
4. Build `lib/schema.ts` with JSON-LD generator functions, inject via `<script type="application/ld+json">` in each page.
5. Once template is validated, bulk-populate `procedures.json` with all 150+ procedures.
6. Build sitemap.ts + robots.ts.
7. Add hreflang only if/when you commit to country-specific URL variants (optional phase 2).

---

## Full Procedure List by Category (for content/procedures.json)

### 1. Cardiac Care
- Heart Bypass Surgery (CABG) Cost in India
- Angioplasty / Stent Placement Cost in India
- Heart Valve Replacement/Repair Surgery India
- Pacemaker Implantation India
- Pediatric Heart Surgery India
- ASD/VSD Closure Surgery India
- Heart Transplant India
- TAVR (Transcatheter Aortic Valve Replacement) India

### 2. Orthopaedic Treatments
- Total Knee Replacement Surgery India
- Hip Replacement Surgery India
- Spine Surgery (Discectomy/Fusion) India
- ACL Reconstruction Surgery India
- Shoulder Replacement Surgery India
- Bilateral Knee Replacement India
- Sports Injury Surgery India
- Scoliosis Correction Surgery India

### 3. Cancer Treatment
- Chemotherapy Cost in India
- Radiation Therapy India
- Breast Cancer Treatment India
- Bone Marrow Transplant India
- Robotic Cancer Surgery India (da Vinci)
- Immunotherapy Cost India
- Oral/Throat Cancer Treatment India
- Prostate Cancer Treatment India

### 4. Fertility Treatments
- IVF Treatment Cost India
- ICSI Treatment India
- Surrogacy in India for Foreigners
- Egg Donation/Freezing India
- IUI Treatment Cost India
- Male Infertility Treatment India

### 5. Neurology & Neurosurgery
- Brain Tumor Surgery India
- Spine Neurosurgery India
- Epilepsy Surgery India
- Deep Brain Stimulation (Parkinson's) India
- Stroke Treatment & Rehab India
- Aneurysm Surgery India

### 6. Cosmetic & Plastic Surgery
- Rhinoplasty (Nose Job) Cost India
- Liposuction Cost India
- Breast Augmentation/Reduction India
- Tummy Tuck (Abdominoplasty) India
- Hair Transplant Cost India
- Facelift Surgery India
- Gynecomastia Surgery India

### 7. General & Advanced Surgeries
- Bariatric/Weight Loss Surgery India
- Gallbladder Removal (Laparoscopic) India
- Kidney Transplant India
- Liver Transplant India
- Hernia Repair Surgery India
- Appendix Surgery India

### 8. Eye Care & Ophthalmology
- LASIK Eye Surgery Cost India
- Cataract Surgery India
- Retina Surgery India
- Cornea Transplant India
- Glaucoma Treatment India

### 9. Dental Treatments
- Dental Implants Cost India
- Full Mouth Rehabilitation India
- Root Canal Treatment India
- Smile Makeover / Veneers India
- Orthodontic Treatment (Braces/Invisalign) India

### 10. Wellness & Holistic Healing
- Ayurveda Panchakarma Packages India
- Yoga & Wellness Retreats India
- Post-Surgery Rehab & Recovery India

---

## Cross-cutting pages
- `/cost-comparison/[procedure]-india-vs-usa-uk` — high search volume, comparison-intent
- `/hospitals/[city]` — Hyderabad, Delhi, Mumbai, Chennai, Bangalore
- `/doctors/[specialty]` — doctor profile pages (E-E-A-T signal)
- `/patient-stories/[country]` — e.g. patient-stories/nigeria, patient-stories/uk
- `/blogs/[procedure]-recovery-guide` — supports procedure pages, targets long-tail/informational queries
- `/faq` — consolidated FAQ hub, plus embedded FAQ schema on every procedure page
