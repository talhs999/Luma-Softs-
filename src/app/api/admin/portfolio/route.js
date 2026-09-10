import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { ALL_PORTFOLIO } from '../../../../data/portfolio';

async function ensureShowOnHomeColumn() {
  try {
    await query("ALTER TABLE portfolio ADD COLUMN show_on_home TINYINT(1) DEFAULT 0");
  } catch (e) {
    // Column already exists or error ignored
  }
}

export async function GET() {
  try {
    await ensureShowOnHomeColumn();
    const projects = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    if (Array.isArray(projects) && projects.length > 0) {
      const parsed = projects.map(item => {
        if (typeof item.technologies === 'string') {
          try { item.technologies = JSON.parse(item.technologies); } catch (e) {}
        }
        item.show_on_home = item.show_on_home === 1 || item.show_on_home === true || item.show_on_home === "1";
        return item;
      });
      return NextResponse.json(parsed);
    }
  } catch (error) {
    console.warn('Error fetching admin portfolio from DB, falling back to static data:', error.message);
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
    show_on_home: item.show_on_home ? true : false
  }));

  return NextResponse.json(fallback);
}

export async function POST(request) {
  try {
    await ensureShowOnHomeColumn();
    const body = await request.json();
    const {
      title, slug, category, featured_image, client, duration,
      technologies, description, challenge, solution, results, testimonial, live_url,
      show_on_home
    } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug and category are required.' }, { status: 400 });
    }

    await query(
      `INSERT INTO portfolio (
        title, slug, category, featured_image, client, duration,
        technologies, description, challenge, solution, results, testimonial, live_url, show_on_home
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        category,
        featured_image || null,
        client || null,
        duration || null,
        JSON.stringify(technologies || []),
        description || null,
        challenge || null,
        solution || null,
        results || null,
        testimonial || null,
        live_url || null,
        show_on_home ? 1 : 0
      ]
    );

    return NextResponse.json({ success: true, message: 'Project added successfully.' });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await ensureShowOnHomeColumn();
    const body = await request.json();

    // Quick toggle for show_on_home
    if (body.toggle_home !== undefined && body.id) {
      await query('UPDATE portfolio SET show_on_home = ? WHERE id = ?', [
        body.show_on_home ? 1 : 0,
        body.id
      ]);
      return NextResponse.json({ success: true, message: 'Homepage visibility updated.' });
    }

    const {
      id, title, slug, category, featured_image, client, duration,
      technologies, description, challenge, solution, results, testimonial, live_url,
      show_on_home
    } = body;

    if (!id || !title || !slug || !category) {
      return NextResponse.json({ error: 'ID, Title, slug and category are required.' }, { status: 400 });
    }

    await query(
      `UPDATE portfolio SET 
        title = ?, slug = ?, category = ?, featured_image = ?, client = ?, duration = ?,
        technologies = ?, description = ?, challenge = ?, solution = ?, results = ?, testimonial = ?, live_url = ?,
        show_on_home = ?
      WHERE id = ?`,
      [
        title,
        slug,
        category,
        featured_image || null,
        client || null,
        duration || null,
        JSON.stringify(technologies || []),
        description || null,
        challenge || null,
        solution || null,
        results || null,
        testimonial || null,
        live_url || null,
        show_on_home ? 1 : 0,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await ensureShowOnHomeColumn();
    const body = await request.json();
    const { id, show_on_home } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    await query('UPDATE portfolio SET show_on_home = ? WHERE id = ?', [
      show_on_home ? 1 : 0,
      id
    ]);

    return NextResponse.json({ success: true, message: 'Homepage status updated.' });
  } catch (error) {
    console.error('Error in PATCH toggle:', error);
    return NextResponse.json({ error: 'Failed to update homepage status.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    await query('DELETE FROM portfolio WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
