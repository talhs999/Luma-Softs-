import React from "react";
import Link from "next/link";
import { query } from "../../../lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";// Revalidate 0 ensures we always fetch the latest from the database
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let title = "Blog | Luma Softs";
  let description = "Read our latest blog post.";
  try {
    const blogs = await query('SELECT title, description FROM blogs WHERE slug = ? LIMIT 1', [slug]);
    if (blogs && blogs.length > 0) {
      title = `${blogs[0].title} | Luma Softs`;
      description = blogs[0].description;
    }
  } catch (err) {}
  
  return { title, description };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  
  let blog = null;
  try {
    const blogs = await query('SELECT * FROM blogs WHERE slug = ? LIMIT 1', [slug]);
    if (blogs && blogs.length > 0) {
      blog = blogs[0];
    }
  } catch (error) {
    console.error("Failed to fetch blog detail:", error);
  }

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

  // We will render content using react-markdown in the JSX below
  // We need to import ReactMarkdown at the top. Let's assume it's imported.
  // Actually, wait, since we are doing a replace, I must import it at the top of the file as well.

  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="section-container" style={{ maxWidth: 800 }}>
        {/* Back Link */}
        <Link href="/blogs" style={{ color: "var(--gray)", fontSize: "0.875rem", display: "inline-flex", marginBottom: "3rem", transition: "color 0.2s" }} className="hover-primary">
          ← Back to All Blogs
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--bg)", background: "var(--primary)", padding: "0.25rem 0.75rem", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {blog.category}
            </span>
            <span style={{ color: "var(--gray)", fontSize: "0.875rem" }}>{blog.date}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            {blog.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--gray)", lineHeight: 1.6 }}>
            {blog.description}
          </p>
        </div>

        <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

        {/* Content */}
        <div className="blog-content" style={{ display: "flex", flexDirection: "column" }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--fg)", marginTop: "2rem", marginBottom: "1rem" }} {...props} />,
              h3: ({node, ...props}) => <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--fg)", marginTop: "1.5rem", marginBottom: "0.75rem" }} {...props} />,
              p: ({node, ...props}) => <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }} {...props} />,
              a: ({node, href, children, ...props}) => {
                const isInternal = href && (href.startsWith('/') || href.includes('lumasofts.com'));
                if (isInternal) {
                  return <Link href={href.replace('https://lumasofts.com', '')} style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }} className="hover-primary" {...props}>{children}</Link>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }} className="hover-primary" {...props}>{children}</a>;
              },
              img: ({node, ...props}) => (
                <span style={{ display: "block", margin: "2rem 0", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img style={{ width: "100%", height: "auto", display: "block" }} {...props} alt={props.alt || "Blog Image"} />
                </span>
              ),
              ul: ({node, ...props}) => <ul style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem", paddingLeft: "1.5rem" }} {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: "0.5rem" }} {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "1rem", fontStyle: "italic", color: "var(--gray)", margin: "1.5rem 0", background: "rgba(194,255,5,0.05)", padding: "1rem" }} {...props} />
              )
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
