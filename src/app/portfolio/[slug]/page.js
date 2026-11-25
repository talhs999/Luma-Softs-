import React from "react";
import Link from "next/link";
import Script from "next/script";
import { query } from "../../../lib/db";
import { ALL_PORTFOLIO } from "../../../data/portfolio";
import PortfolioDetailClient from "./PortfolioDetailClient";

export const revalidate = 0;

async function getPortfolioProject(rawSlug) {
  const slug = decodeURIComponent(rawSlug);
  const staticMatch = ALL_PORTFOLIO.find((p) => p.slug === slug);

  try {
    const projects = await query("SELECT * FROM portfolio WHERE slug = ? LIMIT 1", [slug]);
    if (Array.isArray(projects) && projects.length > 0) {
      const p = { ...projects[0] };
      if (typeof p.images === "string") {
        try { p.images = JSON.parse(p.images); } catch (e) { p.images = []; }
      }
      if (!Array.isArray(p.images) || p.images.length === 0) {
        p.images = staticMatch?.images || (p.featured_image ? [p.featured_image] : []);
      }
      if (typeof p.technologies === "string") {
        try { p.technologies = JSON.parse(p.technologies); } catch (e) { p.technologies = []; }
      }

      let related = [];
      try {
        const rel = await query("SELECT slug, title, category, featured_image FROM portfolio WHERE category = ? AND slug != ? LIMIT 3", [p.category, slug]);
        if (Array.isArray(rel)) related = rel;
      } catch (e) {}

      return { project: p, related };
    }
  } catch (err) {
    console.warn("Portfolio detail DB fallback:", err.message);
  }

  if (staticMatch) {
    const formatted = {
      id: staticMatch.slug,
      slug: staticMatch.slug,
      title: staticMatch.title,
      category: staticMatch.category,
      featured_image: staticMatch.featuredImage,
      images: staticMatch.images || [staticMatch.featuredImage],
      client: staticMatch.client,
      duration: staticMatch.duration,
      technologies: staticMatch.technologies,
      description: staticMatch.description,
      challenge: staticMatch.challenge,
      solution: staticMatch.solution,
      results: staticMatch.results,
      testimonial: staticMatch.testimonial,
      live_url: staticMatch.liveUrl,
    };
    const related = ALL_PORTFOLIO
      .filter((item) => item.category === staticMatch.category && item.slug !== slug)
      .slice(0, 3)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        category: item.category,
        featured_image: item.featuredImage,
      }));
    return { project: formatted, related };
  }

  return { project: null, related: [] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { project } = await getPortfolioProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Luma Softs",
      robots: { index: false },
    };
  }

  const title = `${project.title} — Case Study | Luma Softs Portfolio`;
  const description = project.description || `Explore how Luma Softs designed and engineered ${project.title} for ${project.client}.`;
  const canonicalPath = `/portfolio/${encodeURIComponent(project.slug)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `https://lumasofts.com${canonicalPath}`,
      type: "article",
      images: project.featured_image ? [{ url: project.featured_image, alt: project.title }] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const { project, related } = await getPortfolioProject(slug);

  if (!project) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Project Not Found</h1>
        <Link href="/portfolio" className="btn-outline">← Back to Portfolio</Link>
      </div>
    );
  }

  const canonicalUrl = `https://lumasofts.com/portfolio/${encodeURIComponent(project.slug)}`;
  const schemaGraph = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: canonicalUrl,
      image: project.featured_image ? `https://lumasofts.com${project.featured_image}` : undefined,
      creator: {
        "@type": "Organization",
        name: "Luma Softs",
        url: "https://lumasofts.com",
      },
      keywords: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lumasofts.com" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://lumasofts.com/portfolio" },
        { "@type": "ListItem", position: 3, name: project.title, item: canonicalUrl },
      ],
    },
  ];

  return (
    <>
      <Script id={`portfolio-schema-${project.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaGraph)}
      </Script>
      <PortfolioDetailClient project={project} related={related} />
    </>
  );
}
