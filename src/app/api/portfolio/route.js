import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { ALL_PORTFOLIO } from '../../../data/portfolio';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isHome = searchParams.get('home') === 'true';

  try {
    const portfolio = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    
    if (Array.isArray(portfolio) && portfolio.length > 0) {
      // Parse JSON fields
      const parsed = portfolio.map(item => {
        if (typeof item.images === 'string') {
          try { item.images = JSON.parse(item.images); } catch (e) {}
        }
        if (typeof item.technologies === 'string') {
          try { item.technologies = JSON.parse(item.technologies); } catch (e) {}
        }
        return item;
      });

      if (isHome) {
        const homeItems = parsed.filter(item => item.show_on_home === 1 || item.show_on_home === true || item.show_on_home === "1");
        return NextResponse.json(homeItems.length > 0 ? homeItems : parsed.slice(0, 3));
      }

      return NextResponse.json(parsed);
    }
  } catch (error) {
    console.warn('Database query error or DB offline, using static portfolio fallback:', error.message);
  }

  // Fallback to static data
  const fallback = ALL_PORTFOLIO.map((item, index) => ({
    id: index + 1,
    slug: item.slug,
    title: item.title,
    category: item.category,
    featured_image: item.featuredImage,
    client: item.client,
    duration: item.duration,
    technologies: item.technologies,
    description: item.description,
    challenge: item.challenge,
    solution: item.solution,
    results: item.results,
    testimonial: item.testimonial,
    live_url: item.liveUrl,
    show_on_home: item.show_on_home ? 1 : 0
  }));

  if (isHome) {
    const homeItems = fallback.filter(item => item.show_on_home === 1);
    return NextResponse.json(homeItems.length > 0 ? homeItems : fallback.slice(0, 3));
  }

  return NextResponse.json(fallback);
}
