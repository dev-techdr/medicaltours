import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { IndiaHubNav } from "@/components/india/IndiaHubNav";
import { MediaImage } from "@/components/MediaImage";
import { MdxContent } from "@/components/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHospitalsByCity } from "@/data/hospitals";
import { getIndiaDomesticPath } from "@/lib/india-domestic";
import { domesticPageImage } from "@/lib/media";
import { faqSchema, medicalProcedureInrSchema, webPageSchema } from "@/lib/seo";
import type { IndiaDomesticPage } from "@/lib/types";

type DomesticPageTemplateProps = {
  page: IndiaDomesticPage;
  isHub?: boolean;
};

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function DomesticPageTemplate({
  page,
  isHub = false,
}: DomesticPageTemplateProps) {
  const path = getIndiaDomesticPath(page.slug, page.locale);
  const hospitals = getHospitalsByCity("hyderabad");
  const pageImage = domesticPageImage(page.slug);

  const breadcrumbItems = [
    { name: "India", href: getIndiaDomesticPath("", page.locale) },
    ...(page.slug
      ? [{ name: page.title, href: path }]
      : [{ name: "Hyderabad", href: path }]),
  ];

  const ctaTitle =
    page.locale === "te"
      ? "హైదరాబాద్‌లో చికిత్స ప్లాన్ చేయడానికి సిద్ధంగా ఉన్నారా?"
      : "Ready to plan your surgery in Hyderabad?";

  const ctaDescription =
    page.locale === "te"
      ? "మీ రిపోర్టులు పంచుకోండి — మేము ఆసుపత్రి ఎంపిక, ఖర్చు అంచనా మరియు ట్రావెల్ సపోర్ట్‌లో సహాయం చేస్తాము."
      : "Share your reports and we’ll help you compare hospital options, clarify costs in rupees, and coordinate travel from your home state — usually within 24–48 hours.";

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: page.title,
            description: page.shortAnswer,
            url: path,
          }),
          ...(page.faqs.length ? [faqSchema(page.faqs)] : []),
          ...(page.costInrMin && page.costInrMax
            ? [
                medicalProcedureInrSchema({
                  name: page.title,
                  description: page.shortAnswer,
                  url: path,
                  costMin: page.costInrMin,
                  costMax: page.costInrMax,
                }),
              ]
            : []),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
        {page.title}
      </h1>
      <div className="mt-6">
        <AnswerBlock>{page.shortAnswer}</AnswerBlock>
      </div>

      {pageImage ? (
        <div className="mt-8 overflow-hidden rounded-[var(--radius)]">
          <MediaImage
            src={pageImage}
            alt={page.title}
            aspect="aspect-[21/9]"
            sizes="(max-width: 768px) 100vw, 1100px"
            zoomOnHover={false}
          />
        </div>
      ) : null}

      {page.costInrMin && page.costInrMax ? (
        <div className="quote-card mt-6">
          <p className="data-label">Indicative cost range (Hyderabad)</p>
          <p className="mt-1 font-display text-2xl font-medium text-navy">
            {formatInr(page.costInrMin)} – {formatInr(page.costInrMax)}
          </p>
          <p className="mt-2 text-sm text-muted">
            Package pricing varies by hospital, implant choice, and room category.
            Government scheme coverage may reduce out-of-pocket costs.
          </p>
        </div>
      ) : null}

      <div className="mt-8">
        <MdxContent source={page.content} />
      </div>

      {page.highlights.length > 0 ? (
        <ul className="divider-grid mt-8 sm:grid-cols-2">
          {page.highlights.map((h) => (
            <li key={h}>
              <p className="text-sm text-ink">{h}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {(page.tier === "tier1" ||
        page.tier === "tier3" ||
        page.slug.includes("hospitals")) &&
      hospitals.length > 0 ? (
        <section className="mt-12">
          <p className="data-label">Partner hospitals</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">
            Hospitals in Hyderabad
          </h2>
          <div className="divider-grid mt-4 sm:grid-cols-2">
            {hospitals.map((h) => (
              <Link
                key={h.slug}
                href={`/hospital-network/${h.slug}`}
                className="divider-grid-item block"
              >
                <p className="font-medium text-navy">{h.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {h.accreditation.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {page.faqs.length > 0 ? (
        <div className="mt-12">
          <FAQAccordion faqs={page.faqs} includeSchema={false} />
        </div>
      ) : null}

      {isHub ? <IndiaHubNav locale={page.locale} /> : null}

      <div className="mt-12">
        <CTASection title={ctaTitle} description={ctaDescription} />
      </div>
    </Container>
  );
}
