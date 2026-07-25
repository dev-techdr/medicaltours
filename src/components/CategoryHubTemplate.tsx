import Image from "next/image";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { DepthSections } from "@/components/DepthSections";
import { Reveal } from "@/components/Reveal";
import {
  procedurePath,
  type Category,
  type DepthSection,
  type Procedure,
} from "@/lib/data";

type PathwayGroup = {
  id: string;
  label: string;
  blurb: string;
  slugs: string[];
};

type CategoryHubTemplateProps = {
  category: Category;
  procedures: Procedure[];
  hubSections: DepthSection[];
  minCost: number | null;
  maxCost: number | null;
};

/** Optional pathway groupings for larger specialty hubs. */
const CATEGORY_PATHWAYS: Record<string, PathwayGroup[]> = {
  "andrology-treatments-india": [
    {
      id: "sexual-medicine",
      label: "Sexual medicine",
      blurb: "Erectile dysfunction, implants, Peyronie’s, PE, and hormone pathways.",
      slugs: [
        "male-sexual-health-treatment-india",
        "erectile-dysfunction-treatment-india",
        "penile-implant-surgery-india",
        "peyronies-disease-treatment-india",
        "premature-ejaculation-treatment-india",
        "testosterone-replacement-therapy-india",
      ],
    },
    {
      id: "male-fertility",
      label: "Male fertility & microsurgery",
      blurb: "Azoospermia, micro-TESE, vasectomy reversal, and varicocele repair.",
      slugs: [
        "azoospermia-treatment-india",
        "micro-tese-sperm-retrieval-india",
        "vasectomy-reversal-india",
        "varicocele-surgery-india",
      ],
    },
    {
      id: "daycare-scrotal",
      label: "Day-care scrotal care",
      blurb: "Hydrocele repair and adult circumcision / phimosis treatment.",
      slugs: ["hydrocele-surgery-india", "circumcision-phimosis-treatment-india"],
    },
  ],
  "cancer-treatment-india": [
    {
      id: "systemic-therapy",
      label: "Systemic & radiation therapy",
      blurb: "Chemotherapy, radiation, and immunotherapy pathways.",
      slugs: [
        "chemotherapy-cost-india",
        "radiation-therapy-india",
        "immunotherapy-cost-india",
      ],
    },
    {
      id: "surgical-oncology",
      label: "Surgical & site-specific oncology",
      blurb: "Breast, prostate, oral/throat, and robotic cancer surgery.",
      slugs: [
        "breast-cancer-treatment-india",
        "prostate-cancer-treatment-india",
        "oral-throat-cancer-treatment-india",
        "robotic-cancer-surgery-india",
      ],
    },
  ],
  "cardiac-care-india": [
    {
      id: "coronary-care",
      label: "Coronary & interventional care",
      blurb: "Bypass, angioplasty, and related heart pathways.",
      slugs: [
        "heart-bypass-surgery-cost-india",
        "angioplasty-stent-placement-cost-india",
      ],
    },
    {
      id: "valve-rhythm",
      label: "Valve, rhythm & structural",
      blurb: "Valve surgery, TAVR, pacemakers, and congenital closures.",
      slugs: [
        "heart-valve-replacement-surgery-india",
        "tavr-india",
        "pacemaker-implantation-india",
        "asd-vsd-closure-surgery-india",
      ],
    },
    {
      id: "advanced-cardiac",
      label: "Advanced & pediatric cardiac",
      blurb: "Transplant and pediatric heart surgery pathways.",
      slugs: ["heart-transplant-india", "pediatric-heart-surgery-india"],
    },
  ],
  "orthopaedic-treatments-india": [
    {
      id: "joint-replacement",
      label: "Joint replacement",
      blurb: "Knee, hip, shoulder, and bilateral pathways.",
      slugs: [
        "total-knee-replacement-surgery-india",
        "hip-replacement-surgery-india",
        "shoulder-replacement-surgery-india",
        "bilateral-knee-replacement-india",
      ],
    },
    {
      id: "spine-sports",
      label: "Spine & sports orthopaedics",
      blurb: "Spine, ACL, scoliosis, and sports injury surgery.",
      slugs: [
        "spine-surgery-india",
        "acl-reconstruction-surgery-india",
        "scoliosis-correction-surgery-india",
        "sports-injury-surgery-india",
      ],
    },
  ],
  "fertility-treatments-india": [
    {
      id: "assisted-reproduction",
      label: "Assisted reproduction",
      blurb: "IVF, ICSI, IUI, and related fertility cycles.",
      slugs: [
        "ivf-treatment-cost-india",
        "icsi-treatment-india",
        "iui-treatment-cost-india",
      ],
    },
    {
      id: "preservation-donation",
      label: "Preservation & donation",
      blurb: "Egg freezing, donation, and related options.",
      slugs: ["egg-freezing-india", "egg-donation-freezing-india", "surrogacy-india-for-foreigners"],
    },
    {
      id: "evaluation",
      label: "Evaluation & male factor",
      blurb: "Infertility workups and male infertility pathways.",
      slugs: ["infertility-treatment-india", "male-infertility-treatment-india"],
    },
  ],
};

