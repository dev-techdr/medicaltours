import Image from "next/image";
import Link from "next/link";
import { CostHighlight } from "@/components/CostHighlight";
import { JsonLd } from "@/components/seo/JsonLd";
import { AfricanLeadForm } from "@/components/african/AfricanLeadForm";
import { AfricanMobileStickyBar } from "@/components/african/AfricanMobileStickyBar";
import { AfricanReveal } from "@/components/african/AfricanReveal";
import { AfricanWhatsAppFloat } from "@/components/african/AfricanWhatsAppFloat";
import {
  AFRICA_COMPARISON_ROWS,
  AFRICA_MAP_DOTS,
  AFRICAN_CONTACT,
  AFRICAN_COUNTRY_GROUPS,
  FAQS,
  FLIGHT_PATH_STEPS,
  GLOBAL_COST_ROWS,
  HERO_STATS,
  PROMISES,
  SPECIALTIES,
  TESTIMONIALS,
  TRUST_BAR_ITEMS,
} from "@/lib/african-content";
import { faqSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Medical Tours India",
  url: AFRICAN_CONTACT.siteUrl,
  telephone: AFRICAN_CONTACT.phoneDisplay,
  email: AFRICAN_CONTACT.email,
  areaServed: AFRICAN_COUNTRY_GROUPS.flatMap((group) => group.countries),
  availableLanguage: ["English", "French", "Arabic"],
  description:
    "Medical treatment coordination in India for African patients, including free teleconsultation, visa guidance, travel support and hospital matching.",
};

