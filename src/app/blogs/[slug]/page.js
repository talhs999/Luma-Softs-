import React from "react";
import Link from "next/link";
import Script from "next/script";
import { query } from "../../../lib/db";
import { STATIC_BLOGS } from "../../../data/blogs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 0;

async function getBlogPost(slug) {
  try {
    const blogs = await query("SELECT * FROM blogs WHERE slug = ? LIMIT 1", [slug]);
    if (blogs && blogs.length > 0) {
      return blogs[0];
    }
  } catch (err) {}
  return STATIC_BLOGS.find((b) => b.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Luma Softs",
      robots: { index: false },
    };
  }

  const title = `${blog.title} | Luma Softs`;
  const description = blog.description || "Read engineering, SEO, and AI growth insights from Luma Softs.";

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lumasofts.com/blogs/${blog.slug}`,
      type: "article",
      siteName: "Luma Softs",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return (
      <section style={{ padding: "8rem 0", textAlign: "center" }}>
        <h1>Blog Not Found</h1>
        <Link href="/blogs" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>
          Return to Blogs
        </Link>
      </section>
    );
  }

  const relatedBlogs = STATIC_BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 3);
  const canonicalUrl = `https://lumasofts.com/blogs/${blog.slug}`;

  const schemaGraph = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.title,
      description: blog.description,
      articleSection: blog.category,
      datePublished: blog.date || "2026-11-25",
      dateModified: "2026-11-25",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      author: {
        "@type": "Organization",
        name: "Luma Softs Engineering & SEO Team",
        url: "https://lumasofts.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: "Luma Softs",
        logo: {
          "@type": "ImageObject",
          url: "https://lumasofts.com/logo.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lumasofts.com" },
        { "@type": "ListItem", position: 2, name: "Blogs", item: "https://lumasofts.com/blogs" },
        { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl },
      ],
    },
  ];

  return (
    <article style={{ padding: "5rem 0 7rem" }}>
      <Script id={`blog-schema-${blog.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaGraph)}
      </Script>

      <div className="section-container" style={{ maxWidth: 820 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--gray)", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--gray)" }}>Home</Link>
          <span>/</span>
          <Link href="/blogs" style={{ color: "var(--gray)" }}>Blogs</Link>
          <span>/</span>
          <span style={{ color: "var(--primary)" }}>{blog.category}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#000", background: "var(--primary)", padding: "0.25rem 0.75rem", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {blog.category}
            </span>
            <span style={{ color: "var(--gray)", fontSize: "0.875rem" }}>{blog.date}</span>
            <span style={{ color: "var(--gray)", fontSize: "0.875rem" }}>• By Luma Softs Research Team</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.85rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1.25rem" }}>
            {blog.title}
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--gray)", lineHeight: 1.65 }}>
            {blog.description}
          </p>
        </header>

        <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

        {/* Markdown Content */}
        <div className="blog-content" style={{ display: "flex", flexDirection: "column" }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => <h2 style={{ fontSize: "1.65rem", fontWeight: 700, color: "var(--fg)", marginTop: "2.25rem", marginBottom: "1rem" }} {...props} />,
              h3: ({ node, ...props }) => <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginTop: "1.5rem", marginBottom: "0.75rem" }} {...props} />,
              p: ({ node, ...props }) => <p style={{ color: "var(--gray)", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: "1.1rem" }} {...props} />,
              a: ({ node, href, children, ...props }) => {
                const isInternal = href && (href.startsWith("/") || href.includes("lumasofts.com"));
                if (isInternal) {
                  return <Link href={href.replace("https://lumasofts.com", "") || "/"} style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 600 }} {...props}>{children}</Link>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 600 }} {...props}>{children}</a>;
              },
              img: ({ node, ...props }) => (
                <span style={{ display: "block", margin: "2rem 0", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img style={{ width: "100%", height: "auto", display: "block" }} {...props} alt={props.alt || blog.title} loading="lazy" />
                </span>
              ),
              ul: ({ node, ...props }) => <ul style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.25rem", paddingLeft: "1.5rem" }} {...props} />,
              ol: ({ node, ...props }) => <ol style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.25rem", paddingLeft: "1.5rem" }} {...props} />,
              li: ({ node, ...props }) => <li style={{ marginBottom: "0.5rem" }} {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote style={{ borderLeft: "4px solid var(--primary)", color: "#e4e4e7", margin: "1.5rem 0", background: "rgba(194,255,5,0.06)", padding: "1.25rem 1.5rem", borderRadius: "0 12px 12px 0" }} {...props} />
              ),
              table: ({ node, ...props }) => (
                <div style={{ overflowX: "auto", margin: "1.75rem 0", borderRadius: 12, border: "1px solid var(--border)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.925rem", textAlign: "left" }} {...props} />
                </div>
              ),
              th: ({ node, ...props }) => <th style={{ padding: "0.875rem 1rem", background: "rgba(194,255,5,0.08)", color: "var(--primary)", fontWeight: 700, borderBottom: "1px solid var(--border)" }} {...props} />,
              td: ({ node, ...props }) => <td style={{ padding: "0.875rem 1rem", color: "var(--gray)", borderBottom: "1px solid var(--border)" }} {...props} />,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Author E-E-A-T Box */}
        <div className="glass" style={{ marginTop: "3.5rem", padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "0.5rem", border: "1px solid rgba(194,255,5,0.2)" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Verified Engineering &amp; SEO Insights
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Written by Luma Softs Engineering &amp; Growth Team</div>
          <p style={{ color: "var(--gray)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
            Led by founders Talha Khan, Mustufa Ali, and Arhum Noman—building high-speed Next.js platforms, 4-day eCommerce stores, AI automations, and white-hat SEO/GEO systems across Pakistan, the UK, Europe, UAE &amp; the US.
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/estimator" className="btn-primary" style={{ padding: "0.625rem 1.25rem", fontSize: "0.85rem" }}>
              Try Instant Cost Calculator →
            </Link>
            <Link href="/contact" className="btn-outline" style={{ padding: "0.625rem 1.25rem", fontSize: "0.85rem" }}>
              Request Free SEO + AI Audit
            </Link>
          </div>
        </div>

        {/* Related Articles for Internal Link Equity */}
        {relatedBlogs.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Related Guides &amp; Case Studies
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
              {relatedBlogs.map((rb) => (
                <Link key={rb.slug} href={`/blogs/${rb.slug}`} className="glass link-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    {rb.category}
                  </span>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: 600, lineHeight: 1.4, marginBottom: "0.75rem" }}>{rb.title}</h3>
                  <span style={{ marginTop: "auto", fontSize: "0.8125rem", color: "var(--fg)", fontWeight: 600 }}>Read Guide →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
