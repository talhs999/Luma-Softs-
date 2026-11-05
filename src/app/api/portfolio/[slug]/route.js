import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { ALL_PORTFOLIO } from '../../../../data/portfolio';

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const projects = await query('SELECT * FROM portfolio WHERE slug = ?', [slug]);

    if (Array.isArray(projects) && projects.length > 0) {
      const project = projects[0];
      
      // Parse JSON fields
      if (typeof project.images === 'string') {
        try { project.images = JSON.parse(project.images); } catch (e) {}
      }
      if (typeof project.technologies === 'string') {
        try { project.technologies = JSON.parse(project.technologies); } catch (e) {}
      }

      // Fetch related projects in same category
      const related = await query(
        'SELECT * FROM portfolio WHERE category = ? AND slug != ? LIMIT 2',
        [project.category, slug]
      );

      const parsedRelated = (related || []).map(item => {
        if (typeof item.images === 'string') {
          try { item.images = JSON.parse(item.images); } catch (e) {}
        }
        if (typeof item.technologies === 'string') {
          try { item.technologies = JSON.parse(item.technologies); } catch (e) {}
        }
        return item;
      });

      return NextResponse.json({ project, related: parsedRelated });
    }
  } catch (error) {
    console.warn('Database error or DB offline, falling back to static portfolio data:', error.message);
  }

  // Fallback to ALL_PORTFOLIO
  const staticProject = ALL_PORTFOLIO.find(p => p.slug === slug);
  if (staticProject) {
    const projectFormatted = {
      id: staticProject.slug,
      slug: staticProject.slug,
      title: staticProject.title,
      category: staticProject.category,
      featured_image: staticProject.featuredImage,
      images: staticProject.images || [staticProject.featuredImage],
      client: staticProject.client,
      duration: staticProject.duration,
      technologies: staticProject.technologies,
      description: staticProject.description,
      challenge: staticProject.challenge,
      solution: staticProject.solution,
      results: staticProject.results,
      testimonial: staticProject.testimonial,
      live_url: staticProject.liveUrl,
      show_on_home: staticProject.show_on_home ? 1 : 0
    };

    const relatedStatic = ALL_PORTFOLIO
      .filter(p => p.category === staticProject.category && p.slug !== slug)
      .slice(0, 2)
      .map(p => ({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        category: p.category,
        featured_image: p.featuredImage,
        images: p.images || [p.featuredImage],
        technologies: p.technologies
      }));

    return NextResponse.json({ project: projectFormatted, related: relatedStatic });
  }

  return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
}
