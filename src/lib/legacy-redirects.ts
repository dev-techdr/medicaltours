import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * One-to-one 301 redirects from the legacy static HTML site and early App Router paths.
 * Do not add wildcard catch-alls — map each legacy URL individually.
 */
export const LEGACY_REDIRECTS: Redirect[] = [
  // Legacy static HTML pages
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/about.html", destination: "/about-us", permanent: true },
  { source: "/service.html", destination: "/treatments", permanent: true },
  { source: "/services.html", destination: "/treatments", permanent: true },
  { source: "/contact.html", destination: "/contact-us", permanent: true },
  { source: "/faq.html", destination: "/faq", permanent: true },
  { source: "/team.html", destination: "/our-team", permanent: true },
  { source: "/privacy.html", destination: "/privacy-policy", permanent: true },
  { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
  { source: "/terms.html", destination: "/terms-of-service", permanent: true },
  { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
  { source: "/hospital.html", destination: "/hospitals", permanent: true },
  { source: "/hospitals.html", destination: "/hospitals", permanent: true },
  { source: "/treatment.html", destination: "/treatments", permanent: true },
  { source: "/treatments.html", destination: "/treatments", permanent: true },
  { source: "/blog.html", destination: "/blog", permanent: true },
  { source: "/visa.html", destination: "/medical-visa-assistance", permanent: true },
  { source: "/medical-visa.html", destination: "/medical-visa-assistance", permanent: true },
  { source: "/cost.html", destination: "/cost-calculator", permanent: true },
  { source: "/calculator.html", destination: "/cost-calculator", permanent: true },
  { source: "/testimonials.html", destination: "/reviews", permanent: true },
  { source: "/reviews.html", destination: "/reviews", permanent: true },
  { source: "/how-it-works.html", destination: "/how-it-works", permanent: true },
  { source: "/second-opinion.html", destination: "/free-second-opinion", permanent: true },
  { source: "/free-second-opinion.html", destination: "/free-second-opinion", permanent: true },
  { source: "/quote.html", destination: "/get-free-quote", permanent: true },
  { source: "/get-quote.html", destination: "/get-free-quote", permanent: true },
  { source: "/patient-stories.html", destination: "/patient-stories", permanent: true },
  { source: "/countries.html", destination: "/countries", permanent: true },
  { source: "/doctors.html", destination: "/treatments", permanent: true },
  { source: "/accreditations.html", destination: "/accreditations-certifications", permanent: true },
  { source: "/why-india.html", destination: "/why-india-for-medical-treatment", permanent: true },
  { source: "/travel.html", destination: "/travel-accommodation-assistance", permanent: true },
  { source: "/interpreter.html", destination: "/interpreter-language-support", permanent: true },
  { source: "/insurance.html", destination: "/insurance-tpa-international-patients", permanent: true },
  { source: "/emergency.html", destination: "/emergency-urgent-cases", permanent: true },
  { source: "/send-medical-reports.html", destination: "/free-second-opinion", permanent: true },

  // Early App Router paths (no -us suffix)
  { source: "/about", destination: "/about-us", permanent: true },
  { source: "/services", destination: "/treatments", permanent: true },
  { source: "/service", destination: "/treatments", permanent: true },
  { source: "/contact", destination: "/contact-us", permanent: true },

  // Legacy blog path (spec used /blogs/, current site uses /blog/)
  { source: "/blogs", destination: "/blog", permanent: true },
  { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },

  // Retired dedicated African landing page
  { source: "/african", destination: "/countries", permanent: true },
];
