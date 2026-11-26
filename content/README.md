# Content (Local MDX)

All long-form and structured page content lives here as MDX files with YAML frontmatter.

## Collections

| Folder | Route | Notes |
| --- | --- | --- |
| `treatments/` | `/treatments/[slug]` | Cost fields + FAQs in frontmatter; body is SEO copy |
| `hospitals/` | `/hospitals/[slug]` | Accreditation, specialties, ratings |
| `cities/` | `/cities/[slug]` and `/hospital-network/[city]` | City guides |
| `countries/` | `/countries/[slug]` | Nationality pages |
| `doctors/` | `/doctors/[slug]` | Specialist profiles |
| `stories/` | `/patient-stories` | Patient success stories |
| `blog/` | `/blog/[slug]` | Guides and articles |
| `faqs/` | Used site-wide | `global.mdx`, `visa.mdx` |
| `pages/` | Static pages | about-us, why-india, visa, travel, interpreter |

## Adding a treatment

1. Create `content/treatments/my-treatment-india.mdx`
2. Fill frontmatter (see an existing file for the schema)
3. Write the MDX body (headings, lists, internal links)
4. Restart or refresh `npm run dev` — the page is available at `/treatments/my-treatment-india`

Slug = filename without `.mdx`. No code changes required for new entries in an existing collection.

## Frontmatter tips

- Use double-quoted strings for text with colons or special characters
- FAQs are YAML lists of `{ question, answer }`
- Numbers (`costMinUsd`, `rating`) are unquoted
