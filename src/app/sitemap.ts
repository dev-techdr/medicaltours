import type { MetadataRoute } from "next";
import { getAllPosts } from "@/data/blog";
import { getAllCities } from "@/data/cities";
import { getAllCountries as getMdxCountries } from "@/data/countries";
import { getAllIndiaDomesticRoutes } from "@/data/indiaDomestic";
import {
  getAllCategories,
  getAllCityHubs,
  getAllHospitals,
  getAllProcedures,
  getStoryCountries,
  getStoryProcedures,
  procedurePath,
} from "@/lib/data";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const procedures = getAllProcedures();
  const categories = getAllCategories();
  const hospitals = getAllHospitals();
  const cities = getAllCityHubs();
  const blogPosts = getAllPosts();
  const mdxCities = getAllCities();
  const mdxCountries = getMdxCountries();

  const storyCountries = getStoryCountries();
  const storyTreatments = getStoryProcedures();

  const staticRoutes = [
    "",
    "/about-us",
    "/why-india-for-medical-treatment",
    "/contact-us",
    "/free-second-opinion",
    "/get-free-quote",
    "/how-it-works",
    "/emergency-urgent-cases",
    "/insurance-tpa-international-patients",
    "/accreditations-certifications",
    "/our-team",
    "/reviews",
    "/hospital-network",
    "/hospital-empanelment",
    "/hospitals",
    "/treatments",
    "/countries",
    "/cost-calculator",
    "/patient-stories",
    "/blog",
    "/medical-visa-assistance",
    "/travel-accommodation-assistance",
    "/interpreter-language-support",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE.url}/treatments/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const procedureRoutes = procedures.flatMap((p) => [
    {
      url: `${SITE.url}${procedurePath(p)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE.url}/cost-comparison/${p.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ]);

  const hospitalCityRoutes = cities.map((c) => ({
    url: `${SITE.url}/hospitals/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const hospitalNetworkRoutes = hospitals.map((h) => ({
    url: `${SITE.url}/hospital-network/${h.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const storyRoutes = storyCountries.map((c) => ({
    url: `${SITE.url}/patient-stories/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const storyTreatmentRoutes = storyTreatments.map((p) => ({
    url: `${SITE.url}/patient-stories/treatment/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const cityGuideRoutes = mdxCities.map((c) => ({
    url: `${SITE.url}/cities/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const countryRoutes = mdxCountries.map((c) => ({
    url: `${SITE.url}/countries/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const indiaDomesticRoutes = getAllIndiaDomesticRoutes("en").map((slug) => ({
    url: `${SITE.url}/india/hyderabad${slug ? `/${slug}` : ""}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: slug === "" ? 0.95 : 0.85,
  }));

  const teluguDomesticRoutes = getAllIndiaDomesticRoutes("te").map((slug) => ({
    url: `${SITE.url}/te/hyderabad${slug ? `/${slug}` : ""}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...procedureRoutes,
    ...hospitalCityRoutes,
    ...hospitalNetworkRoutes,
    ...storyRoutes,
    ...storyTreatmentRoutes,
    ...cityGuideRoutes,
    ...countryRoutes,
    ...blogRoutes,
    ...indiaDomesticRoutes,
    ...teluguDomesticRoutes,
  ];
}