const CATEGORY_EYEBROW: Record<string, string> = {
  "andrology-treatments-india": "Confidential male health · Medical tourism India",
  "gynecology-womens-health-india": "Women’s health · Medical tourism India",
  "fertility-treatments-india": "Fertility care · Medical tourism India",
  "cancer-treatment-india": "Oncology pathways · Medical tourism India",
  "cardiac-care-india": "Cardiac care · Medical tourism India",
  "orthopaedic-treatments-india": "Orthopaedics · Medical tourism India",
};

function stayLabel(recoveryTime: string): string {
  const match = recoveryTime.match(/plan\s+([^;.]+)/i);
  if (match) return match[1].replace(/\s+in\s+India$/i, "").trim();
  if (/day-care|daycare|outpatient|clinic/i.test(recoveryTime)) return "Day-care / short stay";
  return recoveryTime.length > 42 ? `${recoveryTime.slice(0, 40)}…` : recoveryTime;
}

function typicalStaySummary(procedures: Procedure[]): string {
  const labels = procedures
    .map((p) => stayLabel(p.recoveryTime))
    .filter(Boolean);
  if (!labels.length) return "Varies by pathway";
  const unique = [...new Set(labels)];
  if (unique.length === 1) return unique[0];
  return "Varies by pathway";
}

