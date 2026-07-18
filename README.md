# Techdr Medical Tourism — medicaltoursindia.com

Production-grade medical tourism website for international patients seeking treatment in India.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Native Metadata API + JSON-LD structured data
- `next-sitemap` (postbuild) + `app/sitemap.ts` / `app/robots.ts`
- Client-side cost calculator (no backend required)
- Content in **Local MDX** files under `content/` (frontmatter + long-form body)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Site architecture

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/treatments/[slug]` | Treatment pages |
| `/hospital-network` | 200+ hospital partners |
| `/hospitals/[slug]` | Hospital detail |
| `/cities/[slug]` | City guides |
| `/countries/[slug]` | Nationality pages |
| `/doctors/[slug]` | Specialist profiles |
| `/cost-calculator` | Interactive cost tool |
| `/cost/[slug]` | Treatment cost pages |
| `/medical-visa-assistance` | Visa guidance |
| `/faq` | FAQ + FAQPage schema |

## SEO / AEO / GEO

- Canonical URLs and hreflang scaffold (`en`, `ar`, `fr`, `bn`, `sw`)
- Organization, MedicalProcedure, Physician, FAQPage, BreadcrumbList JSON-LD
- `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai
- `public/llms.txt` for AI crawlers
- Answer-first content blocks on major pages

## Content (Local MDX)

Edit files in `content/` — see [`content/README.md`](./content/README.md).

- Structured fields (costs, FAQs, ratings) live in YAML frontmatter
- Long-form SEO copy is the MDX body, rendered via `MdxContent`
- Loaders in `src/data/*.ts` read the filesystem at build/request time
- Add a new `.mdx` file to a collection to publish a new page (slug = filename)

## Contact

- Call / WhatsApp: +91 6303225006
- HQ: Hyderabad, India
- Patient enquiry form: `/contact-us` → `POST /api/contact` (Resend)

### Email (Resend)

Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=info@medicaltoursindia.com
# Optional verified sender once your domain is in Resend:
# CONTACT_FROM_EMAIL=Medical Tours India <hello@medicaltoursindia.com>
```

Until a domain is verified, Resend’s test sender `onboarding@resend.dev` works for development.
