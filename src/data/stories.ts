import { getAllMdx, getMdxBySlug } from "@/lib/mdx";
import type { PatientStory } from "@/lib/types";

type StoryFrontmatter = {
  patientName: string;
  country: string;
  treatment: string;
  treatmentSlug: string;
  hospital: string;
  summary: string;
  outcome: string;
};

function normalize(
  doc: NonNullable<ReturnType<typeof getMdxBySlug<StoryFrontmatter>>>
): PatientStory {
  return {
    slug: doc.slug,
    patientName: doc.patientName,
    country: doc.country,
    treatment: doc.treatment,
    treatmentSlug: doc.treatmentSlug,
    hospital: doc.hospital,
    summary: doc.summary,
    outcome: doc.outcome,
    content: doc.content,
  };
}

export function getAllStories(): PatientStory[] {
  return getAllMdx<StoryFrontmatter>("stories").map(normalize);
}

export function getStoryBySlug(slug: string): PatientStory | undefined {
  const doc = getMdxBySlug<StoryFrontmatter>("stories", slug);
  return doc ? normalize(doc) : undefined;
}