function ProcedureCard({ procedure, index }: { procedure: Procedure; index: number }) {
  const image = procedure.images?.[0];
  return (
    <li className="overflow-hidden rounded-[var(--radius)] border border-line border-l-4 border-l-accent bg-white shadow-[var(--shadow-soft)]">
      <Reveal delay={(index % 4) * 40}>
        <Link
          href={procedurePath(procedure)}
          className="group grid gap-4 px-4 py-4 transition-colors hover:bg-accent-light/60 sm:grid-cols-[88px_minmax(0,1.3fr)_minmax(0,0.9fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-5"
        >
          <div className="relative hidden h-16 w-[88px] overflow-hidden rounded-[var(--radius-sm)] bg-neutral sm:block">
            {image ? (
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="88px"
              />
            ) : null}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-accent transition-colors group-hover:!text-navy">
              {procedure.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
              {procedure.shortAnswer ?? procedure.overview}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm sm:justify-end">
            {procedure.costIndia ? (
              <p className="rounded-[var(--radius-sm)] bg-accent-light px-3 py-2">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
                  Cost
                </span>
                <span className="font-semibold text-accent">
                  ${procedure.costIndia.min.toLocaleString()}–$
                  {procedure.costIndia.max.toLocaleString()}
                </span>
                <span className="text-muted"> USD</span>
              </p>
            ) : (
              <p className="rounded-[var(--radius-sm)] bg-accent-light px-3 py-2 font-semibold text-accent">
                Confidential care
              </p>
            )}
            <p className="rounded-[var(--radius-sm)] bg-neutral px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
                Est. stay
              </span>
              <span className="font-semibold text-navy">{stayLabel(procedure.recoveryTime)}</span>
            </p>
          </div>
          <span
            aria-hidden
            className="hidden h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent transition-transform group-hover:translate-x-1 sm:inline-flex"
          >
            →
          </span>
        </Link>
      </Reveal>
    </li>
  );
}

export function CategoryHubTemplate({
  category,
  procedures,
  hubSections,
  minCost,
  maxCost,
}: CategoryHubTemplateProps) {
  const pathways = CATEGORY_PATHWAYS[category.slug] ?? [];
  const bySlug = new Map(procedures.map((p) => [p.slug, p]));
  const grouped = pathways
    .map((pathway) => ({
      ...pathway,
      items: pathway.slugs
        .map((slug) => bySlug.get(slug))
        .filter((p): p is Procedure => Boolean(p)),
    }))
    .filter((g) => g.items.length > 0);

  const used = new Set(grouped.flatMap((g) => g.items.map((p) => p.slug)));
  const leftover = procedures.filter((p) => !used.has(p.slug));
  const showGrouped = grouped.length > 0;
  const eyebrow =
    CATEGORY_EYEBROW[category.slug] ?? `${category.name} · Medical tourism India`;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-navy/10 bg-navy-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 80% at 85% 20%, rgba(26,122,114,0.45), transparent 55%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(196,146,58,0.12), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <Container className="relative pb-14 pt-10 sm:pb-16 sm:pt-12">
          <Breadcrumb
            tone="onDark"
            items={[
              { name: "Treatments", href: "/treatments" },
              { name: category.name, href: `/treatments/${category.slug}` },
            ]}
          />

          <Reveal>
            <div className="relative mt-8">
              <div className="absolute inset-0 overflow-hidden lg:hidden" aria-hidden>
                <Image
                  src={category.heroImage}
                  alt=""
                  fill
                  priority
                  className="object-cover object-center opacity-35"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy-deep" />
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light/90">
                    {eyebrow}
                  </p>
                  <h1 className="mt-4 max-w-2xl font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                    {category.h1}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                    {category.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href="/get-free-quote" className="btn btn-light">
                      Get free quote
                    </Link>
                    <Link href="/free-second-opinion" className="btn btn-outline-light">
                      Free second opinion
                    </Link>
                  </div>
                </div>

                <div className="relative hidden min-h-[280px] overflow-hidden lg:block lg:min-h-[320px]">
                  <Image
                    src={category.heroImage}
                    alt={`${category.name} for international patients in India`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="40vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-deep/50"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-28 pt-10 sm:pb-32 sm:pt-12">
        <Reveal>
          <dl className="grid gap-6 border-b border-line pb-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Package range
              </dt>
              <dd className="mt-1 font-display text-2xl text-navy">
                {minCost != null && maxCost != null
                  ? `$${minCost.toLocaleString()}–$${maxCost.toLocaleString()}`
                  : "On clinical review"}
                <span className="ml-1 text-sm font-sans font-normal text-muted">USD</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Typical India stay
              </dt>
              <dd className="mt-1 font-display text-2xl text-navy">
                {typicalStaySummary(procedures)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                Services live
              </dt>
              <dd className="mt-1 font-display text-2xl text-navy">
                {procedures.length} pathway{procedures.length === 1 ? "" : "s"}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal>
          <div className="mt-8">
            <AnswerBlock>
              {category.name} for international patients is available at accredited Indian hospitals
              in Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore
              {minCost != null && maxCost != null
                ? `, with typical package ranges from $${minCost.toLocaleString()}–$${maxCost.toLocaleString()} USD depending on the procedure`
                : ""}
              . TechdrHealth coordinates written estimates, visa support, and travel logistics.
            </AnswerBlock>
          </div>
        </Reveal>

        {showGrouped ? (
          <Reveal>
            <nav
              aria-label={`${category.name} pathways`}
              className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6"
            >
              {grouped.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:border-accent hover:bg-accent-light hover:text-accent"
                >
                  {group.label}
                </a>
              ))}
              {leftover.length > 0 ? (
                <a
                  href="#all-procedures"
                  className="rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:border-accent hover:bg-accent-light hover:text-accent"
                >
                  All procedures
                </a>
              ) : null}
            </nav>
          </Reveal>
        ) : null}

        <div className="mt-12 space-y-14">
          {showGrouped ? (
            <>
              {grouped.map((group, gi) => (
                <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
                  <Reveal delay={gi * 40}>
                    <div className="max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        Pathway {String(gi + 1).padStart(2, "0")}
                      </p>
                      <h2
                        id={`${group.id}-heading`}
                        className="mt-2 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
                      >
                        {group.label}
                      </h2>
                      <p className="mt-2 text-base text-muted">{group.blurb}</p>
                    </div>
                  </Reveal>
                  <ul className="mt-6 grid gap-3">
                    {group.items.map((procedure, i) => (
                      <ProcedureCard key={procedure.slug} procedure={procedure} index={i} />
                    ))}
                  </ul>
                </section>
              ))}

              {leftover.length > 0 ? (
                <section id="all-procedures" aria-labelledby="more-procedures-heading">
                  <h2
                    id="more-procedures-heading"
                    className="font-display text-2xl font-medium tracking-tight text-navy"
                  >
                    More {category.name.toLowerCase()} procedures
                  </h2>
                  <ul className="mt-6 grid gap-3">
                    {leftover.map((procedure, i) => (
                      <ProcedureCard key={procedure.slug} procedure={procedure} index={i} />
                    ))}
                  </ul>
                </section>
              ) : null}
            </>
          ) : procedures.length > 0 ? (
            <section aria-labelledby="procedures-heading">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  Procedures
                </p>
                <h2
                  id="procedures-heading"
                  className="mt-2 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
                >
                  {category.name} procedures in India
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted">
                  Compare costs, estimated stay, and clinical pathways — then request a written
                  package estimate.
                </p>
              </Reveal>
              <ul className="mt-6 grid gap-3">
                {procedures.map((procedure, i) => (
                  <ProcedureCard key={procedure.slug} procedure={procedure} index={i} />
                ))}
              </ul>
            </section>
          ) : (
            <p className="rounded-[var(--radius)] border border-dashed border-line bg-white px-5 py-8 text-muted">
              Procedure pages for this category are being added.{" "}
              <Link href="/contact-us" className="font-semibold text-accent hover:underline">
                Request a quote
              </Link>{" "}
              and we’ll match you with partner hospitals.
            </p>
          )}
        </div>

        {hubSections.length > 0 ? (
          <div className="mt-16 border-t border-line pt-14">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Clinical guide
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
                How {category.name.toLowerCase()} works for international patients
              </h2>
            </Reveal>
            <div className="mt-10">
              <DepthSections sections={hubSections} />
            </div>
          </div>
        ) : null}

        <div className="mt-14">
          <CTASection
            title={`Planning ${category.name.toLowerCase()} in India?`}
            description="Share reports for hospital options, USD package outlines, and a realistic stay plan — usually within 24–48 hours."
          />
        </div>
      </Container>
    </>
  );
}
