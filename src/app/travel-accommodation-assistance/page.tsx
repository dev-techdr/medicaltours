import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MdxContent } from "@/components/MdxContent";
import { getContentPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

const page = getContentPage("travel-accommodation-assistance");

export const metadata: Metadata = buildMetadata({
  title: page?.title ?? "Travel & Accommodation for Medical Tourists in India",
  description:
    page?.description ??
    "Airport pickup, hotels near hospitals, and accommodation support for medical tourists in India.",
  path: "/travel-accommodation-assistance",
  keywords: [
    "accommodation for medical tourists in india",
    "airport pickup for medical tourists india",
  ],
});

export default function TravelAccommodationPage() {
  if (!page) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[
          {
            name: "Travel & Accommodation Assistance",
            href: "/travel-accommodation-assistance",
          },
        ]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">{page.title}</h1>
      <div className="mt-6">
        <AnswerBlock>
          Techdr arranges airport pickup for medical tourists in India and hotels near partner
          hospitals so patients and attendants stay close to care — with options for every budget
          from guest houses to serviced apartments.
        </AnswerBlock>
      </div>
      <div className="mt-10">
        <MdxContent source={page.content} />
      </div>
      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
