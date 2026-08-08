import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects";

const nextConfig: NextConfig = {
  experimental: {
    // Inline CSS into HTML to remove the render-blocking stylesheet waterfall (FCP/LCP).
    // Best for first-time visitors + Tailwind-sized CSS; returning visitors lose CSS cache reuse.
    inlineCss: true,
  },
  images: {
    // Next 16 defaults to [75] only — allow lower qualities for LCP/bandwidth
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Avoid a crawlable homepage duplicate (/index was returning 200)
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      ...LEGACY_REDIRECTS,
      // Andrology re-homes (from Urology)
      {
        source: "/treatments/urology-treatments-india/varicocele-surgery-india",
        destination: "/treatments/andrology-treatments-india/varicocele-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/urology-treatments-india/male-sexual-health-treatment-india",
        destination: "/treatments/andrology-treatments-india/male-sexual-health-treatment-india",
        permanent: true,
      },
      // Mapped procedures (flat MDX → nested JSON)
      {
        source: "/treatments/heart-surgery-india",
        destination: "/treatments/cardiac-care-india/heart-bypass-surgery-cost-india",
        permanent: true,
      },
      {
        source: "/treatments/knee-replacement-india",
        destination: "/treatments/orthopaedic-treatments-india/total-knee-replacement-surgery-india",
        permanent: true,
      },
      // Note: /treatments/cancer-treatment-india is the live category hub — do not redirect it.
      {
        source: "/treatments/ivf-treatment-india",
        destination: "/treatments/fertility-treatments-india/ivf-treatment-cost-india",
        permanent: true,
      },
      {
        source: "/treatments/neurosurgery-india",
        destination: "/treatments/neurology-neurosurgery-india/brain-tumor-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/heart-surgery-india",
        destination: "/cost-comparison/heart-bypass-surgery-cost-india",
        permanent: true,
      },
      {
        source: "/cost/knee-replacement-india",
        destination: "/cost-comparison/total-knee-replacement-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/cancer-treatment-india",
        destination: "/cost-comparison/chemotherapy-cost-india",
        permanent: true,
      },
      {
        source: "/cost/ivf-treatment-india",
        destination: "/cost-comparison/ivf-treatment-cost-india",
        permanent: true,
      },
      {
        source: "/cost/neurosurgery-india",
        destination: "/cost-comparison/brain-tumor-surgery-india",
        permanent: true,
      },
      // Former MDX treatment slugs → nested procedure pages
      {
        source: "/treatments/hip-replacement-india",
        destination: "/treatments/orthopaedic-treatments-india/hip-replacement-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/spine-surgery-india",
        destination: "/treatments/orthopaedic-treatments-india/spine-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/bone-marrow-transplant-india",
        destination:
          "/treatments/hematology-bone-marrow-india/bone-marrow-transplant-india",
        permanent: true,
      },
      {
        source:
          "/treatments/cancer-treatment-india/bone-marrow-transplant-india",
        destination:
          "/treatments/hematology-bone-marrow-india/bone-marrow-transplant-india",
        permanent: true,
      },
      {
        source: "/treatments/liver-transplant-india",
        destination: "/treatments/general-advanced-surgeries-india/liver-transplant-india",
        permanent: true,
      },
      {
        source: "/treatments/kidney-transplant-india",
        destination: "/treatments/general-advanced-surgeries-india/kidney-transplant-india",
        permanent: true,
      },
      {
        source: "/treatments/organ-transplant-india",
        destination: "/treatments/general-advanced-surgeries-india",
        permanent: true,
      },
      {
        source: "/treatments/bariatric-surgery-india",
        destination: "/treatments/general-advanced-surgeries-india/bariatric-weight-loss-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/cosmetic-surgery-india",
        destination: "/treatments/cosmetic-plastic-surgery-india",
        permanent: true,
      },
      {
        source: "/treatments/hair-transplant-india",
        destination: "/treatments/cosmetic-plastic-surgery-india/hair-transplant-cost-india",
        permanent: true,
      },
      {
        source: "/treatments/dental-implants-india",
        destination: "/treatments/dental-treatments-india/dental-implants-cost-india",
        permanent: true,
      },
      {
        source: "/treatments/eye-surgery-india",
        destination: "/treatments/eye-care-ophthalmology-india/lasik-eye-surgery-cost-india",
        permanent: true,
      },
      {
        source: "/treatments/cochlear-implant-india",
        destination: "/treatments/ent-treatments-india/cochlear-implant-cost-india",
        permanent: true,
      },
      {
        source: "/cost/cochlear-implant-india",
        destination: "/cost-comparison/cochlear-implant-cost-india",
        permanent: true,
      },
      {
        source: "/cost/hip-replacement-india",
        destination: "/cost-comparison/hip-replacement-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/spine-surgery-india",
        destination: "/cost-comparison/spine-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/bone-marrow-transplant-india",
        destination: "/cost-comparison/bone-marrow-transplant-india",
        permanent: true,
      },
      {
        source: "/cost/liver-transplant-india",
        destination: "/cost-comparison/liver-transplant-india",
        permanent: true,
      },
      {
        source: "/cost/kidney-transplant-india",
        destination: "/cost-comparison/kidney-transplant-india",
        permanent: true,
      },
      {
        source: "/cost/bariatric-surgery-india",
        destination: "/cost-comparison/bariatric-weight-loss-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/dental-implants-india",
        destination: "/cost-comparison/dental-implants-cost-india",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-india",
        destination: "/cost-comparison/hair-transplant-cost-india",
        permanent: true,
      },
      {
        source: "/cost/eye-surgery-india",
        destination: "/cost-comparison/lasik-eye-surgery-cost-india",
        permanent: true,
      },
      {
        source: "/cost/cosmetic-surgery-india",
        destination: "/treatments/cosmetic-plastic-surgery-india",
        permanent: true,
      },
      {
        source: "/cost/organ-transplant-india",
        destination: "/treatments/general-advanced-surgeries-india",
        permanent: true,
      },
      // Doctor pages removed — redirect all doctor URLs to treatments
      {
        source: "/doctors",
        destination: "/treatments",
        permanent: true,
      },
      {
        source: "/doctors/:path*",
        destination: "/treatments",
        permanent: true,
      },
      // Legacy /hospitals/:hospital-slug → hospital-network (city pages keep short slugs)
      {
        source: "/hospitals/apollo-hospitals-hyderabad",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/apollo-hospitals-chennai",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/fortis-hospital-delhi",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/kokilaben-hospital-mumbai",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/manipal-hospital-bangalore",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/max-healthcare-delhi",
        destination: "/hospital-network/max-healthcare-delhi",
        permanent: true,
      },
      {
        source: "/hospitals/medanta-gurugram",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/yashoda-hospitals-hyderabad",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/apollo-hospitals-hyderabad",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/apollo-hospitals-chennai",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/fortis-hospital-delhi",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/kokilaben-hospital-mumbai",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/manipal-hospital-bangalore",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/medanta-gurugram",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospital-network/yashoda-hospitals-hyderabad",
        destination: "/hospital-network",
        permanent: true,
      },
      {
        source: "/hospitals/olive-hospitals",
        destination: "/hospital-network/olive-hospitals",
        permanent: true,
      },
      {
        source: "/hospitals/tx-hospitals",
        destination: "/hospital-network/tx-hospitals",
        permanent: true,
      },
      {
        source: "/hospitals/medicover-hospitals",
        destination: "/hospital-network/medicover-hospitals",
        permanent: true,
      },
      {
        source: "/send-medical-reports",
        destination: "/free-second-opinion",
        permanent: true,
      },
      {
        source: "/patient-journey",
        destination: "/how-it-works",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/reviews",
        permanent: true,
      },
      // Short country aliases → SEO hub pages (all markets)
      {
        source: "/countries/nigeria",
        destination: "/countries/medical-tourism-india-for-nigerians",
        permanent: true,
      },
      {
        source: "/countries/kenya",
        destination: "/countries/medical-tourism-india-for-kenyans",
        permanent: true,
      },
      {
        source: "/countries/tanzania",
        destination: "/countries/medical-tourism-india-for-tanzanians",
        permanent: true,
      },
      {
        source: "/countries/uganda",
        destination: "/countries/medical-tourism-india-for-ugandans",
        permanent: true,
      },
      {
        source: "/countries/zambia",
        destination: "/countries/medical-tourism-india-for-zambians",
        permanent: true,
      },
      {
        source: "/countries/ethiopia",
        destination: "/countries/medical-tourism-india-for-ethiopians",
        permanent: true,
      },
      {
        source: "/countries/ghana",
        destination: "/countries/medical-tourism-india-for-ghanaians",
        permanent: true,
      },
      {
        source: "/countries/south-africa",
        destination: "/countries/medical-tourism-india-for-south-africans",
        permanent: true,
      },
      {
        source: "/countries/rwanda",
        destination: "/countries/medical-tourism-india-for-rwandans",
        permanent: true,
      },
      {
        source: "/countries/malawi",
        destination: "/countries/medical-tourism-india-for-malawians",
        permanent: true,
      },
      {
        source: "/countries/sudan",
        destination: "/countries/medical-tourism-india-for-sudanese-patients",
        permanent: true,
      },
      {
        source: "/countries/somalia",
        destination: "/countries/medical-tourism-india-for-somali-patients",
        permanent: true,
      },
      {
        source: "/countries/zimbabwe",
        destination: "/countries/medical-tourism-india-for-zimbabweans",
        permanent: true,
      },
      {
        source: "/countries/cameroon",
        destination: "/countries/medical-tourism-india-for-cameroonians",
        permanent: true,
      },
      {
        source: "/countries/uae",
        destination: "/countries/medical-tourism-india-for-uae-residents",
        permanent: true,
      },
      {
        source: "/countries/oman",
        destination: "/countries/medical-tourism-india-for-omanis",
        permanent: true,
      },
      {
        source: "/countries/saudi-arabia",
        destination: "/countries/medical-tourism-india-for-saudi-patients",
        permanent: true,
      },
      {
        source: "/countries/qatar",
        destination: "/countries/medical-tourism-india-for-qataris",
        permanent: true,
      },
      {
        source: "/countries/kuwait",
        destination: "/countries/medical-tourism-india-for-kuwaitis",
        permanent: true,
      },
      {
        source: "/countries/bahrain",
        destination: "/countries/medical-tourism-india-for-bahrainis",
        permanent: true,
      },
      {
        source: "/countries/iraq",
        destination: "/countries/medical-tourism-india-for-iraqis",
        permanent: true,
      },
      {
        source: "/countries/yemen",
        destination: "/countries/medical-tourism-india-for-yemeni-patients",
        permanent: true,
      },
      {
        source: "/countries/egypt",
        destination: "/countries/medical-tourism-india-for-egyptians",
        permanent: true,
      },
      {
        source: "/countries/jordan",
        destination: "/countries/medical-tourism-india-for-jordanians",
        permanent: true,
      },
      {
        source: "/countries/iran",
        destination: "/countries/medical-tourism-india-for-iranians",
        permanent: true,
      },
      {
        source: "/countries/afghanistan",
        destination: "/countries/medical-tourism-india-for-afghan-patients",
        permanent: true,
      },
      {
        source: "/countries/bangladesh",
        destination: "/countries/medical-tourism-india-for-bangladeshis",
        permanent: true,
      },
      {
        source: "/countries/nepal",
        destination: "/countries/medical-tourism-india-for-nepalis",
        permanent: true,
      },
      {
        source: "/countries/sri-lanka",
        destination: "/countries/medical-tourism-india-for-sri-lankans",
        permanent: true,
      },
      {
        source: "/countries/maldives",
        destination: "/countries/medical-tourism-india-for-maldivians",
        permanent: true,
      },
      {
        source: "/countries/kazakhstan",
        destination: "/countries/medical-tourism-india-for-kazakhstanis",
        permanent: true,
      },
      {
        source: "/countries/uk",
        destination: "/countries/medical-tourism-india-for-uk-patients",
        permanent: true,
      },
      {
        source: "/countries/usa",
        destination: "/countries/medical-tourism-india-for-usa-patients",
        permanent: true,
      },
      {
        source: "/countries/canada",
        destination: "/countries/medical-tourism-india-for-canadian-patients",
        permanent: true,
      },
      {
        source: "/countries/australia",
        destination: "/countries/medical-tourism-india-for-australian-patients",
        permanent: true,
      },
      {
        source: "/mtp-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/mtp-treatment-india",
        permanent: true,
      },
      // Flat women's-health / fertility SEO aliases → nested treatment URLs
      {
        source: "/gynecology-treatment-india",
        destination: "/treatments/gynecology-womens-health-india",
        permanent: true,
      },
      {
        source: "/hysterectomy-surgery-india",
        destination:
          "/treatments/gynecology-womens-health-india/hysterectomy-cost-india",
        permanent: true,
      },
      {
        source: "/laparoscopic-gynecology-surgery-india",
        destination:
          "/treatments/gynecology-womens-health-india/laparoscopic-gynecology-surgery-india",
        permanent: true,
      },
      {
        source: "/fibroid-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/fibroid-removal-myomectomy-india",
        permanent: true,
      },
      {
        source: "/ovarian-cyst-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/ovarian-cyst-removal-india",
        permanent: true,
      },
      {
        source: "/endometriosis-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/endometriosis-treatment-india",
        permanent: true,
      },
      {
        source: "/ivf-treatment-india",
        destination:
          "/treatments/fertility-treatments-india/ivf-treatment-cost-india",
        permanent: true,
      },
      {
        source: "/iui-treatment-india",
        destination:
          "/treatments/fertility-treatments-india/iui-treatment-cost-india",
        permanent: true,
      },
      {
        source: "/infertility-treatment-india",
        destination:
          "/treatments/fertility-treatments-india/infertility-treatment-india",
        permanent: true,
      },
      {
        source: "/egg-freezing-india",
        destination: "/treatments/fertility-treatments-india/egg-freezing-india",
        permanent: true,
      },
      {
        source: "/cosmetic-gynecology-india",
        destination:
          "/treatments/gynecology-womens-health-india/cosmetic-gynecology-india",
        permanent: true,
      },
      {
        source: "/vaginal-rejuvenation-india",
        destination:
          "/treatments/gynecology-womens-health-india/vaginal-rejuvenation-india",
        permanent: true,
      },
      {
        source: "/pcos-pcod-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/pcos-treatment-india",
        permanent: true,
      },
      {
        source: "/menstrual-disorders-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/menstrual-disorders-treatment-india",
        permanent: true,
      },
      // Confidential clinical: no public cost-comparison pages (fixes GSC 404s)
      {
        source: "/cost-comparison/mtp-treatment-india",
        destination:
          "/treatments/gynecology-womens-health-india/mtp-treatment-india",
        permanent: true,
      },
      {
        source: "/cost-comparison/cosmetic-gynecology-india",
        destination:
          "/treatments/gynecology-womens-health-india/cosmetic-gynecology-india",
        permanent: true,
      },
      {
        source: "/cost-comparison/vaginal-rejuvenation-india",
        destination:
          "/treatments/gynecology-womens-health-india/vaginal-rejuvenation-india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
