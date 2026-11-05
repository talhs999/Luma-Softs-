import { ALL_SERVICES } from '../data/services';
import { ALL_PORTFOLIO } from '../data/portfolio';
import { STATIC_BLOGS } from '../data/blogs';
import { query } from '../lib/db';

export default async function sitemap() {
  const baseUrl = 'https://lumasofts.com';

  const blogSlugs = new Set(STATIC_BLOGS.map(b => b.slug));
  try {
    const dbBlogs = await query('SELECT slug FROM blogs ORDER BY created_at DESC');
    if (Array.isArray(dbBlogs)) {
      dbBlogs.forEach(b => {
        if (b && b.slug) blogSlugs.add(b.slug);
      });
    }
  } catch (error) {
    console.warn("Failed to fetch blogs from DB for sitemap, using static list:", error.message);
  }

  // Static routes
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'daily' },
    { path: '/services', priority: 0.9, freq: 'weekly' },
    { path: '/portfolio', priority: 0.9, freq: 'weekly' },
    { path: '/blogs', priority: 0.9, freq: 'daily' },
    { path: '/contact', priority: 0.9, freq: 'monthly' },
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/faq', priority: 0.8, freq: 'monthly' },
    { path: '/privacy', priority: 0.5, freq: 'yearly' },
    { path: '/terms', priority: 0.5, freq: 'yearly' },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  // Dynamic Service routes
  const serviceRoutes = ALL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Blog routes (includes 2 new SEO blogs)
  const blogRoutes = Array.from(blogSlugs).map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Portfolio routes (includes Papa Bistro Salzburg)
  const portfolioRoutes = ALL_PORTFOLIO.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...portfolioRoutes];
}
