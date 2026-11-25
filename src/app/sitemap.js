import { ALL_SERVICES } from "../data/services";
import { ALL_PORTFOLIO } from "../data/portfolio";
import { STATIC_BLOGS } from "../data/blogs";
import { query } from "../lib/db";

export default async function sitemap() {
  const baseUrl = "https://lumasofts.com";

  const blogSlugs = new Set(STATIC_BLOGS.map((b) => b.slug));
  const portfolioSlugs = new Set(ALL_PORTFOLIO.map((p) => p.slug));

  try {
    const dbBlogs = await query("SELECT slug FROM blogs ORDER BY created_at DESC");
    if (Array.isArray(dbBlogs)) {
      dbBlogs.forEach((b) => {
        if (b && b.slug) blogSlugs.add(b.slug.trim());
      });
    }
  } catch (error) {
    console.warn("Sitemap blogs DB fallback:", error.message);
  }

  try {
    const dbPortfolio = await query("SELECT slug FROM portfolio ORDER BY created_at DESC");
    if (Array.isArray(dbPortfolio)) {
      dbPortfolio.forEach((p) => {
        if (p && p.slug) portfolioSlugs.add(p.slug.trim());
      });
    }
  } catch (error) {
    console.warn("Sitemap portfolio DB fallback:", error.message);
  }

  const staticRoutes = [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/services", priority: 0.95, freq: "weekly" },
    { path: "/portfolio", priority: 0.95, freq: "weekly" },
    { path: "/estimator", priority: 0.9, freq: "weekly" },
    { path: "/blogs", priority: 0.9, freq: "daily" },
    { path: "/contact", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/faq", priority: 0.8, freq: "monthly" },
    { path: "/llms.txt", priority: 0.7, freq: "weekly" },
    { path: "/privacy", priority: 0.4, freq: "yearly" },
    { path: "/terms", priority: 0.4, freq: "yearly" },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const serviceRoutes = ALL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${encodeURIComponent(service.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes = Array.from(blogSlugs).map((slug) => ({
    url: `${baseUrl}/blogs/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const portfolioRoutes = Array.from(portfolioSlugs).map((slug) => ({
    url: `${baseUrl}/portfolio/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...portfolioRoutes];
}
