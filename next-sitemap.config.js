const siteUrl = process.env.SITE_URL || "https://medicaltoursindia.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  transform: async (config, path) => {
    const highPriority = ["/", "/treatments", "/hospital-network", "/cost-calculator", "/contact-us"];
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: highPriority.includes(path) ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `${siteUrl}${path}`, hreflang: "en" },
        { href: `${siteUrl}/ar${path === "/" ? "" : path}`, hreflang: "ar" },
        { href: `${siteUrl}/fr${path === "/" ? "" : path}`, hreflang: "fr" },
        { href: `${siteUrl}/bn${path === "/" ? "" : path}`, hreflang: "bn" },
        { href: `${siteUrl}/sw${path === "/" ? "" : path}`, hreflang: "sw" },
      ],
    };
  },
};
