import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const projects = await query('SELECT * FROM portfolio WHERE slug = ?', [slug]);

    if (projects.length === 0) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const project = projects[0];
    
    // Parse JSON fields
    if (typeof project.images === 'string') {
      project.images = JSON.parse(project.images);
    }
    if (typeof project.technologies === 'string') {
      project.technologies = JSON.parse(project.technologies);
    }

    // Fetch related projects in same category
    const related = await query(
      'SELECT * FROM portfolio WHERE category = ? AND slug != ? LIMIT 2',
      [project.category, slug]
    );

    const parsedRelated = related.map(item => {
      if (typeof item.images === 'string') {
        item.images = JSON.parse(item.images);
      }
      if (typeof item.technologies === 'string') {
        item.technologies = JSON.parse(item.technologies);
      }
      return item;
    });

    return NextResponse.json({ project, related: parsedRelated });
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return NextResponse.json({ error: 'Failed to fetch project detail.' }, { status: 500 });
  }
}
