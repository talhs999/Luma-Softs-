import { ALL_SERVICES } from '../data/services';
import { ALL_BLOGS } from '../data/blogs';
import { ALL_PORTFOLIO } from '../data/portfolio';

export default function sitemap() {
  const baseUrl = 'https://lumasofts.com';

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
  const blogRoutes = ALL_BLOGS.map((blog) => ({
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