export function AfricanLandingPage() {
  return (
    <>
      <JsonLd data={[faqSchema(FAQS), medicalBusinessSchema]} />
      <div className="african-landing bg-[#F4F6F5] font-[var(--font-african-body)] text-[#111B1A]">
        <section
          id="hero"
          className="relative overflow-hidden border-b border-[#DDE5E3] bg-[radial-gradient(circle_at_top_left,rgba(200,132,26,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(10,61,53,0.10),transparent_30%),linear-gradient(180deg,#f7f8f6_0%,#f4f6f5_100%)]"
        >
          <div className="mx-auto max-w-[1240px] px-4 pt-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-4 rounded-[18px] border border-[#DDE5E3] bg-white/92 px-4 py-4 shadow-[0_18px_45px_rgba(17,27,26,0.06)] backdrop-blur sm:grid-cols-[1fr_auto_1fr] sm:px-6">
              <div className="flex items-center">
                <Image
                  src={SITE.logo}
                  alt="Medical Tours India"
                  width={200}
                  height={40}
                  className="h-9 w-auto sm:h-10"
                  style={{ width: "auto" }}
                  priority
                />
              </div>
              <a
                href={AFRICAN_CONTACT.phoneHref}
                className="text-center font-[var(--font-african-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-[#0A3D35]"
              >
                Call {AFRICAN_CONTACT.phoneDisplay}
              </a>
              <div className="flex justify-start sm:justify-end">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-[14px] bg-[#D95F3B] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(217,95,59,0.24)] transition hover:bg-[#c85431]"
                >
                  Get free estimate
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-[1240px] gap-12 px-4 pb-18 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-start lg:px-8 lg:pb-24">
            <div className="hero-enter max-w-[680px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e3e1] bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#C8841A]" />
                <span className="text-sm font-medium text-[#0A3D35]">For African Patients</span>
              </div>

              <h1 className="mt-7 font-[var(--font-african-display)] text-[3.2rem] leading-[0.94] tracking-[-0.06em] text-[#0A3D35] sm:text-[4.1rem] lg:text-[4.6rem]">
                India&apos;s best hospitals. <em className="font-semibold italic text-[#C8841A]">Finally affordable</em> for Africa.
              </h1>

              <p className="mt-7 max-w-[620px] text-[1.05rem] leading-8 text-[#4A5E5C] sm:text-[1.08rem]">
                Access specialist-led surgery and advanced treatment in India with full cost clarity, faster doctor
                access, visa guidance and end-to-end travel coordination.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["NABH certified", "Free video consult", "Visa arranged"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#DDE5E3] bg-white px-4 py-2 font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4A5E5C]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lead-form"
                  className="inline-flex min-h-13 items-center justify-center rounded-[14px] bg-[#D95F3B] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(217,95,59,0.28)] transition hover:bg-[#c85431]"
                >
                  Request Free Estimate
                </a>
                <a
                  href={AFRICAN_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center rounded-[14px] border border-[#0A3D35]/14 bg-white px-7 py-4 text-sm font-semibold text-[#0A3D35] transition hover:border-[#0A3D35]/40 hover:bg-[#eef4f2]"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-10 grid gap-4 rounded-[18px] border border-[#DDE5E3] bg-white p-5 shadow-[0_18px_40px_rgba(17,27,26,0.06)] sm:grid-cols-[1.05fr_auto] sm:items-center">
                <div>
                  <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                    Regional reach
                  </p>
                  <p className="mt-2 text-[1.02rem] font-semibold tracking-[-0.02em] text-[#111B1A]">
                    Patients from 40+ African countries trust India for complex treatment.
                  </p>
                </div>
                <div className="text-[1.7rem] tracking-[0.18em] sm:text-right">🇳🇬🇰🇪🇬🇭🇪🇹🇹🇿🇿🇼🇸🇩🇨🇲</div>
              </div>
            </div>

            <div className="hero-enter-delay lg:pt-4">
              <div className="relative overflow-hidden rounded-[20px] border border-[#d7e2df] bg-white shadow-[0_26px_70px_rgba(17,27,26,0.10)]">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#C8841A] via-[#e0ab45] to-[#C8841A]" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-4 border-b border-[#DDE5E3] pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                        Premium care snapshot
                      </p>
                      <h2 className="mt-3 font-[var(--font-african-display)] text-[2.1rem] leading-tight tracking-[-0.04em] text-[#0A3D35]">
                        Faster decisions. Better specialists. Lower bills.
                      </h2>
                    </div>
                    <div className="rounded-full border border-[#F0D298] bg-[#FFF7E8] px-4 py-2 font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#A86C10]">
                      Next specialist slot: Tomorrow
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {HERO_STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[16px] border border-[#E2E9E7] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfa_100%)] p-5"
                      >
                        <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                          {stat.label}
                        </p>
                        <p className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-[#0A3D35]">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[16px] bg-[#0A3D35] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-white/56">
                      What you actually buy
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/82">
                      Not just a cheaper procedure. A medically coordinated journey from first report review to discharge,
                      recovery and safe follow-up after you return home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="african-dark border-b border-[#0f4a40] bg-[#0A3D35]">
          <div className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.22em] text-white/90">
              {TRUST_BAR_ITEMS.map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span>{item}</span>
                  {index < TRUST_BAR_ITEMS.length - 1 ? <span className="hidden h-4 w-px bg-white/20 sm:block" /> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <AfricanReveal>
              <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                Why India for Africans
              </p>
              <h2 className="mt-4 max-w-[560px] font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35] sm:text-5xl">
                Treatment in Nairobi, Lagos or Accra costs nearly as much as London, without London&apos;s{" "}
                <em className="italic text-[#C8841A]">specialists</em>.
              </h2>
              <p className="mt-6 text-[1.02rem] leading-8 text-[#4A5E5C]">
                For many private patients across Africa, the frustration is familiar: specialist access is limited,
                quotes are still extremely high, and complex surgery often means another referral. India solves that gap
                with deeper specialist benches, internationally accredited hospitals and a full treatment journey that
                can be coordinated before you board a flight.
              </p>
              <p className="mt-4 text-[1.02rem] leading-8 text-[#4A5E5C]">
                Instead of paying premium local-private rates for partial access, patients can often reach a higher
                concentration of experienced surgeons in India for materially less.
              </p>
            </AfricanReveal>

            <AfricanReveal delay={100}>
              <div className="overflow-hidden rounded-[18px] border border-[#DDE5E3] bg-white shadow-[0_18px_40px_rgba(17,27,26,0.06)]">
                <table className="min-w-full text-left">
                  <thead className="bg-[#F9FBFA]">
                    <tr className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                      <th className="px-5 py-4">Procedure</th>
                      <th className="px-5 py-4">Africa (private)</th>
                      <th className="bg-[#EDF7F4] px-5 py-4 text-[#0A3D35]">India</th>
                      <th className="px-5 py-4">Saving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AFRICA_COMPARISON_ROWS.map((row) => (
                      <tr key={row[0]} className="border-t border-[#DDE5E3]">
                        <td className="px-5 py-4 text-sm font-semibold text-[#111B1A]">{row[0]}</td>
                        <td className="px-5 py-4 text-sm text-[#4A5E5C]">{row[1]}</td>
                        <td className="bg-[#F6FBF9] px-5 py-4 text-sm font-semibold text-[#0A3D35]">
                          <CostHighlight tone="african">{row[2]}</CostHighlight>
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-[#C8841A]">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AfricanReveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 pb-18 sm:px-6 lg:px-8 lg:pb-24">
          <AfricanReveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                  Specialties
                </p>
                <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35] sm:text-5xl">
                  The departments patients ask for when outcomes <em className="italic text-[#C8841A]">cannot</em> wait.
                </h2>
              </div>
              <p className="max-w-xl text-[1.01rem] leading-8 text-[#4A5E5C]">
                A curated mix of high-demand specialties where price, speed and specialist access usually matter most.
              </p>
            </div>
          </AfricanReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SPECIALTIES.map((specialty, index) => (
              <AfricanReveal
                key={specialty.name}
                delay={index * 40}
                className="flex h-full flex-col rounded-[18px] border border-[#DDE5E3] bg-white p-5 shadow-[0_12px_28px_rgba(17,27,26,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0A3D35]/35 hover:shadow-[0_18px_40px_rgba(17,27,26,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9F4F1] text-[#0A3D35]">
                  <SpecialtyIcon kind={specialty.icon} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[#111B1A]">{specialty.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4A5E5C]">{specialty.blurb}</p>
              </AfricanReveal>
            ))}
          </div>
        </section>

        <section className="african-dark bg-[#0A3D35] py-16 text-white lg:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <AfricanReveal className="max-w-3xl">
              <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-white/72">
                Flight path timeline
              </p>
              <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] sm:text-5xl">
                Your case follows a route map, not a sales funnel. Every stop is{" "}
                <em className="italic text-[#F5C15C]">clear</em>.
              </h2>
            </AfricanReveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
              <div className="hidden lg:flex lg:justify-center">
                <svg width="120" height="760" viewBox="0 0 120 760" className="overflow-visible">
                  <path
                    d="M60 30 C80 110, 35 160, 58 240 S88 375, 58 470 S30 620, 60 720"
                    fill="none"
                    stroke="#C8841A"
                    strokeDasharray="7 9"
                    strokeWidth="2.5"
                  />
                  {FLIGHT_PATH_STEPS.map((step, index) => (
                    <g key={step.step} transform={`translate(60 ${80 + index * 124})`}>
                      <circle r="22" fill="#C8841A" />
                      <circle r="9" fill="#0A3D35" stroke="#F7D28A" strokeWidth="2" />
                    </g>
                  ))}
                </svg>
              </div>

              <div className="grid gap-5">
                {FLIGHT_PATH_STEPS.map((step, index) => (
                  <AfricanReveal
                    key={step.step}
                    delay={index * 60}
                    className="rounded-[18px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C8841A] font-[var(--font-african-mono)] text-sm font-semibold tracking-[0.08em] text-[#111B1A]">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/84">{step.body}</p>
                        </div>
                      </div>
                      <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#FFE2A3]">
                        {step.time}
                      </div>
                    </div>
                  </AfricanReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
          <AfricanReveal>
            <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
              Cost comparison
            </p>
            <h2 className="mt-4 max-w-3xl font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35] sm:text-5xl">
              A premium procedure should not require a premium-country bill. India stays the <em className="italic text-[#C8841A]">smartest</em> column.
            </h2>
          </AfricanReveal>

          <AfricanReveal delay={80} className="mt-8 max-w-full overflow-hidden rounded-[18px] border border-[#DDE5E3] bg-white shadow-[0_20px_50px_rgba(17,27,26,0.06)]">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-[#F9FBFA]">
                  <tr className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                    <th className="px-5 py-4">Procedure</th>
                    <th className="bg-[#E8F5F1] px-5 py-4 text-[#0A3D35]">India 🇮🇳</th>
                    <th className="px-5 py-4">USA 🇺🇸</th>
                    <th className="px-5 py-4">UK 🇬🇧</th>
                    <th className="px-5 py-4">Africa (pvt) 🌍</th>
                    <th className="px-5 py-4">You save</th>
                  </tr>
                </thead>
                <tbody>
                  {GLOBAL_COST_ROWS.map((row) => (
                    <tr key={row[0]} className="border-t border-[#DDE5E3]">
                      <td className="px-5 py-4 text-sm font-semibold text-[#111B1A]">{row[0]}</td>
                      <td className="bg-[#F2FBF8] px-5 py-4 text-sm font-semibold text-[#0A3D35]">
                        <CostHighlight tone="african">{row[1]}</CostHighlight>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#4A5E5C]">{row[2]}</td>
                      <td className="px-5 py-4 text-sm text-[#4A5E5C]">{row[3]}</td>
                      <td className="px-5 py-4 text-sm text-[#4A5E5C]">{row[4]}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#C8841A]">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AfricanReveal>

          <p className="mt-4 text-sm leading-7 text-[#728280]">
            Cost ranges are indicative and vary by hospital, surgeon, implants, patient condition and length of stay.
          </p>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 pb-18 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <AfricanReveal className="rounded-[18px] border border-[#DDE5E3] bg-white p-6 shadow-[0_18px_40px_rgba(17,27,26,0.05)] sm:p-8">
              <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                Countries we serve
              </p>
              <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35]">
                Support across the continent, with active enquiries from both major hubs and <em className="italic text-[#C8841A]">underserved</em> cities.
              </h2>
              <div className="mt-8 rounded-[16px] border border-[#DDE5E3] bg-[#F9FBFA] p-4">
                <svg viewBox="0 0 320 360" className="w-full" aria-label="Map of Africa with highlighted countries">
                  <path
                    d="M176 32 213 47 234 77 252 90 261 124 281 156 272 177 277 206 265 237 247 247 233 274 219 279 209 299 182 318 158 339 129 345 111 316 80 294 58 258 39 237 34 197 45 172 61 146 83 135 96 106 126 83 144 53Z"
                    fill="#E8F5F1"
                    stroke="#0A3D35"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {AFRICA_MAP_DOTS.map((dot) => (
                    <g key={dot.name}>
                      <circle cx={dot.cx} cy={dot.cy} r="7" fill="#C8841A" />
                      <circle cx={dot.cx} cy={dot.cy} r="15" fill="none" stroke="#C8841A" strokeOpacity="0.25" />
                    </g>
                  ))}
                </svg>
              </div>
            </AfricanReveal>

            <div className="grid gap-4">
              {AFRICAN_COUNTRY_GROUPS.map((group, index) => (
                <AfricanReveal
                  key={group.region}
                  delay={index * 70}
                  className="rounded-[18px] border border-[#DDE5E3] bg-white p-5 shadow-[0_12px_30px_rgba(17,27,26,0.04)]"
                >
                  <h3 className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
                    {group.region}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.countries.map((country) => (
                      <span
                        key={country}
                        className="rounded-full border border-[#DDE5E3] bg-[#F9FBFA] px-3 py-2 text-sm text-[#111B1A]"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </AfricanReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="african-dark bg-[#0A3D35] py-16 text-white lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <AfricanReveal className="max-w-xl">
              <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-white/72">
                Free case review
              </p>
              <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] sm:text-5xl">
                Tell us what you need. <em className="italic text-[#F5C15C]">We handle the rest.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-8 text-white/88">
                Serious patients convert when the form feels safe, concise and medically credible. We reply with a real
                pathway, not a generic brochure.
              </p>
              <div className="mt-8 space-y-3">
                {PROMISES.map((promise) => (
                  <div key={promise} className="flex items-center gap-3 text-sm text-white/92">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/12 text-[#F5C15C]">✓</span>
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 text-sm text-white/92">
                <a href={AFRICAN_CONTACT.phoneHref} className="block transition hover:text-[#FFE2A3]">
                  Phone / WhatsApp: {AFRICAN_CONTACT.phoneDisplay}
                </a>
                <a
                  href={AFRICAN_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-[#FFE2A3]"
                >
                  WhatsApp chat: +91 95422 18454
                </a>
                <a href={`mailto:${AFRICAN_CONTACT.email}`} className="block transition hover:text-[#FFE2A3]">
                  Email: {AFRICAN_CONTACT.email}
                </a>
              </div>
            </AfricanReveal>

            <AfricanReveal delay={100}>
              <AfricanLeadForm />
            </AfricanReveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
          <AfricanReveal className="max-w-2xl">
            <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
              Testimonials
            </p>
            <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35] sm:text-5xl">
              Replace generic claims with proof patients can <em className="italic text-[#C8841A]">recognize</em>.
            </h2>
          </AfricanReveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((item, index) => (
              <AfricanReveal
                key={`${item.country}-${item.treatment}`}
                delay={index * 60}
                className="rounded-[18px] border border-[#DDE5E3] bg-white p-6 shadow-[0_14px_36px_rgba(17,27,26,0.05)]"
              >
                <div className="text-4xl leading-none text-[#C8841A]">“</div>
                <p className="mt-4 text-sm leading-8 text-[#4A5E5C]">{item.text}</p>
                <div className="mt-6 border-t border-[#DDE5E3] pt-4">
                  <p className="font-semibold text-[#111B1A]">{item.name}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#4A5E5C]">
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                  </div>
                  <span className="mt-3 inline-flex rounded-full bg-[#F9FBFA] px-3 py-1 text-xs font-medium text-[#0A3D35]">
                    {item.treatment}
                  </span>
                </div>
              </AfricanReveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[980px] px-4 pb-18 sm:px-6 lg:px-8 lg:pb-24">
          <AfricanReveal className="text-center">
            <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
              FAQ
            </p>
            <h2 className="mt-4 font-[var(--font-african-display)] text-4xl tracking-[-0.05em] text-[#0A3D35] sm:text-5xl">
              Answers to the questions families ask before they commit to <em className="italic text-[#C8841A]">travel</em>.
            </h2>
          </AfricanReveal>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, index) => (
              <AfricanReveal key={faq.question} delay={index * 40}>
                <details className="group rounded-[18px] border border-[#DDE5E3] bg-white p-5 shadow-[0_12px_28px_rgba(17,27,26,0.04)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold tracking-[-0.02em] text-[#111B1A]">
                    {faq.question}
                    <span className="text-[#C8841A] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-8 text-[#4A5E5C]">{faq.answer}</p>
                </details>
              </AfricanReveal>
            ))}
          </div>
        </section>

        <section className="african-dark bg-[#0A3D35] py-16 text-white">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <AfricanReveal className="max-w-2xl">
              <h2 className="font-[var(--font-african-display)] text-4xl tracking-[-0.05em] sm:text-5xl">
                Serious treatment abroad starts with one clear step. <em className="italic text-[#F5C15C]">Take it now.</em>
              </h2>
            </AfricanReveal>
            <AfricanReveal delay={80} className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-[14px] bg-[#D95F3B] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(217,95,59,0.24)] transition hover:bg-[#c85431]"
              >
                Request Free Estimate
              </a>
              <a
                href={AFRICAN_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[14px] border border-white/15 bg-white/8 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Chat on WhatsApp
              </a>
            </AfricanReveal>
          </div>
        </section>

        <footer className="border-t border-[#DDE5E3] bg-[#f1f4f3]">
          <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <Image
                  src={SITE.logo}
                  alt="Medical Tours India"
                  width={200}
                  height={40}
                  className="h-9 w-auto"
                  style={{ width: "auto" }}
                />
                <p className="mt-2 text-sm text-[#4A5E5C]">India treatment coordination for African patients</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#4A5E5C]">
                <Link href="/privacy-policy" className="hover:text-[#0A3D35]">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="hover:text-[#0A3D35]">
                  Terms
                </Link>
                <a
                  href={AFRICAN_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A3D35]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <p className="mt-5 max-w-4xl text-xs leading-7 text-[#728280]">
              Medical disclaimer: treatment costs, procedures and timelines vary by diagnosis, doctor, implant choice,
              investigation results and hospital protocol. This page is for coordination and information only and does
              not replace a doctor&apos;s medical advice.
            </p>
          </div>
        </footer>
      </div>

      <AfricanWhatsAppFloat />
      <AfricanMobileStickyBar targetId="hero" />
    </>
  );
}

function SpecialtyIcon({ kind }: { kind: string }) {
  const base = "h-5 w-5";

  switch (kind) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
        </svg>
      );
    case "joint":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M8 4v5m0 6v5m8-16v5m0 6v5M6 9h4v6H6m8-6h4v6h-4" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M12 3 5 6v6c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
        </svg>
      );
    case "brain":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3m6-14a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-3 3M9 7h6M9 17h6m-3-10v10" />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M12 3s5 5.4 5 9a5 5 0 1 1-10 0c0-3.6 5-9 5-9Z" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
        </svg>
      );
    case "tooth":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M7.3 4.5C8.6 4 10 4 12 5c2-1 3.4-1 4.7-.5 1.7.7 2.5 2.3 2.3 4.7-.3 3.6-2 10.8-4.2 10.8-1 0-1.3-1.3-1.6-2.7-.3-1.6-.6-3.2-1.2-3.2s-.9 1.6-1.2 3.2c-.3 1.4-.6 2.7-1.6 2.7-2.2 0-3.9-7.2-4.2-10.8-.2-2.4.6-4 2.3-4.7Z" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case "pulse":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M2 12h5l2-4 4 8 2-4h7" />
        </svg>
      );
    case "face":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M12 21a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm-3-7c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2M9 10h.01M15 10h.01" />
        </svg>
      );
    case "path":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M5 19c4-8 10-8 14-14M6 8h5M13 15h5" />
        </svg>
      );
    case "spine":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden>
          <path d="M12 3v18M9.5 5h5M8.5 9h7M9 13h6m-5.5 4h5" />
        </svg>
      );
    default:
      return null;
  }
}
