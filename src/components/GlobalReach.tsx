import Image from "next/image";
import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { MEDIA } from "@/lib/media";

type FlagCountry = {
  code: string;
  name: string;
  href?: string;
};

/** Visual set for the globe mosaic — mixes dedicated country pages with other source markets. */
const FLAG_COUNTRIES: FlagCountry[] = [
  { code: "ng", name: "Nigeria", href: "/countries/medical-tourism-india-for-nigerians" },
  { code: "ke", name: "Kenya", href: "/countries/medical-tourism-india-for-kenyans" },
  { code: "tz", name: "Tanzania", href: "/countries/medical-tourism-india-for-tanzanians" },
  { code: "ug", name: "Uganda", href: "/countries/medical-tourism-india-for-ugandans" },
  { code: "zm", name: "Zambia", href: "/countries/medical-tourism-india-for-zambians" },
  { code: "et", name: "Ethiopia", href: "/countries/medical-tourism-india-for-ethiopians" },
  { code: "ae", name: "UAE", href: "/countries/medical-tourism-india-for-uae-residents" },
  { code: "om", name: "Oman", href: "/countries/medical-tourism-india-for-omanis" },
  { code: "iq", name: "Iraq", href: "/countries/medical-tourism-india-for-iraqis" },
  { code: "ye", name: "Yemen", href: "/countries/medical-tourism-india-for-yemeni-patients" },
  { code: "af", name: "Afghanistan", href: "/countries/medical-tourism-india-for-afghan-patients" },
  { code: "bd", name: "Bangladesh", href: "/countries/medical-tourism-india-for-bangladeshis" },
  { code: "np", name: "Nepal", href: "/countries/medical-tourism-india-for-nepalis" },
  { code: "lk", name: "Sri Lanka", href: "/countries/medical-tourism-india-for-sri-lankans" },
  { code: "ir", name: "Iran", href: "/countries/medical-tourism-india-for-iranians" },
  { code: "gb", name: "United Kingdom", href: "/countries/medical-tourism-india-for-uk-patients" },
  { code: "us", name: "United States", href: "/countries/medical-tourism-india-for-usa-patients" },
  { code: "ca", name: "Canada", href: "/countries/medical-tourism-india-for-canadian-patients" },
  { code: "au", name: "Australia", href: "/countries/medical-tourism-india-for-australian-patients" },
  { code: "gh", name: "Ghana", href: "/countries/medical-tourism-india-for-ghanaians" },
  { code: "za", name: "South Africa", href: "/countries/medical-tourism-india-for-south-africans" },
  { code: "rw", name: "Rwanda", href: "/countries/medical-tourism-india-for-rwandans" },
  { code: "sa", name: "Saudi Arabia", href: "/countries/medical-tourism-india-for-saudi-patients" },
  { code: "qa", name: "Qatar", href: "/countries/medical-tourism-india-for-qataris" },
  { code: "kw", name: "Kuwait", href: "/countries/medical-tourism-india-for-kuwaitis" },
  { code: "bh", name: "Bahrain", href: "/countries/medical-tourism-india-for-bahrainis" },
  { code: "eg", name: "Egypt", href: "/countries/medical-tourism-india-for-egyptians" },
  { code: "sd", name: "Sudan", href: "/countries/medical-tourism-india-for-sudanese-patients" },
  { code: "mw", name: "Malawi", href: "/countries/medical-tourism-india-for-malawians" },
  { code: "so", name: "Somalia", href: "/countries/medical-tourism-india-for-somali-patients" },
  { code: "zw", name: "Zimbabwe", href: "/countries/medical-tourism-india-for-zimbabweans" },
  { code: "cm", name: "Cameroon", href: "/countries/medical-tourism-india-for-cameroonians" },
  { code: "jo", name: "Jordan", href: "/countries/medical-tourism-india-for-jordanians" },
  { code: "kz", name: "Kazakhstan", href: "/countries/medical-tourism-india-for-kazakhstanis" },
  { code: "mv", name: "Maldives", href: "/countries/medical-tourism-india-for-maldivians" },
];

const STATS = [
  { value: "70+", label: "Countries" },
  { value: "750+", label: "Beds" },
  { value: "14", label: "Centres of Excellence" },
  { value: "40+", label: "Medical Specialties" },
  { value: "400+", label: "Doctors" },
] as const;

function FlagTile({ country, delay }: { country: FlagCountry; delay: number }) {
  const flag = (
    <Image
      src={`https://flagcdn.com/w80/${country.code}.png`}
      width={40}
      height={30}
      alt=""
      unoptimized
      className="h-7 w-auto rounded-sm object-cover shadow-sm sm:h-8"
    />
  );

  const className =
    "group flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] border border-line/80 bg-white/90 px-2.5 py-2.5 text-center shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-hero)]";

  const inner = (
    <>
      {flag}
      <span className="max-w-[4.5rem] truncate text-[0.65rem] font-medium leading-tight text-muted group-hover:text-navy sm:text-[0.7rem]">
        {country.name}
      </span>
    </>
  );

  if (country.href) {
    return (
      <Reveal delay={delay} className="min-w-0">
        <Link href={country.href} className={className} title={`${country.name} patients`}>
          {inner}
        </Link>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay} className="min-w-0">
      <div className={className} title={country.name}>
        {inner}
      </div>
    </Reveal>
  );
}

export function GlobalReach() {
  return (
    <section className="global-reach relative overflow-hidden rounded-[var(--radius)] border border-line bg-navy text-white shadow-[var(--shadow-hero)]">
      {/* Photo background — soft so copy and flags stay readable */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <MediaImage
          src={MEDIA.globalReach}
          alt=""
          fillParent
          zoomOnHover={false}
          overlay="none"
          sizes="100vw"
          className="!rounded-none opacity-50 [&_.media-img]:object-[center_25%] sm:[&_.media-img]:object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,36,56,0.92) 0%, rgba(14,36,56,0.82) 38%, rgba(20,51,82,0.62) 68%, rgba(20,51,82,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light/90">
              International patients
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Spreading Smiles
              <br />
              Across The Globe
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              We understand the challenges of seeking treatment abroad. Our customized services
              ensure a seamless experience for international patients.
            </p>
            <Link href="/countries" className="btn btn-light mt-8 w-fit">
              Read More
            </Link>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Across our partner network
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[var(--radius-sm)] border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm"
                >
                  <p className="font-display text-2xl font-medium tracking-tight text-white sm:text-[1.65rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-white/60 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Where families travel from
                </p>
                <p className="mt-1 font-display text-xl font-medium text-white">70+ countries</p>
              </div>
              <Link
                href="/countries"
                className="shrink-0 text-sm font-semibold text-accent-light hover:text-white"
              >
                All countries →
              </Link>
            </div>
          </Reveal>

          <div className="global-reach-flags mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
            {FLAG_COUNTRIES.map((country, index) => (
              <FlagTile key={country.code} country={country} delay={Math.min(index * 25, 280)} />
            ))}
          </div>

          <Reveal delay={200} className="mt-5">
            <p className="text-sm leading-relaxed text-white/55">
              Dedicated country guidance for Africa, the Gulf, South Asia, the UK, and the US — with
              visa, travel, and bedside support in India.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
