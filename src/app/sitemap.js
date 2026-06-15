import { ALL_SERVICES } from '../data/services';
import { ALL_PORTFOLIO } from '../data/portfolio';
import { query } from '../lib/db';

export default async function sitemap() {
  const baseUrl = 'https://lumasofts.com';

  let blogs = [];
  try {
    blogs = await query({
      query: 'SELECT slug FROM blogs ORDER BY created_at DESC',
      values: [],
    });
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blogs',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = ALL_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Blog routes
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Portfolio routes
  const portfolioRoutes = ALL_PORTFOLIO.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...portfolioRoutes];
}
