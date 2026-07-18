import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
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
      {
        source: "/treatments/cancer-treatment-india",
        destination: "/treatments/cancer-treatment-india/chemotherapy-cost-india",
        permanent: true,
      },
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
      // Doctor profiles → specialty hubs
      {
        source: "/doctors/dr-rajesh-kumar-cardiologist",
        destination: "/doctors/cardiology",
        permanent: true,
      },
      {
        source: "/doctors/dr-vikram-singh-orthopedic",
        destination: "/doctors/orthopedics",
        permanent: true,
      },
      {
        source: "/doctors/dr-anita-sharma-oncologist",
        destination: "/doctors/oncology",
        permanent: true,
      },
      {
        source: "/doctors/dr-priya-reddy-fertility",
        destination: "/doctors/fertility",
        permanent: true,
      },
      {
        source: "/doctors/dr-meera-nair-neurosurgeon",
        destination: "/doctors/neurosurgery",
        permanent: true,
      },
      {
        source: "/doctors/dr-arjun-patel-transplant",
        destination: "/doctors/transplant",
        permanent: true,
      },
      // Legacy /hospitals/:hospital-slug → hospital-network (city pages keep short slugs)
      {
        source: "/hospitals/apollo-hospitals-hyderabad",
        destination: "/hospital-network/apollo-hospitals-hyderabad",
        permanent: true,
      },
      {
        source: "/hospitals/apollo-hospitals-chennai",
        destination: "/hospital-network/apollo-hospitals-chennai",
        permanent: true,
      },
      {
        source: "/hospitals/fortis-hospital-delhi",
        destination: "/hospital-network/fortis-hospital-delhi",
        permanent: true,
      },
      {
        source: "/hospitals/kokilaben-hospital-mumbai",
        destination: "/hospital-network/kokilaben-hospital-mumbai",
        permanent: true,
      },
      {
        source: "/hospitals/manipal-hospital-bangalore",
        destination: "/hospital-network/manipal-hospital-bangalore",
        permanent: true,
      },
      {
        source: "/hospitals/max-healthcare-delhi",
        destination: "/hospital-network/max-healthcare-delhi",
        permanent: true,
      },
      {
        source: "/hospitals/medanta-gurugram",
        destination: "/hospital-network/medanta-gurugram",
        permanent: true,
      },
      {
        source: "/hospitals/yashoda-hospitals-hyderabad",
        destination: "/hospital-network/yashoda-hospitals-hyderabad",
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
    ];
  },
};

export default nextConfig;
